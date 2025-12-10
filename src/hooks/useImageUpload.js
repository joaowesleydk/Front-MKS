import { useState } from 'react';
import toast from 'react-hot-toast';

export const useImageUpload = () => {
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);
  const [onUploadCallback, setOnUploadCallback] = useState(null);

  const requestImageUpload = (file, callback) => {
    // Validar arquivo
    if (!file) {
      toast.error('Nenhum arquivo selecionado');
      return;
    }

    // Validar tipo
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecione apenas arquivos de imagem');
      return;
    }

    // Validar tamanho (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('A imagem deve ter no máximo 5MB');
      return;
    }

    // Armazenar arquivo e callback
    setPendingFile(file);
    setOnUploadCallback(() => callback);
    setShowPermissionModal(true);
  };

  const handlePermissionAccept = () => {
    if (pendingFile && onUploadCallback) {
      onUploadCallback(pendingFile);
    }
    setShowPermissionModal(false);
    setPendingFile(null);
    setOnUploadCallback(null);
  };

  const handlePermissionDecline = () => {
    toast.info('Upload cancelado pelo usuário');
    setShowPermissionModal(false);
    setPendingFile(null);
    setOnUploadCallback(null);
  };

  return {
    showPermissionModal,
    requestImageUpload,
    handlePermissionAccept,
    handlePermissionDecline
  };
};