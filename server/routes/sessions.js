// server/routes/sessions.js
const express = require('express');
const { body, query, validationResult } = require('express-validator');
const router = express.Router();

const StudySession = require('../models/StudySession');

// Create a study session
router.post('/', [
  body('userId').notEmpty().withMessage('User ID is required'),
  body('title').notEmpty().withMessage('Title is required'),
  body('scheduledAt').notEmpty().isISO8601().withMessage('Invalid scheduled date'),
  body('duration').notEmpty().isInt({ min: 1, max: 1440 }).withMessage('Duration must be between 1 and 1440 minutes'),
  body('category').notEmpty().isIn(['algebra', 'geometry', 'calculus', 'statistics', 'trigonometry']).withMessage('Invalid category'),
  body('reminders').optional().isInt({ min: 0, max: 60 }).withMessage('Reminders must be between 0 and 60')
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

    const session = new StudySession(req.body);
    await session.save();

    res.status(201).json({
      message: 'Study session created successfully',
      session
    });
  } catch (error) {
    res.status(500).json({
      error: {
        code: 'SESSION_CREATE_ERROR',
        message: 'Error creating study session',
        details: error.message
      }
    });
  }
});

// Get user study sessions
router.get('/', [
  query('userId').notEmpty().withMessage('User ID is required'),
  query('date').optional().isISO8601().withMessage('Invalid date'),
  query('category').optional().isIn(['algebra', 'geometry', 'calculus', 'statistics', 'trigonometry']).withMessage('Invalid category')
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

    const { userId, date, category } = req.query;

    const filter = { userId };
    if (date) filter.scheduledAt = { $gte: new Date(date) };
    if (category) filter.category = category;

    const sessions = await StudySession.find(filter)
      .sort({ scheduledAt: 1 });

    res.json(sessions);
  } catch (error) {
    res.status(500).json({
      error: {
        code: 'SESSIONS_FETCH_ERROR',
        message: 'Error fetching study sessions',
        details: error.message
      }
    });
  }
});

module.exports = router;
