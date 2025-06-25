import ChatMessage from './ChatMessage';
// import TypingIndicator from './TypingIndicator';
import MatchCard from './MatchCard';
import './styles/MessageList.scss';
import { useAutoScroll } from '../../hooks/useAutoScroll';
import { useMessageList } from '../../hooks/useMessageList';

const MessageList = ({
  messages,
  isTyping,
  cardsData,
  onAddMessage,
  setSelectedSenderId,
  openSheet
}) => {
  const { allMessages, handleMatchChatCreated } = useMessageList({
    messages,
    cardsData,
    onAddMessage
  });

  const lastMessageRef = useAutoScroll(allMessages);

  const renderMessage = (message, index) => {
    const isLastMessage = index === allMessages.length - 1;

    if (message.isMatchCard) {
      return (
        <ChatMessage
          key={message.id}
          message={{
            ...message,
            content: (
              <MatchCard
                openSheet={openSheet}
                setSelectedSenderId={setSelectedSenderId}
                userData={{
                  ...message.cardData,
                  onMatchChatCreated: handleMatchChatCreated,
                  onApiResponse: onAddMessage
                }}
                onApiResponse={onAddMessage}
              />
            )
          }}
          isUser={message.isUser}
          lastMessageRef={isLastMessage ? lastMessageRef : null}
        />
      );
    }

    return (
      <ChatMessage
        key={message.id}
        message={message}
        isUser={message.isUser}
        lastMessageRef={isLastMessage ? lastMessageRef : null}
      />
    );
  };

  if (!allMessages || allMessages.length === 0) {
    return (
      <div className="messagesList messagesList--empty">
        <div className="messagesList__emptyState">
          No messages yet. Start a conversation!
        </div>
      </div>
    );
  }

  return (
    <div className="messagesList">
      {allMessages.map(renderMessage)}
      {/* {isTyping && (
        <div className="messagesList__typing">
          <TypingIndicator />
        </div>
      )} */}
    </div>
  );
};

export default MessageList;