
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/Card";

export const Hidratantes = () => {
    const navigate = useNavigate();

    const produtos = [
        {
            nome: "CeraVe Loção Hidratante Pele Seca a Muito Seca 1L",
            preco: "R$ 104,99",
            imagem: "https://tse3.mm.bing.net/th/id/OIP.8FRatrHz24mynz_QEI_rcgHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
        },
        {
            nome: "Loção de Limpeza Hidratante Para o Banho CeraVe Pele Normal a Seca com 473ml",
            preco: "R$ 104,99",
            imagem: "https://i.zst.com.br/thumbs/12/15/1f/-1158297421.jpg",
        },
        {
            nome: "Gel de Limpeza CeraVe Acne Control Pele Oleosa a Acneica 140g",
            preco: "R$ 64,90",
            imagem: "https://images.tcdn.com.br/img/img_prod/1221238/gel_de_limpeza_cerave_acne_control_140g_7609_1_de82314ee48826d41679d6491b1df67f.png",
        },
        {
            nome: "Kit CeraVe para Limpeza Facial - Gel + Sabonete para Pele Oleosa",
            preco: "R$ 150,99",
            imagem: "https://alexfarma.vteximg.com.br/arquivos/ids/166496-1000-1000/CERAVE-GEL-LIMPEZA-FACIAL-PELE-OLEOSA-454G-.jpg?v=638634052204830000",
        },
        {
            nome: "Creme Para o Corpo Hidratante Natura Tododia 400ml",
            preco: "R$ 35,99",
            imagem: "https://down-br.img.susercontent.com/file/cb4e3d875e5586866651657fb1fdc76f",
        },
        {
            nome: "Creme Hidratante Natura • Ameixa de Flor de Baunilha 400ml",
            preco: "R$ 35,99",
            imagem: "https://down-br.img.susercontent.com/file/sg-11134201-7rasm-ma3bmebon5smb4",
        },
        {
            nome: "Kit Tododia Natura Frutas Vermelhas",
            preco: "R$ 79,90",
            imagem: "https://http2.mlstatic.com/D_NQ_NP_890372-MLA45874147372_052021-O.webp",
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

