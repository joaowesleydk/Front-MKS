import { todosProdutos, produtosFeminino, produtosMasculino, produtosCosmeticos, produtosBijuterias, produtosAcessorios, produtosInfantil } from './mockData';
import { vestidos, blusas, calcas, jeans, saias, shorts, lingerie } from './mockSubcategorias';
import { camisas, camisetas, calcasMasculinas, bermudas, jaquetas, blazers } from './mockSubcategoriasMasculino';
import { maquiagem, perfumes, hidratantes, sabonetes } from './mockSubcategoriasCosmeticos';
import { colares, brincos, pulseiras, aneis } from './mockSubcategoriasBijuterias';

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

import { bolsas, relogios, oculos, cintos, body, fantasias, conjuntos, casacos } from './mockAcessoriosInfantil';

const subcategoriasMap = {
  'vestidos': vestidos,
  'blusas': blusas,
  'calcas': calcas,
  'jeans': jeans,
  'saias': saias,
  'shorts': shorts,
  'lingerie': lingerie,
  'camisas': camisas,
  'camisetas': camisetas,
  'calcasmasculinas': calcasMasculinas,
  'bermudas': bermudas,
  'jaquetas': jaquetas,
  'blazers': blazers,
  'maquiagem': maquiagem,
  'perfumes': perfumes,
  'hidratantes': hidratantes,
  'sabonetes': sabonetes,
  'colares': colares,
  'brincos': brincos,
  'pulseiras': pulseiras,
  'aneis': aneis,
  'bolsas': bolsas,
  'relogios': relogios,
  'oculos': oculos,
  'cintos': cintos,
  'body': body,
  'fantasias': fantasias,
  'conjuntos': conjuntos,
  'casacos': casacos
};

export const productService = {
  // Buscar todos os produtos
  getAll: async () => {
    await delay();
    return { data: todosProdutos };
  },
  
  // Buscar produtos por categoria
  getByCategory: async (categoria) => {
    await delay();
    const categoriaLower = categoria.toLowerCase();
    
    // Verifica se é subcategoria
    if (subcategoriasMap[categoriaLower]) {
      return { data: subcategoriasMap[categoriaLower] };
    }
    
    // Categorias principais
    const categoriaMap = {
      'feminino': produtosFeminino,
      'masculino': produtosMasculino,
      'cosmeticos': produtosCosmeticos,
      'bijuterias': produtosBijuterias,
      'acessorios': produtosAcessorios,
      'infantil': produtosInfantil
    };
    return { data: categoriaMap[categoriaLower] || [] };
  },
  
  // Buscar produto por ID
  getById: async (id) => {
    await delay();
    const produto = todosProdutos.find(p => p.id === parseInt(id));
    return { data: produto };
  },
  
  // Pesquisar produtos
  search: async (query) => {
    await delay();
    const results = todosProdutos.filter(p => 
      p.nome.toLowerCase().includes(query.toLowerCase()) ||
      p.descricao.toLowerCase().includes(query.toLowerCase())
    );
    return { data: results };
  },
  
  // Criar novo produto
  create: async (produto) => {
    const token = localStorage.getItem('token');
    
    // Converter campos para o formato esperado pelo backend
    const produtoFormatado = {
      name: produto.nome,
      price: parseFloat(produto.preco),
      category: produto.categoria,
      image: produto.imagem,
      description: produto.descricao,
      promocao: produto.promocao
    };
    
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/frontend-create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(produtoFormatado)
    });
    
    if (!response.ok) {
      throw new Error('Erro ao cadastrar produto');
    }
    
    return await response.json();
  },
  
  // Criar produto com upload de arquivo
  createWithFile: async (formData) => {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/frontend-create-with-file`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Erro ao cadastrar produto com imagem');
    }
    
    return await response.json();
  },
  
  // Atualizar produto
  update: (id, produto) => api.put(`/api/products/${id}`, produto),
  
  // Deletar produto
  delete: (id) => api.delete(`/api/products/${id}`)
};