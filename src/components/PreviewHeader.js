import React from "react";
import "./styles/PreviewHeader.scss";

const PreviewHeader = () => {
  return (
    <header className="PreviewHeader">
      <div className="PreviewHeader-left">
        <img src="/images/comy-logo.png" alt="Logo" className="logo" />
      </div>
    </header>
  );
};

export default PreviewHeader;
