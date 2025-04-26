import { useEffect } from "react";
import { useCopilotMessagesContext } from "@copilotkit/react-core";
import { TextMessage, ActionExecutionMessage, ResultMessage } from "@copilotkit/runtime-client-gql";

const LOCAL_STORAGE_KEY = "copilotkit-messages";

export default function MessagePersistenceManager() {
  const { messages, setMessages } = useCopilotMessagesContext();

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    const storedMessages = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedMessages) {
      try {
        const parsedMessages = JSON.parse(storedMessages).map((message) => {
          switch (message.type) {
            case "TextMessage": return new TextMessage(message);
            case "ActionExecutionMessage": return new ActionExecutionMessage(message);
            case "ResultMessage": return new ResultMessage(message);
            default: return null;
          }
        }).filter(Boolean);
        setMessages(parsedMessages);
      } catch (err) {
        console.error("Failed to parse stored messages:", err);
      }
    }
  }, [setMessages]);

  return null;
}
