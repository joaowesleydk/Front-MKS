import { HiOutlineCamera, HiOutlineShieldCheck } from 'react-icons/hi2';

export const ImagePermissionModal = ({ isOpen, onAccept, onDecline }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <HiOutlineCamera className="text-blue-600 text-2xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Permissão para Uso de Imagem
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Ao fazer upload da sua foto, você autoriza o uso da imagem para:
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <HiOutlineShieldCheck className="text-green-500 text-lg mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-700">
              Processamento com IA para provador virtual
            </p>
          </div>
          <div className="flex items-start gap-3">
            <HiOutlineShieldCheck className="text-green-500 text-lg mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-700">
              Exibição no seu perfil pessoal
            </p>
          </div>
          <div className="flex items-start gap-3">
            <HiOutlineShieldCheck className="text-green-500 text-lg mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-700">
              Armazenamento seguro em nossos servidores
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
          <p className="text-xs text-yellow-800">
            <strong>Importante:</strong> Sua imagem não será compartilhada com terceiros 
            e você pode removê-la a qualquer momento.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onDecline}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={onAccept}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Autorizo
          </button>
        </div>
      </div>
    </div>
  );
};