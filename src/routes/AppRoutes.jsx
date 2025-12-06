import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ScrollToTop } from '../components/ScrollToTop';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from '../components/LoadingSpinner';

// Componentes reutilizáveis
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';


// Páginas públicas
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Cadastro } from '../pages/Cadastro';
import { Sacola } from '../pages/Sacola';


import { Hidratantes } from '../pages/CosmeticosBeleza/Hidratantes';
import { Maquiagem } from '../pages/CosmeticosBeleza/Maquiagem';
import { Perfumes } from '../pages/CosmeticosBeleza/Perfumes';
import { Sabonetes } from '../pages/CosmeticosBeleza/Sabonetes';
import { Vestidos } from '../pages/Feminina/Vestidos';


import { Aneis } from '../pages/Bijuterias/Aneis';
import { Brincos } from '../pages/Bijuterias/Brincos';
import { Pulseiras } from '../pages/Bijuterias/Pulseiras';
import { Colares } from '../pages/Bijuterias/Colares';

import { Saias } from '../pages/Feminina/Saias';
import { Blusas } from '../pages/Feminina/Blusas';
import { Calcas } from '../pages/Feminina/Calcas';
import { Shorts } from '../pages/Feminina/Shorts';
import { Jeans } from '../pages/Feminina/Jeans';
import { Lingerie } from '../pages/Feminina/Lingerie';

import { Bermudas } from '../pages/Masculina/Bermudas';
import { CalcasMasculinas } from '../pages/Masculina/CalcasMasculinas';
import { Camisetas } from '../pages/Masculina/Camisetas';
import { Camisas } from '../pages/Masculina/Camisas';
import { Blazers } from '../pages/Masculina/Blazers';
import { Jaquetas } from '../pages/Masculina/Jaquetas';

import { Pesquisa } from '../pages/Pesquisa';
import { Pagamento } from '../pages/Pagamento';
import { PagamentoSucesso } from '../pages/PagamentoSucesso';
import { PagamentoErro } from '../pages/PagamentoErro';

// Páginas legais
import { TermosUso } from '../pages/TermosUso';
import { PoliticaPrivacidade } from '../pages/PoliticaPrivacidade';
import { PoliticaTroca } from '../pages/PoliticaTroca';
import { Contato } from '../pages/Contato';
import { TesteEmail } from '../pages/TesteEmail';


// Páginas protegidas
import Perfil from '../pages/Perfil';
import { CadastroProduto } from '../pages/CadastroProduto';
import { AdminRoute } from '../components/AdminRoute';
import { ProtectedRoute } from '../components/ProtectedRoute';

/* ==============================
   Componente de rota pública
   ============================== */
const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <LoadingSpinner size="lg" />;

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
};

/* ==============================
   Configuração de rotas da aplicação
   ============================== */
export const AppRoutes = () => {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                {/* Rotas Públicas */}
                <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/cadastro" element={<PublicRoute><Cadastro /></PublicRoute>} />
                <Route path="/sacola" element={
                    <ProtectedRoute>
                        <PublicRoute>
                            <Sacola />
                        </PublicRoute>
                    </ProtectedRoute>
                } />

               
                <Route path="/cosmeticos/hidratantes" element={<PublicRoute><Hidratantes /></PublicRoute>} />
                <Route path="/cosmeticos/maquiagem" element={<PublicRoute><Maquiagem /></PublicRoute>} />
                <Route path="/cosmeticos/perfumes" element={<PublicRoute><Perfumes /></PublicRoute>} />
                <Route path="/cosmeticos/sabonetes" element={<PublicRoute><Sabonetes /></PublicRoute>} />

                <Route path="/feminina/vestidos" element={<PublicRoute><Vestidos /></PublicRoute>} />

                <Route path="/feminina/saias" element={<PublicRoute><Saias /></PublicRoute>} />
                <Route path="/feminina/blusas" element={<PublicRoute><Blusas /></PublicRoute>} />
                <Route path="/feminina/calcas" element={<PublicRoute><Calcas /></PublicRoute>} />
                <Route path="/feminina/shorts" element={<PublicRoute><Shorts /></PublicRoute>} />
                <Route path="/feminina/jeans" element={<PublicRoute><Jeans /></PublicRoute>} />
                <Route path="/feminina/langerie" element={<PublicRoute><Lingerie /></PublicRoute>} />

                <Route path="/masculina/bermudas" element={<PublicRoute><Bermudas /></PublicRoute>} />
                <Route path="/masculina/calças" element={<PublicRoute><CalcasMasculinas /></PublicRoute>} />
                <Route path="/masculina/camisetas" element={<PublicRoute><Camisetas /></PublicRoute>} />
                <Route path="/masculina/camisas" element={<PublicRoute><Camisas /></PublicRoute>} />
                <Route path="/masculina/blazers" element={<PublicRoute><Blazers /></PublicRoute>} />
                <Route path="/masculina/jaquetas" element={<PublicRoute><Jaquetas /></PublicRoute>} />

                <Route path="/bijuterias/aneis" element={<PublicRoute><Aneis /></PublicRoute>} />
                <Route path='/bijuterias/brincos' element={<PublicRoute><Brincos /></PublicRoute>} />
                <Route path="/bijuterias/pulseiras" element={<PublicRoute><Pulseiras /></PublicRoute>} />
                <Route path="/bijuterias/colares" element={<PublicRoute><Colares /></PublicRoute>} />
                
                <Route path="/pesquisa" element={<PublicRoute><Pesquisa /></PublicRoute>} />
                
                <Route path="/pagamento" element={
                    <ProtectedRoute>
                        <PublicRoute>
                            <Pagamento />
                        </PublicRoute>
                    </ProtectedRoute>
                } />
                <Route path="/pagamento/sucesso" element={<PublicRoute><PagamentoSucesso /></PublicRoute>} />
                <Route path="/pagamento/erro" element={<PublicRoute><PagamentoErro /></PublicRoute>} />
              
                {/* Páginas Legais */}
                <Route path="/termos-uso" element={<PublicRoute><TermosUso /></PublicRoute>} />
                <Route path="/politica-privacidade" element={<PublicRoute><PoliticaPrivacidade /></PublicRoute>} />
                <Route path="/politica-troca" element={<PublicRoute><PoliticaTroca /></PublicRoute>} />
                <Route path="/contato" element={<PublicRoute><Contato /></PublicRoute>} />
                <Route path="/teste-email" element={<PublicRoute><TesteEmail /></PublicRoute>} />


                {/* Rotas Protegidas */}
                <Route path="/perfil" element={
                    <ProtectedRoute>
                        <PublicRoute>
                            <Perfil />
                        </PublicRoute>
                    </ProtectedRoute>
                } />
                <Route path="/admin/produtos" element={
                    <AdminRoute>
                        <PublicRoute>
                            <CadastroProduto />
                        </PublicRoute>
                    </AdminRoute>
                } />
            </Routes>
        </Router>
    );
};
