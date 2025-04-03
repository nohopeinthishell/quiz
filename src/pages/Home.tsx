import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { fetchQuestions } from "../utils/fetchQuestions";
import { useQuizStore } from "../store/quizStore";
import { difficultyOptions } from "../constants/difficulties";
import { categories } from "../constants/categories";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToastStore } from "@/store/toastStore";
import { useAuthStore } from "@/store/authStore";
import { useTranslation } from "react-i18next";

const questionAmounts = [5, 10, 15, 20];

const Settings = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const setQuestions = useQuizStore((state) => state.setQuestions);
    const notify = useToastStore((s) => s.notify);
    const user = useAuthStore((u) => u.user);

    console.log(user);

    const [amount, setAmount] = useState(5);
    const [category, setCategory] = useState("any");
    const [difficulty, setDifficulty] = useState("any");
    const [locked, setLocked] = useState(false);

    const startGame = async () => {
        setLocked(true);
        const selectedCategory = category === "any" ? undefined : category;
        const selectedDifficulty = difficulty === "any" ? undefined : difficulty;

        try {
            const questions = await fetchQuestions(amount, selectedCategory, selectedDifficulty);
            setQuestions(questions);
            navigate("/quiz");
        } catch (error) {
            notify("Failed to load questions", {
                type: "error",
                description: (error as Error).message,
            });
            setLocked(false);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-6 p-4">
            <h1 className="text-2xl font-bold">{t("settings")}</h1>

            <div className="flex flex-col gap-2 w-full max-w-sm">
                <Select value={category} onValueChange={(val) => setCategory(val)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="any">{t("any_cat")}</SelectItem>
                        {Object.entries(categories).map(([id, name]) => (
                            <SelectItem key={id} value={id}>
                                {t(name)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={difficulty} onValueChange={(val) => setDifficulty(val)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="any">{t("any_diff")}</SelectItem>
                        {Object.entries(difficultyOptions).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                                {t(label)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={String(amount)} onValueChange={(val) => setAmount(Number(val))}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select amount" />
                    </SelectTrigger>
                    <SelectContent>
                        {questionAmounts.map((num) => (
                            <SelectItem key={num} value={String(num)}>
                                {num} {t("question")}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Button onClick={startGame} disabled={locked}>
                {t("start")}
            </Button>
        </div>
    );
};

export default Settings;
