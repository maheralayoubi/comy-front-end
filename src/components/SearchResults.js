import React from "react";
import "./styles/SearchResults.scss";

const SearchResults = () => {
  const users = [
    {
      id: 1,
      name: "田中 翔子",
      position: "税理士",
      imgUrl: "https://via.placeholder.com/120",
    },
    {
      id: 2,
      name: "佐藤 剛",
      position: "税理士",
      imgUrl: "https://via.placeholder.com/120",
    },
    {
      id: 3,
      name: "中村 久美",
      position: "税理士",
      imgUrl: "https://via.placeholder.com/120",
    },
    {
      id: 4,
      name: "伊藤 健一",
      position: "税理士",
      imgUrl: "https://via.placeholder.com/120",
    },
    {
      id: 5,
      name: "小林 雅子",
      position: "税理士",
      imgUrl: "https://via.placeholder.com/120",
    },
    {
      id: 6,
      name: "山本 英二",
      position: "税理士",
      imgUrl: "https://via.placeholder.com/120",
    },
    {
      id: 7,
      name: "斉藤 美香",
      position: "税理士",
      imgUrl: "https://via.placeholder.com/120",
    },
    {
      id: 8,
      name: "鈴木 真一",
      position: "税理士",
      imgUrl: "https://via.placeholder.com/120",
    },
    {
      id: 9,
      name: "高橋 浩二",
      position: "税理士",
      imgUrl: "https://via.placeholder.com/120",
    },
    {
      id: 10,
      name: "松本 花子",
      position: "税理士",
      imgUrl: "https://via.placeholder.com/120",
    },
  ];

  return (
    <div className="search-results">
      <h2>検索結果</h2>
      <div className="search-results-container">
        <input type="text" placeholder="検索" className="search-box" />
        <img src="/images/search.svg" alt="Search" className="search-icon" />
      </div>
      <div className="user-list">
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            <img src={user.imgUrl} alt={user.name} className="user-image" />
            <p className="user-position">{user.position}</p>
            <p className="user-name">{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
