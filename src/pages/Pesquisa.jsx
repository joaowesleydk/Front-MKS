import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productService } from '../services/productService';
import { Card } from '../components/Card';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const Pesquisa = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchProducts = async () => {
      if (!query) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await productService.search(query);
        setProdutos(response.data);
      } catch (err) {
        setError('Erro ao buscar produtos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    searchProducts();
  }, [query]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500 p-10">{error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen p-10 pt-42">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        {query ? `Resultados para "${query}"` : 'Pesquisa'}
      </h1>
      
      {produtos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Nenhum produto encontrado</p>
        </div>
      ) : (
        <Card produtos={produtos} />
      )}
    </div>
  );
};