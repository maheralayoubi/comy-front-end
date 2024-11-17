import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/auth";
import useLocalStorage from "../../hooks/useLocalStorage";
import "./styles/Footer.scss";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearAll } = useLocalStorage();

  const shouldHideLogout = [
    "/login",
    "/register",
    "/forgot-password",
    "/mail-confirmation",
  ].includes(location.pathname);
  const footerLinks = [
    {
      id: "0",
      name: "LPページ",
      href: "https://comy.jp/",
    },
    {
      id: "1",
      name: "利用規約",
      href: "https://comy.jp/terms-of-service/",
    },
    {
      id: "2",
      name: "プライバシーポリシー",
      href: "https://comy.jp/privacy-policy/",
    },
    {
      id: "3",
      name: "お問い合わせ",
      href: "https://comy.jp/contact/",
    },
  ];

  const handleLogout = async () => {
    try {
      await logoutUser();
      clearAll();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <footer className="footer">
      <div className="footer__links">
        {footerLinks.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className="footer__link"
            target="_blank"
            rel="noreferrer"
          >
            {item.name}
          </a>
        ))}
        {!shouldHideLogout && (
          <div onClick={handleLogout} className="footer__logout">
            <span className="footer__link">ログアウト</span>
          </div>
        )}
      </div>

      <div className="footer__logo">
        <a href="/">
          <img
            src="/images/Logo_comy.svg"
            alt="Logo"
            className="footer__logo-img"
          />
        </a>
      </div>

      <div className="footer__copyright">
        Copyright ©️ COMY CO., LTD. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
