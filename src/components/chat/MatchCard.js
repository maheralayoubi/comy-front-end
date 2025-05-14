import React, { useState, useEffect } from "react";
import "./styles/MatchCard.scss";
import RejectionSection from './RejectionSection';
import axios from "axios";

const MatchCard = ({ userData, onApiResponse }) => {
  const [showRejectionMessage, setShowRejectionMessage] = useState(false);
  const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);
  const [hasHandledResponse, setHasHandledResponse] = useState(false);

  const localStorageKey = `match_responded_${userData.id}`;
  const localStorageMessageKey = `${localStorageKey}_message`;

  useEffect(() => {
    const alreadyResponded = localStorage.getItem(localStorageKey) === "true";
    if (alreadyResponded) {
      setIsButtonsDisabled(true);

      if (!hasHandledResponse && onApiResponse) {
        const savedMessage = localStorage.getItem(localStorageMessageKey);
        if (savedMessage) {
          onApiResponse(savedMessage);
          setHasHandledResponse(true);
        }
      }
    }
  }, [localStorageKey, localStorageMessageKey, hasHandledResponse, onApiResponse]);

  const handleRejectMatch = () => {
    setShowRejectionMessage(true);
    setIsButtonsDisabled(true);
    localStorage.setItem(localStorageKey, "true");
  };

  const handleAcceptMatch = async () => {
    setIsButtonsDisabled(true);

    try {
      const res = await axios.post("http://localhost:8080/api/chats/suggestions/respond", {
        messageId: userData.id,
        response: "accept"
      });

      const message = res.data?.message || "Match processed.";
      localStorage.setItem(localStorageKey, "true");
      localStorage.setItem(localStorageMessageKey, message);

      if (onApiResponse) {
        onApiResponse(message);
        setHasHandledResponse(true);
      }
    } catch (err) {
      console.error("API Error", err);
      if (onApiResponse) {
        onApiResponse("Server error occurred.");
      }
    }
  };

  const fullLine = (userData?.text && userData.text[0]) || "";
  const match = fullLine.match(/^Suggested friend:\s(.+?)\s*\((.+)\)$/);
  const extractedName = match ? match[1] : "";
  const extractedField = match ? match[2] : "";

  return (
    <div className="match-card">
      <div className="match-card__body">
        <div className="match-card__avatar-section">
          <img
            src={userData?.profileImageUrl || "/images/profileImage.png"}
            alt={extractedName || "User"}
            className="match-card__avatar"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/profileImage.png";
            }}
          />
          <div className="match-card__avatar-name">
            <div className="name">{extractedName}</div>
            <div className="field">({extractedField})</div>
          </div>
        </div>

        <div className="match-card__content">
          {fullLine && (
            <div className="match-card__original-message">
              {fullLine}
            </div>
          )}

          <div className="match-card__header-line">
            <div className="match-card__buttons">
              <button
                className="btn btn--primary"
                onClick={handleAcceptMatch}
                disabled={isButtonsDisabled}
              >
                マッチを希望する
              </button>
              <button
                className="btn btn--secondary"
                onClick={handleRejectMatch}
                disabled={isButtonsDisabled}
              >
                マッチを希望しない
              </button>
            </div>
          </div>

          {showRejectionMessage && <RejectionSection />}
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
