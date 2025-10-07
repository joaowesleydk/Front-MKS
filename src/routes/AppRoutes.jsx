import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from '../components/LoadingSpinner';

// Componentes reutilizáveis
import { Navbar } from '../components/Navbar';

// Páginas públicas
import { Home } from '../pages/Home';

// Páginas protegidas (apenas para usuários autenticados)





/* ==============================
   Componente de rota protegida
   ============================== */
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth(); // Obtém usuário e estado de carregamento

    if (loading) return <LoadingSpinner size="lg" />; // Mostra spinner enquanto carrega
    if (!user) return <Navigate to="/login" replace />; // Redireciona não autenticados para login

    return (
        <div className="min-h-screen flex">
            <Sidebar /> {/* Sidebar lateral sempre visível */}
            <main className="flex-1 lg:ml-64 p-8">
                {children} {/* Conteúdo da página protegida */}
            </main>
        </div>
    );
};

/* ==============================
   Componente de rota pública
   ============================== */
const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth(); // Obtém usuário e estado de carregamento

    if (loading) return <LoadingSpinner size="lg" />; // Mostra spinner enquanto carrega
    if (user) return <Navigate to="/dashboard" replace />; // Redireciona usuário logado para dashboard

    return (
        <div className="min-h-screen">
            <Navbar /> {/* Navbar pública */}
            <main className=" mx-auto ">
                {children} {/* Conteúdo da página pública */}
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
                <Route path="/" element={
                    <PublicRoute>
                        <Home />
                    </PublicRoute>
                } />


            </Routes>
        </Router>
    );
};
