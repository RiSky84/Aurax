const crisisKeywords = [
  'suicide', 'kill myself', 'end my life', 'want to die', 'harm myself', 'self-harm',
  'cutting', 'overdose', 'jump off', 'hang myself', 'no point in living',
  'everyone would be better off without me', 'burden', 'hopeless', 'desperate'
];

const helplineNumbers = {
  US: '1-800-273-8255',
  UK: '116 123',
  Canada: '1-833-456-4566',
  India: '9152987821',
  Australia: '13 11 14',
  Default: '988'
};

function detectCrisis(text) {
  const lowerText = text.toLowerCase();
  let riskLevel = 'low';
  let detectedKeywords = [];

  crisisKeywords.forEach(keyword => {
    if (lowerText.includes(keyword)) {
      detectedKeywords.push(keyword);
      riskLevel = 'high';
    }
  });

  return {
    isCrisis: riskLevel === 'high',
    riskLevel,
    detectedKeywords,
    timestamp: new Date()
  };
}

function getHelplineForRegion(region) {
  return helplineNumbers[region] || helplineNumbers.Default;
}

function generateCrisisResponse(region = 'Default') {
  const helpline = getHelplineForRegion(region);
  return {
    message: 'I can see you are struggling deeply, and I want you to know: you do not have to go through this alone. Professional support can help.',
    emergencyContacts: {
      helpline: helpline,
      text: 'Text 988 to reach the Suicide & Crisis Lifeline',
      crisis: 'Text HOME to 741741 for the Crisis Text Line',
      emergency: 'Call 911 if you are in immediate danger'
    },
    resources: [
      { name: 'National Suicide Prevention Lifeline', url: 'https://suicidepreventionlifeline.org' },
      { name: 'Crisis Text Line', url: 'https://www.crisistextline.org' },
      { name: 'SAMHSA National Helpline', url: 'https://www.samhsa.gov/find-help/helpline' }
    ]
  };
}

module.exports = {
  detectCrisis,
  getHelplineForRegion,
  generateCrisisResponse
};
