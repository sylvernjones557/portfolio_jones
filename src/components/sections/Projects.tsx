import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getPortfolioStateCached, ProjectItem } from '../../utils/supabaseClient';
import ScrambleTitle from '../ui/ScrambleTitle';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [allProjects, setAllProjects] = useState<ProjectItem[]>([]);

  useEffect(() => {
    getPortfolioStateCached().then(state => {
      if (state && state.projects) {
        setAllProjects(state.projects);
      }
    }).catch(err => console.error('Error loading Projects state:', err));
  }, []);

  useGSAP(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.project-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out', scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%'
        }}
      );
    }
  }, { scope: containerRef });

  const handleCardClick = (e: React.MouseEvent, project: ProjectItem) => {
    const target = e.target as HTMLElement;
    if (target.closest('a')) return; // Ignore if user clicked direct action link
    setActiveProject(project);
  };

  // Prevent scroll when modal is active
  useEffect(() => {
    if (activeProject) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [activeProject]);

  return (
    <section id="projects" ref={containerRef} className="border-b border-ink py-16 px-6 md:px-12 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <ScrambleTitle text="05 — Projects" className="text-2xl text-ink mb-12" />

        <div className="grid grid-cols-1 gap-6 md:gap-0 md:grid-cols-2 lg:grid-cols-3 md:border-t md:border-l md:border-ink">
          {allProjects.map((project) => (
            <div 
              key={project.id} 
              onClick={(e) => handleCardClick(e, project)}
              className="project-card group cursor-none flex flex-col p-6 bg-white border-2 border-ink shadow-[4px_4px_0_0_#0A0A0A] md:border-0 md:border-b md:border-r md:shadow-none hover:bg-off-white hover:-translate-y-2 hover:shadow-[4px_4px_0_0_#ed6f5c] hover:z-10 transition-all duration-300 relative h-full"
            >
              {/* Card Header (ID & AI/Terminal status labels) */}
              <div className="flex justify-between items-center font-mono text-[10px] mb-3">
                <span className="text-mid-gray">{project.id}</span>
                <span className={`px-1.5 py-0.5 border text-[9px] font-bold uppercase tracking-wider
                  ${project.status === 'completed' ? 'border-accent bg-accent/5 text-accent' : 
                    project.status === 'working' ? 'border-ink bg-ink text-white' : 
                    'border-mid-gray bg-off-white text-mid-gray'}`}
                >
                  [{project.statusLabel}]
                </span>
              </div>
              
              <h3 className="font-bold text-lg leading-none mb-3 text-ink">
                {project.name}
              </h3>
              
              <p className="text-xs text-dark-gray line-clamp-3 mb-4 flex-grow">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span key={tag} className="font-mono text-[9px] uppercase border border-ink px-1.5 py-0.5 bg-off-white">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-4 mt-auto border-t border-border-subtle pt-3">
                {project.links.map(link => (
                  <a 
                    key={link.label} 
                    href={link.url} 
                    className="font-mono text-[9px] uppercase underline hover:text-accent transition-colors"
                  >
                    {link.label} &#x2197;
                  </a>
                ))}
                <span className="font-mono text-[9px] uppercase text-accent ml-auto group-hover:underline select-none">
                  INSPECT //
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Modal Overlay (Dim & Blur Backdrop) */}
      {activeProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-ink/40 animate-fade-in"
          onClick={() => setActiveProject(null)}
        >
          {/* Brutalist Dialog Box */}
          <div 
            className="relative w-full max-w-lg border-2 border-ink bg-white shadow-[6px_6px_0px_0px_#0A0A0A] p-6 md:p-8 flex flex-col gap-5 max-h-[90vh] overflow-y-auto font-mono text-xs select-text"
            onClick={(e) => e.stopPropagation()} // Stop click bubbling from closing modal
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b-2 border-ink pb-4">
              <div>
                <span className="text-[10px] text-mid-gray tracking-widest uppercase">// {activeProject.categoryName}</span>
                <h3 className="font-display font-black text-2xl text-ink uppercase tracking-tight mt-1 leading-none">
                  {activeProject.name}
                </h3>
              </div>
              <button 
                onClick={() => setActiveProject(null)}
                className="border border-ink bg-white hover:bg-accent hover:text-white px-2 py-1 text-[10px] font-bold cursor-none select-none active:translate-y-0.5"
              >
                [X]
              </button>
            </div>

            {/* Pitch Text - Audience/Recruiter Focused */}
            <div className="font-sans text-sm text-dark-gray leading-relaxed pt-1">
              <p>{activeProject.pitch}</p>
            </div>

            {/* AI Technical Metrics Layer (Portrays project intensity) */}
            {activeProject.technicalMetrics && activeProject.technicalMetrics.length > 0 && (
              <div className="border-t border-ink pt-4">
                <span className="text-[9px] text-mid-gray tracking-wider uppercase block mb-3">// RUNTIME PARAMETERS & METRICS</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 font-mono text-[11px] bg-off-white/40 p-3 border border-ink/10">
                  {activeProject.technicalMetrics.map((metric, idx) => (
                    <div key={idx} className="flex justify-between border-b border-ink/5 pb-1">
                      <span className="text-mid-gray">{metric.label}:</span>
                      <span className="font-bold text-ink">{metric.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {activeProject.tags.map(tag => (
                <span key={tag} className="text-[9px] font-mono border border-ink px-1.5 py-0.5 uppercase bg-off-white">
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions Footer */}
            <div className="flex gap-4 border-t border-ink pt-4 mt-2">
              {activeProject.links.map(link => (
                <a 
                  key={link.label} 
                  href={link.url} 
                  className="border border-ink bg-white hover:bg-ink hover:text-white px-3 py-1.5 text-[10px] font-bold uppercase cursor-none transition-colors"
                >
                  {link.label} &#x2197;
                </a>
              ))}
              
              <button 
                onClick={() => setActiveProject(null)}
                className="border border-ink bg-off-white hover:bg-accent hover:text-white px-3 py-1.5 text-[10px] font-bold uppercase cursor-none ml-auto select-none"
              >
                [Back]
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
