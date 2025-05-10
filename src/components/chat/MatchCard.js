import React, { useState } from "react";
import "./styles/MatchCard.scss"; // Original import, ensure this file exists and is correct
// The following imports were in the original pasted_content.txt, kept for integrity
// import styles from "./styles/RejectionCard.module.scss"; 
// import RejectionEventCard from './RejectionEventCard';
import './styles/RejectionMessage.scss';
import RejectionSection from './RejectionSection';
import MatchAcceptedMessage from './MatchAcceptedMessage';

// This component is designed to display a suggestion message in the style of the original MatchCard.
// It takes dynamic name, role, and the full text (message.content) as props.
// Avatar and button actions are handled as per the original MatchCard structure.
const MatchCard_SuggestionMessage = ({ 
    dynamicName, 
    dynamicRole, 
    dynamicText, 
    onAcceptSuggestion, // Callback for accept button
    onRejectSuggestion  // Callback for reject button
}) => {
  const [showRejectionMessage, setShowRejectionMessage] = useState(false);
  const [showRejectStyledMessage, setShowRejectStyledMessage] = useState(false);
  const [showAcceptanceMessages, setShowAcceptanceMessages] = useState(false);
  const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);

  // Static data from the original MatchCard design (avatar)
  // Name, Role, and Text are now dynamic via props.
 

  // Data to be rendered in the card
  const dataToRender = {
    name: dynamicName || '', // Fallback if dynamicName is not provided
    role: dynamicRole || '', // Fallback if dynamicRole is not provided
    profileImageUrl: '',
    text: dynamicText || "" // Fallback for the main text
  };

  const handleAcceptMatch = () => {
    if (onAcceptSuggestion) {
      onAcceptSuggestion();
    }
    setShowAcceptanceMessages(true);
    setIsButtonsDisabled(true);
  };

  const handleRejectMatch = () => {
    if (onRejectSuggestion) {
      onRejectSuggestion();
    }
    setShowRejectionMessage(true);
    setShowRejectStyledMessage(true);
    setIsButtonsDisabled(true);
  };

  return (
    <div className="match-card"> {/* Main container class from original SCSS */}
      <div className="match-card__body">
        <img
          src={dataToRender.profileImageUrl} 
          alt="Suggestion Avatar" // Generic alt text
          className="match-card__avatar" // Original class
          onError={(e) => { e.target.onerror = null; e.target.src = "/assets/default-avatar.png"; }} // Fallback for image load error
        />
        <div className="match-card__content">
          <div className="match-card__name">{dataToRender.name}</div> {/* Original class, displays dynamic name */}
          <div className="match-card__role">{dataToRender.role}</div> {/* Original class, displays dynamic role */}
          {/* Display dynamic text (original message.content) using match-card__text class */}
          {/* The original MatchCard used dangerouslySetInnerHTML for an array of texts joined by <br />. */}
          {/* Here, dynamicText is expected to be a single string (message.content). */}
          <p className="match-card__text">{dataToRender.text}</p> 
          <div className="match-card__buttons"> {/* Original class */}
            <button
              className="btn btn--primary" // Original class
              onClick={handleAcceptMatch}
              disabled={isButtonsDisabled}
            >
              マッチを希望する
            </button>
            <button
              className="btn btn--secondary" // Original class
              onClick={handleRejectMatch}
              disabled={isButtonsDisabled}
            >
              マッチを希望しない
            </button>
          </div>
          {/* Original conditional rendering for messages - kept as per user request */}
          {showRejectStyledMessage && (
            <div className="custom-styled-message-container">
              <div className="custom-styled-message">
                マッチを希望しない
              </div>
            </div>
          )}
          {showAcceptanceMessages && (
            <>
              <div className="custom-styled-message-container">
                <div className="custom-styled-message">
                  マッチを希望する
                </div>
              </div>
              <MatchAcceptedMessage />
            </>
          )}
        </div>
      </div>
      {showRejectionMessage && <RejectionSection />}
    </div>
  );
};

export default MatchCard_SuggestionMessage;

