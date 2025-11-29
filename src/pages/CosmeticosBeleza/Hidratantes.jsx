import { Card } from "../../components/Card";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export const Hidratantes = () => {
    const navigate = useNavigate();
    const { produtos, loading, error } = useProducts('hidratantes');

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-center text-red-500 p-10">{error}</div>;

    return (
        <div className="bg-gray-50 min-h-screen py-4 sm:py-8 px-2 sm:px-4 pt-24 sm:pt-32">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl sm:text-4xl font-bold text-center mb-6 sm:mb-12 text-gray-800">
                    Hidratantes
                </h1>
                <Card produtos={produtos} />
            </div>
        </div>
    );
};

