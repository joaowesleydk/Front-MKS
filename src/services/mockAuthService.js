// Mock do serviço de autenticação
const MOCK_USERS_KEY = 'mock_users';
const MOCK_TOKEN_KEY = 'mock_token';

// Usuários pré-cadastrados para teste
const DEFAULT_USERS = [
  {
    id: 1,
    nome: 'Admin',
    email: 'admin@test.com',
    password: '123456',
    role: 'admin',
    foto: 'https://ui-avatars.com/api/?name=Admin&background=7c3aed&color=fff'
  },
  {
    id: 2,
    nome: 'Usuário Teste',
    email: 'user@test.com',
    password: '123456',
    role: 'user',
    foto: 'https://ui-avatars.com/api/?name=Usuario+Teste&background=ec4899&color=fff'
  }
];

// Inicializar usuários padrão se não existirem
const initializeUsers = () => {
  const users = localStorage.getItem(MOCK_USERS_KEY);
  if (!users) {
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(DEFAULT_USERS));
  }
};

// Obter todos os usuários
const getUsers = () => {
  initializeUsers();
  return JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || '[]');
};

// Salvar usuários
const saveUsers = (users) => {
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
};

// Gerar token mock
const generateMockToken = (user) => {
  return `mock_token_${user.id}_${Date.now()}`;
};

export const mockAuthService = {
  // Login
  login: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
          const token = generateMockToken(user);
          const userResponse = { ...user };
          delete userResponse.password; // Não retornar senha
          
          resolve({
            access_token: token,
            user: userResponse
          });
        } else {
          reject({
            response: {
              data: { detail: 'Email ou senha incorretos' },
              status: 401
            }
          });
        }
      }, 500); // Simular delay da rede
    });
  },

  // Cadastro
  register: async (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsers();
        
        // Verificar se email já existe
        if (users.find(u => u.email === email)) {
          reject({
            response: {
              data: { detail: 'Email já cadastrado' },
              status: 400
            }
          });
          return;
        }

        // Criar novo usuário
        const newUser = {
          id: users.length + 1,
          nome: name,
          email,
          password,
          role: 'user',
          foto: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=7c3aed&color=fff`
        };

        users.push(newUser);
        saveUsers(users);

        const token = generateMockToken(newUser);
        const userResponse = { ...newUser };
        delete userResponse.password;

        resolve({
          access_token: token,
          user: userResponse
        });
      }, 500);
    });
  },

  // Login com Google (mock)
  googleLogin: async (credential) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simular dados do Google
        const mockGoogleUser = {
          id: Date.now(),
          nome: 'Usuário Google',
          email: 'google@test.com',
          role: 'user',
          foto: 'https://ui-avatars.com/api/?name=Google+User&background=4285f4&color=fff'
        };

        const token = generateMockToken(mockGoogleUser);
        
        resolve({
          access_token: token,
          user: mockGoogleUser
        });
      }, 500);
    });
  }
};