import api from './api';

export const authService = {
  // Login
  login: (credentials) => api.post('/auth/login', credentials),
  
  // Registro
  register: (userData) => api.post('/auth/register', userData),
  
  // Logout
  logout: () => api.post('/auth/logout'),
  
  // Verificar token
  verifyToken: () => api.get('/auth/verify'),
  
  // Refresh token
  refreshToken: () => api.post('/auth/refresh')
};