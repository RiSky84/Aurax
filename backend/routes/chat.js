const express = require('express');
const router = express.Router();
const { analyzeEmotion, calculateDistressLevel } = require('../utils/emotionAnalyzer');
const { detectCrisis, generateCrisisResponse } = require('../utils/crisisDetector');
const { getSuggestedStrategies } = require('../utils/copingStrategies');

// Chat endpoint
router.post('/message', async (req, res) => {
  try {
    const { userId, message, conversationId } = req.body;

    // Analyze user message
    const emotionAnalysis = analyzeEmotion(message);
    const crisisDetection = detectCrisis(message);
    const distressLevel = calculateDistressLevel(emotionAnalysis.primaryEmotion);

    // Get suggested strategies
    const suggestedStrategies = getSuggestedStrategies(emotionAnalysis.primaryEmotion, 2);

    // Get or create conversation
    let conversation;
    if (conversationId) {
      conversation = await global.db.Conversation.findById(conversationId);
    } else {
      conversation = await global.db.Conversation.create({
        userId,
        isCrisisSession: crisisDetection.isCrisis
      });
    }

    // Add user message
    conversation.messages.push({
      role: 'user',
      content: message,
      emotion: emotionAnalysis.primaryEmotion,
      distressLevel,
      timestamp: new Date().toISOString()
    });

    // Generate empathetic response
    const botResponse = generateBotResponse(
      emotionAnalysis.primaryEmotion,
      crisisDetection.isCrisis,
      distressLevel
    );

    // Add bot message
    conversation.messages.push({
      role: 'assistant',
      content: botResponse,
      timestamp: new Date().toISOString()
    });

    if (crisisDetection.isCrisis) {
      conversation.isCrisisSession = true;
      const crisisResponse = generateCrisisResponse(req.body.region);
      conversation.crisisAlert = crisisResponse;
      await global.db.Conversation.updateCrisisAlert(conversation.id || conversation._id, crisisResponse, true);
    }

    conversation.suggestedStrategies = suggestedStrategies;
    
    // Update conversation with messages
    await global.db.Conversation.updateMessages(conversation.id || conversation._id, conversation.messages);
    await global.db.Conversation.updateSuggestedStrategies(conversation.id || conversation._id, suggestedStrategies);

    const crisisAlert = crisisDetection.isCrisis ? generateCrisisResponse(req.body.region) : null;

    res.json({
      conversationId: conversation.id || conversation._id,
      botResponse,
      emotionAnalysis,
      crisisAlert: crisisAlert ? {
        ...crisisAlert,
        crisisTriggered: true
      } : null,
      suggestedStrategies,
      distressLevel
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get conversation history
router.get('/history/:conversationId', async (req, res) => {
  try {
    const conversation = await global.db.Conversation.findById(req.params.conversationId);
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function generateBotResponse(emotion, isCrisis, distressLevel) {
  // Validation-first responses that acknowledge feelings
  const validationResponses = {
    happy: "I'm really glad you're feeling good right now. That's something worth celebrating.",
    sad: "I hear that you're going through something difficult. That's really valid, and I'm here to listen.",
    anxious: "Your worry makes sense. Anxiety can feel overwhelming, but we can work through this together.",
    angry: "Your frustration is completely understandable. That anger you're feeling is valid.",
    overwhelmed: "It sounds like you're juggling a lot right now. That's a lot to carry, and it's okay to feel this way.",
    confused: "I understand—uncertainty can be really disorienting. Let's figure this out together.",
    neutral: "I'm here and listening. No judgment, just support.",
    grateful: "That gratitude you're feeling is powerful. It's wonderful to see you recognizing the good."
  };

  // CBT-inspired coping suggestions
  const copingSuggestions = {
    happy: "Keep riding this wave. Notice what's making you feel this way.",
    sad: "Try some gentle self-care today—journaling, a walk, or reaching out to someone you trust.",
    anxious: "Let's try a grounding technique: name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.",
    angry: "Channel this energy into something productive. Sometimes movement helps—exercise, art, or writing.",
    overwhelmed: "Pick just one small thing to tackle first. Breaking it down makes it manageable.",
    confused: "It's okay not to have all the answers right now. What feels most pressing to you?",
    neutral: "I'm curious—what brought you here today?",
    grateful: "Hold onto this feeling. What specifically are you grateful for?"
  };

  const validation = validationResponses[emotion] || validationResponses.neutral;
  const suggestion = copingSuggestions[emotion] || copingSuggestions.neutral;
  
  let response = validation;
  
  if (isCrisis) {
    response = validation + " I want you to know you're not alone in this.";
  } else if (distressLevel >= 7) {
    response = validation + " " + suggestion;
  } else {
    response = validation + " " + suggestion;
  }

  return response;
}

module.exports = router;
