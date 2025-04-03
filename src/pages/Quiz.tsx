import { useEffect, useState } from "react";
import { useQuizStore } from "../store/quizStore";
import { useNavigate } from "react-router-dom";
import FadeIn from "../components/FadeIn";
import { AnimatePresence } from "framer-motion";
import TimerBar from "../components/TimeBar";

const Quiz = () => {
    const [selected, setSelected] = useState<string | null>(null);
    const [locked, setLocked] = useState(false);
    const { questions, currentIndex, answerQuestion } = useQuizStore();
    const navigate = useNavigate();
    const current = questions[currentIndex];
    const duration = 15;

    useEffect(() => {
        if (!current) navigate("/");
    }, [current]);

    useEffect(() => {
        if (questions.length > 0 && currentIndex >= questions.length) {
            navigate("/result");
        }
    }, [currentIndex, questions, navigate]);

    const handleAnswer = (ans: string) => {
        if (locked) return;
        setSelected(ans);
        setLocked(true);

        setTimeout(() => {
            answerQuestion(ans);
            setSelected(null);
            setLocked(false);
        }, 1500);
    };

    return (
        current && (
            <AnimatePresence mode="wait">
                <FadeIn key={currentIndex}>
                    <div className="flex flex-col items-center p-4 gap-4 h-full justify-center max-w-[800px] mx-auto">
                        <h2 className="text-xl font-semibold text-center" dangerouslySetInnerHTML={{ __html: current.question }} />
                        <div className="grid grid-cols-2 gap-4 w-full">
                            {current.answers.map((ans) => {
                                let className = "px-4 py-2 rounded-lg transition cursor-pointer overflow-ellipsis overflow-hidden w-full h-full ";

                                if (locked) {
                                    if (ans === current.correct_answer) {
                                        className += "answer-correct";
                                    } else if (ans === selected) {
                                        className += "answer-wrong";
                                    } else {
                                        className += "answer-default";
                                    }
                                } else {
                                    className += "answer-default";
                                }

                                return <button key={ans} disabled={locked} className={className} onClick={() => handleAnswer(ans)} dangerouslySetInnerHTML={{ __html: ans }} />;
                            })}
                        </div>
                        <span className="text-sm text-gray-500">
                            Question {currentIndex + 1} of {questions.length}
                        </span>
                        <TimerBar locked={locked} duration={duration} keyTrigger={currentIndex} onTimeEnd={() => answerQuestion("timeout")} />
                    </div>
                </FadeIn>
            </AnimatePresence>
        )
    );
};

export default Quiz;
