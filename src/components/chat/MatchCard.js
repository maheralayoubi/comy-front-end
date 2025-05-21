import React, { useState } from "react";
import "./styles/MatchCard.scss";
import secureApi from '../../api/secureApi'; 

const MatchCard = ({ userData, onApiResponse }) => {
  const [isButtonsDisabled, setIsButtonsDisabled] = useState(userData?.isResponded || false);
  const fullLine = userData?.text?.[0] || "";

  const apiEndpoint =
    userData?.apiType === "match"
      ? "/api/chats/matches/respond"
      : "/api/chats/suggestions/respond";

  const handleRespond = async (responseText) => {
    setIsButtonsDisabled(true);

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

    const payload =
      userData.apiType === "match"
        ? {
            messageId: userData.id,
            response: responseText
          }
        : {
            messageId: userData.id,
            chatId: userData.chatId,
            response: responseText
          };

    onApiResponse?.({
      id: Date.now(),
      sender: userData.currentUserName,
      senderId: userData.currentUserId,
      text: responseText,
      timestamp,
      isUser: true,
      profileImageUrl: userData.currentUserImage,
      isMatchCard: false
    });

    try {
      const res = await secureApi.post(apiEndpoint, payload); 
      const botMessage = res.data.message;
      const newChatId = res.data.chatId;

      onApiResponse?.({
        id: Date.now() + 1,
        sender: "COMY オフィシャル AI",
        senderId: "bot",
        text: botMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        }),
        isUser: false,
        profileImageUrl: "/images/profileImage.png",
        isMatchCard: false,
        chatId: newChatId
      });

      if (userData?.onMatchChatCreated && newChatId) {
        userData.onMatchChatCreated(newChatId);
      }
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  return (
    <div className="match-card">
      <div className="match-card__body">
        <div className="match-card__avatar-section">
          <img
            src={userData.profileImageUrl}
            onError={(e) => { e.target.src = "/images/profileImage.png"; }}
            className="match-card__avatar"
            alt="avatar"
          />
          {userData.suggestedUserName && userData.suggestedUserCategory && (
            <div className="match-card__avatar-name">
              <div className="name">{userData.suggestedUserName}</div>
              <div className="field">{userData.suggestedUserCategory}</div>
            </div>
          )}
        </div>

        <div className="match-card__content">
          <div className="match-card__original-message">{fullLine}</div>

          <div className="match-card__buttons">
            <button
              className="btn btn--primary"
              onClick={() => handleRespond("マッチを希望する")}
              disabled={isButtonsDisabled}
            >
              マッチを希望する
            </button>
            <button
              className="btn btn--secondary"
              onClick={() => handleRespond("マッチを希望しない")}
              disabled={isButtonsDisabled}
            >
              マッチを希望しない
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
