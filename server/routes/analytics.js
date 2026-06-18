// server/routes/analytics.js
const express = require('express');
const { query, validationResult } = require('express-validator');
const router = express.Router();

const Notification = require('../models/Notification');
const MathProblem = require('../models/MathProblem');
const StudySession = require('../models/StudySession');

// Get user analytics
router.get('/user/:userId', [
  query('startDate').optional().isISO8601().withMessage('Invalid start date'),
  query('endDate').optional().isISO8601().withMessage('Invalid end date')
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

    const { userId, startDate, endDate } = req.query;

    const filter = { userId };
    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    } else if (startDate) {
      filter.createdAt = { $gte: new Date(startDate) };
    } else if (endDate) {
      filter.createdAt = { $lte: new Date(endDate) };
    }

    const notifications = await Notification.find(filter);
    const problems = await MathProblem.find({ createdBy: userId });
    const sessions = await StudySession.find({ userId });

    const analytics = {
      notifications: {
        total: notifications.length,
        read: notifications.filter(n => n.read).length,
        unread: notifications.filter(n => !n.read).length,
        byType: notifications.reduce((acc, n) => {
          acc[n.type] = (acc[n.type] || 0) + 1;
          return acc;
        }, {}),
        byPriority: notifications.reduce((acc, n) => {
          acc[n.priority] = (acc[n.priority] || 0) + 1;
          return acc;
        }, {})
      },
      problems: {
        total: problems.length,
        byCategory: problems.reduce((acc, p) => {
          acc[p.category] = (acc[p.category] || 0) + 1;
          return acc;
        }, {}),
        byDifficulty: problems.reduce((acc, p) => {
          acc[p.difficulty] = (acc[p.difficulty] || 0) + 1;
          return acc;
        }, {})
      },
      sessions: {
        total: sessions.length,
        byCategory: sessions.reduce((acc, s) => {
          acc[s.category] = (acc[s.category] || 0) + 1;
          return acc;
        }, {}),
        totalDuration: sessions.reduce((acc, s) => acc + s.duration, 0)
      }
    };

    res.json(analytics);
  } catch (error) {
    res.status(500).json({
      error: {
        code: 'ANALYTICS_FETCH_ERROR',
        message: 'Error fetching analytics',
        details: error.message
      }
    });
  }
});

// Get problem analytics
router.get('/problems', [
  query('category').optional().isIn(['algebra', 'geometry', 'calculus', 'statistics', 'trigonometry']).withMessage('Invalid category'),
  query('difficulty').optional().isIn(['easy', 'medium', 'hard']).withMessage('Invalid difficulty'),
  query('startDate').optional().isISO8601().withMessage('Invalid start date'),
  query('endDate').optional().isISO8601().withMessage('Invalid end date')
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

    const { category, difficulty, startDate, endDate } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    } else if (startDate) {
      filter.createdAt = { $gte: new Date(startDate) };
    } else if (endDate) {
      filter.createdAt = { $lte: new Date(endDate) };
    }

    const problems = await MathProblem.find(filter);

    const analytics = {
      total: problems.length,
      byCategory: problems.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
      }, {}),
      byDifficulty: problems.reduce((acc, p) => {
        acc[p.difficulty] = (acc[p.difficulty] || 0) + 1;
        return acc;
      }, {}),
      byTags: problems.reduce((acc, p) => {
        p.tags.forEach(tag => {
          acc[tag] = (acc[tag] || 0) + 1;
        });
        return acc;
      }, {})
    };

    res.json(analytics);
  } catch (error) {
    res.status(500).json({
      error: {
        code: 'PROBLEM_ANALYTICS_FETCH_ERROR',
        message: 'Error fetching problem analytics',
        details: error.message
      }
    });
  }
});

module.exports = router;
