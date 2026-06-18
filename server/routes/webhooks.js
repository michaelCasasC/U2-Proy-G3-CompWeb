// server/routes/webhooks.js
const express = require('express');
const crypto = require('crypto');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const Notification = require('../models/Notification');

// Register a webhook
router.post('/', [
  body('url').isURL().withMessage('Valid URL is required'),
  body('events').isArray().withMessage('Events must be an array'),
  body('secret').notEmpty().withMessage('Secret is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: errors.array()
        }
      });
    }

    const { url, events, secret } = req.body;

    // Validate events
    const validEvents = ['problem.created', 'notification.sent', 'user.achievement'];
    const invalidEvents = events.filter(event => !validEvents.includes(event));
    if (invalidEvents.length > 0) {
      return res.status(400).json({
        error: {
          code: 'INVALID_EVENTS',
          message: `Invalid events: ${invalidEvents.join(', ')}`,
          details: { invalidEvents }
        }
      });
    }

    // Create webhook
    const webhook = {
      url,
      events,
      secret,
      createdAt: new Date()
    };

    // Store webhook (in a real implementation, you'd use a database)
    // For now, we'll just return success

    res.status(201).json({
      message: 'Webhook registered successfully',
      webhook
    });
  } catch (error) {
    res.status(500).json({
      error: {
        code: 'WEBHOOK_REGISTER_ERROR',
        message: 'Error registering webhook',
        details: error.message
      }
    });
  }
});

// Webhook payload validation middleware
const validateWebhookPayload = (req, res, next) => {
  const signature = req.headers['x-webhook-signature'];
  const payload = JSON.stringify(req.body);

  if (!signature) {
    return res.status(401).json({
      error: {
        code: 'MISSING_SIGNATURE',
        message: 'Webhook signature is required'
      }
    });
  }

  const expectedSignature = crypto
    .createHmac('sha256', process.env.WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');

  if (signature !== expectedSignature) {
    return res.status(401).json({
      error: {
        code: 'INVALID_SIGNATURE',
        message: 'Invalid webhook signature'
      }
    });
  }

  next();
};

// Process webhook events
router.post('/process', validateWebhookPayload, async (req, res) => {
  try {
    const { event, data } = req.body;

    switch (event) {
      case 'problem.created':
        // Create notification for new problem
        const problemNotification = new Notification({
          userId: data.userId,
          type: 'problem',
          title: 'New Math Problem Available',
          message: `A new ${data.difficulty} difficulty ${data.category} problem has been added: ${data.title}`,
          data,
          priority: 'medium',
          channels: ['in-app', 'email'],
          scheduledFor: new Date(),
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        });
        await problemNotification.save();
        break;

      case 'notification.sent':
        // Update notification status
        const notification = await Notification.findById(data.notificationId);
        if (notification) {
          notification.sentAt = new Date();
          await notification.save();
        }
        break;

      case 'user.achievement':
        // Create achievement notification
        const achievementNotification = new Notification({
          userId: data.userId,
          type: 'achievement',
          title: 'Achievement Unlocked',
          message: data.message,
          data,
          priority: 'high',
          channels: ['in-app', 'push'],
          scheduledFor: new Date(),
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
        });
        await achievementNotification.save();
        break;

      default:
        throw new Error(`Unknown event type: ${event}`);
    }

    res.json({
      message: 'Webhook processed successfully',
      event,
      data
    });
  } catch (error) {
    res.status(500).json({
      error: {
        code: 'WEBHOOK_PROCESS_ERROR',
        message: 'Error processing webhook',
        details: error.message
      }
    });
  }
});

module.exports = router;
