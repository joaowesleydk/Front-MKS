import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Sacola = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantity = (id, change) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-6">
        <button className=" text-2xl font-semibold mb-4">Seu carrinho está vazio 😢</button>
        <Link
          to="/compras"
          className="bg-black text-white px-6 py-3 rounded hover:scale-105 transition-transform"
        >
          Voltar às compras
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Meu Carrinho</h1>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center justify-between border-b pb-4 mb-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">R${item.price.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-3 md:mt-0">
              <button
                onClick={() => handleQuantity(item.id, -1)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => handleQuantity(item.id, 1)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>

              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-600 hover:underline ml-4"
              >
                Remover
              </button>
            </div>
          </div>
        ))}

        {/* Resumo */}
        <div className="text-right mt-6">
          <p className="text-lg font-semibold">Subtotal: R${total.toFixed(2)}</p>
          <button className="bg-black text-white px-6 py-3 rounded mt-4 hover:scale-105 transition-transform">
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
};
