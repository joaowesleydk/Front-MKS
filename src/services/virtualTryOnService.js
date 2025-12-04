// Serviço de Provador Virtual com IA
export const virtualTryOnService = {
  // Processar imagem com IA (usando Replicate API)
  processVirtualTryOn: async (userImage, productImage) => {
    try {
      // Opção 1: Replicate API (mais realista)
      const response = await fetch('/api/virtual-tryon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          person_image: userImage,
          garment_image: productImage,
          model: 'virtual-tryon-hd'
        })
      });

      if (!response.ok) {
        throw new Error('Erro na API de IA');
      }

      const result = await response.json();
      return result.output_image;

    } catch (error) {
      console.error('Erro na IA, usando fallback:', error);
      
      // Fallback: Simulação visual simples
      return await this.createSimpleOverlay(userImage, productImage);
    }
  },

  // Fallback: Criar sobreposição simples
  createSimpleOverlay: async (userImage, productImage) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      const userImg = new Image();
      const productImg = new Image();
      
      userImg.onload = () => {
        canvas.width = userImg.width;
        canvas.height = userImg.height;
        
        // Desenhar pessoa
        ctx.drawImage(userImg, 0, 0);
        
        // Adicionar efeito de "roupa"
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = '#4F46E5'; // Cor roxa
        ctx.fillRect(canvas.width * 0.3, canvas.height * 0.3, 
                    canvas.width * 0.4, canvas.height * 0.4);
        
        // Adicionar texto
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText('✨ Provador Virtual', 10, 30);
        
        resolve(canvas.toDataURL());
      };
      
      userImg.src = userImage;
    });
  },

  // Validar imagem antes do processamento
  validateImage: (imageFile) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    
    if (imageFile.size > maxSize) {
      throw new Error('Imagem muito grande. Máximo 5MB.');
    }
    
    if (!allowedTypes.includes(imageFile.type)) {
      throw new Error('Formato não suportado. Use JPG, PNG ou WebP.');
    }
    
    return true;
  },

  // Redimensionar imagem para otimizar processamento
  resizeImage: (file, maxWidth = 512, maxHeight = 512) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calcular dimensões mantendo proporção
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Desenhar imagem redimensionada
        ctx.drawImage(img, 0, 0, width, height);
        
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      
      img.src = URL.createObjectURL(file);
    });
  }
};