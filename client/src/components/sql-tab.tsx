import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Database, Info } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface SqlTabProps {
  sqlQuery: string;
}

export function SqlTab({ sqlQuery }: SqlTabProps) {
  const { toast } = useToast();

  const handleCopyQuery = async () => {
    try {
      await navigator.clipboard.writeText(sqlQuery);
      toast({
        title: "Copied!",
        description: "SQL query copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy query to clipboard",
        variant: "destructive",
      });
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
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Generated SQL Query</h3>
          <Button
            onClick={handleCopyQuery}
            variant="outline"
            size="sm"
            className="hover:bg-gray-100"
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Query
          </Button>
        </div>
        
        <div className="code-bg rounded-xl p-6 overflow-x-auto">
          <pre className="text-green-400 font-mono text-sm leading-relaxed whitespace-pre-wrap">
            <code>{sqlQuery}</code>
          </pre>
        </div>
        
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <Info className="text-amber-600 mt-0.5 h-5 w-5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-amber-800 mb-1">Query Explanation</h4>
              <p className="text-amber-700 text-sm">
                This query analyzes product performance by calculating revenue, units sold, and growth rates across quarters. 
                It includes customer metrics and product ratings to provide comprehensive insights into top-performing products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
