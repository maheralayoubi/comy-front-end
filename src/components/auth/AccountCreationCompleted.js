import React from "react";
import { Sparkles } from "lucide-react";

import "./styles/AccountCreationCompleted.scss";

const AccountCreationCompleted = () => {
  return (
    <div className="account-creation-completed-container">
      <h2>アカウント作成完了</h2>
      <p>
        アカウント作成が完了しました
        <br />
        COMYにようこそ！
      </p>

      <button
        className="business-sheet-button"
        onClick={() => (window.location.href = "/business-sheet-creation")}
      >
        ビジネスシートを作る
      </button>

      <button
        className="business-sheet-button"
        onClick={() => (window.location.href = "/profile")}
      >
        <Sparkles size={18} style={{ marginRight: "8px" }} />
        AIでシートを作成する
      </button>
    </div>
  );
};

export default AccountCreationCompleted;
