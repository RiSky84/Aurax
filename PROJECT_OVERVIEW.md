# 🌿 AURA - AI Mental Health Companion App

**Hackathon Project:** AI-powered mental health companion for students with anonymous onboarding, emotion detection, CBT-based coping strategies, and crisis escalation.

---

## 📋 Project Structure

```
MentalHealthApp/
├── backend/                              # Node.js/Express API
│   ├── server.js                        # Main server entry point
│   ├── package.json                     # Backend dependencies
│   ├── models/
│   │   └── db.js                        # In-memory database (User, Conversation, MoodEntry)
│   ├── routes/
│   │   ├── auth.js                      # POST /register, /login (anonymous entry)
│   │   ├── chat.js                      # POST /message (emotion analysis + crisis detection)
│   │   ├── mood.js                      # POST /entry, GET /history, /analytics
│   │   └── analytics.js                 # GET /dashboard, /emotions, /strategies
│   ├── utils/
│   │   ├── emotionAnalyzer.js           # Sentiment analysis for 8 emotions
│   │   ├── crisisDetector.js            # Crisis keywords → [CRISIS_FLAG_TRIGGERED]
│   │   ├── copingStrategies.js          # 20+ CBT-based coping techniques
│   │   └── i18n.js                      # Multilingual message templates (EN, ES, FR)
│   └── middleware/
│       └── auth.js                      # JWT token validation
│
├── frontend/                             # React 18.2.0 Application
│   ├── public/
│   │   ├── index.html                   # Root HTML
│   │   └── favicon.ico
│   ├── src/
│   │   ├── App.js                       # Main app router
│   │   ├── index.js                     # React entry point
│   │   ├── components/
│   │   │   ├── Auth.js                  # Anonymous onboarding screen
│   │   │   ├── ChatComponent.js         # Main chat interface
│   │   │   ├── MoodTracker.js           # Daily mood entry form
│   │   │   ├── Dashboard.js             # Analytics & emotional trends
│   │   │   ├── CrisisModal.js           # Crisis escalation modal
│   │   │   ├── SOS Button.js            # Persistent SOS button
│   │   │   ├── EmptyStates.js           # Soft onboarding illustrations
│   │   │   └── Header.js                # App navigation & user info
│   │   ├── styles/
│   │   │   ├── index.css                # Global styles + CSS variables
│   │   │   ├── Auth.css                 # Onboarding form styling
│   │   │   ├── ChatComponent.css        # Chat bubble styling
│   │   │   ├── MoodTracker.css          # Mood input form
│   │   │   ├── Dashboard.css            # Mood calendar & heat map
│   │   │   ├── CrisisModal.css          # Crisis modal styling
│   │   │   └── App.css                  # Layout & navigation
│   │   └── utils/
│   │       ├── api.js                   # Axios API client with JWT
│   │       ├── i18n.js                  # Multilingual strings (EN, ES, FR)
│   │       └── moodColors.js            # Emotion → Color mapping
│   ├── package.json                     # Frontend dependencies
│   └── .env.local                       # React app configuration
│
├── package.json                         # Root package.json (concurrently)
├── README.md                            # This file
├── PROJECT_OVERVIEW.md                  # Project structure & features
└── DEPLOYMENT.md                        # Hosting & deployment guide

```

---

## 🎨 Design System

### Color Palette
| Name | Color | Usage |
|------|-------|-------|
| **Background** | `#FAF9F6` | Page background, soft containers |
| **Primary (Sage Green)** | `#8AA182` | Header, nav, AI chat bubbles, primary buttons |
| **Accent (Muted Peach)** | `#F2C5A5` | CTA buttons, highlights, hover states |
| **Text** | `#3A3A3A` | Body text, default typography |
| **Crisis/SOS** | `#D97A6C` | Crisis alerts, emergency button |
| **Success** | `#10b981` | Positive confirmations |
| **Error** | `#ef4444` | Validation errors |

### Typography
- **Headings (H1-H6):** Poppins, 600-700 weight, -0.5px letter-spacing
- **Body Text:** Nunito, 400-600 weight, 1.6 line-height
- **Monospace/Code:** Inter, 400-600 weight

### Spacing System
- **xs:** 0.5rem | **sm:** 0.75rem | **md:** 1rem | **lg:** 1.5rem | **xl:** 2rem
- **Border Radius:** 16px (lg), 12px (md), 8px (sm)
- **Shadows:** Soft (0 2px 8px rgba(58,58,58,0.08)), Medium (0 4px 16px rgba(58,58,58,0.12))

---

## ✨ Core Features

### 1. **Anonymous Onboarding**
✅ No email/phone required
✅ Nickname + Avatar picker (12 emoji options)
✅ Language selection (EN, ES, FR) 
✅ Zero-data privacy reassurance message
✅ Soft form styling with Calm & Safe aesthetic

**Tech:** React form state + in-memory authentication

### 2. **AI Chat Interface**
✅ Empathetic, validation-first responses
✅ CBT-based coping suggestions
✅ Soft, heavily rounded (24px) chat bubbles
- User messages: Sage green background
- AI messages: Soft gray with subtle border
✅ Typing indicator animation (bouncing dots)
✅ Emotion detection in real-time
✅ Suggested strategies below chat

**Tech:** React hooks + Axios API client

### 3. **Emotion Analysis & Mood Tracking**
✅ Detects 8 emotions: happy, sad, anxious, angry, overwhelmed, confused, grateful, calm
✅ Distress level scoring (1-10)
✅ Daily mood entry form with emoji scale
✅ Color-coded mood history calendar (not clinical graphs)

**Tech:** Backend sentiment analysis + Recharts visualization

### 4. **Crisis Detection (Always-On)**
✅ Persistent, warm-terracotta SOS button (bottom-right, fixed)
✅ Backend detects 15+ crisis keywords
✅ Outputs `[CRISIS_FLAG_TRIGGERED]` flag
✅ Frontend catches flag → shows modal with:
  - Empathetic support message
  - Regional helplines (988 US, 116 123 UK, etc.)
  - Crisis Text Line (741741)
  - Emergency contact (911)
  - Links to professional resources

**Tech:** Regex pattern matching + React modal component

### 5. **Interactive Coping Strategies**
✅ 20+ personalized CBT techniques
✅ Emotion-mapped suggestions (anxiety → breathing, anger → exercise)
✅ Displayed below chat in strategy cards
✅ Hover animations & engagement tracking

**Tech:** Strategy database + recommendation algorithm

### 6. **Dashboard & Emotional Trends**
✅ Mood calendar with color-coded dates
✅ Emoji heat map visualization
✅ Weekly mood summary
✅ Top emotions & coping strategy effectiveness
✅ Empty state illustrations with soft messaging

**Tech:** React + Recharts + MoodEntry data

### 7. **Multilingual Support**
✅ English, Spanish, French
✅ Language selection in onboarding
✅ All UI text translated
✅ Backend response customization

**Tech:** i18n.js utility + language context

---

## 🚀 API Endpoints

### Authentication
```
POST /api/auth/register
  { "nickname": "Sarah", "avatar": "😊", "language": "en" }
  → { "token": "JWT...", "user": { "id": "1", "nickname": "Sarah" } }

POST /api/auth/login
  { "nickname": "Sarah", "avatar": "😊" }
  → { "token": "JWT...", "user": { ... } }
```

### Chat
```
POST /api/chat/message
  Headers: Authorization: Bearer JWT
  { "userId": "1", "message": "I'm feeling overwhelmed", "conversationId": "1" }
  → { 
    "botResponse": "I hear you...",
    "emotionAnalysis": { "primaryEmotion": "overwhelmed", "confidence": 0.8 },
    "crisisAlert": null OR { "message": "...", "emergencyContacts": {...} },
    "suggestedStrategies": [...],
    "distressLevel": 8
  }

GET /api/chat/history/:conversationId
```

### Mood
```
POST /api/mood/entry
  { "userId": "1", "emotion": "sad", "intensity": 7, "notes": "..." }

GET /api/mood/history/:userId
  → [{ date, emotion, intensity, notes }, ...]

GET /api/mood/analytics/:userId
  → { weeklyAverage, topEmotions, trends }
```

### Analytics
```
GET /api/analytics/dashboard/:userId
  → { successRateByStrategy, totalSessions, crisisInterventions }
```

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | React | 18.2.0 |
| **Chat State** | React Hooks | - |
| **API Client** | Axios | 1.4.0 |
| **Charts** | Recharts | 2.8.0 |
| **Styling** | CSS + CSS Variables | - |
| **Icons** | React Icons | 4.11.0 |
| **Backend** | Node.js/Express | 14.x / 4.18.x |
| **Database** | In-Memory (Demo) | - |
| **Authentication** | JWT | - |
| **Sentiment Analysis** | Regex Keyword Matching | - |

---

## 🚦 Getting Started

### Prerequisites
- Node.js 14+
- npm or yarn

### Installation
```bash
# Clone repo
git clone <repo-url>
cd MentalHealthApp

# Install all dependencies
npm run install-all

# Start development servers
npm run dev  # Runs backend + frontend concurrently

# Frontend only: http://localhost:3001
# Backend only: http://localhost:5000
```

### Environment Variables
**Backend (.env):**
```
PORT=5000
JWT_SECRET=your-secret-key
NODE_ENV=development
```

**Frontend (.env.local):**
```
REACT_APP_API_URL=http://localhost:5000
```

---

## ✅ Feature Checklist

### Phase 1: Foundation ✅
- [x] Project setup & folder structure
- [x] Color palette & typography defined
- [x] Global CSS variables
- [x] Backend API structure
- [x] In-memory database

### Phase 2: Authentication ✅
- [x] Anonymous registration (nickname + avatar)
- [x] JWT token management
- [x] Protected routes (middleware)
- [x] Privacy reassurances in UI

### Phase 3: Chat Interface ✅
- [x] Chat bubble styling (Sage green & soft gray)
- [x] Typing indicator animation
- [x] Emotion detection in real-time
- [x] Validation-first responses
- [x] CBT-based coping suggestions
- [x] Suggested strategies display

### Phase 4: Crisis Detection ✅
- [x] 15+ crisis keyword detection
- [x] [CRISIS_FLAG_TRIGGERED] output
- [x] Crisis modal with helplines
- [x] Regional resource linking
- [x] SOS button (persistent bottom-right)

### Phase 5: Mood Tracking ✅
- [x] Daily mood entry form
- [x] Emoji mood scale
- [x] Mood history database
- [x] Distress level scoring

### Phase 6: Analytics Dashboard ✅
- [x] Mood calendar (color-coded)
- [x] Emotion trends visualization
- [x] Strategy effectiveness tracking
- [x] Empty state illustrations
- [x] Weekly summaries

### Phase 7: Multilingual Support 🔄
- [ ] i18n context provider
- [ ] Language switcher in header
- [ ] All UI text translated (EN, ES, FR)
- [ ] Backend response customization per language
- [ ] RTL support (future phase)

### Phase 8: Polish & Testing 🔄
- [ ] Cross-browser testing
- [ ] Mobile responsiveness audit
- [ ] Accessibility (WCAG 2.1 AA)
- [ ] Performance optimization
- [ ] Unit tests (Jest)
- [ ] E2E tests (Cypress)

---

## 📱 Component Overview

### Auth.js (Anonymous Onboarding)
```
┌─────────────────────────────────────┐
│         👋 Welcome to Aura          │
│  Your Safe Space for Mental Wellness │
├─────────────────────────────────────┤
│                                     │
│  Nickname: [__________________]     │
│                                     │
│  Pick Your Avatar:                  │
│  😊 😢 😰 😤 😐 🙏 😌 😍 😎 🤔 😴 💭 │
│                                     │
│  Language: [ English ▼ ]            │
│                                     │
│  Privacy: "Everything stays private"│
│           "No data is collected"    │
│                                     │
│        [  Let's Get Started  ]      │
├─────────────────────────────────────┤
│  "This is a completely anonymous   │
│   space. Your mental health matters"│
└─────────────────────────────────────┘
```

### ChatComponent.js (Main Chat)
```
┌──────────────────────────────────────────┐
│           Chat with Aura                 │
├──────────────────────────────────────────┤
│                                          │
│  I'm feeling really anxious about exams │
│  ▼                                       │
│                                          │
│          ◄──────────────────────────    │
│    Your anxiety makes sense. Exams      │
│    can feel overwhelming. Let's use      │
│    a grounding technique: name 5        │
│    things you see, 4 you touch...       │
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ Suggested Coping Strategies:       │  │
│ ├────────────────────────────────────┤  │
│ │ Deep Breathing Exercise            │  │
│ │ │ ███████░░░░ 10 min               │  │
│ │                                    │  │
│ │ Study Break & Hydration            │  │
│ │ │ ░░░░░░░░░░░░ Flexible            │  │
│ └────────────────────────────────────┘  │
│                                          │
│ ┌──────────────────────────────────┐    │
│ │ [Type your message...]      [Send]    │
│ └──────────────────────────────────┘    │
│                                          │
│            🔴 SOS (bottom-right)        │
└──────────────────────────────────────────┘
```

### Dashboard.js (Mood Tracking)
```
┌─────────────────────────────────────────┐
│         Your Emotional Journey          │
├─────────────────────────────────────────┤
│  [Last 7 Days] [Last 30 Days] [All]    │
│                                         │
│  📅 Mood Calendar:                      │
│  M  T  W  T  F  S  S                    │
│  😊 😊 😢 😐 😢 😤 😌  (color-coded)  │
│  😌 😌 😢 😓 😰 😌 😊                  │
│                                         │
│  📊 Weekly Mood Summary:                │
│  Predominant: Calm (35%)                │
│  Challenging: Anxious (28%)             │
│                                         │
│  🎯 Most Effective Strategies:          │
│  1. Deep Breathing (92% helpful)        │
│  2. Nature Walk (88% helpful)           │
│  3. Journaling (85% helpful)            │
└─────────────────────────────────────────┘
```

---

## 🔐 Security & Privacy

✅ **Anonymous by Design:** No email/phone collection
✅ **JWT Tokens:** Stateless, secure authentication
✅ **HTTPS Ready:** Deploy with SSL/TLS
✅ **No External APIs:** In-memory for demo (upgrade to secure DB in production)
✅ **Privacy Policy:** "Everything stays private" messaging throughout
✅ **Data Minimization:** Only collect nickname + avatar + chat history

---

## 📊 Emotion Detection

**8-Emotion Model:**
| Emotion | Keywords | Distress Level |
|---------|----------|===============|
| Anxious | worried, nervous, panic, stressed | 8 |
| Angry | furious, annoy, rage, bitter | 7 |
| Sad | lonely, depressed, hurt, empty | 6 |
| Overwhelmed | exhausted, drowning, swamped | 9 |
| Confused | unsure, lost, unclear | 5 |
| Calm | peace, serene, composed | 2 |
| Happy | excited, joyful, amazing | 1 |
| Grateful | thankful, blessed, appreciate | 1 |

---

## 🚨 Crisis Detection

**Trigger Keywords (15+):**
```
suicide, kill myself, end my life, want to die, harm myself,
self-harm, cutting, overdose, jump off, hang myself, hopeless,
desperate, no point in living, everyone would be better off,
burden
```

**Action:**
1. Backend outputs `[CRISIS_FLAG_TRIGGERED]`
2. Frontend catches flag in response
3. Show crisis modal with:
   - Empathetic validation
   - National Suicide Prevention Lifeline (988)
   - Crisis Text Line (741741)
   - Emergency numbers (911)
   - Links to SAMHSA & crisis resources

---

## 🎯 Next Steps for Hackathon

1. **Deploy to Vercel (Frontend) + Heroku (Backend)**
2. **Add real database (MongoDB or PostgreSQL)**
3. **Implement real NLP for emotion detection (TensorFlow.js)**
4. **Add video call integration with licensed therapists (optional)**
5. **Implement push notifications for daily check-ins**
6. **Add multilingual speech support**
7. **Create mobile app (React Native)**

---

## 📝 License

MIT License - Feel free to use for hackathon submission

---

## 🙋 Support

For questions or issues, reach out to the development team at: **support@auramentalhealth.com**

---

**Made with ❤️ for Mental Wellness**
