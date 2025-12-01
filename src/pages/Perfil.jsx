import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineUser, HiOutlineShoppingBag, HiOutlineCog, HiOutlineHeart } from "react-icons/hi2";
import { HiOutlineLogout } from "react-icons/hi";
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-50 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header com gradiente */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <HiOutlineUser className="text-4xl text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{user.name || 'Usuário'}</h1>
              <p className="text-purple-100 mb-2">{user.email}</p>
              {user.role === 'admin' && (
                <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                  ✨ Administrador
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Menu lateral */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Menu</h3>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('dados')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                    activeTab === 'dados'
                      ? 'bg-purple-100 text-purple-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <HiOutlineUser className="text-xl" />
                  Meus Dados
                </button>
                <button
                  onClick={() => setActiveTab('pedidos')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                    activeTab === 'pedidos'
                      ? 'bg-purple-100 text-purple-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <HiOutlineShoppingBag className="text-xl" />
                  Meus Pedidos
                </button>
                <button
                  onClick={() => setActiveTab('favoritos')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                    activeTab === 'favoritos'
                      ? 'bg-purple-100 text-purple-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <HiOutlineHeart className="text-xl" />
                  Favoritos
                </button>
                <button
                  onClick={() => setActiveTab('configuracoes')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                    activeTab === 'configuracoes'
                      ? 'bg-purple-100 text-purple-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <HiOutlineCog className="text-xl" />
                  Configurações
                </button>
              </nav>
              
              <div className="mt-6 pt-6 border-t">
                <Button
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-red-600 flex items-center justify-center gap-2"
                >
                  <HiOutlineLogout />
                  Sair da conta
                </Button>
              </div>
            </div>
          </div>

          {/* Conteúdo principal */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              
              {activeTab === 'dados' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Meus Dados</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Nome Completo
                      </label>
                      <p className="text-lg font-semibold text-gray-900">{user.name || 'Não informado'}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Email
                      </label>
                      <p className="text-lg font-semibold text-gray-900">{user.email || 'Não informado'}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Tipo de Conta
                      </label>
                      <p className="text-lg font-semibold text-gray-900">{user.role === 'admin' ? 'Administrador' : 'Cliente'}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Membro desde
                      </label>
                      <p className="text-lg font-semibold text-gray-900">Janeiro 2024</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'pedidos' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Meus Pedidos</h2>
                  <div className="text-center py-12">
                    <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <HiOutlineShoppingBag className="text-3xl text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Nenhum pedido ainda</h3>
                    <p className="text-gray-500 mb-6">Que tal começar suas compras?</p>
                    <Button
                      onClick={() => navigate('/')}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Explorar Produtos
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === 'favoritos' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Favoritos</h2>
                  <div className="text-center py-12">
                    <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <HiOutlineHeart className="text-3xl text-pink-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Nenhum favorito ainda</h3>
                    <p className="text-gray-500">Adicione produtos aos seus favoritos para vê-los aqui</p>
                  </div>
                </div>
              )}

              {activeTab === 'configuracoes' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Configurações</h2>
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h3 className="font-semibold text-gray-800 mb-2">Notificações</h3>
                      <p className="text-gray-600 text-sm">Gerencie suas preferências de notificação</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h3 className="font-semibold text-gray-800 mb-2">Privacidade</h3>
                      <p className="text-gray-600 text-sm">Controle suas configurações de privacidade</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h3 className="font-semibold text-gray-800 mb-2">Segurança</h3>
                      <p className="text-gray-600 text-sm">Altere sua senha e configurações de segurança</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
