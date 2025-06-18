import { useState } from "react";
import "./styles/MatchCard.scss";
import { userRespond } from "../../api/chat";

const MatchCard = ({ userData, setSelectedSenderId, openSheet }) => {
  const [hasResponded, setHasResponded] = useState(userData?.status && userData.status !== "pending");
  const [responseStatus, setResponseStatus] = useState(userData?.status || "pending");

  const fullLine = userData?.text?.[0] || "";

  const handleRespond = async (responseText) => {
    if (hasResponded || responseStatus !== "pending") return;

    setHasResponded(true);
    setResponseStatus(responseText === "マッチを希望する" ? "accepted" : "rejected");

    const apiType = userData?.apiType;

    const payload =
        apiType === "match"
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
      const res = await userRespond(apiType, payload);
      const newChatId = res.data.chatId;

      if (userData?.onMatchChatCreated && newChatId) {
        userData.onMatchChatCreated(newChatId);
      }
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  const handleShowSheet = () => {
    if (userData?.relatedUserId) {
      openSheet()
      setSelectedSenderId(userData?.relatedUserId)
    }
  }

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
              <div className="field">{userData.suggestedUserCategory.slice(0,9)}...</div>
            </div>
          )}
        </div>

        <div className="match-card__content">
          <div className="match-card__original-message">{fullLine.replace(/　+/g, '\n').split("\n").map((p, index) => (
            <span key={index}>
              {p}
              <br />
            </span>
          ))}</div>

          <div className="match-card__buttons">
            <div className="buttons">
              <button
                className="btn-card btn-card--primary"
                onClick={() => handleRespond("マッチを希望する")}
                disabled={hasResponded || responseStatus !== "pending"}
              >
                マッチを希望する
              </button>
              <button
                className="btn-card btn-card--secondary"
                onClick={() => handleRespond("マッチを希望しない")}
                disabled={hasResponded || responseStatus !== "pending"}
              >
                マッチを希望しない
              </button>
            </div>

            <button className="showSheet" onClick={handleShowSheet}>
              ビジネスシートを確認する
              <img src="/images/Chevron-right.svg" alt="arrow" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MatchCard;
