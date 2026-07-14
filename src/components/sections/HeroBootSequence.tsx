import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface BootLog {
  text: string;
}

const BOOT_LOGS: BootLog[] = [
  { text: 'INITIALIZING KERNEL' },
  { text: 'LOADING AGENTIC ENGINES' },
  { text: 'MOUNTING VECTOR STORE' },
  { text: 'CALIBRATING NEURAL ROUTER' },
  { text: 'ESTABLISHING SECURE SHELL' },
];

const BOOT_LINE_INTERVAL = 400;
const BOOT_COMPLETE_DELAY = 500;

interface HeroBootSequenceProps {
  onComplete: () => void;
}

export default function HeroBootSequence({ onComplete }: HeroBootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [showCursor, setShowCursor] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    document.body.style.overflow = 'hidden';

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    BOOT_LOGS.forEach((_, index) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);

        if (index === BOOT_LOGS.length - 1) {
          setTimeout(() => {
            setShowCursor(false);

            if (containerRef.current) {
              gsap.to(containerRef.current, {
                yPercent: -100,
                opacity: 0,
                duration: 0.7,
                ease: 'power4.inOut',
                onComplete: () => {
                  document.body.style.overflow = '';
                  onComplete();
                },
              });
            }
          }, BOOT_COMPLETE_DELAY);
        }
      }, (index + 1) * BOOT_LINE_INTERVAL);

      timeouts.push(t);
    });

    timeoutsRef.current = timeouts;

    return () => {
      timeouts.forEach(clearTimeout);
      document.body.style.overflow = '';
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] w-screen h-screen bg-ink flex flex-col items-center justify-center"
    >
      <div className="max-w-lg w-full px-6 md:px-0">
        <div className="font-mono text-xs md:text-sm leading-relaxed space-y-2">
          {BOOT_LOGS.map((log, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 transition-opacity duration-300 ${
                index < visibleLines ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <span className="text-white/70">&gt;</span>
              <span className="text-white/90">{log.text}</span>
              <span
                className={`text-accent font-bold transition-opacity duration-200 ${
                  index < visibleLines ? 'opacity-100' : 'opacity-0'
                }`}
              >
                DONE
              </span>
            </div>
          ))}
        </div>

        {/* Divider + Ready message */}
        {visibleLines === BOOT_LOGS.length && (
          <div className="mt-6 transition-opacity duration-500">
            <div className="border-t border-white/20 mb-4" />
            <div className="font-mono text-xs md:text-sm text-accent font-bold">
              SYSTEM_READY. WELCOME, RECRUITER.
            </div>
          </div>
        )}

        {/* Blinking cursor */}
        {showCursor && (
          <div className="mt-3 font-mono text-xs md:text-sm text-white/90 flex items-center gap-2">
            <span className="animate-pulse">▊</span>
          </div>
        )}
      </div>
    </div>
  );
}
