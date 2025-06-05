import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { ChatHistory } from "@/components/chat-history";
import { ChatInput } from "@/components/chat-input";
import { createConversation, getMessages, sendMessage } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import type { Message, Conversation } from "@shared/schema";

export default function Home() {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Create conversation on mount
  const createConversationMutation = useMutation({
    mutationFn: createConversation,
    onSuccess: (data) => {
      setConversation(data);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to start conversation. Please refresh the page.",
        variant: "destructive",
      });
    },
  });

  // Get messages for the conversation
  const { data: messages = [] } = useQuery({
    queryKey: ["messages", conversation?.id],
    queryFn: () => getMessages(conversation!.id),
    enabled: !!conversation?.id,
    refetchInterval: false,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: (content: string) => sendMessage(conversation!.id, content),
    onSuccess: () => {
      // Invalidate and refetch messages
      queryClient.invalidateQueries({ queryKey: ["messages", conversation?.id] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Initialize conversation on component mount
  useEffect(() => {
    createConversationMutation.mutate();
  }, []);

  const handleSendMessage = (content: string) => {
    if (!conversation) return;
    sendMessageMutation.mutate(content);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full border-x border-gray-200 bg-white shadow-sm">
        <ChatHistory 
          messages={messages}
          isLoading={sendMessageMutation.isPending}
        />
        
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={sendMessageMutation.isPending}
          disabled={!conversation}
        />
      </div>
    </div>
  );
}
