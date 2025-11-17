import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from '../components/LoadingSpinner';

// Componentes reutilizáveis
import { Navbar } from '../components/Navbar';


// Páginas públicas
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Cadastro } from '../pages/Cadastro';
import { Sacola } from '../pages/Sacola';
import { Cuidados } from '../pages/CosmeticosBeleza/Cuidados';
import { Feminina } from '../pages/Feminina/Vestidos';
import { Masculina } from '../pages/Masculina/Bermudas';
import { Infantil } from '../pages/Infantil/Casacos';
import { Acessorios } from '../pages/Acessorios/Lacos';
import { Bijuterias } from '../pages/Bijuterias/Aneis';



/* ==============================
   Componente de rota protegida
   ============================== */
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <LoadingSpinner size="lg" />;
    if (!user) return <Navigate to="/login" replace />;

};

/* ==============================
   Componente de rota pública
   ============================== */
const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <LoadingSpinner size="lg" />;

    return (
        <div className="min-h-screen">
            <Navbar />
            <main className="mx-auto">
                {children}
            </main>
        </div>
    );
};

/* ==============================
   Configuração de rotas da aplicação
   ============================== */
export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* Rotas Públicas */}
                <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/cadastro" element={<PublicRoute><Cadastro /></PublicRoute>} />
                <Route path="/sacola" element={<PublicRoute><Sacola /></PublicRoute>} />
                <Route path="/cosmeticos/cuidados/" element={<PublicRoute><Cuidados /></PublicRoute>} />
                <Route path="/cosmeticos/cuidados/hidratantes" element={<PublicRoute><Hidratantes /></PublicRoute>} />
                <Route path="/cosmeticos/cuidados/maquiagem" element={<PublicRoute><Maquiagem /></PublicRoute>} />
                <Route path="/cosmeticos/cuidados/perfumes" element={<PublicRoute><Perfumes /></PublicRoute>} />
                <Route path="/cosmeticos/cuidados/sabonetes" element={<PublicRoute><Sabonetes /></PublicRoute>} />
                <Route path="/feminina" element={<PublicRoute><Feminina /></PublicRoute>} />
                <Route path="/masculina" element={<PublicRoute><Masculina /></PublicRoute>} />
                <Route path="/infantil" element={<PublicRoute><Infantil /></PublicRoute>} />
                <Route path="/acessorios" element={<PublicRoute><Acessorios /></PublicRoute>} />
                <Route path="/bijuterias" element={<PublicRoute><Bijuterias /></PublicRoute>} />

                {/* Rotas Protegidas */}
                {/* Exemplo:
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> 
                */}
            </Routes>
        </Router>
    );
};
