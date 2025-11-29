import api from './api';

export const authService = {
  // Login
  login: (credentials) => api.post('/api/auth/login', credentials),
  
  // Registro
  register: (userData) => api.post('/api/users/register', userData),
  
  // Logout
  logout: () => api.post('/api/auth/logout'),
  
  // Verificar token
  verifyToken: () => api.get('/api/auth/verify'),
  
  // Refresh token
  refreshToken: () => api.post('/api/auth/refresh')
};