// server/models/MathProblem.js
const mongoose = require('mongoose');

const MathProblemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'hard']
  },
  category: {
    type: String,
    required: true,
    enum: ['algebra', 'geometry', 'calculus', 'statistics', 'trigonometry']
  },
  problem: {
    type: String,
    required: true,
    trim: true
  },
  solution: {
    type: String,
    required: true,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient querying
MathProblemSchema.index({ category: 1, difficulty: 1 });
MathProblemSchema.index({ tags: 1 });
MathProblemSchema.index({ createdAt: -1 });

module.exports = mongoose.model('MathProblem', MathProblemSchema);
