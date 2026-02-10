import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productService = {
  getAll: async () => {
    try {
      const response = await api.get('/products');
      return { data: response.data };
    } catch (error) {
      console.error('Erro ao buscar produtos:', error.response?.data);
      return { data: [] };
    }
  },

  getByCategory: async (categoria) => {
    try {
      const response = await api.get(`/products/category/${categoria}`);
      return { data: response.data };
    } catch (error) {
      console.error('Erro ao buscar por categoria:', error.response?.data);
      return { data: [] };
    }
  },

  search: async (query) => {
    try {
      const response = await api.get(`/products/search?q=${query}`);
      return { data: response.data };
    } catch (error) {
      console.error('Erro ao pesquisar:', error.response?.data);
      return { data: [] };
    }
  },

  create: async (produto) => {
    const token = localStorage.getItem('token');
    const response = await api.post('/products/frontend-create', produto, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  },

  delete: async (id) => {
    const token = localStorage.getItem('token');
    const response = await api.delete(`/products/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  },

  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/upload/image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Erro ao fazer upload da imagem');
    }

    const data = await response.json();
    return `${API_URL}${data.url}`;
  }
};
