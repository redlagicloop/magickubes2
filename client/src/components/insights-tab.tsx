import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import type { AnalysisResponse } from "@/lib/api";

interface InsightsTabProps {
  data: AnalysisResponse["insights"];
}

export function InsightsTab({ data }: InsightsTabProps) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 text-blue-700";
      case "green":
        return "bg-gradient-to-br from-green-50 to-green-100 border-green-200 text-green-700";
      case "purple":
        return "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 text-purple-700";
      default:
        return "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 text-gray-700";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 sm:p-8"
    >
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <TrendingUp className="text-white h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Key Performance Insights
            </h3>
            <p className="text-gray-600 mb-4">
              Based on your query analysis, here are the most significant findings from your data:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.keyMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl border ${getColorClasses(metric.color)}`}
                >
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm opacity-80">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <h4 className="font-semibold text-gray-900 mb-3">Detailed Analysis</h4>
          <div className="space-y-4">
            {data.analysis.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-700">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
