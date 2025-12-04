import React from "react";

import Promocao1 from "../assets/imagens/Promocao1.png"
import Promocao2 from "../assets/imagens/Promocao2.png"
import Promocao3 from "../assets/imagens/Promocao3.png"

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Card } from "../components/Card";
import { useProducts } from "../hooks/useProducts";
import { LoadingSpinner } from "../components/LoadingSpinner";


export const Home = () => {
    const { produtos, loading, error } = useProducts(); // Buscar todos os produtos
    
    const slides = [
        { img: Promocao1, gradient: "linear-gradient(to bottom, #ADD8E6, #fff)" },
        { img: Promocao2, gradient: "linear-gradient(to bottom, #FFB6C1, #fff)" },
        { img: Promocao3, gradient: "linear-gradient(to bottom, #FFC896, #fff)" },
    ];

    // Garantir que produtos seja sempre um array válido
    const produtosArray = (produtos && Array.isArray(produtos)) ? produtos : [];
    
    // Filtrar produtos em promoção apenas se houver produtos
    const produtosPromocao = produtosArray.length > 0 ? 
        produtosArray.filter(produto => produto && produto.promocao === true) : [];
    
    // Se não houver produtos em promoção, mostrar os primeiros 8 produtos
    const produtosExibir = produtosPromocao.length > 0 ? produtosPromocao : produtosArray.slice(0, 8);




    return (
        <div className="flex flex-col pt-42 ">
            {/* Swiper Banner */}
            <div className="relative">
                <Swiper
                    modules={[Autoplay, Navigation, Pagination]}
                    autoplay={{ delay: 3000 }}
                    loop={true}
                    navigation={true}
                    pagination={{ clickable: true }}
                    className="w-full h-[280px] md:h-[400px] lg:h-[480px]"
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className="w-full h-full flex items-center justify-center overflow-hidden bg-gray-800">
                                <img
                                    src={slide.img}
                                    alt={`Promoção ${index + 1}`}
                                    className="w-full h-full object-cover md:object-contain transition-transform duration-700 hover:scale-105"
                                />
                            </div>

                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Seção de Produtos */}
            <div className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    {loading && <LoadingSpinner />}
                    {error && <div className="text-center text-red-500 p-10">{error}</div>}
                    {!loading && !error && (
                        <Card produtos={produtosExibir} />
                    )}
                    
                    {!loading && produtosExibir.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-600 text-lg mb-4">Nenhum produto encontrado</p>
                            <p className="text-gray-500">Cadastre alguns produtos para vê-los aqui!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
