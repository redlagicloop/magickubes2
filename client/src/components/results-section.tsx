import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Lightbulb, Database, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { InsightsTab } from "./insights-tab";
import { SqlTab } from "./sql-tab";
import { ChartsTab } from "./charts-tab";
import type { AnalysisResponse } from "@/lib/api";

interface ResultsSectionProps {
  data: AnalysisResponse;
  isVisible: boolean;
}

export function ResultsSection({ data, isVisible }: ResultsSectionProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="animate-slide-up"
    >
      <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <Tabs defaultValue="insights" className="w-full">
          <TabsList className="w-full h-auto p-0 bg-transparent border-b border-gray-100 rounded-none">
            <div className="flex w-full">
              <TabsTrigger
                value="insights"
                className="flex-1 sm:flex-none px-6 py-4 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-primary/5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-none border-b-2 border-transparent"
              >
                <Lightbulb className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">📊 </span>Insights
              </TabsTrigger>
              <TabsTrigger
                value="sql"
                className="flex-1 sm:flex-none px-6 py-4 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-primary/5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-none border-b-2 border-transparent"
              >
                <Database className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">🧠 </span>SQL Query
              </TabsTrigger>
              <TabsTrigger
                value="charts"
                className="flex-1 sm:flex-none px-6 py-4 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-primary/5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-none border-b-2 border-transparent"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">📈 </span>Visualizations
              </TabsTrigger>
            </div>
          </TabsList>
          
          <TabsContent value="insights" className="mt-0 border-0 p-0">
            <InsightsTab data={data.insights} />
          </TabsContent>
          
          <TabsContent value="sql" className="mt-0 border-0 p-0">
            <SqlTab sqlQuery={data.sqlQuery} />
          </TabsContent>
          
          <TabsContent value="charts" className="mt-0 border-0 p-0">
            <ChartsTab data={data.chartData} />
          </TabsContent>
        </Tabs>
      </Card>
    </motion.div>
  );
}
