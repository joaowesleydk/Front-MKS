// Função para obter imagem do produto
export const getProductImage = (produto) => {
  if (!produto) return null;
  
  // Retorna a imagem do produto ou uma imagem padrão
  return produto.imagem || produto.image || null;
};