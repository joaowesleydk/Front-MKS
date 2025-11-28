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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {produtos.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full group"
          >
            <div className="w-40 h-40 mb-4 overflow-hidden rounded-xl">
              <img
                src={item.imagem || 'https://via.placeholder.com/160x160?text=Sem+Imagem'}
                alt={item.nome}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/160x160?text=Sem+Imagem';
                }}
              />
            </div>

            <h2 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 min-h-[40px]">
              {item.nome}
            </h2>

            <p className="text-lg font-bold mb-4 text-gray-800">R$ {item.preco}</p>

            <div className="flex-1"></div>

            <div className="flex gap-2 mt-3 w-full">
              <button
                onClick={() => navigate("/compra")}
                className="flex-1 bg-black hover:bg-gray-800 text-white rounded-full px-4 py-2 transition-all duration-300 text-sm font-medium"
              >
                Comprar
              </button>

              <button
                onClick={() => adicionarNaSacola(item)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-2 transition-all duration-300 hover:scale-110"
              >
                <HiOutlineShoppingBag size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
