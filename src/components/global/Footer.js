import React from "react";
import "./styles/Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__links">
        <a
          href="https://comy.jp/"
          className="footer__link"
          target="_blank"
          rel="noreferrer"
        >
          LPページ
        </a>
        <a
          href="https://comy.jp/terms-of-service/"
          className="footer__link"
          target="_blank"
          rel="noreferrer"
        >
          利用規約
        </a>
        <a
          href="https://comy.jp/privacy-policy/"
          className="footer__link"
          target="_blank"
          rel="noreferrer"
        >
          プライバシーポリシー
        </a>
        <a
          href="https://comy.jp/contact/"
          className="footer__link"
          target="_blank"
          rel="noreferrer"
        >
          お問い合わせ
        </a>
      </div>

      <div className="footer__logo">
        <a href="/">
          <img
            src="/images/Logo_comy.png"
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
