import axios from "axios";
import { QuestionI } from "../store/quizStore";

const shuffle = (arr: string[]) => [...arr].sort(() => Math.random() - 0.5);

export const fetchQuestions = async (amount = 5, category = "", difficulty = ""): Promise<QuestionI[]> => {
    try {
        const { data } = await axios.get("https://opentdb.com/api.php", {
            params: {
                amount,
                type: "multiple",
                category: category || undefined,
                difficulty: difficulty || undefined,
            },
        });

        if (data.response_code !== 0) {
            throw new Error("No questions found for the selected settings.");
        }

        return data.results.map((q: QuestionI) => ({
            question: q.question,
            correct_answer: q.correct_answer,
            incorrect_answers: q.incorrect_answers,
            answers: shuffle([...q.incorrect_answers, q.correct_answer]),
        }));
    } catch (err: unknown) {
        let message = "Failed to load questions. Try again.";

        if (err instanceof Error) {
            message = err.message;
        }

        throw new Error(message);
    }
};
