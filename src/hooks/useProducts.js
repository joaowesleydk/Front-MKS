import { useState, useEffect } from 'react';
import { mockProductService } from '../services/mockProductService';

// Produtos mockados completos para todas as categorias
const produtosMockados = [
  // FEMININA
  {
    id: 1,
    nome: "Vestido Floral Elegante",
    descricao: "Vestido midi com estampa floral delicada, perfeito para ocasiões especiais.",
    preco: 89.90,
    promocao: true,
    categoria: "feminina",
    subcategoria: "vestidos",
    tamanhos: ["P", "M", "G", "GG"],
    cores: ["Rosa", "Azul", "Verde"],
    estoque: 15,
    imagens: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
      "https://images.unsplash.com/photo-1566479179817-c0ae8e0d4b8b?w=400",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400",
      "https://images.unsplash.com/photo-1583496661160-fb5886a13d44?w=400"
    ]
  },
  {
    id: 2,
    nome: "Blusa Casual Moderna",
    descricao: "Blusa básica de algodão com modelagem moderna. Ideal para o dia a dia.",
    preco: 45.90,
    promocao: true,
    categoria: "feminina",
    subcategoria: "blusas",
    tamanhos: ["PP", "P", "M", "G"],
    cores: ["Branco", "Preto", "Cinza"],
    estoque: 25,
    imagens: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400",
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=400",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400",
      "https://images.unsplash.com/photo-1564257577-0a4b8c0b8e4c?w=400",
      "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=400"
    ]
  },
  {
    id: 3,
    nome: "Calça Jeans Premium",
    descricao: "Calça jeans de alta qualidade com modelagem skinny.",
    preco: 129.90,
    promocao: false,
    categoria: "feminina",
    subcategoria: "jeans",
    tamanhos: ["36", "38", "40", "42", "44"],
    cores: ["Azul Escuro", "Azul Claro", "Preto"],
    estoque: 20,
    imagens: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400",
      "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=400",
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
      "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=400"
    ]
  },
  {
    id: 4,
    nome: "Saia Midi Elegante",
    descricao: "Saia midi com corte evasê, perfeita para looks femininos e elegantes.",
    preco: 75.90,
    promocao: false,
    categoria: "feminina",
    subcategoria: "saias",
    tamanhos: ["P", "M", "G", "GG"],
    cores: ["Preto", "Azul Marinho", "Vinho"],
    estoque: 18,
    imagens: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a13d44?w=400",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400",
      "https://images.unsplash.com/photo-1566479179817-c0ae8e0d4b8b?w=400"
    ]
  },
  {
    id: 5,
    nome: "Shorts Jeans Destroyed",
    descricao: "Shorts jeans com detalhes destroyed, estilo jovem e descontraído.",
    preco: 55.90,
    promocao: true,
    categoria: "feminina",
    subcategoria: "shorts",
    tamanhos: ["36", "38", "40", "42"],
    cores: ["Azul Claro", "Azul Escuro"],
    estoque: 22,
    imagens: [
      "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=400",
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
      "https://images.unsplash.com/photo-1583496661160-fb5886a13d44?w=400"
    ]
  },
  {
    id: 6,
    nome: "Conjunto de Lingerie",
    descricao: "Conjunto de sutiã e calcinha em renda delicada, confortável e elegante.",
    preco: 65.90,
    promocao: false,
    categoria: "feminina",
    subcategoria: "lingerie",
    tamanhos: ["P", "M", "G"],
    cores: ["Preto", "Nude", "Branco"],
    estoque: 30,
    imagens: [
      "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=400",
      "https://images.unsplash.com/photo-1559582927-42c0c2c1fe48?w=400",
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=400",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400",
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=400"
    ]
  },

  // MASCULINA
  {
    id: 7,
    nome: "Camiseta Básica Premium",
    descricao: "Camiseta 100% algodão com gola redonda. Peça essencial no guarda-roupa.",
    preco: 35.90,
    promocao: true,
    categoria: "masculina",
    subcategoria: "camisetas",
    tamanhos: ["P", "M", "G", "GG", "XG"],
    cores: ["Branco", "Preto", "Cinza", "Azul Marinho"],
    estoque: 30,
    imagens: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      "https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=400",
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400"
    ]
  },
  {
    id: 8,
    nome: "Camisa Social Slim",
    descricao: "Camisa social com corte slim fit, ideal para trabalho e eventos.",
    preco: 89.90,
    promocao: false,
    categoria: "masculina",
    subcategoria: "camisas",
    tamanhos: ["P", "M", "G", "GG"],
    cores: ["Branco", "Azul Claro", "Listrado"],
    estoque: 15,
    imagens: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      "https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=400"
    ]
  },
  {
    id: 9,
    nome: "Bermuda Sarja Casual",
    descricao: "Bermuda em sarja com modelagem confortável para o verão.",
    preco: 65.90,
    promocao: true,
    categoria: "masculina",
    subcategoria: "bermudas",
    tamanhos: ["38", "40", "42", "44", "46"],
    cores: ["Bege", "Azul Marinho", "Verde Militar"],
    estoque: 20,
    imagens: [
      "https://images.unsplash.com/photo-1506629905607-d405d7d3b880?w=400",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400",
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400"
    ]
  },
  {
    id: 10,
    nome: "Calça Chino Moderna",
    descricao: "Calça chino com corte moderno, versátil para diversas ocasiões.",
    preco: 99.90,
    promocao: false,
    categoria: "masculina",
    subcategoria: "calcas",
    tamanhos: ["38", "40", "42", "44", "46"],
    cores: ["Bege", "Azul Marinho", "Preto"],
    estoque: 18,
    imagens: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400",
      "https://images.unsplash.com/photo-1506629905607-d405d7d3b880?w=400",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      "https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=400"
    ]
  },
  {
    id: 11,
    nome: "Blazer Masculino Casual",
    descricao: "Blazer casual com corte moderno, perfeito para looks smart casual.",
    preco: 189.90,
    promocao: false,
    categoria: "masculina",
    subcategoria: "blazers",
    tamanhos: ["P", "M", "G", "GG"],
    cores: ["Azul Marinho", "Cinza", "Preto"],
    estoque: 10,
    imagens: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400",
      "https://images.unsplash.com/photo-1506629905607-d405d7d3b880?w=400"
    ]
  },
  {
    id: 12,
    nome: "Jaqueta Jeans Masculina",
    descricao: "Jaqueta jeans clássica, peça atemporal para compor looks casuais.",
    preco: 129.90,
    promocao: true,
    categoria: "masculina",
    subcategoria: "jaquetas",
    tamanhos: ["P", "M", "G", "GG"],
    cores: ["Azul Escuro", "Azul Claro", "Preto"],
    estoque: 12,
    imagens: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"
    ]
  },

  // INFANTIL
  {
    id: 13,
    nome: "Conjunto Infantil Divertido",
    descricao: "Conjunto de camiseta e shorts para crianças. Estampa colorida e tecido macio.",
    preco: 65.90,
    promocao: true,
    categoria: "infantil",
    subcategoria: "conjuntos",
    tamanhos: ["2", "4", "6", "8", "10"],
    cores: ["Amarelo", "Rosa", "Azul"],
    estoque: 18,
    imagens: ["https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400"]
  },
  {
    id: 14,
    nome: "Body Infantil Estampado",
    descricao: "Body de algodão orgânico com estampas fofas para bebês.",
    preco: 35.90,
    promocao: false,
    categoria: "infantil",
    subcategoria: "body",
    tamanhos: ["RN", "P", "M", "G"],
    cores: ["Rosa", "Azul", "Amarelo"],
    estoque: 25,
    imagens: ["https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400"]
  },
  {
    id: 15,
    nome: "Casaco Infantil Quentinho",
    descricao: "Casaco de moletom com capuz, ideal para dias frios.",
    preco: 79.90,
    promocao: true,
    categoria: "infantil",
    subcategoria: "casacos",
    tamanhos: ["2", "4", "6", "8", "10", "12"],
    cores: ["Cinza", "Rosa", "Azul"],
    estoque: 15,
    imagens: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"]
  },
  {
    id: 16,
    nome: "Fantasia Princesa",
    descricao: "Fantasia de princesa com detalhes brilhantes, perfeita para festas.",
    preco: 89.90,
    promocao: false,
    categoria: "infantil",
    subcategoria: "fantasias",
    tamanhos: ["2", "4", "6", "8"],
    cores: ["Rosa", "Azul", "Roxo"],
    estoque: 12,
    imagens: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"]
  },

  // ACESSÓRIOS
  {
    id: 17,
    nome: "Relógio Feminino Elegante",
    descricao: "Relógio com pulseira de couro e mostrador delicado.",
    preco: 149.90,
    promocao: false,
    categoria: "acessorios",
    subcategoria: "relogio",
    tamanhos: ["Único"],
    cores: ["Dourado", "Prateado", "Rose Gold"],
    estoque: 20,
    imagens: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400"
    ]
  },
  {
    id: 18,
    nome: "Laço de Cabelo Delicado",
    descricao: "Laço de cetim com detalhes em pérolas, perfeito para penteados.",
    preco: 25.90,
    promocao: true,
    categoria: "acessorios",
    subcategoria: "lacos",
    tamanhos: ["Único"],
    cores: ["Rosa", "Branco", "Azul"],
    estoque: 30,
    imagens: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=400",
      "https://images.unsplash.com/photo-1559582927-42c0c2c1fe48?w=400"
    ]
  },
  {
    id: 19,
    nome: "Óculos de Sol Moderno",
    descricao: "Óculos de sol com proteção UV e design contemporâneo.",
    preco: 89.90,
    promocao: false,
    categoria: "acessorios",
    subcategoria: "oculos",
    tamanhos: ["Único"],
    cores: ["Preto", "Marrom", "Dourado"],
    estoque: 15,
    imagens: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400"
    ]
  },
  {
    id: 20,
    nome: "Cinto de Couro Clássico",
    descricao: "Cinto de couro legítimo com fivela metálica, estilo clássico.",
    preco: 65.90,
    promocao: true,
    categoria: "acessorios",
    subcategoria: "cintos",
    tamanhos: ["P", "M", "G", "GG"],
    cores: ["Marrom", "Preto"],
    estoque: 18,
    imagens: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
      "https://images.unsplash.com/photo-1506629905607-d405d7d3b880?w=400",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400"
    ]
  },
  {
    id: 21,
    nome: "Bolsa Feminina Elegante",
    descricao: "Bolsa de couro sintético com alças ajustáveis e compartimentos.",
    preco: 129.90,
    promocao: false,
    categoria: "acessorios",
    subcategoria: "bolsas",
    tamanhos: ["Único"],
    cores: ["Preto", "Marrom", "Bege"],
    estoque: 12,
    imagens: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400"
    ]
  },
  {
    id: 22,
    nome: "Chapéu de Palha Estiloso",
    descricao: "Chapéu de palha com fita decorativa, perfeito para o verão.",
    preco: 45.90,
    promocao: true,
    categoria: "acessorios",
    subcategoria: "chapeus",
    tamanhos: ["Único"],
    cores: ["Natural", "Branco", "Bege"],
    estoque: 20,
    imagens: [
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400"
    ]
  },

  // COSMÉTICOS
  {
    id: 23,
    nome: "Hidratante Facial Premium",
    descricao: "Hidratante facial com ácido hialurônico para todos os tipos de pele.",
    preco: 75.90,
    promocao: false,
    categoria: "cosmeticos",
    subcategoria: "hidratantes",
    tamanhos: ["50ml"],
    cores: ["Único"],
    estoque: 25,
    imagens: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400"
    ]
  },
  {
    id: 24,
    nome: "Perfume Floral Feminino",
    descricao: "Perfume com notas florais delicadas, fragrância duradoura.",
    preco: 89.90,
    promocao: true,
    categoria: "cosmeticos",
    subcategoria: "perfumes",
    tamanhos: ["100ml"],
    cores: ["Único"],
    estoque: 15,
    imagens: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400"
    ]
  },
  {
    id: 25,
    nome: "Kit Maquiagem Completo",
    descricao: "Kit com base, pó, blush e batom para maquiagem completa.",
    preco: 129.90,
    promocao: false,
    categoria: "cosmeticos",
    subcategoria: "maquiagem",
    tamanhos: ["Único"],
    cores: ["Tons Neutros", "Tons Rosados"],
    estoque: 18,
    imagens: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400"
    ]
  },
  {
    id: 26,
    nome: "Sabonete Artesanal Natural",
    descricao: "Sabonete artesanal com óleos essenciais e ingredientes naturais.",
    preco: 25.90,
    promocao: true,
    categoria: "cosmeticos",
    subcategoria: "banho",
    tamanhos: ["100g"],
    cores: ["Lavanda", "Rosas", "Erva Doce"],
    estoque: 30,
    imagens: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400"
    ]
  },

  // BIJUTERIAS
  {
    id: 27,
    nome: "Anel Delicado Dourado",
    descricao: "Anel folheado a ouro com pedra zirconia, design minimalista.",
    preco: 35.90,
    promocao: false,
    categoria: "bijuterias",
    subcategoria: "aneis",
    tamanhos: ["15", "17", "19", "21"],
    cores: ["Dourado", "Prateado"],
    estoque: 25,
    imagens: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=400",
      "https://images.unsplash.com/photo-1559582927-42c0c2c1fe48?w=400"
    ]
  },
  {
    id: 28,
    nome: "Brincos de Pérola",
    descricao: "Brincos clássicos com pérolas cultivadas, elegantes e atemporais.",
    preco: 45.90,
    promocao: true,
    categoria: "bijuterias",
    subcategoria: "brincos",
    tamanhos: ["Único"],
    cores: ["Branco", "Creme"],
    estoque: 20,
    imagens: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=400",
      "https://images.unsplash.com/photo-1559582927-42c0c2c1fe48?w=400"
    ]
  },
  {
    id: 29,
    nome: "Pulseira Charm Personalizada",
    descricao: "Pulseira com charms intercambiáveis, personalize seu estilo.",
    preco: 65.90,
    promocao: false,
    categoria: "bijuterias",
    subcategoria: "pulseiras",
    tamanhos: ["Único"],
    cores: ["Dourado", "Prateado"],
    estoque: 15,
    imagens: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=400",
      "https://images.unsplash.com/photo-1559582927-42c0c2c1fe48?w=400"
    ]
  },
  {
    id: 30,
    nome: "Colar Gargantilha Moderna",
    descricao: "Gargantilha com pingente geométrico, peça moderna e estilosa.",
    preco: 55.90,
    promocao: true,
    categoria: "bijuterias",
    subcategoria: "colares",
    tamanhos: ["Único"],
    cores: ["Dourado", "Prateado"],
    estoque: 18,
    imagens: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=400",
      "https://images.unsplash.com/photo-1559582927-42c0c2c1fe48?w=400"
    ]
  }
];

export const useProducts = (categoria = null) => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usarMock, setUsarMock] = useState(false);

  // Função para formatar preço
  const formatarProdutos = (produtosList) => {
    return produtosList.map(produto => ({
      ...produto,
      preco: typeof produto.preco === 'number' ? `R$ ${produto.preco.toFixed(2).replace('.', ',')}` : produto.preco,
      imagem: produto.imagens?.[0] || produto.imagem
    }));
  };

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        setLoading(true);
        const response = categoria 
          ? await mockProductService.getByCategory(categoria)
          : await mockProductService.getAll();
        
        const data = response.data || response || [];
        setProdutos(Array.isArray(data) ? formatarProdutos(data) : []);
        localStorage.removeItem('usingMockData');
        setUsarMock(false);
      } catch (err) {
        console.log('Usando produtos mockados para demonstração');
        localStorage.setItem('usingMockData', 'true');
        const produtosFiltrados = categoria 
          ? produtosMockados.filter(p => p.categoria === categoria)
          : produtosMockados;
        setProdutos(formatarProdutos(produtosFiltrados));
        setError(null);
        setUsarMock(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, [categoria]);

  return { produtos, loading, error, usarMock, setProdutos };
};