import { useState, useEffect } from 'react';
import { productService } from '../services/productService';

export const useProducts = (categoria = null) => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para formatar preço
  const formatarProdutos = (produtosList) => {
    return produtosList.map(produto => ({
      ...produto,
      preco: typeof produto.price === 'number' ? `R$ ${produto.price.toFixed(2).replace('.', ',')}` : produto.preco || produto.price,
      imagem: produto.image || produto.imagem
    }));
  };

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = categoria 
          ? await productService.getByCategory(categoria)
          : await productService.getAll();
        
        const data = response.data || response || [];
        setProdutos(Array.isArray(data) ? formatarProdutos(data) : []);
      } catch (err) {
        console.error('Erro ao carregar produtos:', err);
        setError(err.message || 'Erro ao carregar produtos');
        setProdutos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, [categoria]);

  return { produtos, loading, error, setProdutos };
};