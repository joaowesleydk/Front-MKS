import api from './api';

export const authService = {
  // Login tradicional
  login: async (credentials) => {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
  },
  
  // Login com Google
  googleLogin: async (credential) => {
    const response = await api.post('/api/auth/google', { credential });
    return response.data;
  },
  
  // Registro
  register: async (userData) => {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  },
  
  // Logout
  logout: async () => {
    const response = await api.post('/api/auth/logout');
    return response.data;
  },
  
  // Verificar token
  verifyToken: async () => {
    const response = await api.get('/api/auth/verify');
    return response.data;
  },
  
  // Refresh token
  refreshToken: async () => {
    const response = await api.post('/api/auth/refresh');
    return response.data;
  }
};