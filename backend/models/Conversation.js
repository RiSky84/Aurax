const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  emotion: String,
  distressLevel: {
    type: Number,
    min: 0,
    max: 10
  }
});

const conversationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  messages: [messageSchema],
  startedAt: {
    type: Date,
    default: Date.now
  },
  endedAt: Date,
  isCrisisSession: {
    type: Boolean,
    default: false
  },
  crisisAlert: String,
  suggestedStrategies: [String],
  session_summary: String
});

module.exports = mongoose.model('Conversation', conversationSchema);
