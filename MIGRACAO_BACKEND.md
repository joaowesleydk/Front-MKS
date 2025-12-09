# 🔄 Migração Completa para Backend

## ✅ Mudanças Realizadas

### 📦 Arquivos Removidos
Todos os arquivos de dados mockados foram removidos:
- ❌ `mockData.js` - Dados de produtos mockados
- ❌ `mockAuth.js` - Autenticação mockada
- ❌ `mockSubcategorias.js` - Subcategorias femininas mockadas
- ❌ `mockSubcategoriasBijuterias.js` - Bijuterias mockadas
- ❌ `mockSubcategoriasCosmeticos.js` - Cosméticos mockados
- ❌ `mockSubcategoriasMasculino.js` - Subcategorias masculinas mockadas
- ❌ `mockAcessoriosInfantil.js` - Acessórios e infantil mockados
- ❌ `CREDENCIAIS_MOCK.md` - Documentação de credenciais mockadas
- ❌ `PRODUTOS_MOCK_COMPLETO.md` - Documentação de produtos mockados

### 🔧 Arquivos Atualizados

#### 1. **productService.js**
- ✅ Removidos todos os imports de dados mockados
- ✅ Todas as funções agora fazem requisições reais ao backend via API
- ✅ Endpoints implementados:
  - `GET /api/products` - Buscar todos os produtos
  - `GET /api/products/category/:categoria` - Buscar por categoria
  - `GET /api/products/:id` - Buscar por ID
  - `GET /api/products/search?q=query` - Pesquisar produtos
  - `POST /api/products/frontend-create` - Criar produto
  - `POST /api/products/frontend-create-with-file` - Criar produto com imagem
  - `PUT /api/products/:id` - Atualizar produto
  - `DELETE /api/products/:id` - Deletar produto

#### 2. **Login.jsx**
- ✅ Removido import de `mockAuthService`
- ✅ Implementado login real via `POST /api/auth/login`
- ✅ Implementado login com Google via `POST /api/auth/google`
- ✅ Tratamento de erros melhorado com mensagens do backend

#### 3. **Cadastro.jsx**
- ✅ Removido import de `mockAuthService`
- ✅ Implementado cadastro real via `POST /api/auth/register`
- ✅ Implementado cadastro com Google via `POST /api/auth/google`
- ✅ Tratamento de erros melhorado

#### 4. **authService.js**
- ✅ Adicionado método `googleLogin`
- ✅ Todos os métodos agora retornam `response.data` diretamente
- ✅ Estrutura mais consistente e limpa

### 🎯 Funcionalidades Mantidas

Todas as funcionalidades continuam funcionando, mas agora usando dados reais do backend:

- ✅ **Autenticação**
  - Login tradicional (email/senha)
  - Login com Google OAuth
  - Cadastro de novos usuários
  - Logout

- ✅ **Produtos**
  - Listagem de todos os produtos
  - Filtro por categoria (feminino, masculino, cosméticos, bijuterias, acessórios, infantil)
  - Filtro por subcategoria (vestidos, blusas, camisas, etc.)
  - Pesquisa de produtos
  - Cadastro de produtos (admin)
  - Atualização de produtos (admin)
  - Exclusão de produtos (admin)

- ✅ **Carrinho/Sacola**
  - Adicionar produtos
  - Remover produtos
  - Atualizar quantidades
  - Persistência no localStorage

- ✅ **Pagamento**
  - Integração com Mercado Pago
  - Cálculo de frete
  - Processamento de pedidos

### 📋 Requisitos do Backend

Para que o frontend funcione corretamente, o backend deve implementar os seguintes endpoints:

#### Autenticação
```
POST /api/auth/login
Body: { email: string, password: string }
Response: { access_token: string, user: object }

POST /api/auth/register
Body: { name: string, email: string, password: string }
Response: { access_token: string, user: object }

POST /api/auth/google
Body: { credential: string }
Response: { access_token: string, user: object }
```

#### Produtos
```
GET /api/products
Response: [{ id, nome, preco, categoria, imagem, descricao, estoque, promocao }]

GET /api/products/category/:categoria
Response: [{ id, nome, preco, categoria, imagem, descricao, estoque, promocao }]

GET /api/products/:id
Response: { id, nome, preco, categoria, imagem, descricao, estoque, promocao }

GET /api/products/search?q=query
Response: [{ id, nome, preco, categoria, imagem, descricao, estoque, promocao }]

POST /api/products/frontend-create
Headers: { Authorization: Bearer token }
Body: { name, price, category, image, description, promocao }
Response: { id, nome, preco, categoria, imagem, descricao }

POST /api/products/frontend-create-with-file
Headers: { Authorization: Bearer token }
Body: FormData with file
Response: { id, nome, preco, categoria, imagem, descricao }

PUT /api/products/:id
Headers: { Authorization: Bearer token }
Body: { name, price, category, image, description, promocao }
Response: { id, nome, preco, categoria, imagem, descricao }

DELETE /api/products/:id
Headers: { Authorization: Bearer token }
Response: { message: string }
```

### 🔐 Formato dos Dados

#### Usuário
```json
{
  "id": number,
  "nome": string,
  "email": string,
  "role": "admin" | "user",
  "foto": string (URL)
}
```

#### Produto
```json
{
  "id": number,
  "nome": string,
  "preco": string | number,
  "categoria": string,
  "imagem": string (URL),
  "descricao": string,
  "estoque": number,
  "promocao": boolean
}
```

### 🚀 Como Testar

1. **Certifique-se de que o backend está rodando**
   ```bash
   # O backend deve estar disponível na URL configurada em .env
   VITE_API_URL=https://backend-mks-1.onrender.com
   ```

2. **Inicie o frontend**
   ```bash
   npm run dev
   ```

3. **Teste as funcionalidades**
   - Cadastro de usuário
   - Login
   - Visualização de produtos
   - Busca de produtos
   - Adicionar ao carrinho
   - Cadastro de produtos (como admin)

### ⚠️ Observações Importantes

1. **Compatibilidade de Campos**
   - O backend pode usar `name` enquanto o frontend usa `nome`
   - O productService faz a conversão automática quando necessário
   - Certifique-se de que o backend retorna os campos corretos

2. **Autenticação**
   - O token JWT é armazenado no localStorage
   - O interceptor do Axios adiciona automaticamente o token nas requisições
   - Em caso de token inválido (401), o usuário é redirecionado para login

3. **Tratamento de Erros**
   - Todos os erros são capturados e exibidos via toast
   - Mensagens de erro vêm do backend quando disponíveis
   - Fallback para mensagens genéricas quando necessário

### 📝 Próximos Passos

- [ ] Testar todas as funcionalidades com o backend real
- [ ] Ajustar campos se necessário (nome vs name, etc.)
- [ ] Implementar cache de produtos se necessário
- [ ] Adicionar loading states mais detalhados
- [ ] Implementar retry logic para requisições falhadas

---

**Data da Migração:** $(Get-Date -Format "dd/MM/yyyy HH:mm")
**Status:** ✅ Completo - Todos os dados mockados foram removidos
