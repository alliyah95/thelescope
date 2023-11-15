import React, { useState, useEffect } from "react";

const LoadingTextAnimation: React.FC<{}> = () => {
    const [loadingText, setLoadingText] = useState("Loading...");

    useEffect(() => {
        const intervalId = setInterval(() => {
            const randomLetters =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            const newLoadingText = Array.from(
                { length: 20 },
                () =>
                    randomLetters[
                        Math.floor(Math.random() * randomLetters.length)
                    ]
            ).join("");
            setLoadingText(newLoadingText);
        }, 20);
        return () => clearInterval(intervalId);
    }, []);

    return <span>{loadingText}</span>;
};

export default LoadingTextAnimation;
