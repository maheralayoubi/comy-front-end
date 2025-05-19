import React from "react";
import "./styles/TypingIndicator.scss";
const TypingIndicator = ({ isTyping, name }) => {
  if (!isTyping) return null;
  return (
    <div className="typingIndicator">
      <span className="typingText">{name}が入力中</span>
      <div className="dots">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
};
export default TypingIndicator;
