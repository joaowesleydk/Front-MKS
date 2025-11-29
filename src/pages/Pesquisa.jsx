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
    <div className="bg-gray-50 min-h-screen py-4 sm:py-8 px-2 sm:px-4 pt-32 sm:pt-40">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-bold text-center mb-3 sm:mb-4 text-gray-800">
          {query ? 'Resultados da Pesquisa' : 'Pesquisa'}
        </h1>
        {query && (
          <p className="text-center text-gray-600 mb-8 sm:mb-12 text-sm sm:text-base px-4">
            Mostrando resultados para: <span className="font-semibold text-gray-800">"{query}"</span>
          </p>
        )}
        
        {produtos.length === 0 ? (
          <div className="text-center py-12 sm:py-16 px-4">
            <div className="bg-gray-100 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <span className="text-2xl sm:text-3xl">🔍</span>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Nenhum produto encontrado</h3>
            <p className="text-gray-500 text-sm sm:text-base">Tente pesquisar com outras palavras-chave</p>
          </div>
        ) : (
          <>
            <p className="text-center text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
              {produtos.length} produto{produtos.length !== 1 ? 's' : ''} encontrado{produtos.length !== 1 ? 's' : ''}
            </p>
            <Card produtos={produtos} />
          </>
        )}
      </div>
    </div>
  );
};