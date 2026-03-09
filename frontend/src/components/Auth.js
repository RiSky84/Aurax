import React, { useState } from 'react';
import '../styles/Auth.css';

function Auth({ onAuth }) {
  const [nickname, setNickname] = useState('');
  const [avatar, setAvatar] = useState('😊');
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const avatarOptions = ['😊', '😌', '🙂', '😎', '🥰', '😴', '🤗', '😍', '🧘', '💪', '🌟', '✨'];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!nickname.trim()) {
      setError('Please enter a nickname');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Create anonymous user (no backend authentication needed)
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        nickname: nickname,
        avatar: avatar,
        language: language,
        fullName: nickname
      };

      // Store in localStorage
      localStorage.setItem('token', 'anon-token-' + user.id);
      localStorage.setItem('user', JSON.stringify(user));
      
      setTimeout(() => {
        onAuth(user);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h1>🧠 Aura</h1>
          <p className="subtitle">Your Mental Health Companion</p>
          <p className="privacy-notice">✓ Everything stays private. Zero data collection.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="nickname">Your Nickname</label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="e.g., Student1"
              disabled={loading}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Choose Your Avatar</label>
            <div className="avatar-picker">
              {avatarOptions.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  className={`avatar-btn ${avatar === emoji ? 'selected' : ''}`}
                  onClick={() => setAvatar(emoji)}
                  disabled={loading}
                  title={emoji}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <div className="selected-avatar">Selected: {avatar}</div>
          </div>

          <div className="form-group">
            <label htmlFor="language">Language</label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              disabled={loading}
              className="form-select"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="submit-btn"
          >
            {loading ? 'Getting Started...' : "Let's Get Started"}
          </button>
        </form>

        <div className="auth-info">
          <p className="info-text">
            <strong>No email needed</strong> - Just a nickname to get started
          </p>
          <p className="info-text">
            <strong>Completely anonymous</strong> - Your privacy is our priority
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
