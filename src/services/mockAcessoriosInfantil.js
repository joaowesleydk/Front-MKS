// ACESSÓRIOS - Bolsas
export const bolsas = [
  { id: 2201, nome: "Bolsa Feminina Couro", preco: "R$ 189,90", categoria: "bolsas", subcategoria: "acessorios", imagem: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80", descricao: "Bolsa de couro sintético elegante", estoque: 15 },
  { id: 2202, nome: "Bolsa Tiracolo", preco: "R$ 149,90", categoria: "bolsas", subcategoria: "acessorios", imagem: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80", descricao: "Bolsa tiracolo moderna", estoque: 20 },
  { id: 2203, nome: "Mochila Feminina", preco: "R$ 169,90", categoria: "bolsas", subcategoria: "acessorios", imagem: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80", descricao: "Mochila urbana elegante", estoque: 18 },
  { id: 2204, nome: "Clutch Festa", preco: "R$ 129,90", categoria: "bolsas", subcategoria: "acessorios", imagem: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&q=80", descricao: "Clutch para eventos", estoque: 12 }
];

// ACESSÓRIOS - Relógios
export const relogios = [
  { id: 2205, nome: "Relógio Feminino Dourado", preco: "R$ 199,90", categoria: "relogios", subcategoria: "acessorios", imagem: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&q=80", descricao: "Relógio elegante dourado", estoque: 18 },
  { id: 2206, nome: "Relógio Masculino Esportivo", preco: "R$ 249,90", categoria: "relogios", subcategoria: "acessorios", imagem: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&q=80", descricao: "Relógio esportivo resistente", estoque: 16 },
  { id: 2207, nome: "Relógio Digital", preco: "R$ 179,90", categoria: "relogios", subcategoria: "acessorios", imagem: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=500&q=80", descricao: "Relógio digital moderno", estoque: 20 },
  { id: 2208, nome: "Relógio Clássico", preco: "R$ 299,90", categoria: "relogios", subcategoria: "acessorios", imagem: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=500&q=80", descricao: "Relógio clássico atemporal", estoque: 14 }
];

// ACESSÓRIOS - Óculos
export const oculos = [
  { id: 2209, nome: "Óculos de Sol Feminino", preco: "R$ 129,90", categoria: "oculos", subcategoria: "acessorios", imagem: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80", descricao: "Óculos com proteção UV", estoque: 30 },
  { id: 2210, nome: "Óculos de Sol Masculino", preco: "R$ 139,90", categoria: "oculos", subcategoria: "acessorios", imagem: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80", descricao: "Óculos esportivo", estoque: 25 },
  { id: 2211, nome: "Óculos Aviador", preco: "R$ 149,90", categoria: "oculos", subcategoria: "acessorios", imagem: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=500&q=80", descricao: "Óculos aviador clássico", estoque: 22 },
  { id: 2212, nome: "Óculos Redondo", preco: "R$ 119,90", categoria: "oculos", subcategoria: "acessorios", imagem: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=500&q=80", descricao: "Óculos redondo vintage", estoque: 28 }
];

// ACESSÓRIOS - Cintos
export const cintos = [
  { id: 2213, nome: "Cinto Couro Masculino", preco: "R$ 89,90", categoria: "cintos", subcategoria: "acessorios", imagem: "https://images.unsplash.com/photo-1624222247344-550fb60583bb?w=500&q=80", descricao: "Cinto em couro legítimo", estoque: 22 },
  { id: 2214, nome: "Cinto Feminino Fino", preco: "R$ 69,90", categoria: "cintos", subcategoria: "acessorios", imagem: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80", descricao: "Cinto fino elegante", estoque: 26 },
  { id: 2215, nome: "Cinto Trançado", preco: "R$ 79,90", categoria: "cintos", subcategoria: "acessorios", imagem: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=500&q=80", descricao: "Cinto trançado casual", estoque: 20 },
  { id: 2216, nome: "Cinto Fivela Grande", preco: "R$ 99,90", categoria: "cintos", subcategoria: "acessorios", imagem: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80", descricao: "Cinto com fivela statement", estoque: 18 }
];

export const produtosAcessorios = [...bolsas, ...relogios, ...oculos, ...cintos];

// INFANTIL - Body
export const body = [
  { id: 2301, nome: "Body Bebê Kit 3", preco: "R$ 59,90", categoria: "body", subcategoria: "infantil", imagem: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=500&q=80", descricao: "Kit com 3 bodies", estoque: 28 },
  { id: 2302, nome: "Body Manga Longa", preco: "R$ 39,90", categoria: "body", subcategoria: "infantil", imagem: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&q=80", descricao: "Body confortável", estoque: 30 },
  { id: 2303, nome: "Body Regata", preco: "R$ 34,90", categoria: "body", subcategoria: "infantil", imagem: "https://images.unsplash.com/photo-1519689373023-dd07c7988603?w=500&q=80", descricao: "Body para o verão", estoque: 32 },
  { id: 2304, nome: "Body Estampado", preco: "R$ 44,90", categoria: "body", subcategoria: "infantil", imagem: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=500&q=80", descricao: "Body com estampa", estoque: 26 }
];

// INFANTIL - Fantasias
export const fantasias = [
  { id: 2305, nome: "Fantasia Super Herói", preco: "R$ 89,90", categoria: "fantasias", subcategoria: "infantil", imagem: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500&q=80", descricao: "Fantasia de super herói", estoque: 15 },
  { id: 2306, nome: "Fantasia Princesa", preco: "R$ 99,90", categoria: "fantasias", subcategoria: "infantil", imagem: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500&q=80", descricao: "Fantasia de princesa", estoque: 18 },
  { id: 2307, nome: "Fantasia Unicórnio", preco: "R$ 94,90", categoria: "fantasias", subcategoria: "infantil", imagem: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=500&q=80", descricao: "Fantasia fofa", estoque: 20 },
  { id: 2308, nome: "Fantasia Pirata", preco: "R$ 84,90", categoria: "fantasias", subcategoria: "infantil", imagem: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500&q=80", descricao: "Fantasia de pirata", estoque: 16 }
];

// INFANTIL - Conjuntos
export const conjuntos = [
  { id: 2309, nome: "Conjunto Menino Esporte", preco: "R$ 79,90", categoria: "conjuntos", subcategoria: "infantil", imagem: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500&q=80", descricao: "Conjunto esportivo", estoque: 25 },
  { id: 2310, nome: "Conjunto Saia e Blusa", preco: "R$ 79,90", categoria: "conjuntos", subcategoria: "infantil", imagem: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500&q=80", descricao: "Conjunto fofo", estoque: 18 },
  { id: 2311, nome: "Conjunto Moletom", preco: "R$ 89,90", categoria: "conjuntos", subcategoria: "infantil", imagem: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=500&q=80", descricao: "Conjunto quentinho", estoque: 22 },
  { id: 2312, nome: "Conjunto Verão", preco: "R$ 69,90", categoria: "conjuntos", subcategoria: "infantil", imagem: "https://images.unsplash.com/photo-1519689373023-dd07c7988603?w=500&q=80", descricao: "Conjunto leve", estoque: 28 }
];

// INFANTIL - Casacos
export const casacos = [
  { id: 2313, nome: "Jaqueta Infantil Menina", preco: "R$ 99,90", categoria: "casacos", subcategoria: "infantil", imagem: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500&q=80", descricao: "Jaqueta quentinha", estoque: 18 },
  { id: 2314, nome: "Casaco Moletom Infantil", preco: "R$ 89,90", categoria: "casacos", subcategoria: "infantil", imagem: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500&q=80", descricao: "Moletom com capuz", estoque: 22 },
  { id: 2315, nome: "Jaqueta Jeans Infantil", preco: "R$ 109,90", categoria: "casacos", subcategoria: "infantil", imagem: "https://images.unsplash.com/photo-1519689373023-dd07c7988603?w=500&q=80", descricao: "Jaqueta jeans clássica", estoque: 16 },
  { id: 2316, nome: "Casaco Inverno Infantil", preco: "R$ 129,90", categoria: "casacos", subcategoria: "infantil", imagem: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500&q=80", descricao: "Casaco para o frio", estoque: 14 }
];

export const produtosInfantil = [...body, ...fantasias, ...conjuntos, ...casacos];
