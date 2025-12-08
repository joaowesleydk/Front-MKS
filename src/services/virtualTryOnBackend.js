// Serviço que usa BACKEND para provador virtual (sem CORS)
const BACKEND_URL = import.meta.env.VITE_API_URL || 'https://backend-mks-1.onrender.com';

export const virtualTryOnBackend = {
  validateImage(file) {
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error('Imagem muito grande! Máximo 10MB');
    }
    if (!file.type.startsWith('image/')) {
      throw new Error('Arquivo deve ser uma imagem');
    }
  },

  async resizeImage(file, maxWidth = 768) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.9));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  },

  async processVirtualTryOn(personImageUrl, clothImageUrl) {
    try {
      console.log('Processando com backend...');
      
      const response = await fetch(`${BACKEND_URL}/virtual-tryon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          person_image: personImageUrl,
          cloth_image: clothImageUrl
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao processar');
      }

      const data = await response.json();
      
      if (data.result_image) {
        console.log('Sucesso!');
        return data.result_image;
      }
      
      throw new Error('Processamento falhou');
    } catch (error) {
      console.error('Erro:', error);
      throw error;
    }
  }
};
