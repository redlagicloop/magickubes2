import { apiRequest } from "./queryClient";

export interface AnalysisResponse {
  insights: {
    keyMetrics: Array<{
      label: string;
      value: string;
      trend: "up" | "down" | "stable";
      color: string;
    }>;
    analysis: string[];
  };
  sqlQuery: string;
  chartData: {
    revenue: {
      labels: string[];
      data: number[];
    };
    regional: {
      labels: string[];
      data: number[];
      colors: string[];
    };
    categories: {
      labels: string[];
      data: number[];
      colors: string[];
    };
  };
}

export async function submitAnalysisRequest(prompt: string): Promise<AnalysisResponse> {
  const response = await apiRequest("POST", "/api/analyze", { prompt });
  return response.json();
}
