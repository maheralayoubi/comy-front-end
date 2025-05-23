import React, { useState, useEffect } from "react";
import "./styles/MessageInput.scss";

const MessageInput = ({ onSendMessage, isDisabled = false }) => {
  const [message, setMessage] = useState("");
  
  const handleSendMessage = () => {
    if (isDisabled) {
      console.log("Send button is disabled");
      return;
    }
    
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };
  
  const handleKeyDown = (e) => {
    if (isDisabled) {
      console.log("Input is disabled");
      return;
    }
    
    if (e.key === "Enter" && message.trim()) {
      onSendMessage(message);
      setMessage("");
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
        disabled={isDisabled} // Use the isDisabled prop
        // Apply conditional styling based on disabled state
        style={isDisabled ? { opacity: 1, cursor: "not-allowed" } : {}}
      />
      <button
        className="sendButton"
        onClick={handleSendMessage}
        aria-label="送信"
        disabled={isDisabled} // Use the isDisabled prop
        // Apply conditional styling based on disabled state
        style={isDisabled ? { opacity: 1, cursor: "not-allowed" } : {}}
      >
        <img src="/images/arrow_forward.svg" alt="arrow"/>
      </button>
    </div>
  );
};

export default MessageInput;
