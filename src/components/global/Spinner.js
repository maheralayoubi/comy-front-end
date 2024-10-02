import React from "react";
import "./styles/Spinner.scss";

const Spinner = () => {
  return <span className="loader"></span>;
};

export const SpinnerPage = () => {
  return (
    <div className="loaderContainer">
      <span className="loaderPage"></span>
    </div>
  );
};

export default Spinner;
