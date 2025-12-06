import api from './api';

export const productService = {
  // Buscar todos os produtos
  getAll: () => api.get('/api/products/frontend'),
  
  // Buscar produtos por categoria
  getByCategory: (categoria) => api.get(`/api/products/categoria/${categoria}`),
  
  // Buscar produto por ID
  getById: (id) => api.get(`/api/products/${id}`),
  
  // Pesquisar produtos
  search: (query) => api.get(`/api/products/search?q=${encodeURIComponent(query)}`),
  
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
  update: (id, produto) => api.put(`/api/products/${id}`, produto),
  
  // Deletar produto
  delete: (id) => api.delete(`/api/products/${id}`)
};