const copingStrategies = {
  anxiety: [
    {
      name: 'Breathing Exercise',
      description: 'Practice 4-7-8 breathing: inhale for 4, hold for 7, exhale for 8',
      duration: '5 minutes'
    },
    {
      name: 'Progressive Muscle Relaxation',
      description: 'Tense and release muscle groups from feet to head',
      duration: '10 minutes'
    },
    {
      name: 'Grounding Technique',
      description: 'Focus on 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste',
      duration: '5 minutes'
    }
  ],
  depression: [
    {
      name: 'Physical Activity',
      description: 'Take a 15-30 minute walk outside or do light exercise',
      duration: '30 minutes'
    },
    {
      name: 'Social Connection',
      description: 'Reach out to a friend or loved one for a brief conversation',
      duration: 'Flexible'
    },
    {
      name: 'Journaling',
      description: 'Write down your thoughts and feelings without judgment',
      duration: '10 minutes'
    },
    {
      name: 'Mindfulness Meditation',
      description: 'Guided meditation focusing on present moment awareness',
      duration: '10-15 minutes'
    }
  ],
  stress: [
    {
      name: 'Time Management',
      description: 'Break tasks into smaller steps and create a schedule',
      duration: 'Flexible'
    },
    {
      name: 'Hobby Engagement',
      description: 'Engage in activities you enjoy: art, music, games, reading',
      duration: 'Flexible'
    },
    {
      name: 'Warm Bath or Shower',
      description: 'Relax with warm water and calming activities',
      duration: '15-20 minutes'
    }
  ],
  overwhelm: [
    {
      name: 'Cognitive Reframing',
      description: 'Challenge negative thoughts and replace with realistic ones',
      duration: '5-10 minutes'
    },
    {
      name: 'Rest and Recovery',
      description: 'Take breaks, ensure adequate sleep, and hydrate',
      duration: '30 minutes - 8 hours'
    },
    {
      name: 'Problem Breakdown',
      description: 'Divide overwhelming situation into manageable steps',
      duration: '10 minutes'
    }
  ]
};

function getSuggestedStrategies(emotion, count = 2) {
  const strategies = copingStrategies[emotion] || copingStrategies.stress;
  
  const shuffled = [...strategies].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getAllStrategies() {
  return copingStrategies;
}

module.exports = {
  copingStrategies,
  getSuggestedStrategies,
  getAllStrategies
};
