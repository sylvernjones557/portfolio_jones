/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState, ReactNode } from 'react';
import { TypeAnimation } from 'react-type-animation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, Phone, ArrowUpRight, Trophy, Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  return (
    <div className="min-h-screen bg-white text-ink font-sans selection:bg-accent selection:text-white">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Hackathons />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Check if device is desktop (has hover capability)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.body.classList.add('has-custom-cursor');

    const cursor = cursorRef.current;
    const text = textRef.current;
    
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
      const interactable = target.closest('.project-card, .article-card, a, button');

      if (interactable) {
        if (!isHovering) {
          isHovering = true;
          let actionText = '';
          
          if (interactable.closest('.project-card')) {
            actionText = 'VIEW';
          } else if (interactable.closest('.article-card')) {
            actionText = 'READ';
          }

          gsap.to(cursor, {
            width: actionText ? 64 : 48,
            height: actionText ? 64 : 48,
            backgroundColor: actionText ? '#C0392B' : 'transparent',
            border: actionText ? 'none' : '2px solid #0A0A0A',
            mixBlendMode: actionText ? 'normal' : 'difference',
            duration: 0.3,
            ease: 'power3.out'
          });
          
          if (actionText && text) {
            text.innerText = actionText;
            gsap.to(text, { opacity: 1, duration: 0.2, delay: 0.1 });
          }
        }
      } else {
        if (isHovering) {
          isHovering = false;
          gsap.to(cursor, {
            width: 16,
            height: 16,
            backgroundColor: '#FFFFFF',
            border: 'none',
            mixBlendMode: 'difference',
            duration: 0.3,
            ease: 'power3.out'
          });
          if (text) {
            gsap.to(text, { opacity: 0, duration: 0.2, onComplete: () => text.innerText = '' });
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden sm:flex items-center justify-center font-mono text-[10px] font-bold text-white tracking-widest overflow-hidden"
    >
      <span ref={textRef} className="opacity-0"></span>
    </div>
  );
}

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none border-[8px] md:border-[12px] border-ink z-[100]"></div>
      <nav
        className={`fixed top-0 w-full z-50 flex items-center justify-between px-6 md:px-10 py-5 transition-all duration-300 bg-white border-b border-ink`}
      >
        <div className="font-mono font-bold text-xl tracking-tighter">
          &lt;SJ /&gt;
        </div>

        <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest">
          <NavLink href="#about" label="About" />
          <NavLink href="#skills" label="Skills" />
          <NavLink href="#experience" label="Experience" />
          <NavLink href="#projects" label="Projects" />
          <NavLink href="#blog" label="Blog" />
          <NavLink href="#contact" label="Contact" />
          
          <button className="bg-ink text-white px-6 py-2 text-xs uppercase font-bold tracking-tighter hover:bg-accent transition-colors duration-200">
            Resume
          </button>
        </div>

        <div className="md:hidden pt-2 pl-2">
          <button onClick={() => setMobileMenuOpen(true)}>
            <div className="w-6 h-[2px] bg-ink mb-1.5"></div>
            <div className="w-6 h-[2px] bg-ink mb-1.5"></div>
            <div className="w-6 h-[2px] bg-ink"></div>
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-ink z-[100] text-white flex flex-col items-center justify-center space-y-8">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-8 right-8 text-white font-mono text-2xl"
          >
            [X]
          </button>
          <MobileNavLink href="#about" label="About" setOpen={setMobileMenuOpen} />
          <MobileNavLink href="#skills" label="Skills" setOpen={setMobileMenuOpen} />
          <MobileNavLink href="#experience" label="Experience" setOpen={setMobileMenuOpen} />
          <MobileNavLink href="#projects" label="Projects" setOpen={setMobileMenuOpen} />
          <MobileNavLink href="#blog" label="Blog" setOpen={setMobileMenuOpen} />
          <MobileNavLink href="#contact" label="Contact" setOpen={setMobileMenuOpen} />
        </div>
      )}
    </>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="text-ink hover:text-accent border-b-2 border-transparent hover:border-accent transition-colors"
    >
      {label}
    </a>
  );
}

function MobileNavLink({ href, label, setOpen }: { href: string; label: string; setOpen: (open: boolean) => void }) {
  return (
    <a
      href={href}
      onClick={() => setOpen(false)}
      className="font-display font-bold text-4xl uppercase hover:text-accent transition-colors"
    >
      {label}
    </a>
  );
}

// ... other components will follow
function AbstractBackground() {
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

function Hero() {
  const nameRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (nameRef.current) {
      const chars = nameRef.current.querySelectorAll('.char');
      gsap.fromTo(
        chars,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.8, ease: 'power4.out', delay: 0.2 }
      );
    }

    if (quoteRef.current) {
      gsap.fromTo(
        quoteRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 90%',
          }
        }
      );
    }
  }, []);

  const titleChars1 = "SYLVESTER".split("").map((c, i) => (
    <span key={i} className="char inline-block">{c}</span>
  ));
  const titleChars2 = "JONES".split("").map((c, i) => (
    <span key={i} className="char inline-block">{c}</span>
  ));

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 border-b border-ink pt-16 bg-off-white overflow-hidden">
      <AbstractBackground />
      <div className="absolute top-24 left-6 md:left-12 flex justify-between items-start w-full pr-12 md:pr-24 hidden sm:flex z-10">
        <span className="font-mono text-[10px] text-mid-gray uppercase tracking-widest">— Portfolio 2026 / Chennai, IN</span>
        <div className="bg-accent text-white px-3 py-1 text-[10px] font-mono mr-12 md:mr-0 z-10">STATUS: BUILDING IN PUBLIC</div>
      </div>
      
      <div className="w-full max-w-7xl pt-12 md:pt-0">
        <div ref={nameRef} className="font-display font-[900] text-7xl sm:text-[100px] md:text-[110px] lg:text-[130px] leading-[0.85] tracking-tighter uppercase overflow-hidden">
          <div className="text-ink">{titleChars1}</div>
          <div className="text-stroke">{titleChars2}</div>
        </div>

        <div className="mt-8 md:mt-12 text-lg sm:text-2xl font-mono text-ink h-10">
          <TypeAnimation
            sequence={[
              '_AI Engineer',
              1500,
              '_Agentic AI Developer',
              1500,
              '_Full-Stack Developer',
              1500,
              '_Data Infrastructure Enthusiast',
              1500,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            cursor={true}
          />
        </div>

        <div className="mt-16 md:mt-24 flex flex-col md:flex-row justify-between items-end gap-12">
          <div ref={quoteRef} className="max-w-xl border-l-[4px] border-ink pl-6 py-2 bg-white flex-shrink-0 relative overflow-hidden min-h-[5rem] md:min-h-[4rem]">
            <p className="font-serif text-xl font-medium text-ink leading-relaxed italic">
              <TypeAnimation
                sequence={[
                  '"AI engineer who doesn\'t just use AI — I build it, deploy it, and make it think."',
                  3000,
                  '"Bridging the gap between raw data and intelligent agency."',
                  3000,
                  '"Building the autonomous web, one agent at a time."',
                  3000,
                  '"Engineering prompts that unlock complex reasoning capabilities."',
                  3000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                cursor={true}
              />
            </p>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-1 font-mono text-[11px] text-left md:text-right uppercase">
            <span>📍 Chennai</span>
            <span>🎓 BCA @ Loyola</span>
            <span className="font-bold">CGPA 9.1</span>
          </div>
        </div>
      </div>
    </section>
  );
}
function About() {
  return (
    <section id="about" className="border-b border-ink flex flex-col md:flex-row">
      {/* Left Column: Bio */}
      <div className="w-full md:w-3/5 p-8 md:p-12 border-b md:border-b-0 md:border-r border-ink flex flex-col justify-center">
        <h2 className="font-bold text-2xl mb-6 tracking-tighter uppercase text-ink">
          01 &mdash; Bio
        </h2>
        
        <div className="space-y-4 font-sans text-dark-gray text-sm md:text-base leading-relaxed max-w-xl">
          <p>
            Currently in my final year of BCA at Loyola College, I specialize in architecting Agentic AI systems and sophisticated RAG pipelines. My approach to software development is grounded in the principles of structural honesty and functional precision.
          </p>
          <p>
            Beyond code, I lead technical communities and drive innovation through collaborative problem-solving. I focus on creating autonomous agents that don't just follow instructions but reason through complex data infrastructures to deliver actionable intelligence.
          </p>
        </div>

        <div className="mt-10 space-y-6">
          <div>
            <h2 className="font-bold text-xs font-mono mb-4 uppercase tracking-widest text-mid-gray">// LANGUAGES</h2>
            <div className="flex flex-wrap gap-2">
              {['English', 'Tamil'].map(lang => (
                <span key={lang} className="border border-ink font-mono text-[10px] px-2 py-1 uppercase">{lang}</span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-bold text-xs font-mono mb-4 uppercase tracking-widest text-mid-gray">// INTERESTS</h2>
            <div className="flex flex-wrap gap-2">
              {['🤖 AI Tools', '🧠 Agents', '🎵 Music', '💬 People'].map(interest => (
                <span key={interest} className="border border-ink bg-off-white font-mono text-[10px] px-2 py-1 uppercase">{interest}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Stats Grid */}
      <div className="w-full md:w-2/5 grid grid-cols-2 grid-rows-2">
        <StatCell value="9.1" label="CGPA" />
        <StatCell value="4+" label="Projects" className="border-l border-ink" inverted={true} />
        <StatCell value="2+" label="Years Building" className="border-t border-ink bg-off-white" />
        <StatCell value="02" label="Hackathons" className="border-t border-l border-ink" />
      </div>
    </section>
  );
}

function StatCell({ value, label, className = '', inverted = false }: { value: string; label: string; className?: string, inverted?: boolean }) {
  return (
    <div className={`p-6 md:p-8 flex flex-col justify-center ${inverted ? 'bg-ink text-white' : 'bg-white text-ink hover:bg-off-white'} transition-colors group ${className}`}>
      <span className={`font-black text-4xl md:text-5xl ${inverted ? '' : 'text-accent'} mb-2`}>
        {value}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}
const SKILLS_DATA = [
  {
    category: 'AI & ML',
    items: ['Agentic AI', 'AI Agents', 'RAG Pipelines', 'LLaMA 3.2', 'Ollama', 'Prompt Engineering', 'Google AI Studio'],
    inverted: true,
  },
  {
    category: 'Frontend',
    items: ['HTML', 'CSS', 'Tailwind', 'Bootstrap', 'JavaScript', 'React.js'],
  },
  {
    category: 'Backend',
    items: ['Python', 'PHP', 'Java', 'C#', 'C'],
  },
  {
    category: 'Database',
    items: ['Oracle', 'SQL'],
  },
  {
    category: 'Tools',
    items: ['Git', 'GitHub', 'VS Code', 'REST APIs', 'DOM Manipulation'],
  },
];

function Skills() {
  const allSkills = SKILLS_DATA.flatMap(row => row.items);
  // Duplicate for seamless marquee
  const marqueeItems = [...allSkills, ...allSkills, ...allSkills, ...allSkills];

  return (
    <section id="skills" className="border-b border-ink py-16 md:py-24 bg-ink overflow-hidden border-t relative">
      <div className="absolute top-12 left-6 md:left-12 z-10 pointer-events-none">
        <h2 className="font-bold text-2xl tracking-tighter uppercase text-white">
          02 &mdash; Skills
        </h2>
      </div>
      <div className="flex flex-col gap-8 transform -rotate-2 scale-110 mt-12 md:mt-0">
        <div className="flex overflow-hidden whitespace-nowrap">
          <div className="animate-marquee flex gap-4 md:gap-8 pr-4 md:pr-8">
            {marqueeItems.map((item, idx) => (
              <span key={`row1-${idx}`} className="font-display font-black text-3xl md:text-5xl uppercase text-white/10 hover:text-white transition-colors duration-300">
                {item} <span className="text-accent">&diams;</span>
              </span>
            ))}
          </div>
        </div>
        <div className="flex overflow-hidden whitespace-nowrap" dir="rtl">
          <div className="animate-marquee flex gap-4 md:gap-8 pr-4 md:pr-8">
            {marqueeItems.reverse().map((item, idx) => (
              <span key={`row2-${idx}`} className="font-display font-black text-3xl md:text-5xl uppercase text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.2)] hover:[-webkit-text-stroke:2px_#FFFFFF] transition-colors duration-300">
                {item} <span className="text-accent [-webkit-text-stroke:0px]">&diams;</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
const EXPERIENCE_DATA = [
  {
    role: '[Role]',
    company: '[Company XXX]',
    date: 'Apr 2026 – Present',
    type: 'Full-time',
    points: ['Leading AI integration pipelines and agentic workflow setup.', 'Architecting data infra for scalable generative apps.'],
  },
  {
    role: '[Role]',
    company: '[Company XXX]',
    date: 'Dec 2025 – Mar 2026',
    type: 'Internship',
    points: ['Prototyped initial RAG architectures.', 'Optimized LLM prompts for reduced latency and higher accuracy.'],
  },
  {
    role: 'Outreach Leader',
    company: 'Loyola College',
    date: 'Jul 2024 – Feb 2025',
    type: '',
    points: ['Directed team outreach events resulting in 40% increased engagement.', 'Managed cross-functional student teams.'],
  },
  {
    role: 'Educational Tour Organizer',
    company: 'Loyola College',
    date: 'Sep 2025',
    type: '',
    points: ['Organized and coordinated logistics for 100+ students.', 'Handled budgeting and scheduling with vendors.'],
  },
  {
    role: 'Student',
    company: 'Loyola College, Chennai Nungambakkam, 600034',
    date: '2023 - 2026',
    type: 'BCA',
    points: [],
  },
  {
    role: 'Student',
    company: 'Loyola Matriculation Higher Secondary School, Kodambakkam, Chennai 600024',
    date: '2021 - 2023',
    type: 'School',
    points: [],
  },
];

function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const line = containerRef.current.querySelector('.timeline-line');
      const entries = containerRef.current.querySelectorAll('.timeline-entry');

      gsap.fromTo(line, 
        { scaleY: 0 }, 
        { scaleY: 1, transformOrigin: 'top', ease: 'none', scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true
        }}
      );

      entries.forEach(entry => {
        gsap.fromTo(entry,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out', scrollTrigger: {
            trigger: entry,
            start: 'top 85%'
          }}
        );
      });
    }
  }, []);

  return (
    <section id="experience" className="border-b border-ink flex flex-col md:flex-row">
      {/* Pinned Experience Title */}
      <div className="w-full md:w-1/3 p-6 md:p-12 border-b md:border-b-0 md:border-r border-ink bg-white">
        <h2 className="font-bold text-2xl tracking-tighter uppercase text-ink sticky top-24">
          03 &mdash; Timeline
        </h2>
      </div>

      <div className="w-full md:w-2/3 p-6 md:p-12 bg-off-white">
        <div ref={containerRef} className="relative pl-6">
          <div className="timeline-line absolute left-0 top-0 bottom-0 w-[1px] bg-ink"></div>

          <div className="space-y-12">
            {EXPERIENCE_DATA.map((exp, idx) => (
              <div key={idx} className="timeline-entry relative">
                <div className="absolute -left-[29px] top-1.5 w-3 h-3 bg-ink outline outline-1 outline-offset-2 outline-ink"></div>
                
                <div className="flex flex-col mb-2 gap-1 border-b border-border-subtle pb-2">
                  <div className="font-mono text-[10px] font-bold text-ink uppercase mb-1 tracking-widest">{idx === 0 ? 'LATEST' : (exp.type === 'BCA' || exp.type === 'School' ? 'EDUCATION' : 'EXPERIENCE')}</div>
                  <h3 className="font-bold text-lg leading-none">
                    {exp.role} <span className="text-mid-gray font-normal">•</span> <span className="text-dark-gray">{exp.company}</span>
                  </h3>
                  <div className="font-mono text-[10px] uppercase text-mid-gray">
                    {exp.date} {exp.type && <span className="text-accent ml-2">[{exp.type}]</span>}
                  </div>
                </div>
                
                {exp.points.length > 0 && (
                  <ul className="mt-4 space-y-2 font-sans text-dark-gray text-sm">
                    {exp.points.map((pt, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="font-mono text-accent shrink-0">&#9656;</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
const PROJECTS_DATA = [
  {
    category: 'BASIC DEVELOPMENT',
    items: [
      {
        id: 'WEB-001',
        name: 'Book Registration App',
        description: 'A streamlined management system for digital and physical libraries with real-time inventory tracking and user lending history.',
        tags: ['HTML', 'CSS', 'JS'],
        links: [
          { label: 'GitHub', url: '#' },
          { label: 'Live', url: '#' }
        ]
      }
    ]
  },
  {
    category: 'AI DEVELOPMENT',
    items: [
      {
        id: 'AI-001',
        name: 'RAG Applications',
        description: 'Retrieval-Augmented Generation system using LLaMA 3.2 for hyper-contextual local document analysis and intelligent querying.',
        tags: ['Python', 'LLaMA 3.2', 'Ollama'],
        links: [
          { label: 'GitHub', url: '#' }
        ]
      },
      {
        id: 'AI-002',
        name: 'Personal Intelligence System',
        description: 'Multi-agent agentic AI framework powered by Ollama for autonomous task execution and personalized workflow automation.',
        tags: ['Python', 'Ollama', 'Agentic AI'],
        links: [
          { label: 'GitHub', url: '#' }
        ]
      }
    ]
  },
  {
    category: 'COLLEGE FINAL YEAR PROJECT',
    items: [
      {
        id: 'FYP-001',
        name: 'Smart Presence',
        description: 'Real-time attendance tracking system utilizing OpenCV and advanced Face Recognition algorithms for institutional security.',
        tags: ['Python', 'OpenCV', 'React.js'],
        links: [
          { label: 'GitHub', url: '#' }
        ]
      }
    ]
  }
];

function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const allProjects = PROJECTS_DATA.flatMap(section => 
    section.items.map(p => ({...p, categoryName: section.category}))
  );

  useEffect(() => {
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
  }, []);

  return (
    <section id="projects" ref={containerRef} className="border-b border-ink py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-bold text-2xl tracking-tighter uppercase text-ink mb-12">
          04 &mdash; Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-ink">
          {allProjects.map((project) => (
            <div key={project.id} className="project-card group cursor-none flex flex-col p-6 bg-white border-b border-r border-ink hover:bg-off-white hover:-translate-y-2 hover:shadow-[4px_4px_0_0_#0A0A0A] hover:z-10 transition-all duration-300 relative h-full">
              <div className="flex justify-between font-mono text-[10px] text-accent mb-2 italic">
                <span>{project.id}</span>
                <span>[{project.categoryName.split(' ')[0]}]</span>
              </div>
              <h3 className="font-bold text-lg leading-none mb-3 text-ink">
                {project.name}
              </h3>
              <p className="text-xs text-dark-gray line-clamp-3 mb-4 flex-grow">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span key={tag} className="font-mono text-[9px] uppercase border border-ink px-1.5 py-0.5">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-4 mt-auto border-t border-border-subtle pt-3">
                {project.links.map(link => (
                  <a key={link.label} href={link.url} className="font-mono text-[9px] uppercase underline hover:text-accent transition-colors">
                    {link.label} &#x2197;
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
const HACKATHONS_DATA = [
  {
    name: 'Prompt-a-thon by VITC',
    date: 'Mar 2026',
    status: '1st Place',
    icon: <Trophy className="w-8 h-8 text-accent" />,
    description: 'Engineered optimal zero-shot and few-shot prompts to outperform 50+ teams in complex reasoning tasks.'
  },
  {
    name: 'Make-a-thon by M2P Fintech',
    date: 'Dec 2025',
    status: 'Finalist',
    icon: <Code2 className="w-8 h-8 text-ink" />,
    description: 'Developed a prototype agentic financial assistant capable of autonomous transaction categorization.'
  }
];

function Hackathons() {
  return (
    <section id="hackathons" className="border-b border-ink py-12 px-6 md:px-12 bg-off-white flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 pr-8 mb-8 md:mb-0">
        <h2 className="font-bold text-2xl tracking-tighter uppercase text-ink sticky top-24">
          04 &mdash; Battlegrounds
        </h2>
      </div>

      <div className="w-full md:w-2/3 grid grid-cols-1 gap-6">
        {HACKATHONS_DATA.map((hack, idx) => (
          <div key={idx} className="border border-ink p-6 bg-white flex flex-col sm:flex-row gap-6 hover:bg-off-white transition-colors">
            <div className="shrink-0 flex items-center justify-center w-16 h-16 bg-off-white border border-border-subtle">
              {hack.icon}
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-ink text-white px-2 py-0.5 font-mono text-[9px] uppercase">
                  {hack.status}
                </div>
                <div className="font-mono text-[10px] text-mid-gray uppercase tracking-wider">{hack.date}</div>
              </div>
              <h3 className="font-bold text-lg text-ink mb-1 leading-none">{hack.name}</h3>
              <p className="text-sm text-dark-gray leading-relaxed max-w-xl mt-1">
                {hack.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
const BLOG_DATA = [
  {
    id: 1,
    date: 'Apr 12, 2026',
    title: 'Why RAG is more than just vector search',
    excerpt: 'Exploring the semantics of true retrieval. Vector search gives you similarity, but agentic routing gives you relevance...'
  },
  {
    id: 2,
    date: 'Mar 28, 2026',
    title: 'Building my Personal Intelligence System',
    excerpt: 'How I chained Ollama local models to manage my calendar, read documentation, and summarize PRs autonomously.'
  },
  {
    id: 3,
    date: 'Feb 15, 2026',
    title: 'The Brutalist Web is back',
    excerpt: 'Escaping the exact same rounded corners and purple gradients that have plagued SaaS for five years.'
  }
];

function Blog() {
  return (
    <section id="blog" className="border-b border-ink py-12 px-6 md:px-12 bg-white">
      <div className="max-w-4xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <h2 className="font-bold text-2xl tracking-tighter uppercase text-ink">
            05 &mdash; AI Journal
          </h2>
          <a href="#" className="font-mono text-[10px] uppercase text-ink hover:text-accent transition-colors tracking-widest border-b border-ink">
            View All Posts &rarr;
          </a>
        </div>

        <div className="space-y-6 border-l-[3px] border-ink pl-6">
          {BLOG_DATA.map((post, index) => (
            <article key={post.id} className={`article-card group cursor-none flex flex-col gap-1 ${index === BLOG_DATA.length - 1 ? '' : 'border-b border-border-subtle pb-6'} hover:pl-4 transition-all duration-300`}>
              <div className="font-mono text-[10px] text-mid-gray uppercase tracking-widest mb-1">{post.date}</div>
              <h3 className="font-bold text-lg leading-none text-ink group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              <p className="text-xs text-dark-gray leading-relaxed mb-2 max-w-2xl">
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function Contact() {
  return (
    <section id="contact" className="py-12 px-6 md:px-12 bg-white flex flex-col md:flex-row gap-12 border-b border-ink">
      <div className="w-full md:w-1/2 flex flex-col bg-ink text-white p-8 md:p-12 border-[8px] md:border-[12px] border-ink">
         <h2 className="font-black text-6xl md:text-[80px] leading-none uppercase tracking-tighter mb-8">
           LET'S <br/> BUILD
         </h2>
         <div className="flex flex-col gap-4 font-mono text-xs md:text-sm tracking-widest uppercase mt-auto">
           <a href="#" className="hover:text-accent flex justify-between border-b border-white/20 pb-2">LINKEDIN <span className="opacity-50">→</span></a>
           <a href="#" className="hover:text-accent flex justify-between border-b border-white/20 pb-2">GITHUB <span className="opacity-50">→</span></a>
           <a href="mailto:sylvester@example.com" className="hover:text-accent flex justify-between border-b border-white/20 pb-2">EMAIL <span className="opacity-50">→</span></a>
         </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <p className="font-mono text-sm md:text-base text-dark-gray mb-12 max-w-md uppercase tracking-widest leading-relaxed">
          Looking for an AI engineer to scale your data infra or build agentic systems? Let's connect.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <SocialLink href="#" label="GitHub" icon={<Github className="w-6 h-6" />} />
          <SocialLink href="#" label="LinkedIn" icon={<Linkedin className="w-6 h-6" />} />
        </div>
      </div>
    </section>
  );
}

function SocialLink({ href, label, icon }: { href: string; label: string; icon: ReactNode }) {
  return (
    <a href={href} className="border border-ink p-4 flex items-center justify-start gap-4 group hover:bg-ink transition-colors">
      <div className="text-ink group-hover:text-white transition-colors">
        {icon}
      </div>
      <span className="font-mono text-xs uppercase text-ink group-hover:text-white transition-colors tracking-widest font-bold">
        {label}
      </span>
    </a>
  );
}

function Footer() {
  return (
    <footer className="bg-white py-6 px-12 border-b border-ink flex justify-between uppercase font-mono text-[10px] text-dark-gray tracking-widest font-bold">
      <span>Built by Sylvester</span>
      <span>© 2026</span>
    </footer>
  );
}

