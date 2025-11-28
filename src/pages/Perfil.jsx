import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineUser, HiOutlineLogout, HiOutlineShoppingBag } from "react-icons/hi2";
import { Button } from "../components/Button";

export default function Perfil() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [activeTab, setActiveTab] = useState('dados');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Meu Perfil</h1>

        {/* Header do usuário */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <HiOutlineUser className="text-3xl text-gray-500" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{user.name || 'Usuário'}</h2>
              <p className="text-gray-600">{user.email}</p>
              {user.role === 'admin' && (
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                  Administrador
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md">
          <div className="border-b">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('dados')}
                className={`px-6 py-3 font-medium ${
                  activeTab === 'dados'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Meus Dados
              </button>
              <button
                onClick={() => setActiveTab('pedidos')}
                className={`px-6 py-3 font-medium ${
                  activeTab === 'pedidos'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Meus Pedidos
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'dados' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome
                  </label>
                  <p className="text-gray-900">{user.name || 'Não informado'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <p className="text-gray-900">{user.email || 'Não informado'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de conta
                  </label>
                  <p className="text-gray-900">{user.role === 'admin' ? 'Administrador' : 'Cliente'}</p>
                </div>
              </div>
            )}

            {activeTab === 'pedidos' && (
              <div className="text-center py-8">
                <HiOutlineShoppingBag className="mx-auto text-6xl text-gray-300 mb-4" />
                <p className="text-gray-500">Você ainda não fez nenhum pedido</p>
                <Button
                  onClick={() => navigate('/')}
                  className="mt-4"
                >
                  Começar a comprar
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Botão de logout */}
        <div className="mt-6 text-center">
          <Button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 flex items-center gap-2 mx-auto"
          >
            <HiOutlineLogout />
            Sair da conta
          </Button>
        </div>
      </div>
    </div>
  );
}
