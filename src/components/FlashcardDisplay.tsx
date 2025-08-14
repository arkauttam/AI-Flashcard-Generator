import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, RotateCcw, Star, BookOpen, Bookmark, Zap, Volume2 } from "lucide-react";
import type { Flashcard } from "./FlashcardGenerator";

interface FlashcardDisplayProps {
  flashcards: Flashcard[];
}

export const FlashcardDisplay = ({ flashcards }: FlashcardDisplayProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentCard = flashcards[currentIndex];

  // Update progress indicator
  useEffect(() => {
    setProgress(((currentIndex + 1) / flashcards.length) * 100);
  }, [currentIndex, flashcards.length]);

  const navigateCard = (direction: 'next' | 'prev') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setIsFlipped(false);
    
    setTimeout(() => {
      setCurrentIndex(prev => 
        direction === 'next' 
          ? (prev + 1) % flashcards.length 
          : (prev - 1 + flashcards.length) % flashcards.length
      );
      setIsAnimating(false);
    }, 300);
  };

  const flipCard = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsFlipped(prev => !prev);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const jumpToCard = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    
    setIsAnimating(true);
    setIsFlipped(false);
    
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 300);
  };

  // Text-to-speech function
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Progress bar */}
      <div className="w-full bg-foreground/10 h-1.5 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out-quart"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Premium 3D Card Display */}
      <div className="flex justify-center px-4">
        <div className="relative w-full max-w-4xl h-[550px] perspective-1200">
          <div 
            className={`relative w-full h-full transition-transform duration-700 ease-premium preserve-3d ${
              isFlipped ? 'rotate-y-180' : ''
            } ${isAnimating ? 'pointer-events-none' : ''}`}
          >
            {/* Front of card (Question) */}
            <Card 
              className={`absolute inset-0 w-full h-full p-8 md:p-12 cursor-pointer bg-gradient-to-br from-background via-background to-foreground/5 border border-primary/20 shadow-2xl transition-all duration-700 flex flex-col items-center justify-center text-center backface-hidden overflow-hidden group ${
                isFlipped ? 'z-0' : 'z-10'
              }`}
              onClick={flipCard}
            >
              {/* Animated background elements */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/30 blur-xl animate-float-slow" />
                <div className="absolute bottom-1/3 right-1/3 w-40 h-40 rounded-full bg-accent/20 blur-xl animate-float-slower" />
              </div>
              
              {/* Decorative corner elements */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/50 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/50 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/50 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/50 rounded-br-lg" />

              <div className="relative w-full h-full flex flex-col items-center justify-center space-y-8 z-10">
                <div className="flex items-center justify-center space-x-4">
                  <Badge className="bg-background text-primary border border-primary/30 px-4 py-2 text-sm font-medium shadow-sm">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Question {currentIndex + 1} of {flashcards.length}
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full w-9 h-9 bg-background border border-primary/20 hover:bg-primary/10 hover:border-primary/30"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakText(currentCard.question);
                    }}
                  >
                    <Volume2 className="w-4 h-4 text-primary" />
                  </Button>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-display font-bold leading-tight text-foreground max-w-3xl px-4">
                  {currentCard.question}
                </h3>
                
                <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
                  <div className="flex items-center space-x-2 animate-pulse-slow">
                    <RotateCcw className="w-5 h-5 text-primary" />
                    <span className="font-medium text-sm">Click to reveal answer</span>
                  </div>
                  <span className="text-xs text-muted-foreground/60">or press space</span>
                </div>
              </div>
            </Card>

            {/* Back of card (Answer) */}
            <Card 
              className={`absolute inset-0 w-full h-full p-8 md:p-12 cursor-pointer bg-gradient-to-br from-background via-background to-secondary/5 border border-secondary/20 shadow-2xl transition-all duration-700 flex flex-col items-center justify-center text-center rotate-y-180 backface-hidden overflow-hidden group ${
                isFlipped ? 'z-10' : 'z-0'
              }`}
              onClick={flipCard}
            >
              {/* Animated background elements */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/3 left-1/3 w-40 h-40 rounded-full bg-secondary/30 blur-xl animate-float-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-accent/20 blur-xl animate-float-slower" />
              </div>
              
              {/* Decorative corner elements */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-secondary/50 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-secondary/50 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-secondary/50 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-secondary/50 rounded-br-lg" />

              <div className="relative w-full h-full flex flex-col items-center justify-center space-y-8 z-10">
                <div className="flex items-center justify-center space-x-4">
                  <Badge className="bg-background text-secondary border border-secondary/30 px-4 py-2 text-sm font-medium shadow-sm">
                    <Star className="w-4 h-4 mr-2" />
                    Answer
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full w-9 h-9 bg-background border border-secondary/20 hover:bg-secondary/10 hover:border-secondary/30"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakText(currentCard.answer);
                    }}
                  >
                    <Volume2 className="w-4 h-4 text-secondary" />
                  </Button>
                </div>
                
                <p className="text-2xl md:text-3xl font-body leading-relaxed text-foreground max-w-3xl px-4">
                  {currentCard.answer}
                </p>
                
                <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
                  <div className="flex items-center space-x-2 animate-pulse-slow">
                    <RotateCcw className="w-5 h-5 text-secondary" />
                    <span className="font-medium text-sm">Click to show question</span>
                  </div>
                  <span className="text-xs text-muted-foreground/60">or press space</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Premium Controls */}
      <div className="bg-background/80 backdrop-blur-lg p-6 rounded-2xl border border-foreground/10 shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Button 
            variant="outline" 
            onClick={() => navigateCard('prev')}
            disabled={flashcards.length <= 1 || isAnimating}
            className="h-12 px-5 border-foreground/20 hover:border-secondary/40 hover:bg-secondary/5 transition-all duration-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed group"
          >
            <ChevronLeft className="w-5 h-5 mr-2 text-foreground/70 group-hover:text-secondary transition-colors" />
            <span className="font-medium group-hover:text-secondary">Previous</span>
          </Button>

          <div className="flex items-center space-x-4">
            <Button
              onClick={flipCard}
              disabled={isAnimating}
              className="h-12 px-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              <div className="relative">
                <RotateCcw className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:rotate-90" />
              </div>
              Flip Card
            </Button>
            
            <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10">
              <span className="text-sm font-medium text-foreground/70">
                Card
              </span>
              <span className="text-primary font-bold">
                {currentIndex + 1}
              </span>
              <span className="text-foreground/50">
                /
              </span>
              <span className="text-foreground/70">
                {flashcards.length}
              </span>
            </div>
          </div>

          <Button 
            variant="outline" 
            onClick={() => navigateCard('next')}
            disabled={flashcards.length <= 1 || isAnimating}
            className="h-12 px-5 border-foreground/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed group"
          >
            <span className="font-medium group-hover:text-primary">Next</span>
            <ChevronRight className="w-5 h-5 ml-2 text-foreground/70 group-hover:text-primary transition-colors" />
          </Button>
        </div>
      </div>

      {/* Interactive Card Navigation Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-foreground/80">
            Card Navigation
          </h3>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-foreground/60">
              <Bookmark className="w-4 h-4 mr-2" />
              Bookmark
            </Button>
            <Button variant="ghost" size="sm" className="text-foreground/60">
              <Zap className="w-4 h-4 mr-2" />
              Mastered
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
          {flashcards.map((_, index) => (
            <Button
              key={index}
              variant={index === currentIndex ? "default" : "outline"}
              size="sm"
              onClick={() => jumpToCard(index)}
              disabled={isAnimating}
              className={`
                h-10 w-full transition-all duration-300 font-medium
                ${
                  index === currentIndex 
                    ? "bg-gradient-to-br from-primary to-accent text-white shadow-md scale-105" 
                    : "bg-background border-foreground/15 hover:border-primary/40 hover:bg-primary/5 hover:text-secondary"
                }
                ${isAnimating ? "pointer-events-none" : ""}
              `}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};