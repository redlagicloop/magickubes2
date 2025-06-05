import { useEffect, useRef } from "react";
import { MessageBubble } from "./message-bubble";
import { LoadingDots } from "./loading-dots";
import type { Message } from "@shared/schema";

interface ChatHistoryProps {
  messages: Message[];
  isLoading: boolean;
}

export function ChatHistory({ messages, isLoading }: ChatHistoryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 min-h-0"
    >
      {messages.length === 0 && !isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🤖</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Welcome to AI Analytics Assistant
            </h3>
            <p className="text-gray-600 max-w-md">
              I can help you analyze your data, generate insights, create SQL queries, and build visualizations. 
              What would you like to explore today?
            </p>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isLoading && <LoadingDots />}
        </>
      )}
    </div>
  );
}