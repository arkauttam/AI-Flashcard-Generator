import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Brain, Download, FileText, FileSpreadsheet, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FlashcardDisplay } from "./FlashcardDisplay";
import { ExportButtons } from "./ExportButtons";
import { generateFlashcards } from "@/services/geminiService";

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export const FlashcardGenerator = () => {
  const [inputText, setInputText] = useState("");
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleGenerate = async () => {
    if (!inputText.trim()) {
      toast({
        title: "No content provided",
        description: "Please paste some text to generate flashcards from.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const generatedCards = await generateFlashcards(inputText);
      setFlashcards(generatedCards);
      toast({
        title: "Flashcards generated!",
        description: `Successfully created ${generatedCards.length} flashcards.`,
      });
    } catch (error) {
      console.error("Error generating flashcards:", error);
      toast({
        title: "Generation failed",
        description: "Failed to generate flashcards. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="models" className="w-full max-w-7xl mx-auto space-y-12 px-8">
      <div className="text-center space-y-8 animate-fade-in">
        <div className="relative flex justify-center">
          <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full animate-glow" />
          <h1 className={`${isScrolled ? 'w-[95%] max-w-7xl' : 'w-[90%] max-w-5xl'} bg-transparent rounded-3xl py-4 relative text-4xl md:text-6xl lg:text-6xl font-display font-black text-gradient animate-glow`}>
            FlashAI
          </h1>
          <div className="absolute top-16 md:top-24">
            <Badge className="bg-gradient-primary text-white border-0 shadow-glow-primary animate-float px-4 py-2 text-sm font-semibold">
              AI Powered
            </Badge>
          </div>
        </div>

        <div className="space-y-6 animate-slide-up stagger-1 pt-4">
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-body">
            Transform any content into{" "}
            <span className="text-gradient font-semibold">interactive learning experiences</span>
            {" "}with our advanced AI technology
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <div className="glass-morphism px-4 py-2 rounded-full animate-scale-in stagger-1">
              <span className="text-sm font-medium text-primary">🧠 Smart Analysis</span>
            </div>
            <div className="glass-morphism px-4 py-2 rounded-full animate-scale-in stagger-2">
              <span className="text-sm font-medium text-secondary">⚡ Instant Generation</span>
            </div>
            <div className="glass-morphism px-4 py-2 rounded-full animate-scale-in stagger-3">
              <span className="text-sm font-medium text-accent">🎯 Personalized</span>
            </div>
          </div>
        </div>
      </div>

      <Card className="relative p-10 md:p-12 glass-strong border border-primary/20 shadow-xl animate-scale-in stagger-2 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-surface opacity-50" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary" />

        <div className="relative space-y-8">
          <div className="space-y-4">
            <label htmlFor="input-text" className="text-xl font-display font-semibold flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-primary text-white">
                <Brain className="w-5 h-5" />
              </div>
              <span className="text-gradient">Paste your content here</span>
            </label>
            <p className="text-muted-foreground">
              Articles, notes, research papers, textbooks & topic- anything you want to learn from
            </p>
            <Textarea
              id="input-text"
              placeholder="Paste your educational content here and watch our AI transform it into interactive flashcards tailored for optimal learning..."
              className="min-h-[280px] resize-none text-base glass-morphism border border-primary/20 focus:border-primary/40 focus:ring-2 focus:ring-primary/20 transition-all duration-500 font-body leading-relaxed"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            
          </div>

          <Button
            onClick={handleGenerate}
            disabled={loading || !inputText.trim()}
            className="w-full bg-gradient-primary hover:shadow-glow-primary transition-all duration-500 hover-lift text-lg py-8 font-display font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-3 animate-spin text-white" />
                <span className="text-white">Generating flashcards...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-3 text-white" />
                <span className="text-white">Generate AI Flashcards</span>
              </>
            )}
          </Button>
        </div>
      </Card>

      {flashcards.length > 0 && (
        <div className="space-y-12 animate-fade-in">
          <div className="relative glass-strong p-8 rounded-3xl border border-primary/20 shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-surface opacity-30" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary" />

            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient">
                  Your Flashcards
                </h2>
                <div className="flex flex-wrap items-center space-x-4 text-muted-foreground">
                  <span className="font-semibold ">{flashcards.length} cards generated</span>
                  <span className="w-1 h-1 bg-secondary rounded-full" />
                  <span>Ready to study</span>
                  <span className="w-1 h-1 bg-secondary rounded-full" />
                  <span className="text-primary font-medium">AI Optimized</span>
                </div>
              </div>
              <ExportButtons flashcards={flashcards} />
            </div>
          </div>

          <FlashcardDisplay flashcards={flashcards} />
        </div>
      )}
    </section>
  );
};