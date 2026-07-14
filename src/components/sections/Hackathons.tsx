import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Code2 } from 'lucide-react';
import { getPortfolioStateCached, HackathonItem } from '../../utils/supabaseClient';
import ScrambleTitle from '../ui/ScrambleTitle';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface TechnicalMetric {
  label: string;
  value: string;
}

export default function Hackathons() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeHack, setActiveHack] = useState<HackathonItem | null>(null);
  const [hackathonsList, setHackathonsList] = useState<HackathonItem[]>([]);

  useEffect(() => {
    getPortfolioStateCached().then(state => {
      if (state && state.hackathons) {
        setHackathonsList(state.hackathons);
      }
    }).catch(err => console.error('Error loading Hackathons state:', err));
  }, []);

  const renderIcon = (iconName: string) => {
    if (iconName === 'Trophy') return <Trophy className="w-8 h-8 text-ink" />;
    return <Code2 className="w-8 h-8 text-accent" />;
  };

  useGSAP(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.hackathon-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power2.out', scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%'
        }}
      );
    }
  }, { scope: containerRef });

  // Prevent scroll when modal is active
  useEffect(() => {
    if (activeHack) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [activeHack]);

  return (
    <section id="hackathons" ref={containerRef} className="border-b border-ink py-16 px-6 md:px-12 bg-off-white flex flex-col md:flex-row relative">
      {/* Title Column */}
      <div className="w-full md:w-1/3 pr-8 mb-8 md:mb-0">
        <div className="sticky top-24">
          <ScrambleTitle text="06 — Battlegrounds" className="text-2xl text-ink" />
          <p className="font-mono text-[10px] text-mid-gray uppercase tracking-widest mt-4 max-w-[200px] leading-relaxed">
            // Competitive hackathons, algorithmic trials, and optimization sprints.
          </p>
        </div>
      </div>

      {/* Cards List */}
      <div className="w-full md:w-2/3 grid grid-cols-1 gap-6 relative z-10">
        {hackathonsList.map((hack, idx) => (
          <div 
            key={idx} 
            onClick={() => setActiveHack(hack)}
            className="hackathon-card border border-ink p-6 bg-white flex flex-col sm:flex-row gap-6 hover:bg-off-white hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#0A0A0A] hover:z-10 transition-all duration-300 relative select-none cursor-none"
          >
            <div className="shrink-0 flex items-center justify-center w-16 h-16 bg-off-white border border-ink/10">
              {renderIcon(hack.iconName)}
            </div>
            
            <div className="flex flex-col justify-center flex-grow">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-ink text-white px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider">
                  {hack.status}
                </div>
                <div className="font-mono text-[10px] text-mid-gray uppercase tracking-wider">{hack.date}</div>
              </div>
              
              <h3 className="font-bold text-lg text-ink mb-1 leading-none">{hack.name}</h3>
              
              <p className="text-xs text-dark-gray leading-relaxed max-w-xl mt-1">
                {hack.description}
              </p>
            </div>

            <div className="flex items-end font-mono text-[9px] text-accent uppercase self-end sm:self-center ml-auto group-hover:underline">
              INSPECT //
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Modal Overlay (Dim & Blur Backdrop) */}
      {activeHack && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-ink/40 animate-fade-in"
          onClick={() => setActiveHack(null)}
        >
          {/* Brutalist Dialog Box */}
          <div 
            className="relative w-full max-w-lg border-2 border-ink bg-white shadow-[6px_6px_0px_0px_#0A0A0A] p-6 md:p-8 flex flex-col gap-5 max-h-[90vh] overflow-y-auto font-mono text-xs select-text"
            onClick={(e) => e.stopPropagation()} // Stop click bubbling from closing modal
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b-2 border-ink pb-4">
              <div className="flex items-center gap-4">
                <div className="shrink-0 flex items-center justify-center w-12 h-12 bg-off-white border border-ink/10">
                  {renderIcon(activeHack.iconName)}
                </div>
                <div>
                  <span className="text-[9px] text-mid-gray tracking-widest uppercase">// HACKATHON BATTLE</span>
                  <h3 className="font-display font-black text-xl text-ink uppercase tracking-tight mt-0.5 leading-none">
                    {activeHack.name}
                  </h3>
                </div>
              </div>
              <button 
                onClick={() => setActiveHack(null)}
                className="border border-ink bg-white hover:bg-accent hover:text-white px-2 py-1 text-[10px] font-bold cursor-none select-none active:translate-y-0.5"
              >
                [X]
              </button>
            </div>

            {/* Sub-Header Meta Info */}
            <div className="flex gap-4 font-mono text-[10px]">
              <span className="bg-accent text-white px-2 py-0.5 uppercase tracking-wider">{activeHack.status}</span>
              <span className="text-mid-gray uppercase border border-ink/10 px-2 py-0.5">{activeHack.date}</span>
            </div>

            {/* Pitch Text - Audience/Recruiter Focused */}
            <div className="font-sans text-sm text-dark-gray leading-relaxed pt-1">
              <p>{activeHack.pitch}</p>
            </div>

            {/* AI Technical Metrics Layer (Portrays hackathon intensity) */}
            {activeHack.technicalMetrics && activeHack.technicalMetrics.length > 0 && (
              <div className="border-t border-ink pt-4">
                <span className="text-[9px] text-mid-gray tracking-wider uppercase block mb-3">// TRIAL PARAMETERS & PERFORMANCE</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 font-mono text-[11px] bg-off-white/40 p-3 border border-ink/10">
                  {activeHack.technicalMetrics.map((metric, idx) => (
                    <div key={idx} className="flex justify-between border-b border-ink/5 pb-1">
                      <span className="text-mid-gray">{metric.label}:</span>
                      <span className="font-bold text-ink">{metric.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions Footer */}
            <div className="flex gap-4 border-t border-ink pt-4 mt-2">
              <button 
                onClick={() => setActiveHack(null)}
                className="border border-ink bg-off-white hover:bg-accent hover:text-white px-4 py-1.5 text-[10px] font-bold uppercase cursor-none ml-auto select-none"
              >
                [Dismiss]
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
