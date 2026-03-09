# AI Mental Health Companion Application

## 🧠 Overview
An AI-powered mental health companion application designed for students. This application provides:

- **Conversational AI Chatbot**: Empathetic support using CBT-based techniques
- **Mood Tracking**: Daily mood logging with detailed health indicators
- **Emotion Analysis**: Real-time emotion detection and sentiment analysis
- **Crisis Detection**: Automatic detection of crisis indicators with emergency resources
- **Coping Strategies**: Personalized recommendations based on mood and emotions
- **Analytics Dashboard**: Visualization of mood trends and coping effectiveness
- **Multilingual Support**: Support for students across different regions

## ✨ Key Features

### 1. **Conversational AI Chatbot**
- Empathetic responses using CBT-based techniques
- Real-time emotion analysis during conversations
- Distress level assessment
- Crisis indicator detection

### 2. **Mood Tracker**
- 5-point mood scale with emoji indicators
- Emotion tracking (happy, sad, anxious, angry, etc.)
- Activity logging
- Trigger identification
- Coping strategy tracking
- Sleep quality and physical activity monitoring

### 3. **Mental Health Analytics**
- Mood trends visualization
- Emotion pattern analysis
- Coping strategy effectiveness metrics
- Health indicator tracking (sleep, meals, exercise)
- Engagement scoring

### 4. **Crisis Management**
- Automatic crisis keyword detection
- Immediate emergency resources
- Regional helpline information
- Emergency contact recommendations

## 🏗️ Project Structure

```
MentalHealthApp/
├── backend/
│   ├── server.js                 # Express server setup
│   ├── package.json
│   ├── .env.example
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Conversation.js       # Chat conversations
│   │   └── MoodEntry.js          # Mood tracking
│   ├── routes/
│   │   ├── auth.js               # Authentication
│   │   ├── chat.js               # Chat endpoint
│   │   ├── mood.js               # Mood tracking
│   │   └── analytics.js          # Analytics & dashboard
│   ├── controllers/
│   └── utils/
│       ├── emotionAnalyzer.js    # Emotion detection
│       ├── crisisDetector.js     # Crisis detection
│       └── copingStrategies.js   # Strategy suggestions
├── frontend/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js                # Main app component
│       ├── index.js
│       ├── components/
│       │   ├── Auth.js           # Login/Register
│       │   ├── ChatComponent.js  # Chat interface
│       │   ├── MoodTracker.js    # Mood tracking
│       │   └── Dashboard.js      # Analytics dashboard
│       ├── utils/
│       │   └── api.js            # API client
│       └── styles/
│           ├── index.css
│           ├── Auth.css
│           ├── ChatComponent.css
│           ├── MoodTracker.css
│           └── Dashboard.css
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Backend Setup

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start the backend server**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```
   Application will open on `http://localhost:3000`

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Chat
- `POST /api/chat/message` - Send message and get bot response
- `GET /api/chat/history/:conversationId` - Get conversation history

### Mood Tracking
- `POST /api/mood/entry` - Save mood entry
- `GET /api/mood/history/:userId` - Get mood history
- `GET /api/mood/analytics/:userId` - Get mood analytics

### Analytics
- `GET /api/analytics/dashboard/:userId` - Get dashboard data
- `GET /api/analytics/emotions/:userId` - Get emotion trends
- `GET /api/analytics/strategies/:userId` - Get strategy effectiveness

## 🧪 Testing the Application

### Test User Credentials
You can register with any email/password combination, or use:
- Email: `test@example.com`
- Password: `password123`

### Test Crisis Detection
Try sending messages containing keywords like:
- "suicide"
- "want to die"
- "kill myself"
- "self-harm"

The system will trigger crisis alerts with emergency resources.

## 🛡️ Compliance & Safety

- **HIPAA Ready**: User data privacy considerations
- **Crisis Resources**: Real emergency helpline integrations
- **Ethical AI**: CBT-based, evidence-supported approaches
- **Data Security**: JWT authentication and encrypted passwords

## 📊 Supported Emotions

- Happy
- Sad
- Anxious
- Angry
- Calm
- Overwhelmed
- Confused
- Grateful
- Neutral

## 🌍 Supported Regions & Helplines

- **US**: 1-800-273-8255 (Suicide & Crisis Lifeline)
- **UK**: 116 123
- **Canada**: 1-833-456-4566
- **India**: 9152987821
- **Australia**: 13 11 14

## 📱 Features Demo

### Chat Interface
- Start a conversation by typing your feelings
- Receive empathetic, evidence-based responses
- Get real-time emotion analysis
- Receive personalized coping strategies

### Mood Tracker
- Log daily mood with emoji scale
- Track activities, sleep, and meals
- Identify triggers and coping mechanisms
- Monitor overall wellbeing

### Dashboard
- View mood trends over time
- Analyze emotion patterns
- See which coping strategies work best
- Track engagement and progress

## 🔧 Future Enhancements

- Integration with OpenAI GPT for advanced NLP
- Video call counseling integration
- Push notifications for daily check-ins
- Community support features
- Integration with fitness trackers
- Advanced ML models for prediction
- Multi-language support expansion

## 📄 License

This project is created for educational and mental health support purposes.

## ⚠️ Important Notice

**This application is NOT a replacement for professional mental health services.**

If you are in crisis or experiencing suicidal thoughts, please:
1. **Call emergency services** (911 in US)
2. **Contact the Suicide & Crisis Lifeline**: 988 (US)
3. **Text HOME to 741741** for Crisis Text Line
4. **Reach out to a trusted mental health professional**

## 👨‍💻 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support and questions, please reach out to the development team.

---

**Remember: Your mental health matters. You are not alone. 💜**
