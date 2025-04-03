interface TimerBarPropsI {
    duration: number;
    keyTrigger: number;
    onTimeEnd: () => void;
    locked: boolean;
}

const TimerBar = ({ duration, keyTrigger, onTimeEnd, locked }: TimerBarPropsI) => {
    return (
        <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
            <div
                key={keyTrigger}
                className="h-full bg-blue-500"
                style={{
                    width: "100%",
                    animation: `shrink ${duration}s linear forwards`,
                    animationPlayState: locked ? "paused" : "running",
                }}
                onAnimationEnd={() => {
                    if (!locked) onTimeEnd();
                }}
            />
        </div>
    );
};

export default TimerBar;
