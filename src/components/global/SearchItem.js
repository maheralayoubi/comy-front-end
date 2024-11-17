import React from "react";
import "./styles/SearchItem.scss";

const SearchItem = () => {
  return (
    <div className="search-container">
      <a href="/search-results">
        <input
          type="text"
          placeholder="メンバー検索"
          className="search-input"
        />
      </a>
      <img src="/images/search.svg" alt="Search" className="search-icon" />
    </div>
  );
};

export default SearchItem;
