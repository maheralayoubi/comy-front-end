import React, { useState } from "react";
import { Sparkles } from "lucide-react";

import "./styles/AccountCreationCompleted.scss";
import useLocalStorage from "../../hooks/useLocalStorage";
import { createBusinessSheet } from "../../api/businessSheet";
import { messages } from "../../constants/messages";
import { useNavigate } from "react-router-dom";
import Spinner from "../global/Spinner";

const AccountCreationCompleted = () => {
  const [isLoading, setLoading] = useState(false);
  const { clearAll } = useLocalStorage();
  const [message, setMessage] = useState({ type: "", content: "" });
  const navigate = useNavigate();

  const createEmptyBusinessSheet = async () => {
    const data = {
      shortBiography: "",
      businessDescription: "",
      personalInformation: "",
      goals: "",
      accomplishments: "",
      interests: "",
      networks: "",
      skills: "",
      goldenEgg: Array(3).fill(""),
      goldenGoose: Array(3).fill(""),
      goldenFarmer: Array(3).fill(""),
      companyStrengths: "",
      powerWords: Array(6).fill(""),
      itemsProducts: Array(3).fill(""),
      headerBackgroundImage: null,
      profileImage: null,
      referralSheetBackgroundImage: null,
      colorPreference: "",
      fontPreference: "",
    }

    try {
      setLoading(true);
      const result = await createBusinessSheet(data);

      switch (result.status) {
        case 201:
          clearAll();
          navigate("/profile");
          console.log("succsessfull");
          break;

        default:
          setMessage({ type: "error", content: messages.tryAgain });
      }
    } catch (error) {
      setMessage({ type: "error", content: messages.tryAgain });
    } finally {
      setLoading(false);
    }
  }

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
        onClick={createEmptyBusinessSheet}
        disabled={isLoading}
      >
        <Sparkles size={18} style={{ marginRight: "8px" }} />
        AIでシートを作成する

        {isLoading && <Spinner />}
      </button>

      {message.content && (
        <p style={{ color: message.type === "success" ? "green" : "red" }}>
          {message.content}
        </p>
      )}
    </div>
  );
};

export default AccountCreationCompleted;
