import React, { useState } from "react";
import Slider from "react-slick";

import { ChevronRight, ChevronLeft } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Setas personalizadas
const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute top-1/2 -translate-y-1/2 right-[-30px] z-10 cursor-pointer bg-[#FF6B00] hover:bg-[#e65a00] text-white p-2 rounded-full shadow-md transition"
  >
    <ChevronRight size={20} />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute top-1/2 -translate-y-1/2 left-[-30px] z-10 cursor-pointer bg-[#FF6B00] hover:bg-[#e65a00] text-white p-2 rounded-full shadow-md transition"
  >
    <ChevronLeft size={20} />
  </div>
);

const products = [
  {
    id: 1,
    name: "Tênis Esportivo",
    description: "Conforto e estilo para o seu dia a dia.",
    price: "R$ 199,90",
    image: "https://static.zattini.com.br/produtos/tenis-nike-air-max-excee-masculino/72/HZM-3176-172/HZM-3176-172_zoom1.jpg?ts=1579864861&"
  },
  {
    id: 2,
    name: "Teclado Mecânico",
    description: "RGB e switches azuis para máxima performance.",
    price: "R$ 299,90",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_676608-MLA87478169161_072025-O.webp",
  },
  {
    id: 3,
    name: "Galaxy Buds FE",
    description: "Bateria duradoura com carregamento USB-C.",
    price: "R$ 299,90",
    image: "https://sm.pcmag.com/t/pcmag_au/review/s/samsung-ga/samsung-galaxy-buds-fe_pxam.1200.jpg"
  },
 
];

const ProductCarousel = () => {
  const [showAll, setShowAll] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className=" py-12">
      <div className="max-w-7xl mx-auto px-6 relative flex flex-col items-center">
        {/* Título */}
        <h2 className="text-3xl font-extrabold text-center mb-10 text-white">
          🎉 Ofertas Diárias!
        </h2>

        {/* Mostrar carrossel ou grid */}
        {!showAll ? (
          <Slider {...settings} className="w-full">
            {products.map((product) => (
              <div
                key={product.id}
                className="px-3 flex transition-transform duration-300 hover:scale-[1.03]"
              >
                <div className="bg-[#F2F2F2] rounded-xl shadow-md flex flex-col items-center justify-between w-full h-[460px] p-5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-contain mb-4"
                  />
                  <h3 className="font-bold text-lg text-[#1C1C1C] mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 text-center">
                    {product.description}
                  </p>
                  <p className="font-bold text-xl text-[#1C1C1C] mb-4">
                    {product.price}
                  </p>
                  <button className="mt-auto px-5 py-2 bg-[#FF6B00] text-white rounded-md font-semibold shadow-md hover:bg-[#e65a00] transition">
                    Comprar Agora
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-[#F2F2F2] rounded-xl shadow-md flex flex-col items-center justify-between h-[460px] p-5 transition-transform duration-300 hover:scale-[1.02]"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-contain mb-4"
                />
                <h3 className="font-bold text-lg text-[#1C1C1C] mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 text-center">
                  {product.description}
                </p>
                <p className="font-bold text-xl text-[#1C1C1C] mb-4">
                  {product.price}
                </p>
                <button className="mt-auto px-5 py-2 bg-[#FF6B00] text-white rounded-md font-semibold shadow-md hover:bg-[#e65a00] transition">
                  Comprar Agora
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Botão para alternar */}
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-10 px-6 py-3 bg-[#FF6B00] text-white rounded-md font-semibold hover:bg-[#e65a00] transition-colors duration-300"
        >
          {showAll ? "Voltar ao Carrossel" : "Ver todos os itens"}
        </button>

        {/* Estilo dots */}
        <style>{`
          .slick-dots {
            bottom: -35px;
          }
          .slick-dots li button:before {
            font-size: 12px;
            color: #999;
            opacity: 0.7;
          }
          .slick-dots li.slick-active button:before {
            color: #FF6B00;
            opacity: 1;
          }
        `}</style>
      </div>
    </section>
  );
};

export default ProductCarousel;