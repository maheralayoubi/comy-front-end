import React from "react";
import { Link } from "react-router-dom";
import "./styles/Header.scss";
import MobileMenu from "../MobileMenu";
import useLocalStorage from "../../hooks/useLocalStorage";

const Header = () => {
  const { getValue } = useLocalStorage();
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/">
          <img src="/images/Logo_comy.png" alt="Logo" className="logo" />
        </Link>
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
      </div>
      <div className="header-right">
        <Link to="/profile">
          <img
            src={
              !!getValue("profileImageUrl")
                ? `${getValue("profileImageUrl")}?timestamp=${new Date().getTime()}`
                : "/images/account_circle.svg"
            }
            alt="Account"
            className="account-icon"
          />
          <span className="account-text">マイページ</span>
        </Link>
      </div>

      <MobileMenu />
    </header>
  );
};

export default Header;
