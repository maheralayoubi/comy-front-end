import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const TopPageSlider = ({ slides }) => {
  return (
    <Swiper
      spaceBetween={40}
      modules={[Navigation, Pagination]}
      centeredSlides
      loop
      allowTouchMove={false}
      slidesPerView={1.3}
      pagination={{ clickable: true }}
      navigation
    >
      {slides.map((slide, index) => (
        <SwiperSlide className="slider" key={index}>
          <div className="photo photo-common disable-select">
            <img src={slide.img} alt={slide.title} />
            <div className="text">
              <p>{slide.subtitle}</p>
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TopPageSlider;
