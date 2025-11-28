// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token nas requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para tratar respostas e erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Token expirado ou inválido
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Log de erros para debug
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', error.response?.data || error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;
