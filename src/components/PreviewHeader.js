import React from "react";
import "./styles/PreviewHeader.scss";
import { Link } from "react-router-dom";


const PreviewHeader = () => {
  return (
    <header className="PreviewHeader">
      <div className="PreviewHeader-left">
        <Link to="/">
          <img src="/images/Logo_comy.png" alt="Logo" className="logo" />
        </Link>      </div>
    </header>
  );
};

export default PreviewHeader;
