import { useState } from 'react';
import { HiOutlineCamera, HiOutlineSparkles, HiOutlineXMark } from 'react-icons/hi2';
import { Button } from './Button';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { virtualTryOnBackend } from '../services/virtualTryOnBackend';
import toast from 'react-hot-toast';

export const ProvadorVirtual = ({ produto, isOpen, onClose }) => {
  const [userPhoto, setUserPhoto] = useState(null);
  const [userPhotoFile, setUserPhotoFile] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const { addItem } = useCart();
  const navigate = useNavigate();
  
  const isLoggedIn = () => {
    return localStorage.getItem('token') && localStorage.getItem('user');
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Validar imagem
        virtualTryOnBackend.validateImage(file);
        
        // Redimensionar para otimizar
        const resizedImage = await virtualTryOnBackend.resizeImage(file);
        
        setUserPhoto(resizedImage);
        setUserPhotoFile(file);
        setResultImage(null); // Limpar resultado anterior
        
        toast.success('Foto carregada com sucesso!');
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const processVirtualTryOn = async () => {
    if (!userPhoto) {
      toast.error('Faça upload de sua foto primeiro!');
      return;
    }

    setLoading(true);
    try {
      setProcessingStep('Preparando imagens...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProcessingStep('Processando com IA...');
      
      // Processar com IA real
      const result = await virtualTryOnBackend.processVirtualTryOn(
        userPhoto, 
        produto.imagem
      );
      
      setProcessingStep('Finalizando...');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setResultImage(result);
      toast.success('✨ Provador virtual pronto!');
    } catch (error) {
      console.error('Erro no provador virtual:', error);
      toast.error('Erro ao processar. Tente novamente.');
    } finally {
      setLoading(false);
      setProcessingStep('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <HiOutlineSparkles className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Provador Virtual</h2>
              <p className="text-sm text-gray-600">Experimente antes de comprar!</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <HiOutlineXMark className="text-xl text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Upload e controles */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">1. Faça upload da sua foto</h3>
                
                {!userPhoto ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-400 transition-colors">
                    <HiOutlineCamera className="mx-auto text-4xl text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-4">Clique para selecionar sua foto</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="bg-purple-600 text-white px-6 py-2 rounded-full cursor-pointer hover:bg-purple-700 transition-colors"
                    >
                      Escolher Foto
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={userPhoto}
                      alt="Sua foto"
                      className="w-full h-64 object-cover rounded-xl"
                    />
                    <button
                      onClick={() => setUserPhoto(null)}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <HiOutlineXMark className="text-sm" />
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">2. Produto selecionado</h3>
                <div className="flex items-center gap-4">
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="w-16 h-16 object-contain rounded-lg bg-white p-2"
                  />
                  <div>
                    <h4 className="font-medium text-gray-800">{produto.nome}</h4>
                    <p className="text-purple-600 font-bold">R$ {produto.preco}</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={processVirtualTryOn}
                disabled={!userPhoto || loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-4 text-lg"
              >
                {loading ? (
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm">{processingStep || 'Processando...'}</span>
                  </div>
                ) : (
                  '✨ Experimentar Roupa'
                )}
              </Button>
            </div>

            {/* Resultado */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">3. Resultado do provador</h3>
                
                {!resultImage ? (
                  <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl h-80 flex items-center justify-center">
                    <div className="text-center">
                      <HiOutlineSparkles className="mx-auto text-4xl text-gray-300 mb-4" />
                      <p className="text-gray-500">O resultado aparecerá aqui</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={resultImage}
                      alt="Você com a roupa"
                      className="w-full h-80 object-cover rounded-xl"
                    />
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      ✨ IA Virtual Try-On
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs">
                      🔥 Resultado realista
                    </div>
                  </div>
                )}
              </div>

              {resultImage && (
                <div className="space-y-3">
                  <Button 
                    onClick={() => {
                      if (!isLoggedIn()) {
                        toast.error('Você precisa estar logado para salvar no closet!');
                        navigate('/login');
                        return;
                      }
                      
                      const closetImages = JSON.parse(localStorage.getItem('closetImages') || '[]');
                      const newItem = {
                        image: resultImage,
                        productName: produto.nome,
                        productPrice: produto.preco,
                        productId: produto.id,
                        savedAt: new Date().toISOString()
                      };
                      
                      closetImages.push(newItem);
                      localStorage.setItem('closetImages', JSON.stringify(closetImages));
                      toast.success('✨ Look salvo no seu closet!');
                    }}
                    className="w-full bg-yellow-600 hover:bg-yellow-700"
                  >
                    ✨ Salvar no Meu Closet
                  </Button>
                  <Button 
                    onClick={() => {
                      if (!isLoggedIn()) {
                        toast.error('Você precisa estar logado para adicionar à sacola!');
                        navigate('/login', { state: { from: 'cart' } });
                        return;
                      }
                      const success = addItem(produto);
                      if (success) {
                        toast.success(`${produto.nome} adicionado à sacola!`);
                        onClose();
                      }
                    }}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    💚 Gostei! Adicionar à Sacola
                  </Button>
                  <Button 
                    onClick={() => {
                      if (!isLoggedIn()) {
                        toast.error('Você precisa estar logado para comprar!');
                        navigate('/login', { state: { from: 'buy' } });
                        return;
                      }
                      const success = addItem(produto);
                      if (success) {
                        navigate('/pagamento');
                        onClose();
                      }
                    }}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    🛒 Comprar Agora
                  </Button>
                  <Button 
                    onClick={() => setResultImage(null)}
                    className="w-full bg-gray-600 hover:bg-gray-700"
                  >
                    🔄 Tentar Novamente
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};