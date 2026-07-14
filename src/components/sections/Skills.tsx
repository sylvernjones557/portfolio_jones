import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getPortfolioStateCached, SkillGroup } from '../../utils/supabaseClient';
import ScrambleTitle from '../ui/ScrambleTitle';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SKILL_DESCRIPTIONS: Record<string, string> = {
  // AI & ML
  'Agentic AI': 'Designing autonomous systems capable of goal-directed planning, executing actions through tool-calling, and analyzing output feedback loops.',
  'AI Agents': 'Building task-specific cognitive entities that run workflows, evaluate conditions, and make decision calls with minimal user supervision.',
  'RAG Pipelines': 'Architecting retrieval pipelines connecting vector databases with generative models to construct highly contextual, private Q&A services.',
  'LLaMA 3.2': 'Deploying Meta’s light, optimized language model locally for private on-device processing and contextual reasoning agents.',
  'Ollama': 'Managing local model runs on resource-constrained systems, serving secure endpoints for local development and private processing.',
  'Prompt Engineering': 'Designing few-shot templates, chain-of-thought instructions, and structural context injection to optimize model performance.',
  'Google AI Studio': 'Using Gemini developer APIs to prototype high-performance agent workflows and multimodal applications.',
  // Frontend
  'HTML': 'Writing clean, semantic document structures utilizing modern accessibility, SEO foundations, and standard tags.',
  'CSS': 'Creating fluid layouts, interactive flex/grid systems, and custom keyframe animations for high-quality visuals.',
  'Tailwind': 'Leveraging utility-first frameworks for rapid, consistent styling of production-grade responsive user interfaces.',
  'Bootstrap': 'Using standard grid containers and pre-built components for responsive prototyping and fast development cycles.',
  'JavaScript': 'Developing dynamic web interactions, handling state management, API requests, and standard browser DOM structures.',
  'React.js': 'Building modular component architectures with React, optimizing renders using hooks, and managing state across routing layers.',
  // Backend
  'Python': 'Writing scripts for data collection, orchestrating model pipelines, and deploying backend APIs with Flask/FastAPI.',
  'PHP': 'Building server-rendered applications, managing relational databases, and handling server-side scripts.',
  'Java': 'Developing object-oriented enterprise systems, utilizing multi-threaded operations and robust type safety frameworks.',
  'C#': 'Building desktop software and backend services within the .NET ecosystem, relying on typed architecture.',
  'C': 'Writing low-level code, managing custom memory allocators, and optimizing algorithms for maximum compiler execution speed.',
  // Database
  'Oracle': 'Designing enterprise relational schemas, writing complex stored procedures, and tuning query execution scripts.',
  'SQL': 'Drafting data queries, optimizing joins, indexing records, and ensuring transactional integrity.',
  // Tools
  'Git': 'Managing codebase versioning, orchestrating team branch workflows, merging features, and rolling back commits.',
  'GitHub': 'Hosting shared codebases, orchestrating automated CI/CD checks, and reviewing collaborative pull requests.',
  'VS Code': 'Configuring customized workspace extensions, local debuggers, and integrations to build a highly streamlined dev environment.',
  'REST APIs': 'Designing endpoints, handling request payloads, managing secure CORS parameters, and formatting JSON responses.',
  'DOM Manipulation': 'Directly mutating document trees, binding events, and updating elements without virtual DOM overhead.',
};

function SkillItem({ 
  name, 
  category, 
  isActive, 
  onClick 
}: { 
  name: string; 
  category?: string; 
  isActive?: boolean; 
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}) {
  const chars = name.split('');

  // Determine decorators, styles, and hover colors based on skill category
  let prefix = '';
  let dotColor = '';
  let hoverBg = 'bg-accent'; // Default Coral
  let hoverShadow = 'hover:shadow-[3px_3px_0px_0px_#C0392B]';
  let activeShadow = 'shadow-[3px_3px_0px_0px_#C0392B] scale-[1.03]';

  if (category === 'AI & ML') {
    prefix = 'ai/';
    dotColor = 'bg-accent';
    hoverBg = 'bg-accent';
    hoverShadow = 'hover:shadow-[3px_3px_0px_0px_#C0392B]';
    activeShadow = 'shadow-[3px_3px_0px_0px_#C0392B] scale-[1.03]';
  } else if (category === 'Frontend') {
    prefix = 'src/';
    dotColor = 'bg-ink';
    hoverBg = 'bg-ink';
    hoverShadow = 'hover:shadow-[3px_3px_0px_0px_#ed6f5c]';
    activeShadow = 'shadow-[3px_3px_0px_0px_#ed6f5c] scale-[1.03]';
  } else if (category === 'Backend') {
    prefix = 'srv/';
    dotColor = 'bg-indigo-600';
    hoverBg = 'bg-indigo-600';
    hoverShadow = 'hover:shadow-[3px_3px_0px_0px_#0A0A0A]';
    activeShadow = 'shadow-[3px_3px_0px_0px_#0A0A0A] scale-[1.03]';
  } else if (category === 'Database') {
    prefix = 'db/';
    dotColor = 'bg-[#e9b94a]';
    hoverBg = 'bg-[#e9b94a]';
    hoverShadow = 'hover:shadow-[3px_3px_0px_0px_#0A0A0A]';
    activeShadow = 'shadow-[3px_3px_0px_0px_#0A0A0A] scale-[1.03]';
  } else if (category === 'Tools') {
    prefix = 'bin/';
    dotColor = 'bg-emerald-600';
    hoverBg = 'bg-emerald-600';
    hoverShadow = 'hover:shadow-[3px_3px_0px_0px_#0A0A0A]';
    activeShadow = 'shadow-[3px_3px_0px_0px_#0A0A0A] scale-[1.03]';
  }

  return (
    <span 
      onClick={onClick}
      className={`group relative overflow-hidden border border-ink bg-white px-2.5 py-1.5 transition-all duration-300 cursor-pointer select-none flex items-center gap-2 ${isActive ? activeShadow : hoverShadow}`}
    >
      {/* Slide-up background */}
      <span className={`absolute inset-0 ${hoverBg} transition-transform duration-300 ease-out ${isActive ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'}`} />
      
      {/* Decorative dot (status light) */}
      {dotColor && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor} relative z-10 transition-colors duration-300 ${isActive ? 'bg-white' : 'group-hover:bg-white'}`} />
      )}

      {/* Decorative Prefix */}
      {prefix && (
        <span className={`relative z-10 font-mono text-[9px] transition-colors duration-300 ${isActive ? 'text-white/60' : 'text-mid-gray group-hover:text-white/60'}`}>
          {prefix}
        </span>
      )}

      {/* Staggered Text Container */}
      <span className="relative flex font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider h-4 overflow-hidden select-none z-10">
        {chars.map((char, idx) => (
          <span 
            key={idx} 
            className={`relative inline-block h-full transition-transform duration-300 ease-out ${isActive ? '-translate-y-full' : 'group-hover:-translate-y-full'}`}
            style={{ transitionDelay: `${idx * 15}ms` }}
          >
            {/* Ink color character (default state) */}
            <span className={isActive ? 'block text-white' : 'block text-ink'}>{char === ' ' ? '\u00A0' : char}</span>
            {/* White character (slides up from below) */}
            <span className="block absolute top-full left-0 w-full text-white">{char === ' ' ? '\u00A0' : char}</span>
          </span>
        ))}
      </span>
    </span>
  );
}

export default function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [skillsData, setSkillsData] = useState<SkillGroup[]>([]);
  const [activeSkill, setActiveSkill] = useState<{ categoryIdx: number; skillIdx: number } | null>(null);
  const [skillsActive, setSkillsActive] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<{
    name: string;
    description: string;
    x: number;
    y: number;
    arrowX: number;
  } | null>(null);

  useEffect(() => {
    getPortfolioStateCached().then(state => {
      if (state && state.skills) {
        setSkillsData(state.skills);
      }
    }).catch(err => console.error('Error loading Skills state:', err));
  }, []);

  useGSAP(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.skill-category-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: 'power2.out', scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          onEnter: () => setSkillsActive(true),
          onEnterBack: () => setSkillsActive(true)
        }}
      );
    }
  }, { scope: containerRef });

  // Sequential highlights loop ONLY on mobile / touch devices when scrolled into viewport
  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    if (!isTouchDevice || !skillsActive || skillsData.length === 0) return;

    // Flatten all skills to access sequentially
    const flatList: { categoryIdx: number; skillIdx: number }[] = [];
    skillsData.forEach((group, categoryIdx) => {
      group.items.forEach((_, skillIdx) => {
        flatList.push({ categoryIdx, skillIdx });
      });
    });

    let currentIdx = 0;
    const interval = setInterval(() => {
      const activeItem = flatList[currentIdx];
      setActiveSkill({ categoryIdx: activeItem.categoryIdx, skillIdx: activeItem.skillIdx });
      currentIdx = (currentIdx + 1) % flatList.length;
    }, 750);

    return () => {
      clearInterval(interval);
      setActiveSkill(null);
    };
  }, [skillsData, skillsActive]);

  // Click outside to dismiss the comment cloud/tooltip
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (activeTooltip && tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
        setActiveTooltip(null);
      }
    };
    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [activeTooltip]);

  // Handle skill click to spawn comment cloud
  const handleSkillClick = (e: React.MouseEvent<HTMLSpanElement>, name: string) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    // Calculate center coordinates of badge relative to container
    const badgeCenterX = rect.left - containerRect.left + rect.width / 2;
    const y = rect.top - containerRect.top - 12; // Offset directly above the badge

    // Bubble width constraints to prevent off-screen bleeding
    const bubbleWidth = window.innerWidth < 640 ? 260 : 280;
    const halfBubbleWidth = bubbleWidth / 2;
    const containerWidth = containerRect.width;
    const padding = 16;

    // Constrain the center position of the bubble so it stays inside the page bounds
    let x = badgeCenterX;
    if (x - halfBubbleWidth < padding) {
      x = halfBubbleWidth + padding;
    } else if (x + halfBubbleWidth > containerWidth - padding) {
      x = containerWidth - halfBubbleWidth - padding;
    }

    // Calculate position of arrow inside the bubble to point exactly to the badge's center
    const arrowX = badgeCenterX - (x - halfBubbleWidth);

    const description = SKILL_DESCRIPTIONS[name] || 'Technical module specializing in developer-guided operations and computational logic.';
    setActiveTooltip({ name, description, x, y, arrowX });
  };

  // Tooltip entrance scale animation via activeTooltip state triggers (Always rendered in DOM to guarantee ref presence)
  useEffect(() => {
    if (activeTooltip && tooltipRef.current) {
      gsap.killTweensOf(tooltipRef.current);
      gsap.fromTo(tooltipRef.current,
        { scale: 0, opacity: 0, y: 15 },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0, 
          duration: 0.35, 
          ease: 'back.out(1.8)',
          onStart: () => {
            if (tooltipRef.current) {
              tooltipRef.current.style.pointerEvents = 'auto';
            }
          }
        }
      );
    } else if (tooltipRef.current) {
      gsap.killTweensOf(tooltipRef.current);
      gsap.to(tooltipRef.current, {
        scale: 0,
        opacity: 0,
        y: 10,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          if (tooltipRef.current) {
            tooltipRef.current.style.pointerEvents = 'none';
          }
        }
      });
    }
  }, [activeTooltip]);

  const allSkills = useCallback(() => {
    return skillsData.flatMap(g => g.items);
  }, [skillsData]);

  if (skillsData.length === 0) {
    return null;
  }

  const flattenedSkills = allSkills();

  return (
    <section id="skills" ref={containerRef} className="border-b border-ink bg-off-white overflow-hidden relative">
      
      {/* Marquee ticker — all skills scrolling horizontally */}
      <div className="w-full overflow-hidden border-b border-ink py-3 bg-ink">
        <div className="animate-marquee flex gap-10 font-mono text-xs sm:text-sm font-black uppercase tracking-widest text-white will-change-transform">
          {[...flattenedSkills, ...flattenedSkills].map((skill, i) => (
            <span key={i} className="whitespace-nowrap flex items-center gap-10">
              {skill}
              <span className="text-accent animate-pulse">◆</span>
            </span>
          ))}
        </div>
      </div>

      <div className="py-16 md:py-24 max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Left Column: Title & Info */}
          <div className="md:col-span-4 flex flex-col justify-center">
            <ScrambleTitle text="02 — Skills" className="text-2xl text-ink mb-4" />
            <p className="font-mono text-[10px] text-mid-gray uppercase tracking-widest max-w-[240px] leading-relaxed">
              // Technical stack and architecture specializations optimized for agentic operations.
            </p>
            <div className="mt-6 flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-mid-gray">LIVE — {flattenedSkills.length} MODULES ACTIVE</span>
            </div>
          </div>

          {/* Right Column: Spec Grid Matrix */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skillsData.map((group, categoryIdx) => (
              <div 
                key={categoryIdx} 
                className={`skill-category-card border-2 border-ink bg-white p-6 relative flex flex-col justify-between transition-all duration-300 hover:shadow-[6px_6px_0px_0px_#ed6f5c] hover:-translate-y-1 overflow-hidden
                  ${categoryIdx === 4 ? 'sm:col-span-2' : ''}`}
              >
                {/* Large offset background index number */}
                <div className="absolute right-4 bottom-2 font-mono text-7xl font-extrabold text-ink/[0.04] pointer-events-none select-none">
                  {(categoryIdx + 1).toString().padStart(2, '0')}
                </div>
                
                <div className="relative z-10">
                  <h3 className="font-bold font-mono text-[10px] text-mid-gray uppercase tracking-widest border-b border-ink pb-3 mb-4 flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      // {categoryIdx + 1}. {group.category}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 border border-ink/20 text-mid-gray bg-off-white uppercase">
                      {group.items.length} Techs
                    </span>
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 pt-1">
                    {group.items.map((skill, skillIdx) => (
                      <SkillItem 
                        key={skillIdx} 
                        name={skill} 
                        category={group.category} 
                        isActive={activeSkill?.categoryIdx === categoryIdx && activeSkill?.skillIdx === skillIdx}
                        onClick={(e) => handleSkillClick(e, skill)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Floating Comment Cloud (Speech Bubble Tooltip) - Always in DOM to ensure animate triggers */}
      <div 
        ref={tooltipRef}
        className="absolute z-50 pointer-events-none bg-white/95 backdrop-blur-md border-2 border-ink p-4 shadow-[4px_4px_0px_0px_#C0392B] w-[260px] sm:w-[280px] origin-bottom -translate-x-1/2 -translate-y-full opacity-0 scale-0"
        style={{
          left: activeTooltip ? `${activeTooltip.x}px` : '0px',
          top: activeTooltip ? `${activeTooltip.y}px` : '0px',
        }}
      >
        <div className="relative">
          <button 
            onClick={() => setActiveTooltip(null)} 
            className="absolute -top-2 -right-2 text-mid-gray hover:text-accent font-bold font-mono text-base leading-none p-1 cursor-pointer select-none"
          >
            ×
          </button>
          <h4 className="font-mono text-[10px] font-bold text-accent uppercase tracking-widest border-b border-ink/10 pb-1 mb-1.5 pr-4">
            💡 {activeTooltip?.name || 'SKILL MODULE'}
          </h4>
          <p className="font-mono text-[10px] sm:text-xs text-ink leading-relaxed font-medium">
            {activeTooltip?.description}
          </p>
        </div>
        
        {/* Bubble Arrow */}
        <div 
          className="absolute top-full -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-ink"
          style={{
            left: activeTooltip ? `${activeTooltip.arrowX}px` : '50%',
          }}
        >
          <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white" />
        </div>
      </div>

    </section>
  );
}
