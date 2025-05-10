import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { SocketContext } from "../../pages/Chat";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import EmptyState from "./EmptyState";
import "./styles/ChatMain.scss";
import "./styles/MatchCard.scss"; // For button styles

const ChatMain = ({ selectedChatId, onBackClick, isMobileView, users, currentSystemUser, onSuggestionChange }) => {
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(null);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [currentUserChatDetails, setCurrentUserChatDetails] = useState(null);
  const [actionInProgress, setActionInProgress] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Resolve chat details for the header
  useEffect(() => {
    if (selectedChatId && users && users.length > 0) {
      const chatDetails = users.find(u => u.id === selectedChatId);
      setCurrentUserChatDetails(chatDetails || { id: selectedChatId, name: "Bot" });
    } else {
      setCurrentUserChatDetails(null);
    }
  }, [selectedChatId, users]);

  // Fetch chat content and identify suggestion
  useEffect(() => {
    if (!selectedChatId) {
      setMessages([]);
      setActiveSuggestion(null);
      if (onSuggestionChange) onSuggestionChange(null);
      setErrorMessages(null);
      return;
    }

    const fetchChatContent = async () => {
      setIsLoadingMessages(true);
      setErrorMessages(null);
      setApiError(null);
      setActiveSuggestion(null);
      if (onSuggestionChange) onSuggestionChange(null);
      setMessages([]);
      setActionInProgress(false);

      try {
        const response = await axios.get(`http://localhost:8080/api/chats/${selectedChatId}/messages`, {
          withCredentials: true,
        });
        
        const fetchedMessages = response.data || [];
        let foundSuggestion = null;

        const suggestionMessageFromAPI = fetchedMessages.find(
          (msg) => msg.suggestedUser && msg.status === "pending"
        );

        if (suggestionMessageFromAPI && suggestionMessageFromAPI.content) {
          const suggestionText = suggestionMessageFromAPI.content;
          let suggestedPersonName = "";
          let suggestedPersonRole = "";
          const match = suggestionText.match(/Suggested friend:\s*([^(\s]+)(?:\s*\(([^)]+)\))?/i);
          if (match && match[1]) {
            suggestedPersonName = match[1];
            suggestedPersonRole = match[2] || "";
          }

          foundSuggestion = {
            displayText: suggestionText,
            name: suggestedPersonName,
            role: suggestedPersonRole,
            originalMessageId: suggestionMessageFromAPI.id,
            suggestedUserId: suggestionMessageFromAPI.suggestedUser,
            chatId: selectedChatId,
            // Store the sender details of the suggestion message if available (for bot name)
            senderName: suggestionMessageFromAPI.sender?.name || "Bot"
          };
          setActiveSuggestion(foundSuggestion);
          if (onSuggestionChange) onSuggestionChange(foundSuggestion.suggestedUserId);
        }
        
        setMessages(
          fetchedMessages.filter(msg => !(msg.id === suggestionMessageFromAPI?.id))
        );

      } catch (err) {
        console.error("Failed to fetch messages:", err);
        setErrorMessages("Failed to load messages. Please try again.");
      } finally {
        setIsLoadingMessages(false);
      }
    };

    fetchChatContent();
  }, [selectedChatId, onSuggestionChange]);

  // Socket event handling
  useEffect(() => {
    if (!socket || !selectedChatId) return;

    const handleReceiveMessage = (message) => {
      if (message.chatId === selectedChatId) {
        // Check if this message is the confirmation for an accepted suggestion
        // User expects: "Suggestion accepted, match request sent"
        // This message will come from the bot after API 5 call.
        setMessages(prevMessages => [...prevMessages, message]);
        
        // If the received message corresponds to the suggestion we acted upon, clear the suggestion UI
        if (activeSuggestion && message.content && message.content.includes("Suggestion accepted")) {
            // Or if the backend updates the original suggestion message status
            if(message.id === activeSuggestion.originalMessageId && message.status !== "pending"){
                 setActiveSuggestion(null);
                 if (onSuggestionChange) onSuggestionChange(null);
                 setActionInProgress(false);
            } else if (!message.suggestedUser) { // A new confirmation message from bot
                 setActiveSuggestion(null);
                 if (onSuggestionChange) onSuggestionChange(null);
                 setActionInProgress(false);
            }
        }
      }
      setIsTyping(false);
    };

    const handleTyping = (data) => {
      if (data.chatId === selectedChatId) {
        setIsTyping(data.isTyping);
      }
    };

    socket.on("receive_message", handleReceiveMessage);
    socket.on("typing", handleTyping);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("typing", handleTyping);
    };
  }, [socket, selectedChatId, activeSuggestion, onSuggestionChange]);

  const handleSuggestionResponse = async (responseType) => {
    if (!activeSuggestion || !activeSuggestion.originalMessageId) return;
    setActionInProgress(true);
    setApiError(null);

    try {
      // API 5: POST /api/chats/suggestions/respond
      await axios.post(
        "http://localhost:8080/api/chats/suggestions/respond",
        {
          messageId: activeSuggestion.originalMessageId,
          response: responseType, 
        },
        {
          withCredentials: true,
        }
      );
      // After successfully calling API 5, the bot should send a message via socket.
      // The UI for the suggestion (buttons) should be hidden.
      // The handleReceiveMessage effect will catch the bot's confirmation.
      // We can optimistically hide the suggestion buttons here, or wait for the message that updates its status.
      // For now, let's assume the bot's message will trigger the UI update by clearing activeSuggestion or by the message itself.
      // If responseType is 'accept', the user expects a specific message from the bot.
      // If 'reject', the suggestion UI just disappears.
      if (responseType === "reject") {
        setActiveSuggestion(null); 
        if (onSuggestionChange) onSuggestionChange(null);
        setActionInProgress(false);
      }
      // For 'accept', we wait for the bot's socket message.

    } catch (err) {
      console.error(`Failed to ${responseType} suggestion:`, err);
      setApiError(`Failed to ${responseType} suggestion. Please try again.`);
      setActionInProgress(false);
    }
  };

  const handleSendMessage = (text) => {
    if (!socket || !text.trim() || !selectedChatId) return;
    const newMessage = {
      chatId: selectedChatId,
      content: text,
    };
    socket.emit("send_message", newMessage);
    setMessages(prevMessages => [...prevMessages, {
        id: Date.now().toString(), 
        chatId: selectedChatId,
        senderId: currentSystemUser?.id || "user", 
        content: text,
        createdAt: new Date().toISOString(),
        sender: { name: currentSystemUser?.name || "You" } 
    }]);
    socket.emit("typing", { chatId: selectedChatId, isTyping: false });
  };

  if (!currentUserChatDetails && !isLoadingMessages && !selectedChatId) {
    return (
      <section className="mainChat">
        <EmptyState message="チャットを選択してください" />
      </section>
    );
  }

  return (
    <section className="mainChat">
      {currentUserChatDetails && (
        <ChatHeader
          currentUser={currentUserChatDetails}
          onBackClick={onBackClick}
          isMobileView={isMobileView}
        />
      )}
      <div className="messageContainer">
        {isLoadingMessages && <div className="loading-messages">メッセージを読み込み中...</div>}
        {errorMessages && <div className="error-messages">{errorMessages}</div>}
        {apiError && <div className="error-messages" style={{color: "red"}}>{apiError}</div>}
        
        {!isLoadingMessages && activeSuggestion && (
          <div className="suggestion-container">
            <div className="suggestion-text-sender">{activeSuggestion.senderName || "Bot"}:</div>
            <div className="suggestion-text">{activeSuggestion.displayText}</div>
            <div className="suggestion-buttons match-card__buttons">
              <button
                className="btn btn--primary"
                onClick={() => handleSuggestionResponse("accept")}
                disabled={actionInProgress}
              >
                マッチを希望する {/* Accept suggestion (Japanese text from image) */}
              </button>
              <button
                className="btn btn--secondary"
                onClick={() => handleSuggestionResponse("reject")}
                disabled={actionInProgress}
              >
                マッチを希望しない {/* Reject suggestion (Japanese text from image) */}
              </button>
            </div>
          </div>
        )}

        {!isLoadingMessages && !errorMessages && (
          <MessageList
            messages={messages}
            isTyping={isTyping}
            currentUser={currentUserChatDetails} 
          />
        )}
        <div className="inputContainer">
          <MessageInput
            onSendMessage={handleSendMessage}
            socket={socket}
            selectedUserId={selectedChatId}
          />
        </div>
      </div>
    </section>
  );
};

export default ChatMain;

