import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Flashcard } from "@/components/FlashcardGenerator";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

async function retry<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries - 1) throw err;
      console.warn(`Retrying after error... (${i + 1}/${retries})`);
      await new Promise((res) => setTimeout(res, 1000 * Math.pow(2, i)));
    }
  }
  throw new Error("Max retries reached");
}

export const generateFlashcards = async (
  text: string,
  language: string = "English"
): Promise<Flashcard[]> => {
  try {
    if (!API_KEY) {
      console.warn("No API key found, using mock data");
      return generateMockFlashcards(text);
    }
    console.log("text", text);
    const maxChars = 15000;
    if (text.length > maxChars) text = text.slice(0, maxChars);

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    const trimmed = text.trim();
    const isQuestion =
      trimmed.endsWith("?") ||
      /^(what|who|when|where|why|how|which)\b/i.test(trimmed);

    const isShortTopic = !isQuestion && trimmed.split(/\s+/).length <= 20;

    // Case 1: Direct Question
    if (isQuestion) {
      const prompt = `
You are a helpful AI tutor. The user has asked the following question:  
"${text}"  

Answer in ${language}, concisely but completely.  
Only return plain text, no JSON, no extra formatting.
`;
      const result = await retry(() => model.generateContent(prompt));
      const answer = result.response.text().trim();

      return [
        {
          id: `qa-${Date.now()}`,
          question: text,
          answer,
        },
      ];
    }

    // Case 2: Short Topic (< 20 words)
    if (isShortTopic) {
      const prompt = `
You are an expert AI tutor. Generate **unlimited** question-answer pairs about the following topic. 
Answer in ${language}.
Format strictly as a JSON array:
[
  {
    "question": "Question about the topic",
    "answer": "Comprehensive answer in ${language}"
  }
]
Topic: ${trimmed}
`;
      const result = await retry(() => model.generateContent(prompt));
      const responseText = result.response.text();

      const jsonMatch = responseText.match(/\[.*\]/s);
      if (!jsonMatch)
        throw new Error("No valid JSON array found in Gemini response");

      const flashcardsData = JSON.parse(jsonMatch[0]);
      return flashcardsData.map((card: any, index: number) => ({
        id: `topic-${Date.now()}-${index}`,
        question: card.question,
        answer: card.answer,
      }));
    }

    // Case 3: Long Text
    const prompt = `
Based on the following text, create 15-20 flashcards with clear questions and comprehensive answers.
Answer in ${language}.
Format strictly as a JSON array:
[
  {
    "question": "Clear, specific question about the content",
    "answer": "Comprehensive answer that fully explains the concept"
  }
]
Text to analyze:
${trimmed}
`;

    const result = await retry(() => model.generateContent(prompt));
    const responseText = result.response.text();

    const jsonMatch = responseText.match(/\[.*\]/s);
    if (!jsonMatch)
      throw new Error("No valid JSON array found in Gemini response");

    const flashcardsData = JSON.parse(jsonMatch[0]);
    return flashcardsData.map((card: any, index: number) => ({
      id: `card-${Date.now()}-${index}`,
      question: card.question,
      answer: card.answer,
    }));
  } catch (error) {
    console.error("Error generating flashcards:", error);
    throw new Error("Failed to generate flashcards");
  }
};

// Mock data for development/demo use
const generateMockFlashcards = (text: string): Flashcard[] => {
  const mockCards: Flashcard[] = [
    {
      id: "mock-1",
      question: "What is the main topic of the provided text?",
      answer: `Based on the content you provided, this flashcard demonstrates the AI's ability to analyze and create questions from your text.`,
    },
    {
      id: "mock-2",
      question: "How does AI flashcard generation work?",
      answer:
        "AI analyzes the input text to identify key concepts, facts, and important information, then formulates clear questions with comprehensive answers to aid in learning and retention.",
    },
    {
      id: "mock-3",
      question: "What are the benefits of using AI-generated flashcards?",
      answer:
        "AI-generated flashcards save time, ensure consistent quality, identify key concepts automatically, and can process large amounts of text quickly to create comprehensive study materials.",
    },
  ];

  if (text.length > 500) {
    mockCards.push({
      id: "mock-4",
      question: "What makes effective flashcard questions?",
      answer:
        "Effective flashcard questions are clear, specific, focused on one concept, and promote active recall rather than passive recognition.",
    });
  }

  if (text.length > 1000) {
    mockCards.push({
      id: "mock-5",
      question: "How can flashcards improve learning outcomes?",
      answer:
        "Flashcards improve learning through spaced repetition, active recall, and by breaking complex information into digestible chunks that enhance memory retention.",
    });
  }

  return mockCards;
};
