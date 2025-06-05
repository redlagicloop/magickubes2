import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ResultsSection } from "./results-section";
import type { Message } from "@shared/schema";
import type { AnalysisResponse } from "@/lib/api";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const [showResults, setShowResults] = useState(false);

  const analysisData = message.analysisData as AnalysisResponse | null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"} mb-6`}
    >
      {!isUser && (
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
          <Bot className="text-white text-sm" />
        </div>
      )}
      
      <div className={`max-w-[80%] ${isUser ? "order-first" : ""}`}>
        <div
          className={`p-4 rounded-2xl ${
            isUser
              ? "bg-primary text-primary-foreground ml-auto"
              : "bg-white border border-gray-200 shadow-sm"
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
          
          {analysisData && !isUser && (
            <div className="mt-4">
              <button
                onClick={() => setShowResults(!showResults)}
                className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
              >
                {showResults ? "Hide Analysis" : "View Analysis Details"}
              </button>
            </div>
          )}
        </div>
        
        {analysisData && !isUser && showResults && (
          <div className="mt-4">
            <ResultsSection data={analysisData} isVisible={true} />
          </div>
        )}
        
        <div className={`text-xs text-gray-500 mt-2 ${isUser ? "text-right" : "text-left"}`}>
          {message.createdAt ? new Date(message.createdAt).toLocaleTimeString() : ""}
        </div>
      </div>
      
      {isUser && (
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
          <User className="text-gray-600 text-sm" />
        </div>
      )}
    </motion.div>
  );
}