import { apiRequest } from "./queryClient";
import type { Conversation, Message } from "@shared/schema";

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

export async function createConversation(): Promise<Conversation> {
  const response = await apiRequest("POST", "/api/conversations", {});
  return response.json();
}

export async function getMessages(conversationId: number): Promise<Message[]> {
  const response = await apiRequest("GET", `/api/conversations/${conversationId}/messages`, {});
  return response.json();
}

export async function sendMessage(conversationId: number, content: string): Promise<{ userMessage: Message; assistantMessage: Message }> {
  const response = await apiRequest("POST", `/api/conversations/${conversationId}/messages`, { content });
  return response.json();
}
