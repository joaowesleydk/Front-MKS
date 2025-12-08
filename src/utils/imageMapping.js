// Mapeamento de imagens locais para produtos
import corretivoImg from '../assets/imagens/corretivo.png';

// Mapeamento de produtos para imagens locais
export const imageMapping = {
  // Cosméticos
  13: corretivoImg, // Kit Skincare Completo
  14: corretivoImg, // Perfume Feminino 100ml
  15: corretivoImg, // Batom Matte Longa Duração
  16: corretivoImg, // Paleta de Sombras
  17: corretivoImg, // Base Líquida HD
  18: corretivoImg, // Máscara de Cílios
};

// Função para obter imagem do produto
export const getProductImage = (produto) => {
  // Usar sempre a imagem do corretivo
  return corretivoImg;
};