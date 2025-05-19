import React, { useState, useEffect } from "react";
import "./styles/MessageInput.scss";

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  
  // These functions are kept but won't be used due to disabled state
  const handleSendMessage = () => {
    // Function kept for compatibility but won't execute due to disabled state
    console.log("Send button is disabled");
  };
  
  const handleKeyDown = (e) => {
    // Function kept for compatibility but won't execute due to disabled state
    console.log("Input is disabled");
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
        disabled={true} // Disable the input field
        // Keep the same styling even when disabled
        style={{ opacity: 1, cursor: "not-allowed" }}
      />
      <button
        className="sendButton"
        onClick={handleSendMessage}
        aria-label="送信"
        disabled={true} // Disable the send button
        // Keep the same styling even when disabled
        style={{ opacity: 1, cursor: "not-allowed" }}
      >
      </button>
    </div>
  );
};

export default MessageInput;
