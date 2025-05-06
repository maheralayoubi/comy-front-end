import React, { useState } from "react";
import "./styles/MatchCard.scss";
import styles from "./styles/RejectionCard.module.scss";
import RejectionEventCard from './RejectionEventCard';
import './styles/RejectionMessage.scss';
import RejectionSection from './RejectionSection';
import MatchAcceptedMessage from './MatchAcceptedMessage';
const MatchCard = ({ userData }) => {
  const [showRejectionMessage, setShowRejectionMessage] = useState(false);
  const [showRejectStyledMessage, setShowRejectStyledMessage] = useState(false);
  const [showAcceptanceMessages, setShowAcceptanceMessages] = useState(false);
  const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);
  const defaultData = {
    name: "田中 豪",
    role: "パイロット",
    profileImageUrl: "/assets/avatar.png",
    text: [
      "さん、おはようございます！",
      "今週はさんにおすすめの方でパイロットカテゴリーの田中 豪さんをご紹介します！",
      "パイロットカテゴリーの田中 豪さんの強みは\"自社の強みテーブル\"です！",
      "お繋がりを希望しますか？"
    ]
  };
  const data = { ...defaultData, ...userData };
  const handleRejectMatch = () => {
    setShowRejectionMessage(true);
    setShowRejectStyledMessage(true);
    setIsButtonsDisabled(true);
  };
  const handleAcceptMatch = () => {
    setShowAcceptanceMessages(true);
    setIsButtonsDisabled(true);
  };
  return (
    <div className="match-card">
      <div className="match-card__body">
        <img
          src={data.profileImageUrl || defaultData.profileImageUrl}
          alt={data.name}
          className="match-card__avatar"
          onError={(e) => { e.target.onerror = null; e.target.src = defaultData.profileImageUrl }}
        />
        <div className="match-card__content">
          <div className="match-card__name">{data.name}</div>
          <div className="match-card__role">{data.role}</div>
          <p className="match-card__text" dangerouslySetInnerHTML={{ __html: data.text.join('<br />') }} />
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
          {}
          {showRejectStyledMessage && (
            <div className="custom-styled-message-container">
              <div className="custom-styled-message">
                マッチを希望しない
              </div>
            </div>
          )}
          {}
          {showAcceptanceMessages && (
            <>
              <div className="custom-styled-message-container">
                <div className="custom-styled-message">
                  マッチを希望する { }
                </div>
              </div>
              <MatchAcceptedMessage /> { }
            </>
          )}
        </div>
      </div>
      {showRejectionMessage && <RejectionSection />}
    </div>
  );
};
export default MatchCard;
