import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getPortfolioStateCached, ExperienceItem } from '../../utils/supabaseClient';
import ScrambleTitle from '../ui/ScrambleTitle';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [experienceData, setExperienceData] = useState<ExperienceItem[]>([]);

  useEffect(() => {
    getPortfolioStateCached().then(state => {
      if (state && state.experience) {
        setExperienceData(state.experience);
      }
    }).catch(err => console.error('Error loading Experience state:', err));
  }, []);

  useGSAP(() => {
    if (!containerRef.current || experienceData.length === 0) return;
    const cards = containerRef.current.querySelectorAll('.timeline-entry');
    const line = containerRef.current.querySelector('.timeline-line');

    if (line) {
      gsap.fromTo(line, 
        { scaleY: 0 }, 
        { scaleY: 1, transformOrigin: 'top', ease: 'none', scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true
        }}
      );
    }

    cards.forEach(entry => {
      gsap.fromTo(entry,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out', scrollTrigger: {
          trigger: entry,
          start: 'top 85%'
        }}
      );
    });

    if (progressRef.current) {
      gsap.fromTo(progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 50%",
            end: "bottom 80%",
            scrub: 0.5
          }
        }
      );
    }

    // Quick-stats counter animation
    if (statsRef.current) {
      const counts = statsRef.current.querySelectorAll('.stat-count');
      gsap.fromTo(counts,
        { textContent: 0 },
        {
          textContent: (i: number) => {
            const targets = [experienceData.length, experienceData.length, 0];
            return targets[i] || 0;
          },
          duration: 1.5,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 90%'
          }
        }
      );
    }
  }, { scope: containerRef, dependencies: [experienceData] });

  if (experienceData.length === 0) {
    return null;
  }

  return (
    <section id="experience" ref={containerRef} className="border-b border-ink flex flex-col md:flex-row">
      {/* Pinned Experience Title */}
      <div className="w-full md:w-1/3 p-6 md:p-12 md:py-24 border-b md:border-b-0 md:border-r border-ink bg-white relative">
        <div className="sticky top-[30vh] flex flex-col gap-8">
          <div className="flex gap-8">
            <div className="w-[2px] h-32 bg-border-subtle relative hidden md:block">
              <div ref={progressRef} className="absolute top-0 left-0 w-full bg-accent origin-top h-full scale-y-0"></div>
            </div>
            <div>
              <ScrambleTitle text="03 — Timeline" className="text-3xl md:text-4xl text-ink mb-4" />
              <p className="text-sm text-dark-gray font-mono uppercase tracking-widest max-w-xs mt-4">
                Tracing the trajectory from raw code to agentic architecture.
              </p>
            </div>
          </div>

          {/* Quick-stats panel */}
          {experienceData.length > 0 && (
            <div ref={statsRef} className="ml-0 md:ml-[26px] border border-ink bg-off-white p-4 space-y-3">
              <div className="font-mono text-[8px] uppercase tracking-widest text-mid-gray border-b border-ink/10 pb-2">
                // TIMELINE METRICS
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-[10px] uppercase text-dark-gray">Total Entries</span>
                <span className="stat-count font-mono text-sm font-bold text-ink">{experienceData.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-[10px] uppercase text-dark-gray">Role Types</span>
                <span className="stat-count font-mono text-sm font-bold text-ink">
                  {new Set(experienceData.map(e => e.type)).size}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-ink/10 pt-2">
                <span className="font-mono text-[9px] uppercase text-mid-gray flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  TRACKING
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full md:w-2/3 p-6 md:p-12 bg-off-white">
        <div className="relative border-l-2 border-ink ml-4 md:ml-0">
          <div className="timeline-line absolute left-[-2px] top-0 bottom-0 w-[2px] bg-accent origin-top"></div>
          
          <div className="flex flex-col gap-12">
            {experienceData.map((exp, idx) => (
              <div key={idx} className="timeline-entry relative">
                <div className="absolute -left-[29px] top-1.5 w-3 h-3 bg-ink outline outline-1 outline-offset-2 outline-ink"></div>
                
                <div className="ml-10 md:ml-16 pb-16">
                  <div className="font-mono text-[10px] md:text-xs text-dark-gray uppercase tracking-widest font-bold mb-2">
                    {exp.type}
                  </div>
                  <h3 className="font-bold text-xl md:text-2xl leading-none text-ink mb-2">
                    {exp.role} {exp.company && <><span className="text-mid-gray font-normal">•</span> <span className="text-dark-gray">{exp.company}</span></>}
                  </h3>
                  <div className="font-mono text-[10px] uppercase text-mid-gray tracking-wider mb-6">
                    {exp.date}
                  </div>
                  
                  {exp.points && exp.points.length > 0 && (
                    <ul className="space-y-3">
                      {exp.points.map((point, i) => (
                        <li key={i} className="text-sm md:text-base text-dark-gray flex items-start leading-relaxed">
                          <span className="text-accent mr-3 mt-1 text-xs">&#x25B8;</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
