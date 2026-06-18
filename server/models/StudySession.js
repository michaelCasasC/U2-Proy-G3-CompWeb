// server/models/StudySession.js
const mongoose = require('mongoose');

const StudySessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    trim: true
  },
  scheduledAt: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
    max: 1440
  },
  category: {
    type: String,
    enum: ['algebra', 'geometry', 'calculus', 'statistics', 'trigonometry'],
    required: true
  },
  goals: [{
    type: String,
    trim: true
  }],
  reminders: {
    type: Number,
    default: 15,
    min: 0,
    max: 60
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient querying
StudySessionSchema.index({ userId: 1, scheduledAt: 1 });
StudySessionSchema.index({ category: 1 });
StudySessionSchema.index({ scheduledAt: 1 });

module.exports = mongoose.model('StudySession', StudySessionSchema);
