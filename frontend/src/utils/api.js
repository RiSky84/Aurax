import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (username, email, password, fullName) =>
    apiClient.post('/auth/register', { username, email, password, fullName }),
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password })
};

export const chatAPI = {
  sendMessage: (userId, message, conversationId, region) =>
    apiClient.post('/chat/message', { userId, message, conversationId, region }),
  getConversationHistory: (conversationId) =>
    apiClient.get(`/chat/history/${conversationId}`)
};

export const moodAPI = {
  saveMoodEntry: (userId, moodData) =>
    apiClient.post('/mood/entry', { userId, ...moodData }),
  getMoodHistory: (userId, days = 30) =>
    apiClient.get(`/mood/history/${userId}?days=${days}`),
  getMoodAnalytics: (userId, days = 30) =>
    apiClient.get(`/mood/analytics/${userId}?days=${days}`)
};

export const analyticsAPI = {
  getDashboard: (userId, days = 30) =>
    apiClient.get(`/analytics/dashboard/${userId}?days=${days}`),
  getEmotionTrends: (userId, days = 7) =>
    apiClient.get(`/analytics/emotions/${userId}?days=${days}`),
  getStrategiesEffectiveness: (userId, days = 30) =>
    apiClient.get(`/analytics/strategies/${userId}?days=${days}`)
};

export default apiClient;
