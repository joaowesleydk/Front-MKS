import { mockUsers } from './mockData';

// Simula delay de rede
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock de autenticação
export const mockAuthService = {
  // Login tradicional
  login: async (email, password) => {
    await delay();
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Email ou senha incorretos');
    }
    
    const token = `mock-token-${user.id}-${Date.now()}`;
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      access_token: token,
      user: userWithoutPassword
    };
  },

  // Login com Google (mock)
  googleLogin: async (credential) => {
    await delay();
    
    // Simula decodificação do token Google
    const mockGoogleUser = {
      id: 999,
      email: "google@user.com",
      nome: "Usuário Google",
      role: "user",
      foto: "https://ui-avatars.com/api/?name=Google+User&background=4285F4&color=fff"
    };
    
    const token = `mock-google-token-${Date.now()}`;
    
    return {
      access_token: token,
      user: mockGoogleUser
    };
  },

  // Cadastro
  register: async (userData) => {
    await delay();
    
    // Verifica se email já existe
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('Email já cadastrado');
    }
    
    const newUser = {
      id: mockUsers.length + 1,
      email: userData.email,
      nome: userData.nome,
      role: "user",
      foto: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.nome)}&background=7C3AED&color=fff`
    };
    
    mockUsers.push({ ...newUser, password: userData.password });
    
    const token = `mock-token-${newUser.id}-${Date.now()}`;
    
    return {
      access_token: token,
      user: newUser
    };
  }
};
