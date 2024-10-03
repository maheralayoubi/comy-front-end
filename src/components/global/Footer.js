import React from "react";
import "./styles/Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__links">
        <a href="/" className="footer__link">
          LPページ
        </a>
        <a href="/" className="footer__link">
          利用規約
        </a>
        <a href="/" className="footer__link">
          プライバシーポリシー
        </a>
        <a href="/" className="footer__link">
          お問い合わせ
        </a>
      </div>

      <div className="footer__logo">
        <img
          src="/images/Logo_comy.png"
          alt="Logo"
          className="footer__logo-img"
        />
      </div>

      <div className="footer__copyright">
        Copyright ©️ COMY CO., LTD. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
