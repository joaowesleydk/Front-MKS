import { useState, useEffect } from 'react';
import { productService } from '../services/productService';

export const useProducts = (categoria = null) => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        setLoading(true);
        const response = categoria 
          ? await productService.getByCategory(categoria)
          : await productService.getAll();
        setProdutos(response.data);
      } catch (err) {
        setError('Erro ao carregar produtos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, [categoria]);

  return { produtos, loading, error, setProdutos };
};