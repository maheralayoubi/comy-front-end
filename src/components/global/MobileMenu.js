import React, { useState } from "react";
import "./styles/MobileMenu.scss";
import { Link } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";

const MobileMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { getValue } = useLocalStorage();

  const onToggle = () => {
    setShowMenu((pre) => !pre);
  };

  const itemList = [
    {
      id: "1",
      to: "/",
      content: "トップページ",
    },
    {
      id: "2",
      to: "/chat",
      content: "メッセージ",
    },
    {
      id: "3",
      to: "https://www.facebook.com/groups/3773860399566242/",
      content: "Facebook掲示板",
    },
    {
      id: "4",
      to: "https://comy.jp/terms-of-service/",
      content: "利用規約",
    },
    {
      id: "5",
      to: "https://comy.jp/privacy-policy/",
      content: "プライバシーポリシー",
    },
    {
      id: "6",
      to: "https://comy.jp/contact/",
      content: "お問い合わせ",
    },
  ];

  return (
    <div className="mobile-menu">
      <span className="toggler" onClick={onToggle}>
        {showMenu ? (
          <img src="/images/closeMenu.png" alt="closeMenu" />
        ) : (
          <img src="/images/openMenu.png" alt="openMenu" />
        )}
      </span>

      {showMenu && (
        <ul className="menu-list">
          <li>
            <div className="search-container">
              <a href="/search-results">
                <input
                  type="text"
                  placeholder="メンバー検索"
                  className="search-input"
                />
              </a>
              <img
                src="/images/search.svg"
                alt="Search"
                className="search-icon"
              />
            </div>
          </li>

          <li>
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
          </li>

          {itemList.map((item) => (
            <li key={item.id}>
              <Link to={item.to}>{item.content}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MobileMenu;
