import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Shield, Sparkles } from "lucide-react";

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

const examplePrompts = [
  "Show me the top 10 products by revenue for Q4 2023",
  "What are the sales trends by region over the last 6 months?",
  "Which customer segments have the highest lifetime value?",
  "Compare product performance across different marketing channels"
];

export function PromptInput({ onSubmit, isLoading }: PromptInputProps) {
  const [prompt, setPrompt] = useState("");
  const [placeholder, setPlaceholder] = useState(
    "What are the top performing products this quarter? Show me sales trends by region..."
  );

  const handleSubmit = () => {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt) {
      alert("Please enter a prompt first.");
      return;
    }
    onSubmit(trimmedPrompt);
  };

  const handleFocus = () => {
    if (!prompt) {
      const randomPrompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
      setPlaceholder(randomPrompt);
    }
  };

  return (
    <div className="mb-8">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Ask Your Data Anything
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enter your question or prompt below and let our AI analyze your data to provide insights, 
            generate SQL queries, and create visualizations.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onFocus={handleFocus}
              placeholder={placeholder}
              className="w-full h-32 sm:h-24 p-4 border-2 border-gray-200 rounded-xl resize-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 text-gray-700 placeholder-gray-400"
              maxLength={500}
            />
            <div className="absolute bottom-4 right-4 text-sm text-gray-400">
              <span className={prompt.length > 450 ? "text-red-500" : "text-gray-400"}>
                {prompt.length}
              </span>
              /500
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-6 items-center justify-center">
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-primary to-secondary-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transform transition-all duration-200 focus:ring-4 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Analysis
                </>
              )}
            </Button>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                <span>~30 seconds</span>
              </div>
              <div className="flex items-center">
                <Shield className="mr-1 h-4 w-4" />
                <span>Secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
