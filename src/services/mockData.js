// Mock de usuários
export const mockUsers = [
  {
    id: 1,
    email: "admin@karinamodastore.com",
    password: "admin123",
    nome: "Administrador",
    role: "admin",
    foto: "https://ui-avatars.com/api/?name=Admin&background=7C3AED&color=fff"
  },
  {
    id: 2,
    email: "cliente@teste.com",
    password: "123456",
    nome: "Cliente Teste",
    role: "user",
    foto: "https://ui-avatars.com/api/?name=Cliente&background=EC4899&color=fff"
  }
];

// Mock de produtos - Feminino
export const produtosFeminino = [
  {
    id: 1,
    nome: "Vestido Floral Primavera",
    preco: "R$ 129,90",
    categoria: "feminino",
    imagem: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80",
    descricao: "Vestido leve e elegante com estampa floral",
    estoque: 15
  },
  {
    id: 2,
    nome: "Blusa Manga Longa Básica",
    preco: "R$ 79,90",
    categoria: "feminino",
    imagem: "https://images.unsplash.com/photo-1564257577-d18b7c1a0f43?w=500&q=80",
    descricao: "Blusa confortável para o dia a dia",
    estoque: 25
  },
  {
    id: 3,
    nome: "Calça Jeans Skinny",
    preco: "R$ 149,90",
    categoria: "feminino",
    imagem: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80",
    descricao: "Calça jeans com modelagem skinny",
    estoque: 20
  },
  {
    id: 4,
    nome: "Saia Midi Plissada",
    preco: "R$ 99,90",
    categoria: "feminino",
    imagem: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500&q=80",
    descricao: "Saia midi elegante e versátil",
    estoque: 18
  },
  {
    id: 5,
    nome: "Conjunto Moletom Feminino",
    preco: "R$ 189,90",
    categoria: "feminino",
    imagem: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80",
    descricao: "Conjunto confortável e estiloso",
    estoque: 12
  },
  {
    id: 6,
    nome: "Blazer Alfaiataria",
    preco: "R$ 219,90",
    categoria: "feminino",
    imagem: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500&q=80",
    descricao: "Blazer elegante para looks formais",
    estoque: 10
  }
];

// Mock de produtos - Masculino
export const produtosMasculino = [
  {
    id: 7,
    nome: "Camisa Social Slim",
    preco: "R$ 119,90",
    categoria: "masculino",
    imagem: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&q=80",
    descricao: "Camisa social com corte moderno",
    estoque: 22
  },
  {
    id: 8,
    nome: "Camiseta Básica Premium",
    preco: "R$ 59,90",
    categoria: "masculino",
    imagem: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
    descricao: "Camiseta de algodão premium",
    estoque: 30
  },
  {
    id: 9,
    nome: "Calça Chino Masculina",
    preco: "R$ 139,90",
    categoria: "masculino",
    imagem: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&q=80",
    descricao: "Calça chino versátil e confortável",
    estoque: 18
  },
  {
    id: 10,
    nome: "Jaqueta Jeans Masculina",
    preco: "R$ 199,90",
    categoria: "masculino",
    imagem: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80",
    descricao: "Jaqueta jeans clássica",
    estoque: 15
  },
  {
    id: 11,
    nome: "Bermuda Sarja",
    preco: "R$ 89,90",
    categoria: "masculino",
    imagem: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&q=80",
    descricao: "Bermuda casual para o verão",
    estoque: 25
  },
  {
    id: 12,
    nome: "Moletom Capuz",
    preco: "R$ 149,90",
    categoria: "masculino",
    imagem: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80",
    descricao: "Moletom confortável com capuz",
    estoque: 20
  }
];

// Mock de produtos - Cosméticos
export const produtosCosmeticos = [
  {
    id: 13,
    nome: "Kit Skincare Completo",
    preco: "R$ 159,90",
    categoria: "cosmeticos",
    imagem: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80",
    descricao: "Kit completo para cuidados com a pele",
    estoque: 30
  },
  {
    id: 14,
    nome: "Perfume Feminino 100ml",
    preco: "R$ 189,90",
    categoria: "cosmeticos",
    imagem: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80",
    descricao: "Fragrância sofisticada e duradoura",
    estoque: 25
  },
  {
    id: 15,
    nome: "Batom Matte Longa Duração",
    preco: "R$ 39,90",
    categoria: "cosmeticos",
    imagem: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&q=80",
    descricao: "Batom matte com alta pigmentação",
    estoque: 50
  },
  {
    id: 16,
    nome: "Paleta de Sombras",
    preco: "R$ 79,90",
    categoria: "cosmeticos",
    imagem: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&q=80",
    descricao: "Paleta com 12 cores versáteis",
    estoque: 35
  },
  {
    id: 17,
    nome: "Base Líquida HD",
    preco: "R$ 69,90",
    categoria: "cosmeticos",
    imagem: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80",
    descricao: "Base de alta cobertura",
    estoque: 40
  },
  {
    id: 18,
    nome: "Máscara de Cílios",
    preco: "R$ 49,90",
    categoria: "cosmeticos",
    imagem: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=500&q=80",
    descricao: "Máscara para volume e alongamento",
    estoque: 45
  }
];

// Mock de produtos - Bijuterias
export const produtosBijuterias = [
  {
    id: 19,
    nome: "Colar Dourado Delicado",
    preco: "R$ 49,90",
    categoria: "bijuterias",
    imagem: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80",
    descricao: "Colar fino e elegante",
    estoque: 30
  },
  {
    id: 20,
    nome: "Brinco Argola Grande",
    preco: "R$ 39,90",
    categoria: "bijuterias",
    imagem: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80",
    descricao: "Brinco argola estilo moderno",
    estoque: 40
  },
  {
    id: 21,
    nome: "Pulseira Feminina Prata",
    preco: "R$ 59,90",
    categoria: "bijuterias",
    imagem: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80",
    descricao: "Pulseira delicada prateada",
    estoque: 35
  },
  {
    id: 22,
    nome: "Anel Solitário",
    preco: "R$ 44,90",
    categoria: "bijuterias",
    imagem: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&q=80",
    descricao: "Anel elegante com pedra",
    estoque: 50
  },
  {
    id: 23,
    nome: "Conjunto Colar e Brinco",
    preco: "R$ 79,90",
    categoria: "bijuterias",
    imagem: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80",
    descricao: "Conjunto harmonioso e sofisticado",
    estoque: 25
  },
  {
    id: 24,
    nome: "Tiara Luxo",
    preco: "R$ 34,90",
    categoria: "bijuterias",
    imagem: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=500&q=80",
    descricao: "Tiara com detalhes brilhantes",
    estoque: 45
  }
];

// Importar novas categorias
import { produtosAcessorios, produtosInfantil } from './mockAcessoriosInfantil';

// Todos os produtos
export const todosProdutos = [
  ...produtosFeminino,
  ...produtosMasculino,
  ...produtosCosmeticos,
  ...produtosBijuterias,
  ...produtosAcessorios,
  ...produtosInfantil
];

export { produtosAcessorios, produtosInfantil };
