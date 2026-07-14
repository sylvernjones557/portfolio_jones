import { useState, useRef, useEffect } from 'react';

const CYPHERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#%&*+<>[]{}!?/\\|";

interface InteractiveScrambleCharProps {
  char: string;
  isOutlined?: boolean;
}

export default function InteractiveScrambleChar({ char, isOutlined = false }: InteractiveScrambleCharProps) {
  const [displayChar, setDisplayChar] = useState(char);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerScrambleOnly = () => {
    if (char === " ") return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    let iterations = 0;
    const maxIterations = 4;
    intervalRef.current = setInterval(() => {
      setDisplayChar(CYPHERS[Math.floor(Math.random() * CYPHERS.length)]);
      iterations++;
      if (iterations >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayChar(char);
      }
    }, 30);
  };

  const startScramble = () => {
    if (char === " ") return;
    setIsHovered(true);

    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    let iterations = 0;
    const maxIterations = 8;

    intervalRef.current = setInterval(() => {
      setDisplayChar(CYPHERS[Math.floor(Math.random() * CYPHERS.length)]);
      iterations++;
      if (iterations >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayChar(char);
      }
    }, 40);

    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplayChar(char);
    }, 320);
  };

  const stopScramble = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    // Periodically auto-scramble characters to feel alive on mobile
    const randomDelay = 7000 + Math.random() * 15000;
    const interval = setInterval(() => {
      if (!isHovered) {
        triggerScrambleOnly();
      }
    }, randomDelay);

    return () => {
      clearInterval(interval);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [char, isHovered]);

  if (char === " ") {
    return <span className="inline-block w-[0.4em] select-none">&nbsp;</span>;
  }

  // Base and active states styling for brutalist look
  const baseClass = isOutlined
    ? "text-stroke bg-transparent transition-all duration-150 ease-out inline-block char select-none px-0.5"
    : "text-ink bg-transparent transition-all duration-150 ease-out inline-block char select-none px-0.5";

  const hoverClass = isOutlined
    ? "hover:text-accent hover:bg-ink hover:-translate-x-1.5 hover:-translate-y-1.5 hover:scale-110 hover:-rotate-3 hover:shadow-[4px_4px_0px_#0A0A0A] hover:border hover:border-ink"
    : "hover:text-white hover:bg-accent hover:-translate-x-1.5 hover:-translate-y-1.5 hover:scale-110 hover:rotate-3 hover:shadow-[4px_4px_0px_#0A0A0A] hover:border hover:border-ink";

  return (
    <span
      onMouseEnter={startScramble}
      onMouseLeave={stopScramble}
      onTouchStart={startScramble}
      onTouchEnd={stopScramble}
      className={`${baseClass} ${hoverClass}`}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {displayChar}
    </span>
  );
}
