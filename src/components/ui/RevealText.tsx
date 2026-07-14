import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function RevealText({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  // Split text by words safely
  const words = (text || "").split(" ");

  useGSAP(() => {
    if (!containerRef.current) return;
    const wordElements = containerRef.current.querySelectorAll('.reveal-word-inner');
    
    gsap.fromTo(wordElements,
      { y: '110%' },
      {
        y: '0%',
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.015,
        delay: delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <p ref={containerRef} className={`${className} cursor-none`}>
      {words.map((word, i) => (
        <span key={i} className="reveal-word-outer inline-flex overflow-hidden align-bottom mr-[0.25em]">
          <span className="reveal-word-inner inline-block translate-y-[110%] pb-1">
            {word}
          </span>
        </span>
      ))}
    </p>
  );
}
