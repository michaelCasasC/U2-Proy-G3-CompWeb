// server/routes/problems.js
const express = require('express');
const { body, query, validationResult } = require('express-validator');
const router = express.Router();

const MathProblem = require('../models/MathProblem');

// Create a new math problem
router.post('/', [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('difficulty').notEmpty().isIn(['easy', 'medium', 'hard']).withMessage('Invalid difficulty'),
  body('category').notEmpty().isIn(['algebra', 'geometry', 'calculus', 'statistics', 'trigonometry']).withMessage('Invalid category'),
  body('problem').notEmpty().withMessage('Problem is required'),
  body('solution').notEmpty().withMessage('Solution is required'),
  body('createdBy').notEmpty().withMessage('Created by is required')
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

    const problem = new MathProblem(req.body);
    await problem.save();

    res.status(201).json({
      message: 'Math problem created successfully',
      problem
    });
  } catch (error) {
    res.status(500).json({
      error: {
        code: 'PROBLEM_CREATE_ERROR',
        message: 'Error creating math problem',
        details: error.message
      }
    });
  }
});

// Get math problems
router.get('/', [
  query('category').optional().isIn(['algebra', 'geometry', 'calculus', 'statistics', 'trigonometry']).withMessage('Invalid category'),
  query('difficulty').optional().isIn(['easy', 'medium', 'hard']).withMessage('Invalid difficulty'),
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

    const { category, difficulty, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const skip = (page - 1) * limit;
    const problems = await MathProblem.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await MathProblem.countDocuments(filter);

    res.json({
      problems,
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
        code: 'PROBLEMS_FETCH_ERROR',
        message: 'Error fetching math problems',
        details: error.message
      }
    });
  }
});

// Get specific math problem
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const problem = await MathProblem.findById(id);

    if (!problem) {
      return res.status(404).json({
        error: {
          code: 'PROBLEM_NOT_FOUND',
          message: 'Math problem not found'
        }
      });
    }

    res.json(problem);
  } catch (error) {
    res.status(500).json({
      error: {
        code: 'PROBLEM_FETCH_ERROR',
        message: 'Error fetching math problem',
        details: error.message
      }
    });
  }
});

module.exports = router;
