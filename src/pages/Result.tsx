import { Button } from "@/components/ui/button";
import { useQuizStore } from "../store/quizStore";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";

const Result = () => {
    const { score, questions } = useQuizStore();
    const navigate = useNavigate();

    const restart = () => {
        navigate("/");
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4 h-full justify-center">
            <h2 className="text-2xl font-bold">{t("game_over")}</h2>
            <span>
                {t("your_res")}: {score} / {questions.length}
            </span>
            <Button onClick={restart}>{t("play_again")}</Button>
        </div>
    );
};

export default Result;
