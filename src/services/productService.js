import api from './api';

const API_URL = import.meta.env.VITE_API_URL;

export const productService = {
  // Buscar todos os produtos
  getAll: async () => {
    const response = await api.get('/api/products');
    return { data: response.data };
  },
  
  // Buscar produtos por categoria
  getByCategory: async (categoria) => {
    const response = await api.get(`/api/products/category/${categoria}`);
    return { data: response.data };
  },
  
  // Buscar produto por ID
  getById: async (id) => {
    const response = await api.get(`/api/products/${id}`);
    return { data: response.data };
  },
  
  // Pesquisar produtos
  search: async (query) => {
    const response = await api.get(`/api/products/search?q=${encodeURIComponent(query)}`);
    return { data: response.data };
  },
  
  // Criar novo produto
  create: async (produto) => {
    const token = localStorage.getItem('token');
    
    // Converter campos para o formato esperado pelo backend
    const produtoFormatado = {
      name: produto.nome,
      price: parseFloat(produto.preco),
      category: produto.categoria,
      image: produto.imagem,
      description: produto.descricao,
      promocao: produto.promocao
    };
    
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/frontend-create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(produtoFormatado)
    });
    
    if (!response.ok) {
      throw new Error('Erro ao cadastrar produto');
    }
    
    return await response.json();
  },
  
  // Criar produto com upload de arquivo
  createWithFile: async (formData) => {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/frontend-create-with-file`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Erro ao cadastrar produto com imagem');
    }
    
    return await response.json();
  },
  
  // Atualizar produto
  update: async (id, produto) => {
    const response = await api.put(`/api/products/${id}`, produto);
    return response.data;
  },
  
  // Deletar produto
  delete: async (id) => {
    const response = await api.delete(`/api/products/${id}`);
    return response.data;
  }
};