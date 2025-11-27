import { Card } from "../../components/Card";
import { useNavigate } from "react-router-dom";

export const Perfumes = () => {
    const navigate = useNavigate();

    const produtos = [
        {
            nome: "Splash Tododia Frutas Rojas de Natura 200ml",
            preco: "R$ 38,90",
            imagem: "https://resources.claroshop.com/medios-plazavip/mkt/64dbf0304bcc8_bodyfrutosjpg.jpg?scale=500&qlty=75",
        },
        {
            nome: "Kit Tododia Natura Frutas Vermelhas",
            preco: "R$ 79,90",
            imagem: "https://http2.mlstatic.com/D_NQ_NP_890372-MLA45874147372_052021-O.webp",
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


            <Card produtos={produtos} />:
        </div>
    );
};

