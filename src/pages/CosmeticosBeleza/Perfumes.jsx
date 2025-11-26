import { Card } from "../../components/Card";
import { useNavigate } from "react-router-dom";

export const Perfumes = () => {
    const navigate = useNavigate();

    const produtos = [
        {
            nome: "", preco: "", imagem: ""
        },

        {
            nome: "", preco: "", imagem: ""
        },

        {
            nome: "", preco: "", imagem: ""
        },

        {
            nome: "", preco: "", imagem: ""
        },

        {
            nome: "", preco: "", imagem: ""
        },

        {
            nome: "", preco: "", imagem: ""
        },

        {
            nome: "", preco: "", imagem: ""
        },

        {
            nome: "", preco: "", imagem: ""
        },

        {
            nome: "", preco: "", imagem: ""
        },

        {
            nome: "", preco: "", imagem: ""
        },
    ];

    return (
        <div className="bg-gray-50 min-h-screen p-10 pt-42  ">
            {/* Título */}
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            </h1>

           
            <Card produtos={produtos}/>:
        </div>
    );
};

