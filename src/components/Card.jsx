import { useNavigate } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useState } from "react";


export const Card = ({ produtos = [] }) => {
  const navigate = useNavigate();

  const [sacola, setSacola] = useState([]);
  const [mensagem, setMensagem] = useState("");

  const adicionarNaSacola = (produto) => {
    setSacola((prev) => [...prev, produto]);
    setMensagem(`${produto.nome} foi adicionado à sacola!`);
    setTimeout(() => setMensagem(""), 2000);
  };

  return (
    <div className="w-full">
      {mensagem && (
        <div className="fixed top-6 right-6 bg-purple-800 text-white px-6 py-3 rounded-full shadow-lg transition-opacity z-[9999]">
          {mensagem}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {produtos.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition h-full"
          >
            <img
              src={item.imagem}
              alt={item.nome}
              className="w-40 h-40 object-contain mb-4"
            />

            <h2 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 min-h-[40px]">
              {item.nome}
            </h2>

            <p className="text-lg font-bold text-gray-900 mb-4">{item.preco}</p>

            <div className="flex-1"></div>

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => navigate("/compra")}
                className="border border-purple-800 text-gray-800 rounded-full px-6 py-2 hover:bg-purple-800 hover:text-white transition"
              >
                Comprar Agora
              </button>

              <button
                onClick={() => adicionarNaSacola(item)}
                className="border border-purple-800 text-gray-800 rounded-full p-2 hover:bg-purple-800 hover:text-white transition"
              >
                <HiOutlineShoppingBag size={22} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
