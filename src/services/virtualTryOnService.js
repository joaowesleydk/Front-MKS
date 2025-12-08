const REPLICATE_TOKEN = import.meta.env.VITE_REPLICATE_TOKEN;
const CORS_PROXY = "https://corsproxy.io/?";
const REPLICATE_API = "https://api.replicate.com/v1/predictions";

export const virtualTryOnService = {
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
      console.log('Processando com Replicate AI...');
      
      const response = await fetch(CORS_PROXY + REPLICATE_API, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${REPLICATE_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          version: "c871bb9b046607b680449ecbae55fd8c6d945e0a1948644bf2361b3d021d3ff4",
          input: {
            human_img: personImageUrl,
            garm_img: clothImageUrl,
            garment_des: "clothing item"
          }
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao iniciar processamento');
      }

      const prediction = await response.json();
      const result = await this.waitForPrediction(prediction.id);
      
      if (result.status === 'succeeded' && result.output) {
        console.log('Sucesso com Replicate!');
        return result.output;
      }
      
      throw new Error('Processamento falhou');
    } catch (error) {
      console.error('Erro Replicate:', error);
      throw error;
    }
  },

  async waitForPrediction(predictionId, maxAttempts = 60) {
    for (let i = 0; i < maxAttempts; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = await fetch(CORS_PROXY + `${REPLICATE_API}/${predictionId}`, {
        headers: {
          'Authorization': `Token ${REPLICATE_TOKEN}`,
        }
      });
      
      const prediction = await response.json();
      
      if (prediction.status === 'succeeded' || prediction.status === 'failed') {
        return prediction;
      }
    }
    
    throw new Error('Timeout ao processar');
  }
};
