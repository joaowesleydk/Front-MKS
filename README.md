# 🛍️ Karina Moda Store - E-commerce Frontend

> **E-commerce moderno e completo para moda feminina, masculina, cosméticos e acessórios**

[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://karinamodastore.com.br)
[![React](https://img.shields.io/badge/React-18+-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-Latest-purple?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-CSS-cyan?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

## 🌟 Visão Geral

**Karina Moda Store** é um e-commerce completo desenvolvido com as mais modernas tecnologias web. O projeto oferece uma experiência de compra excepcional com design responsivo, funcionalidades avançadas e integração com APIs de pagamento.

### 🔗 Links Importantes
- **🌐 Site:** [karinamodastore.com.br](https://karinamodastore.com.br)
- **📱 Instagram:** [@kaarinamodas_](https://www.instagram.com/kaarinamodas_?igsh=NW53YmhuaDZrazlv)
- **📧 Contato:** karinamodastore@gmail.com

---

## ✨ Funcionalidades Principais

### 🛒 **E-commerce Completo**
- ✅ Catálogo de produtos com categorias
- ✅ Sistema de carrinho/sacola inteligente
- ✅ Checkout com múltiplas formas de pagamento
- ✅ Cálculo automático de frete por CEP
- ✅ Sistema de promoções e descontos

### 👤 **Autenticação e Perfil**
- ✅ Login tradicional (email/senha)
- ✅ Login social com Google OAuth
- ✅ Perfil personalizável com foto
- ✅ Temas de cores customizáveis
- ✅ Bio e nome de exibição

### 🎨 **Provador Virtual com IA**
- ✅ Upload de foto do usuário
- ✅ Processamento com inteligência artificial
- ✅ Visualização realística de roupas
- ✅ Integração direta com compra

### 💳 **Pagamentos Integrados**
- ✅ Mercado Pago (PIX, Cartão, Boleto)
- ✅ Processamento seguro
- ✅ Redirecionamento automático
- ✅ Confirmação de pagamento

### 📱 **Design Responsivo**
- ✅ Mobile-first approach
- ✅ Interface adaptativa
- ✅ Experiência otimizada para todos os dispositivos
- ✅ Performance otimizada

### 🔧 **Painel Administrativo**
- ✅ Cadastro de produtos
- ✅ Gerenciamento de categorias
- ✅ Sistema de promoções
- ✅ Controle de acesso por roles

---

## 🏗️ Arquitetura e Tecnologias

### **Frontend Stack**
```
React 18+ + Vite
├── 🎨 Tailwind CSS - Estilização
├── 🛣️ React Router - Navegação
├── 🔄 Context API - Estado global
├── 🌐 Axios - Requisições HTTP
├── 🎠 Swiper - Carrosséis
├── 🔔 React Hot Toast - Notificações
├── 🎯 React Icons - Ícones
└── 🔐 Google OAuth - Autenticação
```

### **Integrações Externas**
- **💳 Mercado Pago** - Gateway de pagamento
- **🔍 ViaCEP** - Consulta de endereços
- **🔐 Google OAuth** - Login social
- **🤖 IA Virtual Try-On** - Provador virtual

### **Estrutura do Projeto**
```
src/
├── 📁 components/          # Componentes reutilizáveis
│   ├── Card.jsx           # Card de produto
│   ├── Navbar.jsx         # Barra de navegação
│   ├── Footer.jsx         # Rodapé
│   ├── ProvadorVirtual.jsx # Provador com IA
│   └── ...
├── 📁 pages/              # Páginas da aplicação
│   ├── Home.jsx           # Página inicial
│   ├── Login.jsx          # Autenticação
│   ├── Pagamento.jsx      # Checkout
│   ├── Perfil.jsx         # Perfil do usuário
│   └── ...
├── 📁 context/            # Contextos React
│   ├── AuthContext.jsx    # Autenticação
│   └── CartContext.jsx    # Carrinho
├── 📁 services/           # Serviços e APIs
│   ├── api.js             # Configuração Axios
│   ├── paymentService.js  # Mercado Pago
│   ├── freteService.js    # Cálculo de frete
│   └── virtualTryOnService.js # IA
├── 📁 hooks/              # Hooks customizados
└── 📁 routes/             # Configuração de rotas
```

---

## 🚀 Instalação e Configuração

### **Pré-requisitos**
- Node.js 18+
- npm ou yarn
- Git

### **1. Clone o repositório**
```bash
git clone https://github.com/seu-usuario/Front-MKS.git
cd Front-MKS
```

### **2. Instale as dependências**
```bash
npm install
```

### **3. Configure as variáveis de ambiente**
Crie um arquivo `.env` na raiz do projeto:

```env
# API Backend
VITE_API_URL=https://backend-mks-1.onrender.com

# Google OAuth
VITE_GOOGLE_CLIENT_ID=seu-google-client-id

# Mercado Pago
VITE_MERCADOPAGO_PUBLIC_KEY=sua-public-key-mercadopago
```

### **4. Execute o projeto**
```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

---

## 🔧 Configurações Necessárias

### **Google OAuth Setup**
1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione existente
3. Ative a Google+ API
4. Crie credenciais OAuth 2.0
5. Configure origens autorizadas:
   - `http://localhost:5173` (desenvolvimento)
   - `https://karinamodastore.com.br` (produção)

### **Mercado Pago Setup**
1. Acesse [Mercado Pago Developers](https://www.mercadopago.com.br/developers)
2. Crie uma aplicação
3. Obtenha as credenciais de teste e produção
4. Configure webhooks para confirmação de pagamento

### **Deploy (Vercel)**
1. Conecte o repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

---

## 📋 Funcionalidades Detalhadas

### **🛍️ Sistema de Produtos**
- **Categorias:** Feminina, Masculina, Cosméticos, Bijuterias
- **Filtros:** Por categoria, preço, promoção
- **Busca:** Sistema de pesquisa inteligente
- **Detalhes:** Modal com informações completas

### **🛒 Carrinho/Sacola**
- **Persistência:** LocalStorage para manter itens
- **Proteção:** Só funciona com usuário logado
- **Contador:** Badge com quantidade de itens
- **Gestão:** Adicionar, remover, alterar quantidades

### **💰 Sistema de Pagamento**
- **Métodos:** PIX, Cartão de Crédito, Boleto
- **Frete:** Cálculo automático por CEP
- **Frete Grátis:** Compras acima de R$ 150
- **Retirada:** Opção de retirar na loja

### **👤 Perfil do Usuário**
- **Personalização:** Foto, nome, bio, tema
- **Configurações:** Notificações, privacidade, segurança
- **Histórico:** Pedidos e favoritos
- **Temas:** 5 opções de cores

### **🤖 Provador Virtual**
- **IA Avançada:** Processamento de imagem
- **Realístico:** Visualização de roupas no usuário
- **Integrado:** Compra direta do provador
- **Otimizado:** Redimensionamento automático

---

## 🎨 Design System

### **Cores Principais**
```css
/* Tema Padrão - Roxo */
--primary: #7C3AED
--secondary: #EC4899
--accent: #F59E0B

/* Outros Temas Disponíveis */
--blue: #2563EB
--green: #059669
--orange: #EA580C
--pink: #DB2777
```

### **Tipografia**
- **Font Family:** Inter, system-ui, sans-serif
- **Escalas:** text-xs a text-6xl (Tailwind)
- **Pesos:** 400 (normal) a 900 (black)

### **Componentes**
- **Botões:** Gradientes, estados hover/disabled
- **Cards:** Sombras suaves, bordas arredondadas
- **Modais:** Backdrop blur, animações suaves
- **Forms:** Focus states, validação visual

---

## 📱 Responsividade

### **Breakpoints**
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

### **Adaptações**
- **Navbar:** Menu hambúrguer no mobile
- **Cards:** Grid responsivo (1-4 colunas)
- **Carrossel:** Touch/swipe no mobile
- **Modais:** Fullscreen no mobile

---

## 🔒 Segurança

### **Autenticação**
- **JWT Tokens:** Armazenamento seguro
- **OAuth 2.0:** Google login
- **Proteção de Rotas:** Guards para áreas restritas
- **Expiração:** Logout automático

### **Dados**
- **Validação:** Frontend e backend
- **Sanitização:** Inputs limpos
- **HTTPS:** Comunicação criptografada
- **CORS:** Configuração adequada

---

## 📊 Performance

### **Otimizações**
- **Code Splitting:** Carregamento sob demanda
- **Lazy Loading:** Imagens e componentes
- **Caching:** LocalStorage para dados frequentes
- **Minificação:** Build otimizada

### **Métricas**
- **First Paint:** < 1.5s
- **Interactive:** < 3s
- **Bundle Size:** < 500KB gzipped
- **Lighthouse Score:** 90+

---

## 🧪 Testes

### **Estratégia de Testes**
```bash
# Testes unitários
npm run test

# Testes de integração
npm run test:integration

# Testes E2E
npm run test:e2e
```

### **Cobertura**
- **Componentes:** 85%+
- **Hooks:** 90%+
- **Services:** 95%+
- **Utils:** 100%

---

## 📈 Analytics e Monitoramento

### **Ferramentas**
- **Google Analytics 4:** Comportamento do usuário
- **Hotjar:** Heatmaps e gravações
- **Sentry:** Monitoramento de erros
- **Vercel Analytics:** Performance

### **Métricas Importantes**
- **Conversão:** Taxa de compra
- **Abandono:** Carrinho abandonado
- **Tempo:** Permanência no site
- **Dispositivos:** Mobile vs Desktop

---

## 🤝 Contribuição

### **Como Contribuir**
1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### **Padrões de Código**
- **ESLint:** Linting automático
- **Prettier:** Formatação consistente
- **Conventional Commits:** Mensagens padronizadas
- **Husky:** Git hooks para qualidade

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👥 Equipe

### **Desenvolvimento**
- **Frontend:** React + Vite + Tailwind
- **Backend:** Python + FastAPI
- **Design:** Figma + Tailwind UI
- **Deploy:** Vercel + Render

### **Contato**
- **📧 Email:** karinamodastore@gmail.com
- **📱 WhatsApp:** (35) 9 9885-3145
- **📍 Localização:** Pouso Alegre, MG

---

## 🎯 Roadmap

### **Próximas Funcionalidades**
- [ ] **App Mobile** - React Native
- [ ] **Chat ao Vivo** - Suporte em tempo real
- [ ] **Programa de Fidelidade** - Pontos e recompensas
- [ ] **Marketplace** - Vendedores terceiros
- [ ] **AR/VR** - Provador em realidade aumentada
- [ ] **IA Personalizada** - Recomendações inteligentes

### **Melhorias Técnicas**
- [ ] **PWA** - Progressive Web App
- [ ] **SSR** - Server-Side Rendering
- [ ] **GraphQL** - API mais eficiente
- [ ] **Micro-frontends** - Arquitetura escalável

---

## 📚 Documentação Adicional

- [🔧 Guia de Configuração](docs/setup.md)
- [🎨 Design System](docs/design-system.md)
- [🔌 API Reference](docs/api.md)
- [🚀 Deploy Guide](docs/deploy.md)
- [🧪 Testing Guide](docs/testing.md)

---

<div align="center">

**⭐ Se este projeto te ajudou, deixe uma estrela!**

**Feito com ❤️ por [Karina Moda Store](https://karinamodastore.com.br)**

</div>