import { create } from "zustand";

export interface QuestionI  {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers: string[]; 
};

interface QuizState {
  questions: QuestionI[];
  currentIndex: number;
  score: number;
  answers: string[];
  setQuestions: (q: QuestionI[]) => void;
  answerQuestion: (answer: string) => void;
  reset: () => void;
};

export const useQuizStore = create<QuizState>((set, get) => ({
  questions: [],
  currentIndex: 0,
  score: 0,
  answers: [],
  setQuestions: (q) => set({ questions: q, currentIndex: 0, score: 0, answers: [] }),
  answerQuestion: (answer) => {
    const { questions, currentIndex, score, answers } = get();
    const correct = questions[currentIndex].correct_answer;
    set({
      answers: [...answers, answer],
      score: score + (answer === correct ? 1 : 0),
      currentIndex: currentIndex + 1,
    });
  },
  reset: () => set({ questions: [], currentIndex: 0, score: 0, answers: [] }),
}));
