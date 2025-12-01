import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { HiOutlineTrash, HiOutlineMinus, HiOutlinePlus, HiOutlineShoppingBag } from "react-icons/hi2";
import { Button } from "../components/Button";
import toast from 'react-hot-toast';

export const Sacola = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCart();

  const handleRemove = (id, nome) => {
    removeItem(id);
    toast.success(`${nome} removido do carrinho`);
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Carrinho limpo!');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="bg-purple-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <HiOutlineShoppingBag className="text-4xl text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Seu carrinho está vazio</h2>
          <p className="text-gray-600 mb-8">Que tal adicionar alguns produtos incríveis?</p>
          <Button
            onClick={() => window.location.href = '/'}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Explorar Produtos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-50 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Meu Carrinho</h1>
          <Button
            onClick={handleClearCart}
            className="bg-red-500 hover:bg-red-600 text-sm"
          >
            Limpar Carrinho
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
          
          {/* Lista de produtos */}
          <div className="lg:col-span-2 space-y-3 lg:space-y-4">
            {items.map((item) => {
              const preco = parseFloat(item.preco.replace('R$', '').replace(',', '.'));
              return (
                <div key={item.id} className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6">
                  <div className="flex items-center gap-3 lg:gap-4">
                    <img
                      src={item.imagem || 'https://via.placeholder.com/80x80'}
                      alt={item.nome}
                      className="w-16 h-16 lg:w-20 lg:h-20 object-contain rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm lg:text-lg font-semibold text-gray-800 mb-1 line-clamp-2">{item.nome}</h3>
                      <p className="text-gray-800 font-bold text-sm lg:text-base">{item.preco}</p>
                    </div>
                    
                    <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantidade - 1)}
                          className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                        >
                          <HiOutlineMinus className="text-xs lg:text-sm" />
                        </button>
                        <span className="w-6 lg:w-8 text-center font-semibold text-sm lg:text-base">{item.quantidade}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantidade + 1)}
                          className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                        >
                          <HiOutlinePlus className="text-xs lg:text-sm" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => handleRemove(item.id, item.nome)}
                        className="text-red-500 hover:text-red-700 p-1 lg:p-2"
                      >
                        <HiOutlineTrash className="text-lg lg:text-xl" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Resumo do pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Resumo do Pedido</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">R$ {getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Frete:</span>
                  <span className="font-semibold text-green-600">Grátis</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold text-purple-600">R$ {getTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 mb-4">
                Finalizar Compra
              </Button>
              
              <Link to="/" className="block text-center text-purple-600 hover:text-purple-700 font-medium">
                Continuar Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
