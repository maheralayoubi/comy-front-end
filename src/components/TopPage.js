import React from "react";
// import styles
import "./styles/TopPage.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const TopPage = () => {
  const slides = [
    {
      img: "/images/AIConsultation.png",
      title: "AI相談",
      description: "事業の壁打ちをしてくれる心強い味方",
      subtitle: "COMYの新しい機能",
      id: "ai-slider",
    },
    {
      img: "/images/BulletinBoard.png",
      title: "掲示板",
      description: "メンバーと気軽に繋がれるオンラインの居場所",
      subtitle: "COMYの新しい機能",
    },
    {
      img: "/images/MemberSearch.png",
      title: "メンバー検索",
      description: "事業のコラボレーションにピッタリな人を見つける",
      subtitle: "COMYの取扱説明書",
    },
  ];

  return (
    <>
      <div className="gallery">
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
          {slides.map((slide) => (
            <SwiperSlide className="slider" id={slide.id && slide.id}>
              <div className="photo" id={slide.id && slide.id}>
                <img src={slide.img} alt="ai" />
                <div className="text">
                  <p>{slide.subtitle}</p>
                  <h3>{slide.title}</h3>
                  <p>{slide.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="search-results">
        <h2>検索結果</h2>
        <div className="search-results-container">
          <a href="/search-results">
            <input
              type="text"
              placeholder="メンバー検索"
              className="search-input"
            />
          </a>
          <img src="/images/search.svg" alt="Search" className="search-icon" />
        </div>
      </div>
    </>
  );
};

export default TopPage;
