import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { HiOutlineSparkles, HiOutlineXMark } from "react-icons/hi2";
import { useCart } from "../context/CartContext";
import { ProvadorVirtual } from "./ProvadorVirtual";
import { getProductImage } from "../utils/imageMapping";
import toast from 'react-hot-toast';


export const Card = ({ produtos = [] }) => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [provadorOpen, setProvadorOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [detalhesOpen, setDetalhesOpen] = useState(false);

  const isLoggedIn = () => {
    return localStorage.getItem('token') && localStorage.getItem('user');
  };

  const adicionarNaSacola = (produto) => {
    if (!isLoggedIn()) {
      toast.error('Você precisa estar logado para adicionar produtos à sacola!');
      navigate('/login', { state: { from: 'cart' } });
      return;
    }
    const success = addItem(produto);
    if (success) {
      toast.success(`${produto.nome} adicionado à sacola!`);
    }
  };

  const comprarAgora = (produto) => {
    if (!isLoggedIn()) {
      toast.error('Você precisa estar logado para comprar!');
      navigate('/login', { state: { from: 'buy' } });
      return;
    }
    // Ir direto para pagamento com o produto
    localStorage.setItem('tempProduct', JSON.stringify(produto));
    navigate("/pagamento");
  };

  return (
    <div className="w-full">

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {produtos.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setProdutoSelecionado(item);
              setDetalhesOpen(true);
            }}
            className="bg-white rounded-xl sm:rounded-2xl shadow-md p-3 sm:p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full group cursor-pointer"
          >
            <div className="w-24 h-24 sm:w-40 sm:h-40 mb-2 sm:mb-4 overflow-hidden rounded-lg sm:rounded-xl">
              <img
                src={getProductImage(item)}
                alt={item.nome}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = getProductImage(item);
                }}
              />
            </div>

            <h2 className="text-xs sm:text-sm font-medium text-gray-800 mb-1 sm:mb-2 line-clamp-2 min-h-[32px] sm:min-h-[40px] leading-tight">
              {item.nome}
            </h2>

            <p className="text-sm sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">R$ {item.preco}</p>

            <div className="flex-1"></div>

            <div className="mt-2 text-xs text-gray-500">
              Clique para ver detalhes
            </div>
          </div>
        ))}
      </div>
      
      {/* Modal de Detalhes do Produto */}
      {produtoSelecionado && (
        <div className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${detalhesOpen ? '' : 'hidden'}`}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{produtoSelecionado.nome}</h2>
                <button
                  onClick={() => {
                    setDetalhesOpen(false);
                    setProdutoSelecionado(null);
                  }}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                >
                  <HiOutlineXMark className="text-xl text-gray-600" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={getProductImage(produtoSelecionado)}
                    alt={produtoSelecionado.nome}
                    className="w-full h-64 object-contain rounded-xl bg-gray-50"
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-3xl font-bold text-gray-800">R$ {produtoSelecionado.preco}</p>
                    <p className="text-gray-600 mt-2">{produtoSelecionado.descricao || 'Produto de alta qualidade'}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        comprarAgora(produtoSelecionado);
                      }}
                      className="w-full bg-black hover:bg-gray-800 text-white rounded-full px-6 py-3 transition-all duration-300 font-medium"
                    >
                      Comprar Agora
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        adicionarNaSacola(produtoSelecionado);
                      }}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-6 py-3 transition-all duration-300 font-medium flex items-center justify-center gap-2"
                    >
                      <HiOutlineShoppingBag size={20} />
                      Adicionar à Sacola
                    </button>
                    
                    {/* Botão Provador Virtual - apenas para roupas */}
                    {(produtoSelecionado.categoria?.includes('camisa') || produtoSelecionado.categoria?.includes('blusa') || 
                      produtoSelecionado.categoria?.includes('vestido') || produtoSelecionado.categoria?.includes('camiseta') ||
                      produtoSelecionado.categoria?.includes('jeans') || produtoSelecionado.categoria?.includes('calca')) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDetalhesOpen(false);
                          setProvadorOpen(true);
                        }}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full px-6 py-3 transition-all duration-300 font-medium flex items-center justify-center gap-2"
                      >
                        <HiOutlineSparkles size={20} />
                        Provador Virtual
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Provador Virtual Modal */}
      {produtoSelecionado && (
        <ProvadorVirtual
          produto={produtoSelecionado}
          isOpen={provadorOpen}
          onClose={() => {
            setProvadorOpen(false);
            setProdutoSelecionado(null);
          }}
        />
      )}
    </div>
  );
};
