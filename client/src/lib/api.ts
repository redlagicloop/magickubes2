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
  const response = await fetch("/api/conversations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  
  if (!response.ok) {
    throw new Error(`Failed to create conversation: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getMessages(conversationId: number): Promise<Message[]> {
  const response = await fetch(`/api/conversations/${conversationId}/messages`, {
    method: "GET",
    credentials: "include",
  });
  
  if (!response.ok) {
    throw new Error(`Failed to get messages: ${response.statusText}`);
  }
  
  return response.json();
}

export async function sendMessage(conversationId: number, content: string): Promise<{ userMessage: Message; assistantMessage: Message }> {
  const response = await fetch(`/api/conversations/${conversationId}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ content }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to send message: ${response.statusText}`);
  }
  
  return response.json();
}
