import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { ChevronRight, ChevronLeft } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Setas personalizadas
const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute top-1/2 -translate-y-1/2 right-[-30px] z-10 cursor-pointer bg-black hover:bg-gray-800 text-white p-2 rounded-full shadow-md transition"
  >
    <ChevronRight size={20} />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute top-1/2 -translate-y-1/2 left-[-30px] z-10 cursor-pointer bg-black hover:bg-gray-800 text-white p-2 rounded-full shadow-md transition"
  >
    <ChevronLeft size={20} />
  </div>
);

const ProductCarousel = ({ categoria = "promocoes" }) => {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/${categoria}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }, [categoria]);

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
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6 relative flex flex-col items-center">
        <h2 className="text-7xl font-extrabold text-center mb-10 text-white">
           {categoria.charAt(0).toUpperCase() + categoria.slice(1)}!
        </h2>

        {!showAll ? (
          <Slider {...settings} className="w-full">
            {products.map((product) => (
              <div
                key={product.id}
                className="px-3 flex transition-transform duration-300 hover:scale-[1.03]"
              >
                <div className="bg-[#F2F2F2] rounded-xl shadow-md flex flex-col items-center justify-between w-full h-[460px] p-5">
                  <img
                    src={product.imagem}
                    alt={product.nome}
                    className="w-full h-40 object-contain mb-4"
                  />
                  <h3 className="font-bold text-lg text-[#1C1C1C] mb-1">
                    {product.nome}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 text-center">
                    {product.descricao}
                  </p>
                  <p className="font-bold text-xl text-[#1C1C1C] mb-4">
                    R$ {product.preco.toFixed(2)}
                  </p>
                  <button className="mt-auto px-5 py-2 bg-black text-white rounded-md font-semibold shadow-md hover:bg-gray-800 transition">
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
                  src={product.imagem}
                  alt={product.nome}
                  className="w-full h-40 object-contain mb-4"
                />
                <h3 className="font-bold text-lg text-[#1C1C1C] mb-1">
                  {product.nome}
                </h3>
                <p className="text-sm text-gray-600 mb-3 text-center">
                  {product.descricao}
                </p>
                <p className="font-bold text-xl text-[#1C1C1C] mb-4">
                  R$ {product.preco.toFixed(2)}
                </p>
                <button className="mt-auto px-5 py-2 bg-black text-white rounded-md font-semibold shadow-md hover:bg-gray-800 transition">
                  Comprar Agora
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Estilo dos dots do carrossel */}
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
            color: #FFFFFF;
            opacity: 1;
          }
        `}</style>
      </div>
    </section>
  );
};

export default ProductCarousel;
