import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../api/auth';
import './styles/Footer.scss';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const shouldHideLogout = ['/login', '/register', '/forgot-password', '/mail-confirmation'].includes(location.pathname);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

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
        {!shouldHideLogout && (
          <div
            onClick={handleLogout}
            className="footer__logout"
          >
            <span className='footer__link'>ログアウト</span>
          </div>
        )}
      </div>

      <div className="footer__logo">
        <a href="/">
          <img
            src="images/Logo_comy.svg"
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
