import secureApi from "./secureApi";

// fetch messages for selected chat
export const getMessages = (chatId) => {
  return secureApi.get(`/api/chats/${chatId}/messages`);
}

// fetch chats
export const getChats = () => {
  return secureApi.get('/api/chats')
}

// Match card API types
export const API_TYPES = {
  MATCH: "match",
  SUGGESTION: "suggestion"
};

const RESPOND_API = {
  MATCH_RESPOND: "/api/chats/matches/respond",
  SUGGESTION_RESPOND: "/api/chats/suggestions/respond"
}

// handle a user respond for match or suggestions friend
export const userRespond = (apiType,payload) => {
  // Determine the correct endpoint based on API type
    const endpoint = apiType === API_TYPES.MATCH 
      ? RESPOND_API.MATCH_RESPOND 
      : RESPOND_API.SUGGESTION_RESPOND;
      
  return secureApi.post(endpoint,payload)
}