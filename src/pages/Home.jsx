import React from "react";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Card } from "../components/Card";
import { useProducts } from "../hooks/useProducts";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const Home = () => {
    const navigate = useNavigate();
    const { produtos, loading, error } = useProducts();
    
    const slides = [
        { 
            img: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=600&fit=crop&q=80", 
            gradient: "linear-gradient(to bottom, #DC2626, #fff)",
            titulo: "Vestidos de Festa",
            preco: "R$ 89,90",
            desconto: "50% OFF",
            link: "/feminina/vestidos"
        },
        { 
            img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop&q=80", 
            gradient: "linear-gradient(to bottom, #059669, #fff)",
            titulo: "Coleção Inverno",
            preco: "R$ 129,90",
            desconto: "40% OFF",
            link: "/infantil/casacos"
        },
        { 
            img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=600&fit=crop&q=80", 
            gradient: "linear-gradient(to bottom, #B91C1C, #fff)",
            titulo: "Acessórios Exclusivos",
            preco: "R$ 49,90",
            desconto: "60% OFF",
            link: "/acessorios"
        },
        { 
            img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1200&h=600&fit=crop&q=80", 
            gradient: "linear-gradient(to bottom, #7C3AED, #fff)",
            titulo: "Blusas Femininas",
            preco: "R$ 69,90",
            desconto: "45% OFF",
            link: "/feminina/blusas"
        },
        { 
            img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=600&fit=crop&q=80", 
            gradient: "linear-gradient(to bottom, #EA580C, #fff)",
            titulo: "Jeans Premium",
            preco: "R$ 159,90",
            desconto: "35% OFF",
            link: "/feminina/jeans"
        },
        { 
            img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&h=600&fit=crop&q=80", 
            gradient: "linear-gradient(to bottom, #DB2777, #fff)",
            titulo: "Bolsas e Carteiras",
            preco: "R$ 79,90",
            desconto: "45% OFF",
            link: "/acessorios/bolsas"
        }
    ];

    // Garantir que produtos seja sempre um array válido
    const produtosArray = (produtos && Array.isArray(produtos)) ? produtos : [];
    
    // Filtrar produtos em promoção apenas se houver produtos
    const produtosPromocao = produtosArray.length > 0 ? 
        produtosArray.filter(produto => produto && produto.promocao === true) : [];
    
    // Se não houver produtos em promoção, mostrar os primeiros 8 produtos
    const produtosExibir = produtosPromocao.length > 0 ? produtosPromocao : produtosArray.slice(0, 8);




    return (
        <div className="flex flex-col">
            {/* Swiper Banner */}
            <div className="relative mt-[120px] md:mt-[140px]">
                <Swiper
                    modules={[Autoplay, Navigation, Pagination]}
                    autoplay={{ delay: 3000 }}
                    loop={true}
                    navigation={window.innerWidth >= 768}
                    pagination={{ clickable: true }}
                    className="w-full h-[300px] md:h-[400px] lg:h-[480px] -mx-4 md:mx-0"
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className="w-full h-full flex items-center justify-center overflow-hidden bg-gray-800 relative">
                                <img
                                    src={slide.img}
                                    alt={slide.titulo}
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                                
                                {/* Overlay com informações do produto */}
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <div className="text-center text-white p-6">
                                        <div className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block">
                                            🎄 {slide.desconto} - NATAL
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                                            {slide.titulo}
                                        </h2>
                                        <div className="text-2xl md:text-4xl font-bold mb-4">
                                            <span className="text-yellow-400">{slide.preco}</span>
                                        </div>
                                        <button 
                                            onClick={() => navigate(slide.link)}
                                            className="bg-white text-black px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
                                        >
                                            COMPRAR AGORA
                                        </button>
                                    </div>
                                </div>
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
                    
                    {/* Aviso de dados mockados */}
                    {!loading && produtosExibir.length > 0 && (
                        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                            <p className="text-blue-800 text-sm">
                                📦 <strong>Modo Demonstração:</strong> Produtos de teste sendo exibidos
                            </p>
                        </div>
                    )}
                    
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
