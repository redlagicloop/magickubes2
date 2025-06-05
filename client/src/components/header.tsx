import { Brain } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary-500 rounded-xl flex items-center justify-center">
              <Brain className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">AI Analytics</h1>
              <p className="text-sm text-gray-500">Intelligent Data Insights</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <span className="text-sm text-gray-500">Powered by AI</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
