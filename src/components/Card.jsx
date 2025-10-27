import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi"; // 👈 adicionado

export const Card = ({ endpoint = "promocoes" }) => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 👇 estados novos
  const [sacola, setSacola] = useState([]);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Evita erro se endpoint estiver vazio
    if (!endpoint) {
      setError("Nenhum endpoint definido.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:3001/${endpoint}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Endpoint "${endpoint}" não encontrado`);
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error("O endpoint retornou um dado inválido (não é array)");
        }
        setProdutos(data);
      })
      .catch((err) => {
        console.error("Erro ao carregar produtos:", err);
        setError(err.message);
        setProdutos([]); // evita map em undefined
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  // 👇 função nova: adicionar produto à sacola
  const adicionarNaSacola = (produto) => {
    setSacola((prev) => [...prev, produto]);
    setMensagem(`${produto.nome} foi adicionado à sacola!`);
    setTimeout(() => setMensagem(""), 2000); // mensagem desaparece
  };

  if (loading)
    return <p className="text-center mt-10">Carregando produtos...</p>;

  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;

  if (produtos.length === 0)
    return <p className="text-center mt-10">Nenhum produto encontrado.</p>;

  return (
    <div className="min-h-screen p-10 relative">
      

      {/* 👇 Mensagem visual de confirmação */}
      {mensagem && (
        <div className="fixed top-6 right-6 bg-purple-800 text-white px-6 py-3 rounded-full shadow-lg transition-opacity">
          {mensagem}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {produtos.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition"
          >
            <img
              src={item.imagem}
              alt={item.nome}
              className="w-40 h-40 object-contain mb-4"
            />
            <h2 className="text-sm font-medium text-gray-800 mb-2">
              {item.nome}
            </h2>
            <p className="text-lg font-bold text-gray-900">
              R$ {item.preco.toFixed(2)}
            </p>

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => navigate("/compra")}
                className="border border-purple-800 text-gray-800 rounded-full px-6 py-2 hover:bg-purple-800 hover:text-white transition"
              >
                Comprar Agora
              </button>

              {/* 👇 botão da sacola */}
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
