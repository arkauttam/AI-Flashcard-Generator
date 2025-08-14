import { Button } from "@/components/ui/button";
import { Download, FileText, FileSpreadsheet, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import type { Flashcard } from "./FlashcardGenerator";

interface ExportButtonsProps {
  flashcards: Flashcard[];
}

export const ExportButtons = ({ flashcards }: ExportButtonsProps) => {
  const { toast } = useToast();

  const exportAsJSON = () => {
    const dataStr = JSON.stringify(flashcards, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "flashcards.json";
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "JSON exported",
      description: "Flashcards exported as JSON file successfully.",
    });
  };

  const exportAsCSV = () => {
    const csvContent = [
      ["Question", "Answer"],
      ...flashcards.map(card => [card.question, card.answer])
    ].map(row => row.map(field => `"${field.replace(/"/g, '""')}"`).join(",")).join("\n");

    const dataBlob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "flashcards.csv";
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "CSV exported",
      description: "Flashcards exported as CSV file successfully.",
    });
  };

  const exportAsPDF = () => {
    const pdf = new jsPDF();
    const pageHeight = pdf.internal.pageSize.height;
    let yPosition = 20;

    pdf.setFontSize(20);
    pdf.text("FlashAI - Generated Flashcards", 20, yPosition);
    yPosition += 20;

    flashcards.forEach((card, index) => {
      // Check if we need a new page
      if (yPosition > pageHeight - 60) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.setFontSize(14);
      pdf.text(`Card ${index + 1}`, 20, yPosition);
      yPosition += 10;

      pdf.setFontSize(12);
      pdf.text("Q:", 20, yPosition);
      const questionLines = pdf.splitTextToSize(card.question, 170);
      pdf.text(questionLines, 30, yPosition);
      yPosition += questionLines.length * 5 + 5;

      pdf.text("A:", 20, yPosition);
      const answerLines = pdf.splitTextToSize(card.answer, 170);
      pdf.text(answerLines, 30, yPosition);
      yPosition += answerLines.length * 5 + 15;
    });

    pdf.save("flashcards.pdf");

    toast({
      title: "PDF exported",
      description: "Flashcards exported as PDF file successfully.",
    });
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button 
        variant="outline"
        onClick={exportAsJSON}
        className="hover:text-white glass-morphism border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-500 hover-lift font-semibold"
      >
        <FileText className="w-4 h-4 mr-2" />
        Export JSON
      </Button>
      <Button 
        variant="outline"
        onClick={exportAsCSV}
        className="hover:text-white glass-morphism border-secondary/30 hover:bg-secondary/10 hover:border-secondary/50 transition-all duration-500 hover-lift font-semibold"
      >
        <FileSpreadsheet className="w-4 h-4 mr-2" />
        Export CSV
      </Button>
      <Button 
        onClick={exportAsPDF}
        className="bg-gradient-accent hover:shadow-glow-accent transition-all duration-500 hover-lift font-semibold"
      >
        <Download className="w-4 h-4 mr-2" />
        Export PDF
      </Button>
    </div>
  );
};