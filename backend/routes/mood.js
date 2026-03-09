const express = require('express');
const router = express.Router();

router.post('/entry', async (req, res) => {
  try {
    const {
      userId,
      moodScore,
      emotion,
      activities,
      notes,
      triggers,
      copingStrategiesUsed,
      socialSupport,
      sleepQuality,
      physicalActivity,
      mealTimes
    } = req.body;

    const moodEntry = await global.db.MoodEntry.create({
      userId,
      moodScore,
      emotion,
      activities,
      notes,
      triggers,
      copingStrategiesUsed,
      socialSupport,
      sleepQuality,
      physicalActivity,
      mealTimes
    });

    res.json({
      success: true,
      entryId: moodEntry.id || moodEntry._id,
      message: 'Mood entry saved successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { days = 30 } = req.query;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const moodEntries = await global.db.MoodEntry.find({
      userId,
      date: { $gte: startDate.toISOString() }
    });

    res.json({
      entries: moodEntries,
      count: moodEntries.length,
      averageMood: getAverageMood(moodEntries),
      emotionTrends: getEmotionTrends(moodEntries)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/analytics/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { days = 30 } = req.query;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const entries = await global.db.MoodEntry.find({
      userId,
      date: { $gte: startDate.toISOString() }
    });

    const analytics = {
      totalEntries: entries.length,
      averageMood: getAverageMood(entries),
      moodDistribution: getMoodDistribution(entries),
      commonEmotions: getCommonEmotions(entries),
      effectiveStrategies: getEffectiveStrategies(entries),
      triggerAnalysis: getTriggerAnalysis(entries),
      healthIndicators: getHealthIndicators(entries)
    };

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function getAverageMood(entries) {
  if (entries.length === 0) return 0;
  const sum = entries.reduce((acc, entry) => acc + entry.mood_score, 0);
  return Math.round((sum / entries.length) * 100) / 100;
}

function getMoodDistribution(entries) {
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  entries.forEach(entry => {
    const score = entry.mood_score || entry.moodScore;
    if (score >= 1 && score <= 5) {
      distribution[score]++;
    }
  });
  return distribution;
}

function getCommonEmotions(entries) {
  const emotions = {};
  entries.forEach(entry => {
    const emotion = entry.emotion;
    if (emotion) {
      const key = typeof emotion === 'object' ? emotion.primary : emotion;
      emotions[key] = (emotions[key] || 0) + 1;
    }
  });
  return Object.entries(emotions)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
}

function getEffectiveStrategies(entries) {
  const strategies = {};
  entries.forEach(entry => {
    const strats = entry.coping_strategies_used || entry.copingStrategiesUsed || [];
    strats.forEach(strategy => {
      if (!strategies[strategy]) {
        strategies[strategy] = { count: 0, totalMood: 0 };
      }
      strategies[strategy].count++;
      strategies[strategy].totalMood += entry.mood_score || entry.moodScore;
    });
  });

  return Object.entries(strategies).map(([strategy, data]) => ({
    strategy,
    effectiveness: Math.round((data.totalMood / data.count) * 100) / 100,
    usage: data.count
  }));
}

function getTriggerAnalysis(entries) {
  const triggers = {};
  entries.forEach(entry => {
    const trigs = entry.triggers || [];
    trigs.forEach(trigger => {
      triggers[trigger] = (triggers[trigger] || 0) + 1;
    });
  });
  return Object.entries(triggers).sort((a, b) => b[1] - a[1]);
}

function getHealthIndicators(entries) {
  const avgSleep = entries.reduce((acc, e) => acc + (e.sleep_quality || e.sleepQuality || 0), 0) / entries.length || 0;
  const physicalActivityCount = entries.filter(e => e.physical_activity || e.physicalActivity).length;
  const avgMeals = entries.reduce((acc, e) => acc + (e.meal_times || e.mealTimes || 0), 0) / entries.length || 0;

  return {
    avgSleepQuality: Math.round(avgSleep * 100) / 100,
    physicalActivityDays: physicalActivityCount,
    avgMealsPerDay: Math.round(avgMeals * 100) / 100
  };
}

function getEmotionTrends(entries) {
  const trends = {};
  entries.forEach(entry => {
    const date = new Date(entry.date).toISOString().split('T')[0];
    const emotion = entry.emotion;
    trends[date] = typeof emotion === 'object' ? emotion.primary : emotion || 'neutral';
  });
  return trends;
}

module.exports = router;
