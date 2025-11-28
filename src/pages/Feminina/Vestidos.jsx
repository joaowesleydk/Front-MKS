import { Card } from "../../components/Card";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export const Vestidos = () => {
    const navigate = useNavigate();
    const { produtos, loading, error } = useProducts('vestidos');

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-center text-red-500 p-10">{error}</div>;

    return (
        <div className="bg-gray-50 min-h-screen p-10 pt-42">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                Vestidos
            </h1>
            <Card produtos={produtos} />
        </div>
    );
};

