const natural = require('natural');

const emotionKeywords = {
  happy: ['happy', 'excited', 'joyful', 'great', 'wonderful', 'love', 'awesome', 'perfect', 'amazing', 'grateful'],
  sad: ['sad', 'depressed', 'unhappy', 'miserable', 'down', 'hurt', 'crying', 'lonely', 'isolated', 'empty'],
  anxious: ['anxious', 'worried', 'nervous', 'scared', 'afraid', 'stressed', 'panic', 'tense', 'uneasy', 'apprehensive'],
  angry: ['angry', 'furious', 'mad', 'frustrated', 'annoyed', 'irritated', 'rage', 'resentful', 'bitter'],
  calm: ['calm', 'peaceful', 'relaxed', 'serene', 'tranquil', 'composed', 'centered'],
  confused: ['confused', 'lost', 'unsure', 'unclear', 'disoriented', 'overwhelmed by info'],
  grateful: ['grateful', 'thankful', 'appreciated', 'blessed', 'fortunate'],
  overwhelmed: ['overwhelmed', 'exhausted', 'drained', 'tired', 'burnout', 'swamped', 'drowning']
};

function analyzeEmotion(text) {
  const lowerText = text.toLowerCase();
  const detectedEmotions = {};
  let maxScore = 0;
  let primaryEmotion = null;

  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    let score = 0;
    keywords.forEach(keyword => {
      if (lowerText.includes(keyword)) {
        score += 1;
      }
    });
    
    if (score > 0) {
      detectedEmotions[emotion] = score;
      if (score > maxScore) {
        maxScore = score;
        primaryEmotion = emotion;
      }
    }
  }

  return {
    primaryEmotion: primaryEmotion || 'neutral',
    detectedEmotions,
    confidence: maxScore / 10
  };
}

function calculateDistressLevel(emotion) {
  const distressMap = {
    anxious: 8,
    angry: 7,
    sad: 6,
    overwhelmed: 9,
    confused: 5,
    calm: 2,
    happy: 1,
    grateful: 1
  };
  return distressMap[emotion] || 5;
}

module.exports = {
  analyzeEmotion,
  calculateDistressLevel
};
