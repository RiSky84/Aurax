const express = require('express');
const router = express.Router();

router.get('/dashboard/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { days = 30 } = req.query;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const conversations = await global.db.Conversation.find({
      userId,
      startedAt: { $gte: startDate.toISOString() }
    });

    const moodEntries = await global.db.MoodEntry.find({
      userId,
      date: { $gte: startDate.toISOString() }
    });

    const crisisSessions = conversations.filter(c => c.is_crisis_session || c.isCrisisSession).length;

    res.json({
      period: `Last ${days} days`,
      statistics: {
        totalChats: conversations.length,
        totalMoodEntries: moodEntries.length,
        crisisSessions,
        averageMood: calculateAverageMood(moodEntries)
      },
      recentConversations: conversations.slice(0, 5),
      moodTrend: getMoodTrend(moodEntries),
      engagementScore: calculateEngagementScore(conversations, moodEntries)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/emotions/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { days = 7 } = req.query;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const conversations = await global.db.Conversation.find({
      userId,
      startedAt: { $gte: startDate.toISOString() }
    });

    const emotionData = {};
    conversations.forEach(conv => {
      const messages = conv.messages || [];
      messages.forEach(msg => {
        if (msg.emotion) {
          const date = new Date(msg.timestamp).toISOString().split('T')[0];
          if (!emotionData[date]) {
            emotionData[date] = {};
          }
          emotionData[date][msg.emotion] = (emotionData[date][msg.emotion] || 0) + 1;
        }
      });
    });

    res.json({
      chartData: emotionData,
      period: `Last ${days} days`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/strategies/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { days = 30 } = req.query;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const moodEntries = await global.db.MoodEntry.find({
      userId,
      date: { $gte: startDate.toISOString() }
    });

    const strategiesEffectiveness = {};
    moodEntries.forEach(entry => {
      const strats = entry.coping_strategies_used || entry.copingStrategiesUsed || [];
      strats.forEach(strategy => {
        if (!strategiesEffectiveness[strategy]) {
          strategiesEffectiveness[strategy] = {
            usage: 0,
            moodScores: [],
            avgMood: 0
          };
        }
        strategiesEffectiveness[strategy].usage++;
        const score = entry.mood_score || entry.moodScore;
        strategiesEffectiveness[strategy].moodScores.push(score);
      });
    });

    Object.keys(strategiesEffectiveness).forEach(strategy => {
      const scores = strategiesEffectiveness[strategy].moodScores;
      strategiesEffectiveness[strategy].avgMood = 
        Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 100) / 100;
    });

    res.json({
      strategies: strategiesEffectiveness,
      period: `Last ${days} days`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function calculateAverageMood(entries) {
  if (entries.length === 0) return 0;
  const sum = entries.reduce((acc, entry) => acc + (entry.mood_score || entry.moodScore), 0);
  return Math.round((sum / entries.length) * 100) / 100;
}

function getMoodTrend(entries) {
  const sorted = entries.sort((a, b) => new Date(a.date) - new Date(b.date));
  return sorted.map(entry => ({
    date: new Date(entry.date).toISOString().split('T')[0],
    mood: entry.mood_score || entry.moodScore
  }));
}

function calculateEngagementScore(conversations, moodEntries) {
  const chatScore = Math.min(conversations.length * 10, 50);
  const moodScore = Math.min(moodEntries.length * 15, 50);
  return Math.round(chatScore + moodScore);
}

module.exports = router;
