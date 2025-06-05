import { Brain } from "lucide-react";
import { motion } from "framer-motion";

interface LoadingOverlayProps {
  isVisible: boolean;
}

export function LoadingOverlay({ isVisible }: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 mx-4 max-w-md w-full text-center shadow-2xl"
      >
        <div className="mb-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-secondary-500 rounded-full flex items-center justify-center">
            <Brain className="text-white text-2xl animate-pulse" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Thinking...</h3>
        <p className="text-gray-600 mb-4">
          Our AI is analyzing your request and preparing insights
        </p>
        <div className="flex justify-center space-x-1">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
            className="w-2 h-2 bg-primary rounded-full"
          />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
            className="w-2 h-2 bg-primary rounded-full"
          />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
            className="w-2 h-2 bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
