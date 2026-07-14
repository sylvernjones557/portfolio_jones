import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AbstractBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    
    // Create grid items
    const cols = Math.floor(window.innerWidth / 40);
    const rows = Math.floor(window.innerHeight / 40);
    const total = cols * rows;
    
    let html = '';
    for(let i = 0; i < total; i++) {
      html += `<div class="grid-plus flex items-center justify-center font-mono text-[10px] text-ink opacity-10 transition-opacity duration-500 hover:opacity-100 hover:text-accent cursor-default">+</div>`;
    }
    gridRef.current.innerHTML = html;
    gridRef.current.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    gridRef.current.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    const pluses = gridRef.current.querySelectorAll('.grid-plus');
    
    // Random twinkling effect
    gsap.to(pluses, {
      opacity: () => Math.random() > 0.8 ? 0.3 : 0.1,
      duration: "random(2, 4)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        amount: 2,
        from: "random"
      }
    });

  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white z-10"></div>
      <div ref={gridRef} className="absolute inset-0 grid px-4 py-4 w-full h-full pointer-events-auto">
        {/* Grid populated via JS for responsive counts */}
      </div>
    </div>
  );
}
