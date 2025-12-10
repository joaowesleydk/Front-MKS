// Mock do serviço de produtos
const MOCK_PRODUCTS = [
  {
    id: 1,
    nome: "Corretivo Facial",
    preco: "29.90",
    categoria: "cosmeticos",
    imagem: "/corretivo.png",
    descricao: "Corretivo facial de alta cobertura",
    estoque: 50,
    promocao: false
  },
  {
    id: 2,
    nome: "Base Líquida",
    preco: "39.90",
    categoria: "cosmeticos",
    imagem: "/corretivo.png",
    descricao: "Base líquida com cobertura natural",
    estoque: 30,
    promocao: true
  },
  {
    id: 3,
    nome: "Pó Compacto",
    preco: "24.90",
    categoria: "cosmeticos",
    imagem: "/corretivo.png",
    descricao: "Pó compacto matificante",
    estoque: 25,
    promocao: false
  },
  {
    id: 4,
    nome: "Blush Rosa",
    preco: "19.90",
    categoria: "cosmeticos",
    imagem: "/corretivo.png",
    descricao: "Blush em tom rosa natural",
    estoque: 40,
    promocao: false
  },
  {
    id: 5,
    nome: "Batom Vermelho",
    preco: "22.90",
    categoria: "cosmeticos",
    imagem: "/corretivo.png",
    descricao: "Batom cremoso cor vermelha",
    estoque: 35,
    promocao: true
  },
  {
    id: 6,
    nome: "Máscara de Cílios",
    preco: "27.90",
    categoria: "cosmeticos",
    imagem: "/corretivo.png",
    descricao: "Máscara para cílios volumosos",
    estoque: 20,
    promocao: false
  }
];

export const mockProductService = {
  // Buscar todos os produtos
  getAll: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: MOCK_PRODUCTS });
      }, 300);
    });
  },
  
  // Buscar produtos por categoria
  getByCategory: async (categoria) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = MOCK_PRODUCTS.filter(p => p.categoria === categoria);
        resolve({ data: filtered });
      }, 300);
    });
  },
  
  // Buscar produto por ID
  getById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = MOCK_PRODUCTS.find(p => p.id === parseInt(id));
        if (product) {
          resolve({ data: product });
        } else {
          reject({ response: { status: 404, data: { detail: 'Produto não encontrado' } } });
        }
      }, 300);
    });
  },
  
  // Pesquisar produtos
  search: async (query) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = MOCK_PRODUCTS.filter(p => 
          p.nome.toLowerCase().includes(query.toLowerCase()) ||
          p.descricao.toLowerCase().includes(query.toLowerCase())
        );
        resolve({ data: filtered });
      }, 300);
    });
  }
};