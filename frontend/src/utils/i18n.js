// Internationalization (i18n) module for AURA
// Supports: English (en), Spanish (es), French (fr)

const translations = {
  en: {
    // Auth/Onboarding
    appName: 'Aura',
    appSubtitle: 'Your Mental Health Companion',
    privacyNotice: '✓ Everything stays private. Zero data collection.',
    yourNickname: 'Your Nickname',
    nicknamePlaceholder: 'e.g., Student1',
    chooseAvatar: 'Choose Your Avatar',
    selected: 'Selected',
    language: 'Language',
    letsGetStarted: "Let's Get Started",
    gettingStarted: 'Getting Started...',
    noEmailNeeded: 'No email needed',
    noEmailNeededDesc: 'Just a nickname to get started',
    completelyAnonymous: 'Completely anonymous',
    completelyAnonymousDesc: 'Your privacy is our priority',
    
    // Chat
    chatTitle: 'Mental Health Companion Chat',
    startConversation: 'Start a conversation with your Mental Health Companion',
    shareHowYouFeel: 'Share how you\'re feeling, and we\'ll provide support and coping strategies',
    typeMessage: 'Type your message... (Remember, I\'m here to listen)',
    send: 'Send',
    sending: 'Sending...',
    suggestedCopingStrategies: 'Suggested Coping Strategies:',
    
    // Crisis Support
    crisisSupport: '🆘 Crisis Support Available',
    crisisMessage: 'I can see you\'re struggling deeply, and I want you to know: you do not have to go through this alone. Professional support can help.',
    emergencyContacts: '📞 Emergency Contacts',
    nationalHelpline: 'National Helpline:',
    crisisTextLine: 'Crisis Text Line:',
    textHome: 'Text HOME to 741741',
    immediateDanger: 'Immediate Danger:',
    professionalResources: '🔗 Professional Resources',
    nationalSuicidePreventionLifeline: 'National Suicide Prevention Lifeline',
    crisisTextLineName: 'Crisis Text Line',
    samhsaNationalHelpline: 'SAMHSA National Helpline',
    importantNote: 'Important',
    importantNoteText: 'If you are in immediate danger, please call 911 or go to your nearest emergency room. You deserve support and help is available right now.',
    iamSafe: 'I\'m Safe, Take Me Back',
    minimize: 'Minimize',
    
    // Mood Tracking
    moodTracker: 'Mood Tracker',
    dailyMoodEntry: 'Daily Mood Entry',
    howAreYouFeeling: 'How are you feeling today?',
    moodIntensity: 'Mood Intensity',
    notes: 'Notes (Optional)',
    saveMood: 'Save Mood',
    emotions: 'Emotions',
    activities: 'Activities',
    triggers: 'Triggers',
    copingStrategies: 'Coping Strategies',
    sleepQuality: 'Sleep Quality',
    physicalActivity: 'Physical Activity',
    mealTimes: 'Meal Times',
    
    // Dashboard
    dashboard: 'Your Mental Health Dashboard',
    lastSevenDays: 'Last 7 days',
    lastThirtyDays: 'Last 30 days',
    totalChats: 'Total Chats',
    totalMoodEntries: 'Total Mood Entries',
    averageMood: 'Average Mood',
    crisisSessions: 'Crisis Sessions',
    emotionPatterns: 'Emotion Patterns (Last 7 Days)',
    mostEffectiveStrategies: 'Most Effective Coping Strategies',
    strategy: 'Strategy',
    timesUsed: 'Times Used',
    avgMoodAfter: 'Avg Mood After',
    effectiveness: 'Effectiveness',
    crisisAlertInfo: 'Crisis Support Sessions',
    hadCrisisSessions: 'You\'ve had {count} session(s) where we detected potential crisis indicators.',
    crisisReminder: 'Remember: If you\'re ever in crisis, please reach out to local emergency services or crisis hotlines immediately.',
    
    // Validation Responses
    validationHappy: 'I\'m glad you\'re feeling good right now.',
    validationSad: 'I hear your sadness, and it\'s completely valid to feel this way.',
    validationAnxious: 'Your anxiety is valid. Many people experience these feelings.',
    validationAngry: 'It makes sense that you\'re feeling angry about this.',
    validationOverwhelmed: 'It\'s okay to feel overwhelmed. You\'re not alone.',
    validationConfused: 'Feeling confused is a normal response to uncertainty.',
    validationGrateful: 'It\'s beautiful that you\'re feeling grateful.',
    validationCalm: 'I\'m glad you\'re feeling calm right now.',
    
    // Coping Suggestions
    copingHappy: 'Keep riding this wave. Notice what\'s making you feel this way.',
    copingSad: 'Try some gentle self-care today—journaling, a walk, or reaching out to someone you trust.',
    copingAnxious: 'Let\'s try a grounding technique: name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.',
    copingAngry: 'Channel this energy into something productive. Sometimes movement helps—exercise, art, or writing.',
    copingOverwhelmed: 'Pick just one small thing to tackle first. Breaking it down makes it manageable.',
    copingConfused: 'It\'s okay not to have all the answers right now. What feels most pressing to you?',
    copingGrateful: 'Hold onto this feeling. What specifically are you grateful for?',
    copingCalm: 'This is a great moment. What brought you here? What can you maintain this feeling?',
  },
  
  es: {
    // Auth/Onboarding
    appName: 'Aura',
    appSubtitle: 'Tu Compañero de Salud Mental',
    privacyNotice: '✓ Todo es privado. Sin recopilación de datos.',
    yourNickname: 'Tu Apodo',
    nicknamePlaceholder: 'p.ej., Estudiante1',
    chooseAvatar: 'Elige Tu Avatar',
    selected: 'Seleccionado',
    language: 'Idioma',
    letsGetStarted: 'Empecemos',
    gettingStarted: 'Empezando...',
    noEmailNeeded: 'No se necesita correo',
    noEmailNeededDesc: 'Solo un apodo para empezar',
    completelyAnonymous: 'Completamente anónimo',
    completelyAnonymousDesc: 'Tu privacidad es nuestra prioridad',
    
    // Chat
    chatTitle: 'Chat de Compañero de Salud Mental',
    startConversation: 'Comienza una conversación con tu Compañero de Salud Mental',
    shareHowYouFeel: 'Comparte cómo te sientes, y te proporcionaremos apoyo y estrategias de afrontamiento',
    typeMessage: 'Escribe tu mensaje... (Recuerda, estoy aquí para escucharte)',
    send: 'Enviar',
    sending: 'Enviando...',
    suggestedCopingStrategies: 'Estrategias de Afrontamiento Sugeridas:',
    
    // Crisis Support
    crisisSupport: '🆘 Apoyo en Crisis Disponible',
    crisisMessage: 'Veo que estás luchando profundamente, y quiero que sepas: no tienes que pasar por esto solo. El apoyo profesional puede ayudar.',
    emergencyContacts: '📞 Contactos de Emergencia',
    nationalHelpline: 'Línea de Ayuda Nacional:',
    crisisTextLine: 'Línea de Texto de Crisis:',
    textHome: 'Envía HOME al 741741',
    immediateDanger: 'Peligro Inmediato:',
    professionalResources: '🔗 Recursos Profesionales',
    nationalSuicidePreventionLifeline: 'Línea Nacional de Prevención del Suicidio',
    crisisTextLineName: 'Línea de Texto de Crisis',
    samhsaNationalHelpline: 'Línea Nacional SAMHSA',
    importantNote: 'Importante',
    importantNoteText: 'Si estás en peligro inmediato, por favor llama al 911 o ve a la sala de emergencias más cercana. Te mereces apoyo y hoy hay ayuda disponible.',
    iamSafe: 'Estoy Seguro, Llévame Atrás',
    minimize: 'Minimizar',
    
    // Mood Tracking
    moodTracker: 'Rastreador de Estado de Ánimo',
    dailyMoodEntry: 'Entrada Diaria de Estado de Ánimo',
    howAreYouFeeling: '¿Cómo te estás sintiendo hoy?',
    moodIntensity: 'Intensidad del Estado de Ánimo',
    notes: 'Notas (Opcional)',
    saveMood: 'Guardar Estado de Ánimo',
    emotions: 'Emociones',
    activities: 'Actividades',
    triggers: 'Desencadenantes',
    copingStrategies: 'Estrategias de Afrontamiento',
    sleepQuality: 'Calidad del Sueño',
    physicalActivity: 'Actividad Física',
    mealTimes: 'Horarios de Comidas',
    
    // Dashboard
    dashboard: 'Tu Panel de Salud Mental',
    lastSevenDays: 'Últimos 7 días',
    lastThirtyDays: 'Últimos 30 días',
    totalChats: 'Chats Totales',
    totalMoodEntries: 'Entradas de Estado de Ánimo Totales',
    averageMood: 'Estado de Ánimo Promedio',
    crisisSessions: 'Sesiones de Crisis',
    emotionPatterns: 'Patrones de Emociones (Últimos 7 Días)',
    mostEffectiveStrategies: 'Estrategias de Afrontamiento Más Efectivas',
    strategy: 'Estrategia',
    timesUsed: 'Veces Utilizado',
    avgMoodAfter: 'Estado de Ánimo Promedio Después',
    effectiveness: 'Efectividad',
    crisisAlertInfo: 'Sesiones de Apoyo en Crisis',
    hadCrisisSessions: 'Has tenido {count} sesión(es) donde detectamos posibles indicadores de crisis.',
    crisisReminder: 'Recuerda: Si alguna vez estás en crisis, comunícate con los servicios de emergencia locales o líneas de crisis inmediatamente.',
  },
  
  fr: {
    // Auth/Onboarding
    appName: 'Aura',
    appSubtitle: 'Votre Compagnon de Santé Mentale',
    privacyNotice: '✓ Tout est confidentiel. Zéro collecte de données.',
    yourNickname: 'Votre Surnom',
    nicknamePlaceholder: 'ex. Étudiant1',
    chooseAvatar: 'Choisissez Votre Avatar',
    selected: 'Sélectionné',
    language: 'Langue',
    letsGetStarted: 'Commençons',
    gettingStarted: 'Démarrage...',
    noEmailNeeded: 'Pas de courriel requis',
    noEmailNeededDesc: 'Juste un surnom pour commencer',
    completelyAnonymous: 'Complètement anonyme',
    completelyAnonymousDesc: 'Votre confidentialité est notre priorité',
    
    // Chat
    chatTitle: 'Chat du Compagnon de Santé Mentale',
    startConversation: 'Commencez une conversation avec votre Compagnon de Santé Mentale',
    shareHowYouFeel: 'Partagez comment vous vous sentez, et nous vous fournirons du soutien et des stratégies d\'adaptation',
    typeMessage: 'Tapez votre message... (Rappelez-vous, je suis là pour vous écouter)',
    send: 'Envoyer',
    sending: 'Envoi...',
    suggestedCopingStrategies: 'Stratégies d\'Adaptation Suggérées:',
    
    // Crisis Support
    crisisSupport: '🆘 Support de Crise Disponible',
    crisisMessage: 'Je vois que vous traversez une période difficile, et je veux que vous sachiez: vous n\'avez pas à affronter cela seul. L\'aide professionnelle peut aider.',
    emergencyContacts: '📞 Contacts d\'Urgence',
    nationalHelpline: 'Ligne d\'Écoute Nationale:',
    crisisTextLine: 'Ligne de Crise par Texte:',
    textHome: 'Envoyez HOME au 741741',
    immediateDanger: 'Danger Immédiat:',
    professionalResources: '🔗 Ressources Professionnelles',
    nationalSuicidePreventionLifeline: 'Ligne Nationale de Prévention du Suicide',
    crisisTextLineName: 'Ligne de Crise par Texte',
    samhsaNationalHelpline: 'Ligne Nationale SAMHSA',
    importantNote: 'Important',
    importantNoteText: 'Si vous êtes en danger immédiat, appelez le 15 ou allez aux urgences les plus proches. Vous méritez du soutien et de l\'aide est disponible maintenant.',
    iamSafe: 'Je Suis Sûr, Ramenez-moi',
    minimize: 'Minimiser',
    
    // Mood Tracking
    moodTracker: 'Suivi de l\'Humeur',
    dailyMoodEntry: 'Entrée Quotidienne d\'Humeur',
    howAreYouFeeling: 'Comment vous sentez-vous aujourd\'hui?',
    moodIntensity: 'Intensité de l\'Humeur',
    notes: 'Remarques (Facultatif)',
    saveMood: 'Enregistrer l\'Humeur',
    emotions: 'Émotions',
    activities: 'Activités',
    triggers: 'Déclencheurs',
    copingStrategies: 'Stratégies d\'Adaptation',
    sleepQuality: 'Qualité du Sommeil',
    physicalActivity: 'Activité Physique',
    mealTimes: 'Horaires des Repas',
    
    // Dashboard
    dashboard: 'Votre Tableau de Bord de Santé Mentale',
    lastSevenDays: '7 derniers jours',
    lastThirtyDays: '30 derniers jours',
    totalChats: 'Chats Totaux',
    totalMoodEntries: 'Entrées d\'Humeur Totales',
    averageMood: 'Humeur Moyenne',
    crisisSessions: 'Sessions de Crise',
    emotionPatterns: 'Modèles d\'Émotions (7 derniers jours)',
    mostEffectiveStrategies: 'Stratégies d\'Adaptation les Plus Efficaces',
    strategy: 'Stratégie',
    timesUsed: 'Fois Utilisé',
    avgMoodAfter: 'Humeur Moyenne Après',
    effectiveness: 'Efficacité',
    crisisAlertInfo: 'Sessions de Support de Crise',
    hadCrisisSessions: 'Vous avez eu {count} séance(s) où nous avons détecté des indicateurs potentiels de crise.',
    crisisReminder: 'Rappelez-vous: Si vous êtes jamais en crise, veuillez contacter immédiatement les services d\'urgence locaux ou les lignes de crise.',
  }
};

// Get current language from localStorage or default to English
function getLanguage() {
  const store = typeof window !== 'undefined' ? localStorage.getItem('language') : null;
  return store || 'en';
}

// Set language to localStorage
function setLanguage(lang) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', lang);
  }
}

// Get translation string
function t(key, lang = null) {
  const currentLang = lang || getLanguage();
  const langTranslations = translations[currentLang] || translations.en;
  return langTranslations[key] || translations.en[key] || key;
}

// Get all translations for a language
function getTranslations(lang = null) {
  const currentLang = lang || getLanguage();
  return translations[currentLang] || translations.en;
}

// Format string with variables (e.g., "Had {count} sessions" → "Had 5 sessions")
function format(template, variables = {}) {
  let result = template;
  Object.keys(variables).forEach(key => {
    result = result.replace(`{${key}}`, variables[key]);
  });
  return result;
}

// Export functions
export const i18n = {
  t,
  getLanguage,
  setLanguage,
  getTranslations,
  format,
  translations,
  availableLanguages: {
    en: 'English',
    es: 'Español',
    fr: 'Français'
  }
};

export default i18n;
