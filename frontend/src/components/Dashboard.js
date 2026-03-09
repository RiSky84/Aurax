import React, { useState, useEffect } from 'react';
import { analyticsAPI } from '../utils/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/Dashboard.css';

function Dashboard({ userId }) {
  const [dashboard, setDashboard] = useState(null);
  const [moodTrend, setMoodTrend] = useState([]);
  const [emotionTrends, setEmotionTrends] = useState({});
  const [strategies, setStrategies] = useState({});
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const [dashboardRes, emotionRes, strategiesRes] = await Promise.all([
          analyticsAPI.getDashboard(userId, days),
          analyticsAPI.getEmotionTrends(userId, 7),
          analyticsAPI.getStrategiesEffectiveness(userId, days)
        ]);

        setDashboard(dashboardRes.data);
        setEmotionTrends(emotionRes.data.chartData);
        setStrategies(strategiesRes.data.strategies);

        if (dashboardRes.data.moodTrend) {
          setMoodTrend(dashboardRes.data.moodTrend);
        }
      } catch (error) {
        console.error('Error loading dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [days, userId]);

  if (loading) return <div className="dashboard-container"><p>Loading dashboard...</p></div>;
  if (!dashboard) return <div className="dashboard-container"><p>Unable to load dashboard</p></div>;

  return (
    <div className="dashboard-container">
      <h1>Your Mental Health Dashboard</h1>

      {/* Time Period Selection */}
      <div className="time-period-selector">
        <button className={days === 7 ? 'active' : ''} onClick={() => setDays(7)}>Last 7 days</button>
        <button className={days === 30 ? 'active' : ''} onClick={() => setDays(30)}>Last 30 days</button>
        <button className={days === 90 ? 'active' : ''} onClick={() => setDays(90)}>Last 90 days</button>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Chats</h3>
          <p className="stat-value">{dashboard.statistics.totalChats}</p>
          <span className="stat-label">conversations with your companion</span>
        </div>
        <div className="stat-card">
          <h3>Mood Entries</h3>
          <p className="stat-value">{dashboard.statistics.totalMoodEntries}</p>
          <span className="stat-label">mood tracking entries</span>
        </div>
        <div className="stat-card">
          <h3>Average Mood</h3>
          <p className="stat-value">{dashboard.statistics.averageMood}/5</p>
          <span className="stat-label">overall wellbeing</span>
        </div>
        <div className="stat-card">
          <h3>Engagement Score</h3>
          <p className="stat-value">{dashboard.engagementScore}%</p>
          <span className="stat-label">your app engagement</span>
        </div>
      </div>

      {/* Mood Trend Chart */}
      {moodTrend.length > 0 && (
        <div className="chart-container">
          <h2>Mood Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={moodTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[1, 5]} />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="mood" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                name="Daily Mood Score"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Emotions Overview */}
      {Object.keys(emotionTrends).length > 0 && (
        <div className="chart-container">
          <h2>Emotion Patterns (Last 7 Days)</h2>
          <div className="emotions-grid">
            {Object.entries(emotionTrends).map(([date, emotions]) => (
              <div key={date} className="emotion-day">
                <span className="date">{date}</span>
                <div className="emotions">
                  {Object.entries(emotions).map(([emotion, count]) => (
                    <span key={emotion} className="emotion-badge" title={emotion}>
                      {count}x {emotion}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Coping Strategies Effectiveness */}
      {Object.keys(strategies).length > 0 && (
        <div className="chart-container">
          <h2>Most Effective Coping Strategies</h2>
          <div className="strategies-table">
            <table>
              <thead>
                <tr>
                  <th>Strategy</th>
                  <th>Times Used</th>
                  <th>Avg Mood After</th>
                  <th>Effectiveness</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(strategies)
                  .sort((a, b) => b[1].avgMood - a[1].avgMood)
                  .slice(0, 5)
                  .map(([strategy, data]) => (
                    <tr key={strategy}>
                      <td>{strategy}</td>
                      <td>{data.usage}</td>
                      <td>{data.avgMood}/5</td>
                      <td>
                        <div className="effectiveness-bar">
                          <div 
                            className="effectiveness-fill"
                            style={{ width: `${(data.avgMood / 5) * 100}%` }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Crisis Alert Info */}
      {dashboard.statistics.crisisSessions > 0 && (
        <div className="alert-card crisis-sessions">
          <h3>Crisis Support Sessions</h3>
          <p>You've had {dashboard.statistics.crisisSessions} session(s) where we detected potential crisis indicators.</p>
          <p><strong>Remember:</strong> If you're ever in crisis, please reach out to local emergency services or crisis hotlines immediately.</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
