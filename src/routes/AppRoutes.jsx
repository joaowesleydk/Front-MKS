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
import { Cosmeticos } from '../pages/Cosmeticos'; // <-- adicionada aqui


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
                <Route path="/cosmeticos" element={<PublicRoute><Cosmeticos /></PublicRoute>} /> {/* <-- adicionada aqui */}

                {/* Rotas Protegidas */}
                {/* Exemplo:
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> 
                */}
            </Routes>
        </Router>
    );
};
