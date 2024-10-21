import React, { useEffect, useState } from "react";
// import styles
import "./styles/TopPage.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { getMemberList } from "../api/memberList";
import { SpinnerPage } from "./global/Spinner";
import UserCard from "./UserCard";
import blogs from "../data/blogs.json";
import { Link } from "react-router-dom";

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

  const [error, setError] = useState(null);
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMemberList()
      .then((response) => {
        const allUsersData = response.data;
        const cutUsers = allUsersData.slice(0, 10);
        setUsers(cutUsers);
      })
      .catch((error) => {
        setError("ユーザー情報を取得できませんでした。");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <SpinnerPage />;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
          {slides.map((slide, index) => (
            <SwiperSlide className="slider" key={index}>
              <div
                className="photo photo-common disable-select"
                id={slide.id && slide.id}
              >
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
      </div>

      <div className="search-results-top-search">
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

      <div className="member-list-top-list">
        <h2>COMYユーザー</h2>
        <div className="users">
          {users && users.map((user) => <UserCard key={user.id} user={user} />)}
        </div>
        <a href="/member-list">
          <button>さらに見る</button>
        </a>
      </div>

      <div className="features">
        <h2>COMYの今後の追加機能紹介</h2>
        {slides.map((slide) => (
          <div
            className="photo photo-common disable-select"
            key={slide.id || slide.title}
          >
            <img src={slide.img} alt={slide.title} />
            <div className="text">
              <p>{slide.subtitle}</p>
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="links">
        <h2>ニュース</h2>
        <ul>
          {blogs?.map((item) => (
            <li key={item.id} className="blogLink">
              <Link to={`/blog/${item.id}`}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TopPage;
