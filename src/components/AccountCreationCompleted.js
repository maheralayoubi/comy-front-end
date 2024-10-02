import React from "react";
import "./styles/AccountCreationCompleted.scss";

const AccountCreationCompleted = () => {
  return (
    <div className="account-creation-completed-container">
      <h2>アカウント作成完了</h2>
      <p>
        アカウント作成が完了しました <br /> COMYにようこそ！
      </p>
      <button
        className="business-sheet-button"
        onClick={() => (window.location.href = "/business-sheet-creation")}
      >
        ビジネスシートを作る
      </button>
      <div className="skip-link">
        <a href="/register">スキップ</a>
      </div>
    </div>
  );
};

export default AccountCreationCompleted;
