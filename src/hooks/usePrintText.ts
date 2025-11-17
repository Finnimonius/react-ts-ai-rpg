import { useState, useEffect } from 'react';

export const usePrintText = (text: string, speed: number = 30) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPrinting, setIsPrinting] = useState(false);

    useEffect(() => {
        setCurrentIndex(0);
        setIsPrinting(true);

        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => {
                if (prevIndex >= text.length) {
                    setIsPrinting(false);
                    clearInterval(interval);
                    return prevIndex;
                }
                return prevIndex + 1;
            });
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    const print = text.slice(0, currentIndex);
    
    return [print, isPrinting] as const;
};