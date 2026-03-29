import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const carouselService = {
  getAll: () => axios.get(`${API_URL}/api/products/carousel`),
  create: (data) => axios.post(`${API_URL}/api/carousel`, data),
  update: (id, data) => axios.put(`${API_URL}/api/carousel/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/api/carousel/${id}`)
};
