import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrambleTitle from '../ui/ScrambleTitle';
import { Linkedin, MessageSquare, Heart, Share2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

import { getPortfolioStateCached, LinkedInPost } from '../../utils/supabaseClient';

export default function Voice() {
  const containerRef = useRef<HTMLElement>(null);
  const [posts, setPosts] = useState<LinkedInPost[]>([]);

  useEffect(() => {
    getPortfolioStateCached().then(state => {
      if (state && state.voice) {
        setPosts(state.voice);
      }
    }).catch(err => console.error('Error loading Voice posts state:', err));
  }, []);

  // Scroll animations for cards
  useGSAP(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.linkedin-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.15, 
          duration: 0.6, 
          ease: 'power2.out', 
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%'
          }
        }
      );
    }
  }, { scope: containerRef });

  return (
    <section id="voice" ref={containerRef} className="border-b border-ink py-16 px-6 md:px-12 bg-white flex flex-col md:flex-row relative">
      {/* Side Header */}
      <div className="w-full md:w-1/3 pr-8 mb-8 md:mb-0">
        <div className="sticky top-24">
          <ScrambleTitle text="07 — My Voice" className="text-2xl text-ink" />
          <p className="font-mono text-[10px] text-mid-gray uppercase tracking-widest mt-4 max-w-[200px] leading-relaxed">
            // LinkedIn broadcasts, architectural writeups, and tech community highlights.
          </p>
          <a 
            href="https://www.linkedin.com/in/sylvester-jones-9802a6271/" 
            target="_blank" 
            rel="noreferrer" 
            className="mt-6 inline-flex items-center gap-2 border border-ink bg-off-white hover:bg-accent hover:text-white px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#0A0A0A] select-none cursor-pointer"
          >
            <Linkedin className="w-3.5 h-3.5" />
            Connect on LinkedIn
          </a>
        </div>
      </div>

      {/* 3 LinkedIn cards list */}
      <div className="w-full md:w-2/3 grid grid-cols-1 gap-6 relative z-10">
        {posts.map((post) => (
          <div 
            key={post.id}
            className={`linkedin-card border-2 border-ink p-6 ${post.colorClass} ${post.hoverColorClass} flex flex-col gap-3 shadow-[3px_3px_0_0_#0A0A0A] hover:shadow-[4.5px_4.5px_0_0_#0A0A0A] hover:-translate-y-0.5 transition-all duration-300 relative select-text`}
          >
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-ink/15 pb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full border border-ink bg-white flex items-center justify-center font-mono text-[10px] font-bold">
                  SJ
                </div>
                <div>
                  <h4 className="font-mono text-[10px] font-bold text-ink uppercase tracking-wider">Sylvester Jones</h4>
                  <p className="font-mono text-[8px] text-mid-gray uppercase tracking-wider">{post.date}</p>
                </div>
              </div>
              <span className="font-mono text-[9px] text-accent font-bold uppercase tracking-widest">{post.topic}</span>
            </div>

            {/* Content text */}
            <p className="font-mono text-xs text-dark-gray leading-relaxed pr-2">
              {post.content}
            </p>

            {/* Metrics footer */}
            <div className="flex items-center gap-6 font-mono text-[10px] border-t border-ink/10 pt-2.5 text-mid-gray">
              <span className="flex items-center gap-1.5 hover:text-accent transition-colors duration-200 cursor-pointer">
                <Heart className="w-3.5 h-3.5 text-ink" />
                {post.likes}
              </span>
              <span className="flex items-center gap-1.5 hover:text-accent transition-colors duration-200 cursor-pointer">
                <MessageSquare className="w-3.5 h-3.5 text-ink" />
                {post.comments}
              </span>
              <a 
                href={post.url} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-1.5 hover:text-ink transition-colors duration-200 ml-auto font-bold uppercase"
              >
                <Share2 className="w-3.5 h-3.5 text-ink" />
                Open
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
