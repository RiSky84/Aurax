import React, { useState } from 'react';
import ChatComponent from './components/ChatComponent';
import MoodTracker from './components/MoodTracker';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import './styles/App.css';

function App() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [activeTab, setActiveTab] = useState('chat');

  const handleAuth = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (!user) {
    return <Auth onAuth={handleAuth} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🧠 Mental Health Companion</h1>
          <div className="user-info">
            <span className="username">Welcome, {user.fullName || user.username}!</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <nav className="app-nav">
        <button
          className={`nav-btn ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          💬 Chat
        </button>
        <button
          className={`nav-btn ${activeTab === 'mood' ? 'active' : ''}`}
          onClick={() => setActiveTab('mood')}
        >
          📊 Mood Tracker
        </button>
        <button
          className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📈 Dashboard
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'chat' && <ChatComponent userId={user.id} />}
        {activeTab === 'mood' && <MoodTracker userId={user.id} />}
        {activeTab === 'dashboard' && <Dashboard userId={user.id} />}
      </main>
    </div>
  );
}

export default App;
