// server/routes/notifications.js
const express = require('express');
const { body, query, validationResult } = require('express-validator');
const router = express.Router();

const Notification = require('../models/Notification');

// Create a new notification
router.post('/', [
  body('userId').notEmpty().withMessage('User ID is required'),
  body('type').notEmpty().withMessage('Type is required'),
  body('title').notEmpty().withMessage('Title is required'),
  body('message').notEmpty().withMessage('Message is required'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
  body('channels').optional().isArray().withMessage('Channels must be an array'),
  body('scheduledFor').optional().isISO8601().withMessage('Invalid scheduled date')
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

    const notification = new Notification(req.body);
    await notification.save();

    res.status(201).json({
      message: 'Notification created successfully',
      notification
    });
  } catch (error) {
    res.status(500).json({
      error: {
        code: 'NOTIFICATION_CREATE_ERROR',
        message: 'Error creating notification',
        details: error.message
      }
    });
  }
});

// Get user notifications
router.get('/', [
  query('userId').notEmpty().withMessage('User ID is required'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
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

    const { userId, page = 1, limit = 10, type, priority, unread } = req.query;

    const filter = { userId };
    if (type) filter.type = type;
    if (priority) filter.priority = priority;
    if (unread === 'true') filter.read = false;

    const skip = (page - 1) * limit;
    const notifications = await Notification.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Notification.countDocuments(filter);

    res.json({
      notifications,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      error: {
        code: 'NOTIFICATIONS_FETCH_ERROR',
        message: 'Error fetching notifications',
        details: error.message
      }
    });
  }
});

// Update notification
router.put('/:id', [
  body('read').optional().isBoolean().withMessage('Read must be a boolean'),
  body('archived').optional().isBoolean().withMessage('Archived must be a boolean'),
  body('channels').optional().isArray().withMessage('Channels must be an array')
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

    const { id } = req.params;
    const updates = req.body;

    const notification = await Notification.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!notification) {
      return res.status(404).json({
        error: {
          code: 'NOTIFICATION_NOT_FOUND',
          message: 'Notification not found'
        }
      });
    }

    res.json({
      message: 'Notification updated successfully',
      notification
    });
  } catch (error) {
    res.status(500).json({
      error: {
        code: 'NOTIFICATION_UPDATE_ERROR',
        message: 'Error updating notification',
        details: error.message
      }
    });
  }
});

// Delete notification
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) {
      return res.status(404).json({
        error: {
          code: 'NOTIFICATION_NOT_FOUND',
          message: 'Notification not found'
        }
      });
    }

    res.json({
      message: 'Notification deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      error: {
        code: 'NOTIFICATION_DELETE_ERROR',
        message: 'Error deleting notification',
        details: error.message
      }
    });
  }
});

module.exports = router;
