# 🔌 Requisitos do Backend - Karina Moda Store

## 📋 Visão Geral

Este documento descreve todos os endpoints e formatos de dados que o backend deve implementar para funcionar corretamente com o frontend.

---

## 🔐 Autenticação

### 1. Login Tradicional
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Resposta de Sucesso (200)**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "nome": "João Silva",
    "email": "usuario@email.com",
    "role": "user",
    "foto": "https://exemplo.com/foto.jpg"
  }
}
```

**Resposta de Erro (401)**
```json
{
  "detail": "Email ou senha incorretos"
}
```

---

### 2. Cadastro de Usuário
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Resposta de Sucesso (201)**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "nome": "João Silva",
    "email": "usuario@email.com",
    "role": "user",
    "foto": "https://ui-avatars.com/api/?name=João+Silva"
  }
}
```

**Resposta de Erro (400)**
```json
{
  "detail": "Email já cadastrado"
}
```

---

### 3. Login com Google OAuth
```http
POST /api/auth/google
Content-Type: application/json

{
  "credential": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE4MmU0..."
}
```

**Resposta de Sucesso (200)**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 2,
    "nome": "Maria Santos",
    "email": "maria@gmail.com",
    "role": "user",
    "foto": "https://lh3.googleusercontent.com/..."
  }
}
```

**Notas:**
- Decodificar o JWT do Google para obter email, nome e foto
- Criar usuário se não existir
- Retornar usuário existente se já cadastrado

---

## 🛍️ Produtos

### 1. Listar Todos os Produtos
```http
GET /api/products
```

**Resposta de Sucesso (200)**
```json
[
  {
    "id": 1,
    "nome": "Vestido Floral Primavera",
    "preco": "129.90",
    "categoria": "feminino",
    "imagem": "https://exemplo.com/vestido.jpg",
    "descricao": "Vestido leve e elegante",
    "estoque": 15,
    "promocao": false
  },
  {
    "id": 2,
    "nome": "Camisa Social Slim",
    "preco": "119.90",
    "categoria": "masculino",
    "imagem": "https://exemplo.com/camisa.jpg",
    "descricao": "Camisa social moderna",
    "estoque": 20,
    "promocao": true
  }
]
```

---

### 2. Buscar Produtos por Categoria
```http
GET /api/products/category/:categoria
```

**Exemplos:**
- `/api/products/category/feminino`
- `/api/products/category/masculino`
- `/api/products/category/cosmeticos`
- `/api/products/category/bijuterias`
- `/api/products/category/acessorios`
- `/api/products/category/infantil`

**Subcategorias:**
- `/api/products/category/vestidos`
- `/api/products/category/blusas`
- `/api/products/category/camisas`
- `/api/products/category/jeans`
- etc.

**Resposta de Sucesso (200)**
```json
[
  {
    "id": 1,
    "nome": "Vestido Floral",
    "preco": "129.90",
    "categoria": "feminino",
    "subcategoria": "vestidos",
    "imagem": "https://...",
    "descricao": "...",
    "estoque": 15,
    "promocao": false
  }
]
```

---

### 3. Buscar Produto por ID
```http
GET /api/products/:id
```

**Exemplo:** `/api/products/1`

**Resposta de Sucesso (200)**
```json
{
  "id": 1,
  "nome": "Vestido Floral Primavera",
  "preco": "129.90",
  "categoria": "feminino",
  "imagem": "https://exemplo.com/vestido.jpg",
  "descricao": "Vestido leve e elegante com estampa floral",
  "estoque": 15,
  "promocao": false
}
```

**Resposta de Erro (404)**
```json
{
  "detail": "Produto não encontrado"
}
```

---

### 4. Pesquisar Produtos
```http
GET /api/products/search?q=vestido
```

**Resposta de Sucesso (200)**
```json
[
  {
    "id": 1,
    "nome": "Vestido Floral",
    "preco": "129.90",
    "categoria": "feminino",
    "imagem": "https://...",
    "descricao": "...",
    "estoque": 15,
    "promocao": false
  }
]
```

**Notas:**
- Buscar em `nome` e `descricao`
- Case-insensitive
- Retornar array vazio se nada encontrado

---

### 5. Criar Produto (Admin)
```http
POST /api/products/frontend-create
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Vestido Novo",
  "price": 129.90,
  "category": "feminino",
  "image": "https://exemplo.com/imagem.jpg",
  "description": "Descrição do produto",
  "promocao": false
}
```

**Resposta de Sucesso (201)**
```json
{
  "id": 10,
  "nome": "Vestido Novo",
  "preco": "129.90",
  "categoria": "feminino",
  "imagem": "https://exemplo.com/imagem.jpg",
  "descricao": "Descrição do produto",
  "estoque": 0,
  "promocao": false
}
```

**Resposta de Erro (401)**
```json
{
  "detail": "Não autorizado"
}
```

**Resposta de Erro (403)**
```json
{
  "detail": "Apenas administradores podem criar produtos"
}
```

---

### 6. Criar Produto com Upload de Imagem (Admin)
```http
POST /api/products/frontend-create-with-file
Authorization: Bearer {token}
Content-Type: multipart/form-data

FormData:
- name: "Vestido Novo"
- price: 129.90
- category: "feminino"
- description: "Descrição"
- promocao: false
- file: [arquivo de imagem]
```

**Resposta de Sucesso (201)**
```json
{
  "id": 11,
  "nome": "Vestido Novo",
  "preco": "129.90",
  "categoria": "feminino",
  "imagem": "https://backend.com/uploads/vestido-123.jpg",
  "descricao": "Descrição do produto",
  "estoque": 0,
  "promocao": false
}
```

**Notas:**
- Aceitar JPG, PNG, WEBP
- Máximo 5MB
- Salvar imagem no servidor ou cloud storage
- Retornar URL completa da imagem

---

### 7. Atualizar Produto (Admin)
```http
PUT /api/products/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Vestido Atualizado",
  "price": 149.90,
  "category": "feminino",
  "image": "https://exemplo.com/nova-imagem.jpg",
  "description": "Nova descrição",
  "promocao": true
}
```

**Resposta de Sucesso (200)**
```json
{
  "id": 1,
  "nome": "Vestido Atualizado",
  "preco": "149.90",
  "categoria": "feminino",
  "imagem": "https://exemplo.com/nova-imagem.jpg",
  "descricao": "Nova descrição",
  "estoque": 15,
  "promocao": true
}
```

---

### 8. Deletar Produto (Admin)
```http
DELETE /api/products/:id
Authorization: Bearer {token}
```

**Resposta de Sucesso (200)**
```json
{
  "message": "Produto deletado com sucesso"
}
```

---

## 🔑 Autenticação JWT

### Headers Necessários
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Payload do Token
```json
{
  "user_id": 1,
  "email": "usuario@email.com",
  "role": "admin",
  "exp": 1735689600
}
```

### Validação
- Token deve ser validado em todas as rotas protegidas
- Retornar 401 se token inválido ou expirado
- Retornar 403 se usuário não tem permissão (ex: não é admin)

---

## 📊 Categorias Válidas

### Categorias Principais
- `feminino`
- `masculino`
- `cosmeticos`
- `bijuterias`
- `acessorios`
- `infantil`

### Subcategorias Feminino
- `vestidos`
- `blusas`
- `calcas`
- `jeans`
- `saias`
- `shorts`
- `lingerie`

### Subcategorias Masculino
- `camisas`
- `camisetas`
- `calcasmasculinas`
- `bermudas`
- `jaquetas`
- `blazers`

### Subcategorias Cosméticos
- `maquiagem`
- `perfumes`
- `hidratantes`
- `sabonetes`

### Subcategorias Bijuterias
- `colares`
- `brincos`
- `pulseiras`
- `aneis`

### Subcategorias Acessórios
- `bolsas`
- `relogios`
- `oculos`
- `cintos`

### Subcategorias Infantil
- `body`
- `fantasias`
- `conjuntos`
- `casacos`

---

## 🔒 CORS

O backend deve permitir requisições do frontend:

```python
# FastAPI exemplo
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://karinamodastore.com.br"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## ⚠️ Tratamento de Erros

### Formato Padrão de Erro
```json
{
  "detail": "Mensagem de erro em português"
}
```

### Códigos HTTP
- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Requisição inválida
- `401` - Não autenticado
- `403` - Sem permissão
- `404` - Não encontrado
- `500` - Erro interno do servidor

---

## 🧪 Testes Recomendados

1. **Autenticação**
   - Login com credenciais válidas
   - Login com credenciais inválidas
   - Cadastro de novo usuário
   - Cadastro com email duplicado
   - Login com Google

2. **Produtos**
   - Listar todos os produtos
   - Filtrar por categoria
   - Buscar produto por ID
   - Pesquisar produtos
   - Criar produto (admin)
   - Atualizar produto (admin)
   - Deletar produto (admin)
   - Tentar criar produto sem ser admin (deve falhar)

3. **Segurança**
   - Acessar rota protegida sem token (deve falhar)
   - Acessar rota protegida com token inválido (deve falhar)
   - Acessar rota admin sem ser admin (deve falhar)

---

## 📝 Notas Importantes

1. **Formato de Preço**: Pode ser string ou number, o frontend aceita ambos
2. **Imagens**: URLs devem ser completas e acessíveis
3. **Nomes de Campos**: Backend pode usar `name` ou `nome`, o frontend faz conversão
4. **Case Sensitivity**: Categorias devem ser lowercase
5. **Mensagens de Erro**: Sempre em português para melhor UX

---

**Última Atualização**: Janeiro 2025
**Versão do Frontend**: 1.0.0
**Backend Esperado**: FastAPI + Python
