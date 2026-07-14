import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CYPHERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#%&*+<>[]";

export default function ScrambleTitle({ text, className = '' }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const originalText = text.split("");

  useGSAP(() => {
    if (!containerRef.current) return;
    const spans = containerRef.current.querySelectorAll('.scramble-char');
    
    gsap.fromTo(spans, 
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.1,
        stagger: 0.03,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      }
    );

    spans.forEach((span, index) => {
      const targetChar = originalText[index];
      if (targetChar === " " || targetChar === "—") return; 

      const obj = { value: 0 };
      gsap.to(obj, {
        value: 100,
        duration: 0.8 + Math.random() * 0.4,
        delay: index * 0.03,
        ease: "power2.out",
        onUpdate: () => {
          if (obj.value < 100) {
            span.innerHTML = CYPHERS[Math.floor(Math.random() * CYPHERS.length)];
          } else {
            span.innerHTML = targetChar;
          }
        },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "restart none none none",
        }
      });
    });
  }, { scope: containerRef });

  return (
    <h2 ref={containerRef} className={`font-bold tracking-tighter uppercase ${className}`}>
      {originalText.map((char, i) => (
        <span key={i} className={`scramble-char inline-block opacity-0 ${char === " " ? "w-[0.5em]" : "min-w-[0.5ch]"}`}>
          {char}
        </span>
      ))}
    </h2>
  );
}
