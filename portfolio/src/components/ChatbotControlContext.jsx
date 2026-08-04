"use client";

import { createContext, useContext, useState } from "react";

const ChatbotControlContext = createContext(null);

export function ChatbotControlProvider({ children }) {
  const [pendingOpen, setPendingOpen] = useState(false);
  const [pendingMessage, setPendingMessage] = useState(null);

  function askChatbot(text) {
    setPendingMessage(text);
    setPendingOpen(true);
  }

  return (
    <ChatbotControlContext.Provider
      value={{ pendingOpen, pendingMessage, setPendingOpen, setPendingMessage, askChatbot }}
    >
      {children}
    </ChatbotControlContext.Provider>
  );
}

export function useChatbotControl() {
  return useContext(ChatbotControlContext);
}