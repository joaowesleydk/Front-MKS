import React from "react";

export default function Perfil() {
  const usuario = {
    nome: "João Wesley",
    email: "joao@example.com",
    telefone: "(11) 99999-9999",
    foto: "https://via.placeholder.com/150",
    endereco: {
      rua: "Av. Central 123",
      cidade: "São Paulo",
      cep: "00000-000",
    },
    pedidos: [
      { id: 1, produto: "Tênis Nike", status: "Entregue" },
      { id: 2, produto: "Camiseta Adidas", status: "A caminho" },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Meu Perfil</h1>

      {/* HEADER COM FOTO */}
      <div className="flex items-center gap-6 bg-white p-6 rounded-xl shadow">
        <img
          src={usuario.foto}
          alt="foto"
          className="w-32 h-32 rounded-full object-cover"
        />

        <div>
          <h2 className="text-2xl font-semibold">{usuario.nome}</h2>
          <p className="text-gray-600">{usuario.email}</p>
          <p className="text-gray-600">{usuario.telefone}</p>
        </div>
      </div>

      {/* ENDEREÇO */}
      <div className="bg-white shadow p-6 rounded-xl mt-8">
        <h3 className="text-xl font-semibold mb-4">Endereço</h3>
        <p className="text-gray-700">{usuario.endereco.rua}</p>
        <p className="text-gray-700">{usuario.endereco.cidade}</p>
        <p className="text-gray-700">{usuario.endereco.cep}</p>
      </div>

      {/* PEDIDOS */}
      <div className="bg-white shadow p-6 rounded-xl mt-8">
        <h3 className="text-xl font-semibold mb-4">Meus Pedidos</h3>
        <ul className="space-y-4">
          {usuario.pedidos.map((p) => (
            <li
              key={p.id}
              className="flex justify-between border-b pb-2 text-gray-800"
            >
              <span>{p.produto}</span>
              <span className="font-semibold">{p.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
