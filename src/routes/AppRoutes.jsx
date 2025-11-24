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


import { Hidratantes } from '../pages/CosmeticosBeleza/Hidratantes';
import { Maquiagem } from '../pages/CosmeticosBeleza/Maquiagem';
import { Perfumes } from '../pages/CosmeticosBeleza/Perfumes';
import { Sabonetes } from '../pages/CosmeticosBeleza/Sabonetes';
import { Feminina } from '../pages/Feminina/Vestidos';


import { Aneis } from '../pages/Bijuterias/Aneis';




// Páginas protegidas
import { Perfil } from '../pages/Perfil';



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

               
                <Route path="/cosmeticos/hidratantes" element={<PublicRoute><Hidratantes /></PublicRoute>} />
                <Route path="/cosmeticos/maquiagem" element={<PublicRoute><Maquiagem /></PublicRoute>} />
                <Route path="/cosmeticos/perfumes" element={<PublicRoute><Perfumes /></PublicRoute>} />
                <Route path="/cosmeticos/sabonetes" element={<PublicRoute><Sabonetes /></PublicRoute>} />
                <Route path="/feminina/*" element={<PublicRoute><Feminina /></PublicRoute>} />

                
                <Route path="/bijuterias/aneis" element={<PublicRoute><Aneis /></PublicRoute>} />
              
              

                {/* Rotas Protegidas */}
                {/* Exemplo:
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> 
                */}

                <Route path="/perfil" element={<ProductedRoute><Perfil /></ProductedRoute>} />
            </Routes>
        </Router>
    );
};
