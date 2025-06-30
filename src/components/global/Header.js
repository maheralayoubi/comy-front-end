import React from "react";
import { Link } from "react-router-dom";

import "./styles/Header.scss";

import MobileMenu from "./MobileMenu";
import useLocalStorage from "../../hooks/useLocalStorage";
import SearchItem from "../global/SearchItem";

const Header = () => {
  const { getValue } = useLocalStorage();

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/">
          <img src="/images/Logo_comy.svg" alt="Logo" className="logo" />
        </Link>
        <SearchItem />
      </div>
      <nav className="navigation">
        <Link to="/" className="navItem active">トップ</Link>
        <Link to="/chat" className="navItem">メッセージ</Link>
        <Link to="https://www.facebook.com/groups/1699435187601191" className="navItem" target="_blank">Facebook掲示板</Link>
      </nav>
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
