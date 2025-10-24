import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi"; // ícone da sacola

export const Card = ({ produtos: produtosExternos = [] }) => {
  const navigate = useNavigate();

  // Produtos padrão caso não receba via props
  const produtosPadrao = [
    {
      id: 1,
      nome: "Fone Bluetooth JBL",
      preco: 299.9,
      imagem:
        "https://a-static.mlcdn.com.br/800x560/fone-bluetooth-eco-sound-handz-handz/oliststore/mgllacr4mhrsdnbz/9eaa922d6a52f20a868b712c20012964.jpeg",
    },
    {
      id: 2,
      nome: "Smartwatch Samsung Galaxy",
      preco: 899.0,
      imagem: "https://etesla.cl/wp-content/uploads/2023/11/27MXX725BL.jpg",
    },
    {
      id: 3,
      nome: "Mouse Gamer Redragon",
      preco: 159.9,
      imagem: "https://m.media-amazon.com/images/I/61Qe0euJJZL._AC_SL1500_.jpg",
    },
    {
      id: 4,
      nome: "Notebook Dell Inspiron",
      preco: 4599.0,
      imagem:
        "https://http2.mlstatic.com/D_NQ_NP_766337-MLU77320052927_062024-O.webp",
    },
  ];

  // Estado inicial já pega props se existirem
  const [produtos] = useState(
    produtosExternos.length > 0 ? produtosExternos : produtosPadrao
  );

  // Estados da sacola e mensagem
  const [sacola, setSacola] = useState([]);
  const [mensagem, setMensagem] = useState("");

  const adicionarNaSacola = (produto) => {
    setSacola((prev) => [...prev, produto]);
    setMensagem(`${produto.nome} foi adicionado à sacola!`);
    setTimeout(() => setMensagem(""), 2000);
  };

  return (
    <div className="min-h-screen p-10 relative">
      {/* Mensagem visual */}
      {mensagem && (
  <div className="fixed top-6 right-6 bg-purple-800 text-white px-6 py-3 rounded-full shadow-lg transition-opacity z-[9999]">
    {mensagem}
  </div>
      )}

      {/* Grade de produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {produtos.map((item, index) => (
          <div
            key={item.id || index}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition h-full"
          >
            <img
              src={item.imagem}
              alt={item.nome}
              className="w-40 h-40 object-contain mb-4"
            />

            {/* Altura fixa para o nome */}
            <h2 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 min-h-[40px]">
              {item.nome}
            </h2>

            <p className="text-lg font-bold text-gray-900 mb-4">
              {typeof item.preco === "number"
                ? `R$ ${item.preco.toFixed(2)}`
                : item.preco}
            </p>

            {/* Espaço flexível para manter os botões no mesmo local */}
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
                title="Adicionar à sacola"
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
