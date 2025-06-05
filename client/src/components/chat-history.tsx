import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import { MessageBubble } from "./message-bubble";
import type { Message } from "@shared/schema";

function LoadingDots() {
  return (
    <div className="flex gap-3 justify-start mb-6">
      <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
        <Bot className="text-white text-sm" />
      </div>
      
      <div className="bg-white border border-gray-200 shadow-sm p-4 rounded-2xl">
        <div className="flex items-center space-x-2">
          <span className="text-gray-600 text-sm">AI is thinking</span>
          <div className="flex space-x-1">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
              className="w-2 h-2 bg-primary rounded-full"
            />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
              className="w-2 h-2 bg-primary rounded-full"
            />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
              className="w-2 h-2 bg-primary rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

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