import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export function LoadingDots() {
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