import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineUser, HiOutlineShoppingBag, HiOutlineCog, HiOutlineCamera, HiOutlinePaintBrush } from "react-icons/hi2";
import { HiOutlineSparkles } from "react-icons/hi";
import { HiOutlineLogout } from "react-icons/hi";
import { Button } from "../components/Button";
import toast from 'react-hot-toast';

export default function Perfil() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [activeTab, setActiveTab] = useState('dados');
  const [profilePhoto, setProfilePhoto] = useState(localStorage.getItem('profilePhoto') || '');
  const [profileTheme, setProfileTheme] = useState(localStorage.getItem('profileTheme') || 'purple');
  
  // Função para obter tema com fallback
  const getTheme = () => {
    const savedTheme = localStorage.getItem('profileTheme');
    return savedTheme ? themes[savedTheme] : themes.purple;
  };
  const [profileBio, setProfileBio] = useState(localStorage.getItem('profileBio') || '');
  const [profileName, setProfileName] = useState(localStorage.getItem('profileName') || user.name || '');
  
  const themes = {
    default: { from: 'from-gray-600', to: 'to-gray-800', accent: 'gray', name: 'Padrão' },
    purple: { from: 'from-purple-600', to: 'to-pink-600', accent: 'purple', name: 'Roxo' },
    blue: { from: 'from-blue-600', to: 'to-cyan-600', accent: 'blue', name: 'Azul' },
    green: { from: 'from-green-600', to: 'to-emerald-600', accent: 'green', name: 'Verde' },
    orange: { from: 'from-orange-600', to: 'to-red-600', accent: 'orange', name: 'Laranja' },
    pink: { from: 'from-pink-600', to: 'to-rose-600', accent: 'pink', name: 'Rosa' }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Imagem muito grande. Máximo 5MB.');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const photoUrl = e.target.result;
        setProfilePhoto(photoUrl);
        localStorage.setItem('profilePhoto', photoUrl);
        toast.success('Foto de perfil atualizada!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThemeChange = (theme) => {
    setProfileTheme(theme);
    localStorage.setItem('profileTheme', theme);
    toast.success('Tema atualizado!');
  };

  const handleSaveProfile = () => {
    localStorage.setItem('profileBio', profileBio);
    localStorage.setItem('profileName', profileName);
    toast.success('Perfil salvo com sucesso!');
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-${themes[profileTheme].accent}-50 to-pink-50 py-50 px-4`}>
      <div className="max-w-6xl mx-auto">
        
        {/* Header com gradiente personalizado */}
        <div className={`bg-gradient-to-r ${themes[profileTheme].from} ${themes[profileTheme].to} rounded-2xl p-8 mb-8 text-white relative overflow-hidden`}>
          {/* Padrão decorativo */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="flex items-center gap-6 relative z-10">
            <div className="relative group">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="Foto de perfil"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white/30"
                />
              ) : (
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-4 border-white/30">
                  <HiOutlineUser className="text-4xl text-white" />
                </div>
              )}
              
              {/* Botão para trocar foto */}
              <label className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <HiOutlineCamera className="text-2xl text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{profileName || user.name || 'Usuário'}</h1>
              <p className="text-white/80 mb-2">{user.email}</p>
              {profileBio && (
                <p className="text-white/90 text-sm mb-2 italic">"{profileBio}"</p>
              )}
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
                      ? `bg-${themes[profileTheme].accent}-100 text-${themes[profileTheme].accent}-700 font-medium`
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
                      ? `bg-${themes[profileTheme].accent}-100 text-${themes[profileTheme].accent}-700 font-medium`
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <HiOutlineShoppingBag className="text-xl" />
                  Meus Pedidos
                </button>
                <button
                  onClick={() => setActiveTab('closet')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                    activeTab === 'closet'
                      ? `bg-${themes[profileTheme].accent}-100 text-${themes[profileTheme].accent}-700 font-medium`
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <HiOutlineSparkles className="text-xl" />
                  Meu Closet
                </button>
                <button
                  onClick={() => setActiveTab('personalizacao')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                    activeTab === 'personalizacao'
                      ? `bg-${themes[profileTheme].accent}-100 text-${themes[profileTheme].accent}-700 font-medium`
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <HiOutlinePaintBrush className="text-xl" />
                  Personalização
                </button>
                <button
                  onClick={() => setActiveTab('configuracoes')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                    activeTab === 'configuracoes'
                      ? `bg-${themes[profileTheme].accent}-100 text-${themes[profileTheme].accent}-700 font-medium`
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
                      <p className="text-lg font-semibold text-gray-900">Janeiro 2025</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'pedidos' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Meus Pedidos</h2>
                  <div className="text-center py-12">
                    <div className={`bg-${themes[profileTheme].accent}-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <HiOutlineShoppingBag className={`text-3xl text-${themes[profileTheme].accent}-600`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Nenhum pedido ainda</h3>
                    <p className="text-gray-500 mb-6">Que tal começar suas compras?</p>
                    <Button
                      onClick={() => navigate('/')}
                      className={`bg-gradient-to-r ${themes[profileTheme].from} ${themes[profileTheme].to}`}
                    >
                      Explorar Produtos
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === 'closet' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Meu Closet Virtual</h2>
                  {(() => {
                    const closetImages = JSON.parse(localStorage.getItem('closetImages') || '[]');
                    
                    if (closetImages.length === 0) {
                      return (
                        <div className="text-center py-12">
                          <div className={`bg-${themes[profileTheme].accent}-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                            <HiOutlineSparkles className={`text-3xl text-${themes[profileTheme].accent}-600`} />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">Seu closet está vazio</h3>
                          <p className="text-gray-500 mb-6">Use o provador virtual e salve suas combinações favoritas aqui!</p>
                          <Button
                            onClick={() => navigate('/')}
                            className={`bg-gradient-to-r ${themes[profileTheme].from} ${themes[profileTheme].to}`}
                          >
                            Experimentar Roupas
                          </Button>
                        </div>
                      );
                    }
                    
                    return (
                      <div>
                        <div className="mb-6 flex items-center justify-between">
                          <p className="text-gray-600">{closetImages.length} look{closetImages.length > 1 ? 's' : ''} salvos</p>
                          <button
                            onClick={() => {
                              localStorage.removeItem('closetImages');
                              setActiveTab('closet'); // Force re-render
                            }}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Limpar Closet
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {closetImages.map((item, index) => (
                            <div key={index} className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                              <div className="aspect-square bg-white">
                                <img
                                  src={item.image}
                                  alt={`Look ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-gray-800">{item.productName}</h4>
                                  <span className="text-sm text-gray-500">R$ {item.productPrice}</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-3">
                                  Salvo em {new Date(item.savedAt).toLocaleDateString('pt-BR')}
                                </p>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => {
                                      // Adicionar ao carrinho
                                      toast.success('Produto adicionado ao carrinho!');
                                    }}
                                    className={`flex-1 bg-${themes[profileTheme].accent}-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-${themes[profileTheme].accent}-700 transition-colors`}
                                  >
                                    Comprar
                                  </button>
                                  <button
                                    onClick={() => {
                                      const updatedImages = closetImages.filter((_, i) => i !== index);
                                      localStorage.setItem('closetImages', JSON.stringify(updatedImages));
                                      setActiveTab('closet'); // Force re-render
                                      toast.success('Look removido do closet!');
                                    }}
                                    className="bg-gray-200 text-gray-600 py-2 px-3 rounded-lg text-sm hover:bg-gray-300 transition-colors"
                                  >
                                    Remover
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()
                  }
                </div>
              )}

              {activeTab === 'personalizacao' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Personalização do Perfil</h2>
                  
                  <div className="space-y-6">
                    {/* Nome personalizado */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="font-semibold text-gray-800 mb-3">Nome de Exibição</h3>
                      <input
                        type="text"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        placeholder="Como você quer ser chamado?"
                        className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${themes[profileTheme].accent}-500`}
                      />
                    </div>
                    
                    {/* Bio */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="font-semibold text-gray-800 mb-3">Bio</h3>
                      <textarea
                        value={profileBio}
                        onChange={(e) => setProfileBio(e.target.value)}
                        placeholder="Conte um pouco sobre você..."
                        className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${themes[profileTheme].accent}-500 h-24 resize-none`}
                        maxLength={150}
                      />
                      <p className="text-xs text-gray-500 mt-1">{profileBio.length}/150 caracteres</p>
                    </div>
                    
                    {/* Temas de cor */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="font-semibold text-gray-800 mb-3">Tema de Cores</h3>
                      <div className="grid grid-cols-6 gap-3">
                        {Object.entries(themes).map(([key, theme]) => (
                          <button
                            key={key}
                            onClick={() => handleThemeChange(key)}
                            className={`w-12 h-12 rounded-full bg-gradient-to-r ${theme.from} ${theme.to} border-4 transition-all ${
                              profileTheme === key ? 'border-gray-800 scale-110' : 'border-gray-300 hover:scale-105'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Foto de perfil */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="font-semibold text-gray-800 mb-3">Foto de Perfil</h3>
                      <div className="flex items-center gap-4">
                        {profilePhoto ? (
                          <img
                            src={profilePhoto}
                            alt="Preview"
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                            <HiOutlineUser className="text-2xl text-gray-400" />
                          </div>
                        )}
                        <div>
                          <label className={`bg-${themes[profileTheme].accent}-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-${themes[profileTheme].accent}-700 transition-colors`}>
                            Escolher Foto
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handlePhotoUpload}
                              className="hidden"
                            />
                          </label>
                          <p className="text-xs text-gray-500 mt-1">JPG, PNG até 5MB</p>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      onClick={handleSaveProfile}
                      className={`w-full bg-gradient-to-r ${themes[profileTheme].from} ${themes[profileTheme].to}`}
                    >
                      Salvar Personalização
                    </Button>
                  </div>
                </div>
              )}
              
              {activeTab === 'configuracoes' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Configurações</h2>
                  
                  <div className="space-y-6">
                    {/* Notificações */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="font-semibold text-gray-800 mb-4">Notificações</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-700">Email de promoções</p>
                            <p className="text-sm text-gray-500">Receba ofertas e novidades por email</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-${themes[profileTheme].accent}-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-${themes[profileTheme].accent}-600`}></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-700">SMS de pedidos</p>
                            <p className="text-sm text-gray-500">Receba atualizações dos seus pedidos</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-${themes[profileTheme].accent}-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-${themes[profileTheme].accent}-600`}></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Privacidade */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="font-semibold text-gray-800 mb-4">Privacidade</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-700">Perfil público</p>
                            <p className="text-sm text-gray-500">Permitir que outros vejam seu perfil</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-${themes[profileTheme].accent}-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-${themes[profileTheme].accent}-600`}></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-700">Histórico de compras</p>
                            <p className="text-sm text-gray-500">Salvar histórico para recomendações</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-${themes[profileTheme].accent}-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-${themes[profileTheme].accent}-600`}></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Segurança */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="font-semibold text-gray-800 mb-4">Segurança</h3>
                      <div className="space-y-4">
                        <button className={`w-full text-left p-4 bg-white rounded-lg border hover:border-${themes[profileTheme].accent}-300 transition-colors`}>
                          <p className="font-medium text-gray-700">Alterar senha</p>
                          <p className="text-sm text-gray-500">Atualize sua senha de acesso</p>
                        </button>
                        
                        <button className={`w-full text-left p-4 bg-white rounded-lg border hover:border-${themes[profileTheme].accent}-300 transition-colors`}>
                          <p className="font-medium text-gray-700">Autenticação em duas etapas</p>
                          <p className="text-sm text-gray-500">Adicione uma camada extra de segurança</p>
                        </button>
                        
                        <button className="w-full text-left p-4 bg-white rounded-lg border hover:border-red-300 transition-colors">
                          <p className="font-medium text-red-600">Excluir conta</p>
                          <p className="text-sm text-gray-500">Remover permanentemente sua conta</p>
                        </button>
                      </div>
                    </div>

                    {/* Preferências */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="font-semibold text-gray-800 mb-4">Preferências</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Idioma</label>
                          <select className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${themes[profileTheme].accent}-500`}>
                            <option>Português (Brasil)</option>
                            <option>English</option>
                            <option>Español</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Moeda</label>
                          <select className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${themes[profileTheme].accent}-500`}>
                            <option>Real (R$)</option>
                            <option>Dólar (US$)</option>
                            <option>Euro (€)</option>
                          </select>
                        </div>
                      </div>
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
