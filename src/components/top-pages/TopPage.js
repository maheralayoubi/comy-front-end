import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

import "./styles/TopPage.scss";

import { getMemberList } from "../../api/memberList";
import { SpinnerPage } from "../global/Spinner";
import UserCard from "./UserCard";
import SearchItem from "../global/SearchItem";

// data
// import blogs from "../../data/blogs.json";
import slides from "./data/sliderData.json";
import TopPageSlider from "./TopPageSlider";

const TopPage = ({ businessSheetData }) => {
  const [error, setError] = useState(null);
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (businessSheetData) {
      // console.log("TopPage received businessSheetData:", businessSheetData);
    }
  }, [businessSheetData]);

  useEffect(() => {
    setIsLoading(true);
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
        <TopPageSlider slides={slides} />
      </div>

      <div className="search-results-top-search">
        <h2>検索結果</h2>
        <SearchItem />
      </div>

      <div className="member-list-top-list">
        <h2>COMYユーザー</h2>
        <div className="users">
          {users &&
            users
              .slice()
              .reverse()
              .map((user) => <UserCard key={user.id} user={user} />)}
        </div>
        <div className="see-more-members">
          <a href="/member-list">
            <button>さらに見る</button>
          </a>
        </div>
      </div>

      <div className="features">
        <h2>COMYの今後の追加機能紹介</h2>
        {slides.slice(0, 3).map((slide, index) => (
          <div className="photo photo-common disable-select" key={index}>
            <img src={slide.img} alt={slide.title} />
            <div className="text">
              <p>{slide.subtitle}</p>
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="links">
        <h2>ニュース</h2>
        <ul>
          {blogs?.map((item) => (
            <li key={item.id} className="blogLink">
              <Link to={`/blog/${item.id}`}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div> */}
    </>
  );
};

export default TopPage;
