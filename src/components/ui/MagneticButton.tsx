import { useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';

export default function MagneticButton({ children, className = '', onClick }: { children: ReactNode, className?: string, onClick?: () => void }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Disable magnetic effect on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const button = buttonRef.current;
    const text = textRef.current;
    if (!button || !text) return;

    const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });
    
    const textXTo = gsap.quickTo(text, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const textYTo = gsap.quickTo(text, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = button.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      xTo(x * 0.4);
      yTo(y * 0.4);
      textXTo(x * 0.2);
      textYTo(y * 0.2);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      textXTo(0);
      textYTo(0);
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <button 
      ref={buttonRef} 
      onClick={onClick}
      className={`relative flex items-center justify-center cursor-none ${className}`}
    >
      <span ref={textRef} className="pointer-events-none w-full h-full flex items-center justify-center">{children}</span>
    </button>
  );
}
