import React, { useState, useEffect } from "react";
import "./styles/MessageInput.scss";
const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  return (
    <div className="inputContainer">
      <input
        type="text"
        placeholder="メッセージを入力..."
        className="input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="sendButton"
        onClick={handleSendMessage}
        aria-label="送信"
      >
      </button>
    </div>
  );
};
export default MessageInput;
