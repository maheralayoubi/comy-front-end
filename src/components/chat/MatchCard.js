import React, { useState } from "react";
import "./styles/MatchCard.scss";
import secureApi from '../../api/secureApi'; 

const MatchCard = ({ userData }) => {
  const [hasResponded, setHasResponded] = useState(userData?.status && userData.status !== "pending");
  const [responseStatus, setResponseStatus] = useState(userData?.status || "pending");

  const fullLine = userData?.text?.[0] || "";

  const apiEndpoint =
    userData?.apiType === "match"
      ? "/api/chats/matches/respond"
      : "/api/chats/suggestions/respond";

  const handleRespond = async (responseText) => {
    if (hasResponded || responseStatus !== "pending") return;

    setHasResponded(true);
    setResponseStatus(responseText === "マッチを希望する" ? "accepted" : "rejected");

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

    try {
      const res = await secureApi.post(apiEndpoint, payload); 
      const newChatId = res.data.chatId;

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
          <div className="match-card__original-message">{fullLine.split("\n").map((p, index) => (
              <span key={index}>
                {p}
                <br />
              </span>
            ))}</div>

          <div className="match-card__buttons">
            <button
              className="btn btn--primary"
              onClick={() => handleRespond("マッチを希望する")}
              disabled={hasResponded || responseStatus !== "pending"}
            >
              マッチを希望する
            </button>
            <button
              className="btn btn--secondary"
              onClick={() => handleRespond("マッチを希望しない")}
              disabled={hasResponded || responseStatus !== "pending"}
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
