import React from "react";
import "./styles/ChatMessage.scss";
import MatchCard_SuggestionMessage from "./MatchCard"; // Import the new compent

// Helper function to parse suggestion message content
const parseSuggestion = (content) => {
  if (typeof content !== 'string') return null;
  const match = content.match(/^Suggested friend:\s*([^\s(]+)(?:\s*\(([^)]+)\))?/i);
  if (match) {
    return {
      name: match[1] || null,      // Extracted name
      role: match[2] || null,      // Extracted role (optional)
      isSuggestion: true,
    };
  }
  return null;
};

const ChatMessage = ({ message, isUser, onAcceptSuggestion, onRejectSuggestion }) => {
  const suggestionData = parseSuggestion(message.content);

  // If it's a suggestion message and not from the current user, render it as a MatchCard_SuggestionMessage
  if (suggestionData && suggestionData.isSuggestion && !isUser) {
    return (
      <MatchCard_SuggestionMessage
        dynamicName={suggestionData.name}
        dynamicRole={suggestionData.role}
        dynamicText={message.content} // Pass the full original content as the main text
        onAcceptSuggestion={() => {
          // Placeholder: In a real app, this would call a function passed via props
          // which in turn calls the API to accept the suggestion related to this message.id
          console.log("Accept suggestion clicked for message:", message.id);
          if(onAcceptSuggestion) onAcceptSuggestion(message.id, message.suggestedUser);
        }}
        onRejectSuggestion={() => {
          // Placeholder: In a real app, this would call a function passed via props
          // which in turn calls the API to reject the suggestion related to this message.id
          console.log("Reject suggestion clicked for message:", message.id);
          if(onRejectSuggestion) onRejectSuggestion(message.id, message.suggestedUser);
        }}
      />
    );
  }

  // Original message rendering for non-suggestion messages or user's own messages
  const senderName = message.sender && typeof message.sender === 'object' ? message.sender.name : message.sender;
  const initial = isUser 
    ? 'U' 
    : (senderName && typeof senderName === 'string' ? senderName.charAt(0).toUpperCase() : '?');
  
  const profileImageUrl = message.sender && typeof message.sender === 'object' ? message.sender.profileImageUrl : message.profileImageUrl;

  return (
    <div className={`message ${isUser ? 'userMessage' : ''}`}>
      <div className="avatarContainer">
        {profileImageUrl ? (
          <img src={profileImageUrl} alt={senderName || 'Avatar'} />
        ) : (
          <span className="userInitial">
            {initial}
          </span>
        )}
      </div>
      <div className="messageContent">
        <div className="messageHeader">
          <h3 className="userName">{senderName || "Unknown User"}</h3>
          <span className="timestamp">{new Date(message.createdAt || message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <p className="messageText">{message.content || message.text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;

