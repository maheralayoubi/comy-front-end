import React, { useState } from "react";
import "./styles/MessageInput.scss";

const MessageInput = ({ onSendMessage, isDisabled = false }) => {
  const [message, setMessage] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  const handleSendMessage = () => {
    if (isDisabled) {
      return;
    }

    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (isDisabled) {
      return;
    }

    if (e.key === "Enter" && !isComposing && message.trim()) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="inputContainer">
      <input
        type="text"
        placeholder="メッセージを入力..."
        className="input-message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        disabled={isDisabled}
        style={isDisabled ? { opacity: 1, cursor: "not-allowed" } : {}}
      />
      <button
        className="sendButton"
        onClick={handleSendMessage}
        aria-label="送信"
        disabled={isDisabled}
        style={isDisabled ? { opacity: 1, cursor: "not-allowed" } : {}}
      >
        <img src="/images/arrow_forward.svg" alt="arrow" />
      </button>
    </div>
  );
};

export default MessageInput;
