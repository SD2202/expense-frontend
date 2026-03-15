import axios from 'axios';

const API_URL = 'https://expense-backend-4170.onrender.com';

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the token
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (userData) => api.post('/auth/login', userData),
};

export const transactionService = {
  getTransactions: () => api.get('/transactions'),
  addTransaction: (data) => api.post('/transactions', data),
  updateTransaction: (id, data) => api.put(`/transactions/${id}`, data),
  deleteTransaction: (id) => api.delete(`/transactions/${id}`),
  getSummary: () => api.get('/transactions/summary'),
};

export default api;
