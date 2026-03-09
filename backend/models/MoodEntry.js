const mongoose = require('mongoose');

const moodEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  moodScore: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  emotion: {
    primary: String,
    secondary: [String]
  },
  activities: [String],
  notes: String,
  triggers: [String],
  copingStrategiesUsed: [String],
  socialSupport: String,
  sleepQuality: Number,
  physicalActivity: Boolean,
  mealTimes: Number
});

module.exports = mongoose.model('MoodEntry', moodEntrySchema);
