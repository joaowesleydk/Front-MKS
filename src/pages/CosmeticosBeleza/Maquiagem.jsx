import { Card } from "../../components/Card";
import { useNavigate } from "react-router-dom";


export const Maquiagem = () => {
    const navigate = useNavigate();

    const produtos = [
        {
            nome: "Sérum Glow Dazzle Drops 35Ml- Luluca By Melu",
            preco: "17,90",
            imagem: "https://cdn.awsli.com.br/2500x2500/2752/2752602/produto/375787283/655064-0-oe18jaimfl.jpg",
        },
        {
            nome: "Creme Facial Hidratante Pêssego - Melu 40g",
            preco: "12,66",
            imagem: "https://cdn.awsli.com.br/600x1000/2603/2603033/produto/228237339/whatsapp-image-2023-08-04-at-15-39-58-epiwgh62zb.jpeg",
        },
        {
            nome: "GEL PARA SOBRANCELHA MELU RUBY ROSE",
            preco: "11,00",
            imagem: "https://images.tcdn.com.br/img/img_prod/1074276/gel_para_sobrancelhas_melu_rrf518_ruby_rose_10g_551_1_c7283f0aaf46220358ac0f7f4e53a2e8.png",
        },
        {
            nome: "Pó Compacto Melu - C10",
            preco: "14,99",
            imagem: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-lmytjds16vpo65",
        },

        {
            nome: "Lip Tint Mari Maria Makeup Acqua Tint - Rouge", 
            preco: "30,49", 
            imagem: "https://m.media-amazon.com/images/I/41PeuI1rmfL._AC_SX522_.jpg"
        },

        {
            nome: "MARI MARIA Base E Corretivo Matte Velvet Skin Baunilha Mari Maria",
             preco: "59,99", 
            imagem: "https://m.media-amazon.com/images/I/41tawLiRFzS._AC_SY300_SX300_QL70_ML2_.jpg"
        },

        {
            nome: "Corretivo Líquido Cover Up MMC01 - MM 1800-1 - Mari Maria",
             preco: "35,99", 
             imagem: "https://m.media-amazon.com/images/I/4171KpLgpLL._AC_SY355_.jpg"
        },
        {
            nome: "MARI MARIA SOFT SILK - QUICK BAKE", 
            preco: "29,99", 
            imagem: "https://m.media-amazon.com/images/I/61B0iG9BL7L._AC_SY355_.jpg"
        },
        {   nome: "58,99", 
            preco: "Mari Maria Pincel Para Base E Pó", 
            imagem: "https://m.media-amazon.com/images/I/41bjUbgP20L._AC_SY355_.jpg"
        },
        {   nome:"Blush Sunny Cheeks Mari Maria Makeup Love",
            preco: "44,80",
            imagem: "https://m.media-amazon.com/images/I/61CDHw2lxML._AC_SY300_SX300_QL70_ML2_.jpg"
        },
        {   nome:"Blush Sunny Cheeks Mari Maria Makeup Flashy",
            preco: "43,00",
            imagem: "https://m.media-amazon.com/images/I/61i2m3OrXVL._AC_SY300_SX300_QL70_ML2_.jpg"
        },
        {   nome:"Blush Sunny Cheeks Mari Maria Makeup Dusty",
            preco: " 27,90 ",
            imagem: "https://m.media-amazon.com/images/I/51oysDZAO-L._AC_SY300_SX300_QL70_ML2_.jpg"
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



