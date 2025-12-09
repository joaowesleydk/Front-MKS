// Função para obter imagem do produto
export const getProductImage = (produto) => {
  // Se o produto tem imagem, usar ela
  if (produto?.imagem) {
    return produto.imagem;
  }
  
  // Se o produto tem image (campo alternativo), usar ele
  if (produto?.image) {
    return produto.image;
  }
  
  // Fallback: imagem placeholder do Unsplash
  return 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&q=80';
};