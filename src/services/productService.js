import api from './api';

export const productService = {
  // Buscar todos os produtos
  getAll: () => api.get('/produtos'),
  
  // Buscar produtos por categoria
  getByCategory: (categoria) => api.get(`/produtos/categoria/${categoria}`),
  
  // Buscar produto por ID
  getById: (id) => api.get(`/produtos/${id}`),
  
  // Criar novo produto
  create: (produto) => api.post('/produtos', produto),
  
  // Atualizar produto
  update: (id, produto) => api.put(`/produtos/${id}`, produto),
  
  // Deletar produto
  delete: (id) => api.delete(`/produtos/${id}`)
};