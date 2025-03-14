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
