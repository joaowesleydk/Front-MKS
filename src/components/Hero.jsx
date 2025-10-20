import React from "react";


import ProductCarousel from "./productCarousel";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Hero = () => {
  const slides = [
    { img: "https://sm.pcmag.com/t/pcmag_au/review/s/samsung-ga/samsung-galaxy-buds-fe_pxam.1200.jpg", gradient: "linear-gradient(to bottom, #ADD8E6, #fff)" },
    { img: "https://sm.pcmag.com/t/pcmag_au/review/s/samsung-ga/samsung-galaxy-buds-fe_pxam.1200.jpg", gradient: "linear-gradient(to bottom, #FFB6C1, #fff)" },
    { img: "https://sm.pcmag.com/t/pcmag_au/review/s/samsung-ga/samsung-galaxy-buds-fe_pxam.1200.jpg", gradient: "linear-gradient(to bottom, #FFC896, #fff)" },
  ];

  return (
    <div className="flex flex-col ">
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
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ background: slide.gradient }}
              >
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

      {/* Ofertas do Dia */}
      <div className="px-6 md:px-12 lg:px-20">
        <h1 className="text-center font-bold text-2xl md:text-3xl text-white pt-16 mb-8">
          Ofertas do Dia!
        </h1>

        {/* Linha divisória */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex-grow border-t-2 border-gray-300 max-w-sm"></div>
        </div>

        <ProductCarousel />
      </div>

     

         
      
    </div>
  );
};

export default Hero;