import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (data) => {
    const formData = new URLSearchParams();
    formData.append('username', data.email);
    formData.append('password', data.password);
    return api.post('/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  },
  signup: (data) => api.post('/signup', data),
  getUser: () => api.get('/users/me'),
};

export const tradeAPI = {
  executeTrade: (data) => api.post('/trade', data),
  getPortfolio: () => api.get('/portfolio'),
  getTradeHistory: () => api.get('/trade-history'),
};

export default api;
