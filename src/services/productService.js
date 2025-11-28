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
  create: (produto) => api.post('/api/products', produto),
  
  // Atualizar produto
  update: (id, produto) => api.put(`/api/products/${id}`, produto),
  
  // Deletar produto
  delete: (id) => api.delete(`/api/products/${id}`)
};