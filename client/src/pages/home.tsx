import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { PromptInput } from "@/components/prompt-input";
import { LoadingOverlay } from "@/components/loading-overlay";
import { ResultsSection } from "@/components/results-section";
import { submitAnalysisRequest, type AnalysisResponse } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [results, setResults] = useState<AnalysisResponse | null>(null);
  const { toast } = useToast();
  const resultsRef = useRef<HTMLDivElement>(null);

  const analysisMutation = useMutation({
    mutationFn: submitAnalysisRequest,
    onSuccess: (data) => {
      setResults(data);
      // Scroll to results section after a brief delay
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 300);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to analyze your request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (prompt: string) => {
    analysisMutation.mutate(prompt);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PromptInput
          onSubmit={handleSubmit}
          isLoading={analysisMutation.isPending}
        />
        
        <div ref={resultsRef}>
          {results && (
            <ResultsSection
              data={results}
              isVisible={!analysisMutation.isPending}
            />
          )}
        </div>
      </main>

      <LoadingOverlay isVisible={analysisMutation.isPending} />
    </div>
  );
}
