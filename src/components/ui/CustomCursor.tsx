import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    const checkPointer = () => {
      if (mediaQuery.matches && window.innerWidth >= 768) {
        setIsActive(true);
        document.body.classList.add('has-custom-cursor');
      } else {
        setIsActive(false);
        document.body.classList.remove('has-custom-cursor');
      }
    };

    checkPointer();
    mediaQuery.addEventListener('change', checkPointer);
    window.addEventListener('resize', checkPointer);

    return () => {
      mediaQuery.removeEventListener('change', checkPointer);
      window.removeEventListener('resize', checkPointer);
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const cursor = cursorRef.current;
    const text = textRef.current;
    if (!cursor) return;

    // Set initial position centered
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      });

      const target = e.target as HTMLElement;
      const interactable = target.closest('.project-card, .article-card, .stat-card, a, button, p');

      if (interactable) {
        if (!isHovering) {
          isHovering = true;
          let actionText = '';
          let isTextHover = false;
          
          if (interactable.closest('.project-card')) {
            actionText = 'VIEW';
          } else if (interactable.closest('.article-card')) {
            actionText = 'READ';
          } else if (interactable.closest('.stat-card')) {
            actionText = 'DATA';
          } else if (interactable.tagName.toLowerCase() === 'p' || interactable.closest('p')) {
            isTextHover = true;
          }

          gsap.killTweensOf([cursor, text]);
          
          gsap.to(cursor, {
            width: isTextHover ? 80 : (actionText ? 64 : 48),
            height: isTextHover ? 80 : (actionText ? 64 : 48),
            backgroundColor: actionText ? '#C0392B' : (isTextHover ? 'rgba(10, 10, 10, 0.05)' : 'transparent'),
            border: actionText ? 'none' : (isTextHover ? '1.5px solid #C0392B' : '2px solid #0A0A0A'),
            mixBlendMode: 'normal',
            duration: 0.3,
            ease: 'power3.out',
            overwrite: true
          });
          
          if (actionText && text) {
            text.innerText = actionText;
            gsap.to(text, { opacity: 1, duration: 0.2, overwrite: true });
          } else if (text) {
            gsap.to(text, { opacity: 0, duration: 0.1, overwrite: true, onComplete: () => text.innerText = '' });
          }
        }
      } else {
        if (isHovering) {
          isHovering = false;
          gsap.killTweensOf([cursor, text]);
          gsap.to(cursor, {
            width: 16,
            height: 16,
            backgroundColor: '#0A0A0A',
            border: 'none',
            mixBlendMode: 'normal',
            duration: 0.3,
            ease: 'power3.out',
            overwrite: true
          });
          if (text) {
            gsap.to(text, { 
              opacity: 0, 
              duration: 0.1, 
              overwrite: true,
              onComplete: () => {
                if (!isHovering) text.innerText = '';
              }
            });
          }
        }
      }
    };

    const handleMouseDown = () => {
      gsap.to(cursor, { scale: 0.8, duration: 0.1, overwrite: "auto" });
    };
    
    const handleMouseUp = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'back.out(2)', overwrite: "auto" });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-4 h-4 bg-ink rounded-full pointer-events-none z-[9999] flex items-center justify-center font-mono text-[10px] font-bold text-white tracking-widest overflow-hidden"
    >
      <span ref={textRef} className="opacity-0"></span>
    </div>
  );
}
