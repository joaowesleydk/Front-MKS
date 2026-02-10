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
        setError(null);
        
        const response = categoria 
          ? await productService.getByCategory(categoria)
          : await productService.getAll();
        
        const data = response.data || [];
        
        // Verificar se data é um array
        if (!Array.isArray(data)) {
          console.error('Resposta não é um array:', data);
          setProdutos([]);
          setError('Formato de resposta inválido');
          return;
        }
        
        const produtosFormatados = data.map(produto => ({
          ...produto,
          nome: produto.nome || produto.name,
          preco: typeof produto.preco === 'string' ? produto.preco : `R$ ${produto.preco.toFixed(2).replace('.', ',')}`,
          imagem: produto.imagem || produto.image
        }));
        
        setProdutos(produtosFormatados);
      } catch (err) {
        console.error('Erro ao carregar produtos:', err);
        setError('Erro ao carregar produtos');
        setProdutos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, [categoria]);

  return { produtos, loading, error };
};