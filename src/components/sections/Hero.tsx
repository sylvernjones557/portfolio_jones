import { useRef, useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getPortfolioStateCached } from '../../utils/supabaseClient';
import HeroBootSequence from './HeroBootSequence';
import AnimatedTerminalBg from './AnimatedTerminalBg';
import InteractiveScrambleChar from '../ui/InteractiveScrambleChar';
import avatar from '../../assets/avatar.jpg';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const [bootComplete, setBootComplete] = useState(false);
  const [heroData, setHeroData] = useState({
    quote: "AI engineer who doesn't just use AI — I build it, deploy it, and make it think.",
    sequences: [
      '_AI Engineer',
      '_Agentic AI Developer',
      '_Full-Stack Developer',
      '_Data Infrastructure Enthusiast'
    ]
  });

  useEffect(() => {
    getPortfolioStateCached().then(state => {
      if (state && state.hero && state.hero.quote) {
        setHeroData(state.hero);
      }
    }).catch(err => console.error('Error loading Hero state:', err));
  }, []);

  useGSAP(() => {
    // 1. Staggered Intro Character Reveal (Evolving from ashes/dust)
    if (nameRef.current) {
      const chars = nameRef.current.querySelectorAll('.char');
      
      const tl = gsap.timeline();
      
      tl.fromTo(
        chars,
        { 
          y: 50, 
          scale: 1.7, 
          rotation: () => Math.random() * 24 - 12,
          filter: 'blur(12px)',
          opacity: 0 
        },
        { 
          y: 0, 
          scale: 1, 
          rotation: 0,
          filter: 'blur(0px)',
          opacity: 1, 
          stagger: 0.04, 
          duration: 1.6, 
          ease: 'power3.out', 
          delay: 0.2 
        }
      );

      // 2. Sequential Glow sweep (Avengers endgame ignition style)
      tl.to(chars, {
        textShadow: '0 0 20px rgba(192,57,43,0.95), 0 0 35px rgba(192,57,43,0.6)',
        color: '#C0392B',
        duration: 0.35,
        stagger: 0.05,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      }, "-=0.4");

      // 3. Infinite staggered glow wave sequence (Avengers style letter-by-letter pulse)
      tl.add(() => {
        gsap.to(chars, {
          textShadow: '0 0 14px rgba(192,57,43,0.8), 0 0 28px rgba(192,57,43,0.4)',
          color: '#C0392B',
          duration: 0.8,
          stagger: {
            each: 0.15,
            repeat: -1,
            yoyo: true
          },
          ease: 'sine.inOut'
        });
      });
    }

    // 2. Heavy Scroll Animations inside matchMedia (runs only on desktop/tablet >= 768px)
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      // Counter-Scroll Parallax (SYLVESTER slides left, JONES slides right)
      if (row1Ref.current && row2Ref.current) {
        gsap.to(row1Ref.current, {
          xPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });

        gsap.to(row2Ref.current, {
          xPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });
      }

      // Scroll-Velocity Skew & Stretch Distortion
      if (row1Ref.current && row2Ref.current) {
        const rows = [row1Ref.current, row2Ref.current];
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          onUpdate: (self) => {
            const velocity = self.getVelocity(); // Returns px/sec
            const maxVelocity = 3500;
            const normalizedVel = Math.max(-1, Math.min(1, velocity / maxVelocity));
            
            const skewAngle = normalizedVel * 12; // Max 12 degrees slant
            const scaleX = 1 + Math.abs(normalizedVel) * 0.15; // Max 15% horizontal stretch
            
            gsap.to(rows, {
              skewX: -skewAngle,
              scaleX: scaleX,
              duration: 0.35,
              ease: 'power2.out',
              overwrite: 'auto'
            });
          }
        });
      }

      // Scroll-Reactive Gradient Sweep behind name
      if (gradientRef.current) {
        gsap.to(gradientRef.current, {
          backgroundPosition: '100% 50%',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });
      }
    });

    // 5. Fade/Slide in the quote from bottom
    if (quoteRef.current) {
      gsap.fromTo(
        quoteRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 95%',
          }
        }
      );
    }
  }, { scope: containerRef });

  const titleChars1 = "SYLVESTER".split("").map((c, i) => (
    <InteractiveScrambleChar key={i} char={c} />
  ));
  
  const titleChars2 = "JONES".split("").map((c, i) => (
    <InteractiveScrambleChar key={i} char={c} isOutlined={true} />
  ));

  // Stagger entrance animation for bottom elements once boot sequence is complete
  useEffect(() => {
    if (bootComplete) {
      gsap.fromTo('.hero-fade-in', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, [bootComplete]);

  // Map sequences array to TypeAnimation expected format
  const animationSequence = heroData.sequences.flatMap(s => [s, 1500]);

  return (
    <section id="hero" ref={containerRef} className="relative min-h-screen flex flex-col justify-between border-b border-ink pt-28 pb-12 bg-off-white overflow-hidden">
      {/* Top Spacer for centering flex layout */}
      <div className="h-1" />

      {/* Boot sequence overlay (covers hero content while booting) */}
      {!bootComplete && (
        <HeroBootSequence onComplete={() => setBootComplete(true)} />
      )}

      {/* Animated terminal character grid background */}
      <AnimatedTerminalBg />

      {/* Scroll-reactive gradient sweep behind name */}
      <div
        ref={gradientRef}
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(192,57,43,0.07) 0%, transparent 60%)',
          backgroundSize: '200% 100%',
          backgroundPosition: '0% 50%',
        }}
      />

      {/* Topbar Info Row - Now visible on mobile */}
      <div className="absolute top-20 md:top-24 left-0 right-0 flex justify-between items-center w-full px-6 md:px-12 z-10 hero-fade-in opacity-0">
        <span className="font-mono text-[9px] md:text-[10px] text-mid-gray uppercase tracking-widest">— Portfolio 2026 / Chennai, IN</span>
      </div>
      
      {/* Edge-to-Edge Fluid Typography */}
      <div className="w-full flex flex-col items-center justify-center relative z-10 mt-8 mb-6 md:my-8 px-4">
        <div ref={nameRef} className="font-display font-[900] text-[11.8vw] sm:text-[14vw] md:text-[17.5vw] leading-[0.8] tracking-tight uppercase w-full flex flex-col items-center">
          <div ref={row1Ref} className="text-ink whitespace-nowrap will-change-transform pb-1">{titleChars1}</div>
          <div ref={row2Ref} className="text-stroke whitespace-nowrap will-change-transform pt-1">{titleChars2}</div>
        </div>
      </div>

      {/* Structured Bottom Content */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mt-4 md:mt-12 flex items-center gap-4 hero-fade-in opacity-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border border-ink overflow-hidden bg-off-white flex-shrink-0 shadow-[2px_2px_0px_0px_#0A0A0A] hover:scale-105 transition-all duration-300">
            <img 
              src={avatar} 
              alt="Sylvester Jones Profile" 
              className="w-full h-full object-cover animate-avatar-glow transition-all duration-300"
            />
          </div>
          <div className="text-lg sm:text-2xl font-mono text-ink h-10 flex items-center">
            {animationSequence.length > 0 && (
              <TypeAnimation
                key={heroData.sequences.join(',')}
                sequence={animationSequence}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                cursor={true}
              />
            )}
          </div>
        </div>

        <div className="mt-8 md:mt-24 w-full border-t border-b border-ink py-6 md:py-8 flex flex-col md:flex-row justify-between items-start gap-4 md:gap-6 hero-fade-in opacity-0">
          <span className="font-mono text-[9px] md:text-[10px] text-mid-gray uppercase tracking-widest pt-1">— Statement / Focus</span>
          <div ref={quoteRef} className="max-w-3xl md:pl-12 flex-1">
            <p className="font-serif text-xl md:text-3xl font-medium text-ink leading-relaxed italic">
              "{heroData.quote}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
