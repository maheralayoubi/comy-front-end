import React, { useState } from "react";
import "./styles/MatchCard.scss";
import RejectionSection from './RejectionSection';

const MatchCard = ({ userData, onMatchAccept }) => {
  const [showRejectionMessage, setShowRejectionMessage] = useState(false);
  const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);

  const data = userData;

  const handleRejectMatch = () => {
    setShowRejectionMessage(true);
    setIsButtonsDisabled(true);
  };

  const handleAcceptMatch = () => {
    setIsButtonsDisabled(true);
    if (onMatchAccept) onMatchAccept();
  };

  return (
    <div className="match-card">
      <div className="match-card__body">
        <div className="match-card__avatar-section">
          <img
            src={data?.profileImageUrl || "/images/profileImage.png"}
            alt={data?.name || "User"}
            className="match-card__avatar"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/profileImage.png";
            }}
          />
          <div className="match-card__avatar-name">{data?.name}</div>
        </div>

        <div className="match-card__content">
          {data?.text && Array.isArray(data.text) && (
            <p
              className="match-card__text"
              dangerouslySetInnerHTML={{ __html: data.text.join("<br />") }}
            />
          )}

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
      </div>

      {showRejectionMessage && <RejectionSection />}
    </div>
  );
};

export default MatchCard;
