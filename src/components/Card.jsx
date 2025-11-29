import { useNavigate, useLocation } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useCart } from "../context/CartContext";
import toast from 'react-hot-toast';


export const Card = ({ produtos = [] }) => {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const adicionarNaSacola = (produto) => {
    addItem(produto);
    toast.success(`${produto.nome} adicionado ao carrinho!`);
  };

  return (
    <div className="w-full">

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {produtos.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl sm:rounded-2xl shadow-md p-3 sm:p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full group"
          >
            <div className="w-24 h-24 sm:w-40 sm:h-40 mb-2 sm:mb-4 overflow-hidden rounded-lg sm:rounded-xl">
              <img
                src={item.imagem || 'https://via.placeholder.com/160x160?text=Sem+Imagem'}
                alt={item.nome}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/160x160?text=Sem+Imagem';
                }}
              />
            </div>

            <h2 className="text-xs sm:text-sm font-medium text-gray-800 mb-1 sm:mb-2 line-clamp-2 min-h-[32px] sm:min-h-[40px] leading-tight">
              {item.nome}
            </h2>

            <p className="text-sm sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">R$ {item.preco}</p>

            <div className="flex-1"></div>

            <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 mt-2 sm:mt-3 w-full">
              <button
                onClick={() => navigate("/compra")}
                className="flex-1 bg-black hover:bg-gray-800 text-white rounded-full px-2 sm:px-4 py-1.5 sm:py-2 transition-all duration-300 text-xs sm:text-sm font-medium"
              >
                Comprar
              </button>

              <button
                onClick={() => adicionarNaSacola(item)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-1.5 sm:p-2 transition-all duration-300 hover:scale-110 self-center sm:self-auto"
              >
                <HiOutlineShoppingBag size={16} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
