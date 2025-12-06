import { Card } from "../../components/Card";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export const Blusas = () => {
    const navigate = useNavigate();
    const { produtos, loading, error } = useProducts('blusas');

    // Produtos de exemplo para testar o provador virtual
    const produtosExemplo = [
        {
            id: 1,
            nome: "Blusa Feminina Básica Branca",
            preco: "49.90",
            categoria: "blusa",
            imagem: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center",
            descricao: "Blusa básica em algodão, perfeita para o dia a dia"
        },
        {
            id: 2,
            nome: "Blusa Feminina Estampada Floral",
            preco: "69.90",
            categoria: "blusa",
            imagem: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center",
            descricao: "Blusa com estampa floral delicada, ideal para ocasiões especiais"
        },
        {
            id: 3,
            nome: "Blusa Feminina Manga Longa Preta",
            preco: "59.90",
            categoria: "blusa",
            imagem: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop&crop=center",
            descricao: "Blusa manga longa elegante em tecido premium"
        },
        {
            id: 4,
            nome: "Blusa Feminina Cropped Rosa",
            preco: "39.90",
            categoria: "blusa",
            imagem: "https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=400&h=400&fit=crop&crop=center",
            descricao: "Blusa cropped moderna e jovem"
        }
    ];

    // Usar produtos do backend ou produtos de exemplo se não houver conexão
    const produtosParaExibir = produtos && produtos.length > 0 ? produtos : produtosExemplo;

    if (loading) return <LoadingSpinner />;

    return (
        <div className="bg-gray-50 min-h-screen py-8 px-4 pt-40">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
                    Blusas
                </h1>
                <Card produtos={produtosParaExibir} />
            </div>
        </div>
    );
};