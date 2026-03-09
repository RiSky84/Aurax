import React, { useState } from 'react';
import { moodAPI } from '../utils/api';
import '../styles/MoodTracker.css';

function MoodTracker({ userId }) {
  const [moodScore, setMoodScore] = useState(3);
  const [emotion, setEmotion] = useState({ primary: 'neutral', secondary: [] });
  const [notes, setNotes] = useState('');
  const [activities, setActivities] = useState([]);
  const [triggers, setTriggers] = useState([]);
  const [copingStrategies, setCopingStrategies] = useState([]);
  const [sleepQuality, setSleepQuality] = useState(3);
  const [physicalActivity, setPhysicalActivity] = useState(false);
  const [mealTimes, setMealTimes] = useState(3);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const emotions = ['happy', 'sad', 'anxious', 'angry', 'calm', 'neutral', 'overwhelmed', 'confused', 'grateful'];
  const activityOptions = ['Work/Study', 'Exercise', 'Social time', 'Hobby', 'Rest', 'Meditation', 'Reading'];
  const triggerOptions = ['Work stress', 'Personal relationships', 'Health concerns', 'Financial stress', 'Sleep deprivation', 'Social pressure'];
  const strategyOptions = ['Breathing exercises', 'Exercise', 'Talking to someone', 'Journaling', 'Meditation', 'Hobby engagement', 'Distraction techniques'];

  const handleToggleArray = (item, array, setter) => {
    if (array.includes(item)) {
      setter(array.filter(i => i !== item));
    } else {
      setter([...array, item]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await moodAPI.saveMoodEntry(userId, {
        moodScore: parseInt(moodScore),
        emotion: {
          primary: emotion.primary,
          secondary: emotion.secondary
        },
        activities,
        notes,
        triggers,
        copingStrategiesUsed: copingStrategies,
        sleepQuality: parseInt(sleepQuality),
        physicalActivity,
        mealTimes: parseInt(mealTimes)
      });

      setSuccess(true);
      setMoodScore(3);
      setEmotion({ primary: 'neutral', secondary: [] });
      setNotes('');
      setActivities([]);
      setTriggers([]);
      setCopingStrategies([]);
      setSleepQuality(3);
      setPhysicalActivity(false);
      setMealTimes(3);

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving mood entry:', error);
      alert('Failed to save mood entry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mood-tracker-container">
      <h2>Daily Mood Tracker</h2>
      
      {success && <div className="success-message">✅ Mood entry saved successfully!</div>}

      <form onSubmit={handleSubmit} className="mood-form">
        {/* Mood Score */}
        <div className="form-group">
          <label>How are you feeling today?</label>
          <div className="mood-scale">
            {[1, 2, 3, 4, 5].map(score => (
              <button
                key={score}
                type="button"
                className={`mood-button ${moodScore === score ? 'active' : ''}`}
                onClick={() => setMoodScore(score)}
              >
                {score === 1 && '😢'}
                {score === 2 && '😟'}
                {score === 3 && '😐'}
                {score === 4 && '🙂'}
                {score === 5 && '😊'}
                <span>{['Very Bad', 'Bad', 'Okay', 'Good', 'Excellent'][score - 1]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Primary Emotion */}
        <div className="form-group">
          <label>Primary Emotion</label>
          <select
            value={emotion.primary}
            onChange={(e) => setEmotion({ ...emotion, primary: e.target.value })}
          >
            {emotions.map(em => (
              <option key={em} value={em}>{em.charAt(0).toUpperCase() + em.slice(1)}</option>
            ))}
          </select>
        </div>

        {/* Activities */}
        <div className="form-group">
          <label>Activities Today</label>
          <div className="checkbox-group">
            {activityOptions.map(activity => (
              <label key={activity} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={activities.includes(activity)}
                  onChange={() => handleToggleArray(activity, activities, setActivities)}
                />
                {activity}
              </label>
            ))}
          </div>
        </div>

        {/* Triggers */}
        <div className="form-group">
          <label>Triggers/Stressors</label>
          <div className="checkbox-group">
            {triggerOptions.map(trigger => (
              <label key={trigger} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={triggers.includes(trigger)}
                  onChange={() => handleToggleArray(trigger, triggers, setTriggers)}
                />
                {trigger}
              </label>
            ))}
          </div>
        </div>

        {/* Coping Strategies */}
        <div className="form-group">
          <label>Coping Strategies Used</label>
          <div className="checkbox-group">
            {strategyOptions.map(strategy => (
              <label key={strategy} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={copingStrategies.includes(strategy)}
                  onChange={() => handleToggleArray(strategy, copingStrategies, setCopingStrategies)}
                />
                {strategy}
              </label>
            ))}
          </div>
        </div>

        {/* Sleep Quality */}
        <div className="form-group">
          <label>Sleep Quality Last Night (1-5)</label>
          <input
            type="range"
            min="1"
            max="5"
            value={sleepQuality}
            onChange={(e) => setSleepQuality(e.target.value)}
          />
          <span className="range-value">{sleepQuality}/5</span>
        </div>

        {/* Physical Activity */}
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={physicalActivity}
              onChange={(e) => setPhysicalActivity(e.target.checked)}
            />
            I engaged in physical activity today
          </label>
        </div>

        {/* Meal Times */}
        <div className="form-group">
          <label>Number of Meals Today</label>
          <input
            type="number"
            min="0"
            max="6"
            value={mealTimes}
            onChange={(e) => setMealTimes(e.target.value)}
          />
        </div>

        {/* Notes */}
        <div className="form-group">
          <label>Additional Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write anything you'd like to remember about today..."
            rows="4"
          />
        </div>

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Saving...' : 'Save Mood Entry'}
        </button>
      </form>
    </div>
  );
}

export default MoodTracker;
