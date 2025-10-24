import React from "react";

import Promocao1 from "../assets/imagens/Promocao1.png"
import Promocao2 from "../assets/imagens/Promocao2.png"
import Promocao3 from "../assets/imagens/Promocao3.png"

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Card } from "./Card";


const Hero = () => {
  const slides = [
    { img: Promocao1, gradient: "linear-gradient(to bottom, #ADD8E6, #fff)" },
    { img: Promocao2, gradient: "linear-gradient(to bottom, #FFB6C1, #fff)" },
    { img: Promocao3, gradient: "linear-gradient(to bottom, #FFC896, #fff)" },
  ];

  return (
    <div className="flex flex-col">
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
              <div className="w-full h-full flex items-center justify-center bg-gray-50"
             style={{ background: slide.gradient }}>
                <img
                  src={slide.img}
                  alt={`Promoção ${index + 1}`}
                  className="max-h-[85%] max-w-[90%] object-contain drop-shadow-md"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Card />
    </div>
  );
};

export default Hero;
