import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, MapPin } from 'lucide-react';
import SocialLink from '../ui/SocialLink';
import { supabase } from '../../utils/supabaseClient';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showToast, setShowToast] = useState(false);

  useGSAP(() => {
    if (containerRef.current) {
      const cols = containerRef.current.querySelectorAll('.contact-column');
      gsap.fromTo(cols,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.6, ease: 'power2.out', scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%'
        }}
      );
    }

    if (formRef.current) {
      const fields = formRef.current.querySelectorAll('.form-field');
      gsap.fromTo(fields,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out', scrollTrigger: {
          trigger: formRef.current,
          start: 'top 90%'
        }}
      );
    }
  }, { scope: containerRef });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('loading');

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([
          {
            name: formState.name,
            email: formState.email,
            message: formState.message,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      setSubmitStatus('success');
      setShowToast(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => {
        setShowToast(false);
        setSubmitStatus('idle');
      }, 5000);
    } catch (err) {
      console.error('Database connection error:', err);
      window.location.href = `mailto:sylvesterjones557@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(formState.name)}&body=${encodeURIComponent(formState.message)}`;
      setSubmitStatus('success');
      setShowToast(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => {
        setShowToast(false);
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={containerRef} className="py-16 px-6 md:px-12 bg-white flex flex-col md:flex-row gap-12 border-b border-ink">
      <style>{`
        @keyframes float-dance-1 {
          0% { transform: translate(0px, 0px) rotate(0deg); }
          50% { transform: translate(25px, -45px) rotate(180deg); }
          100% { transform: translate(0px, 0px) rotate(360deg); }
        }
        @keyframes float-dance-2 {
          0% { transform: translate(0px, 0px) rotate(0deg); }
          50% { transform: translate(-35px, 35px) rotate(-180deg); }
          100% { transform: translate(0px, 0px) rotate(-360deg); }
        }
        @keyframes float-dance-3 {
          0% { transform: translate(0px, 0px) rotate(0deg); }
          50% { transform: translate(30px, 40px) rotate(90deg); }
          100% { transform: translate(0px, 0px) rotate(360deg); }
        }
        @keyframes float-dance-4 {
          0% { transform: translate(0px, 0px) rotate(0deg); }
          50% { transform: translate(-40px, -25px) rotate(-90deg); }
          100% { transform: translate(0px, 0px) rotate(-360deg); }
        }
        .dance-node-1 { animation: float-dance-1 7s ease-in-out infinite; }
        .dance-node-2 { animation: float-dance-2 9s ease-in-out infinite; }
        .dance-node-3 { animation: float-dance-3 6s ease-in-out infinite; }
        .dance-node-4 { animation: float-dance-4 8s ease-in-out infinite; }
      `}</style>

      {/* Left Column: Dark CTA Panel */}
      <div className="contact-column w-full md:w-1/2 flex flex-col bg-ink text-white p-8 md:p-12 border-[8px] md:border-[12px] border-white/10 relative overflow-hidden">
        {/* Infinite Revolving & Floating Emojis / Logos */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
          <div className="dance-node-1 absolute top-12 right-24 pointer-events-auto transition-all duration-300 hover:scale-150 hover:!translate-x-4 hover:!-translate-y-4 hover:!rotate-12 cursor-pointer">
            <span className="text-2xl text-white/20 hover:text-white transition-colors">🤖</span>
          </div>
          <div className="dance-node-2 absolute top-[40%] right-8 pointer-events-auto transition-all duration-300 hover:scale-150 hover:!translate-x-6 hover:!-translate-y-6 hover:!rotate-45 cursor-pointer">
            <Github className="w-6 h-6 text-white/15 hover:text-accent transition-colors" />
          </div>
          <div className="dance-node-3 absolute bottom-20 left-12 pointer-events-auto transition-all duration-300 hover:scale-150 hover:!translate-x-5 hover:!-translate-y-5 hover:!rotate-12 cursor-pointer">
            <Linkedin className="w-6 h-6 text-white/15 hover:text-indigo-400 transition-colors" />
          </div>
          <div className="dance-node-4 absolute bottom-[35%] right-20 pointer-events-auto transition-all duration-300 hover:scale-150 hover:!translate-x-4 hover:!-translate-y-4 hover:!rotate-90 cursor-pointer">
            <span className="text-xl text-white/20 hover:text-white transition-colors">⚡</span>
          </div>
          <div className="dance-node-1 absolute top-[20%] left-24 pointer-events-auto transition-all duration-300 hover:scale-150 hover:!translate-x-6 hover:!-translate-y-6 hover:!rotate-45 cursor-pointer">
            <span className="text-xl text-white/20 hover:text-white transition-colors">💻</span>
          </div>
          <div className="dance-node-3 absolute bottom-8 right-16 pointer-events-auto transition-all duration-300 hover:scale-150 hover:!translate-x-5 hover:!-translate-y-5 hover:!rotate-12 cursor-pointer">
            <span className="text-2xl text-white/20 hover:text-white transition-colors">🧠</span>
          </div>
        </div>

        {/* Content Section above floating overlay */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Availability badge */}
          <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_6px_rgba(74,222,128,0.5)]" />
            <span className="text-white/70">STATUS: OPEN FOR WORK</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-white/40 mb-8">
            <MapPin className="w-3 h-3" />
            <span>CHENNAI, IN</span>
          </div>

          <h2 className="font-black text-6xl md:text-[80px] leading-none uppercase tracking-tighter mb-8 select-text">
            LET'S <br/> BUILD
          </h2>

          <div className="flex flex-col gap-4 font-mono text-xs md:text-sm tracking-widest uppercase mt-auto">
            <a href="https://www.linkedin.com/in/sylvester-jones-9802a6271/" target="_blank" rel="noreferrer" className="hover:text-accent flex justify-between border-b border-white/20 pb-2 transition-colors">
              LINKEDIN <span className="opacity-50">→</span>
            </a>
            <a href="https://github.com/sylvernjones557" target="_blank" rel="noreferrer" className="hover:text-accent flex justify-between border-b border-white/20 pb-2 transition-colors">
              GITHUB <span className="opacity-50">→</span>
            </a>
            <a href="mailto:sylvesterjones557@gmail.com" className="hover:text-accent flex justify-between border-b border-white/20 pb-2 transition-colors">
              EMAIL <span className="opacity-50">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Right Column: Contact Form */}
      <div className="contact-column w-full md:w-1/2 flex flex-col justify-center relative z-10">
        <p className="font-mono text-sm md:text-base text-dark-gray mb-8 max-w-md uppercase tracking-widest leading-relaxed">
          Looking for an engineer to build agentic AI systems, web platforms, or mobile apps? Let's connect.
        </p>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div className="form-field">
            <input
              type="text"
              placeholder="Your Name"
              value={formState.name}
              onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
              className="w-full border border-ink bg-off-white px-4 py-3 font-mono text-xs uppercase tracking-widest text-ink placeholder:text-mid-gray/50 focus:outline-none focus:border-accent focus:shadow-[4px_4px_0_0_#C0392B] focus:-translate-y-0.5 focus:-translate-x-0.5 transition-all duration-300 disabled:opacity-60"
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="form-field">
            <input
              type="email"
              placeholder="Your Email"
              value={formState.email}
              onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
              className="w-full border border-ink bg-off-white px-4 py-3 font-mono text-xs uppercase tracking-widest text-ink placeholder:text-mid-gray/50 focus:outline-none focus:border-accent focus:shadow-[4px_4px_0_0_#C0392B] focus:-translate-y-0.5 focus:-translate-x-0.5 transition-all duration-300 disabled:opacity-60"
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="form-field">
            <textarea
              placeholder="Your Message"
              rows={4}
              value={formState.message}
              onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
              className="w-full border border-ink bg-off-white px-4 py-3 font-mono text-xs uppercase tracking-widest text-ink placeholder:text-mid-gray/50 focus:outline-none focus:border-accent focus:shadow-[4px_4px_0_0_#C0392B] focus:-translate-y-0.5 focus:-translate-x-0.5 transition-all duration-300 resize-none disabled:opacity-60"
              required
              disabled={isSubmitting}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="form-field bg-ink text-white px-6 py-3 font-mono text-xs uppercase tracking-widest font-bold hover:bg-accent transition-colors w-full cursor-none disabled:bg-mid-gray disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'TRANSMITTING...' : 'Send Message →'}
          </button>
        </form>

        {showToast && (
          <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[9999] max-w-sm border-2 border-ink bg-[#FAF6EE] shadow-[6px_6px_0px_0px_#0A0A0A] p-5 font-mono text-xs select-text flex flex-col gap-2.5 animate-fade-in">
            <div className="flex justify-between items-start border-b border-ink/15 pb-1.5">
              <span className="text-[9px] text-green-700 font-bold tracking-widest uppercase">// TRANSMISSION_COMPLETE</span>
              <button 
                onClick={() => setShowToast(false)}
                className="text-[9px] font-bold text-mid-gray hover:text-ink cursor-pointer"
              >
                [X]
              </button>
            </div>
            <p className="text-ink leading-relaxed font-sans text-[13px] normal-case">
              Your request is noted. We will be contacting you soon.
            </p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[9999] max-w-sm border-2 border-ink bg-white shadow-[6px_6px_0px_0px_#C0392B] p-5 font-mono text-xs select-text flex flex-col gap-2.5 animate-fade-in">
            <div className="flex justify-between items-start border-b border-accent/15 pb-1.5">
              <span className="text-[9px] text-accent font-bold tracking-widest uppercase">// TRANSMISSION_FAILURE</span>
              <button 
                onClick={() => setSubmitStatus('idle')}
                className="text-[9px] font-bold text-mid-gray hover:text-accent cursor-pointer"
              >
                [X]
              </button>
            </div>
            <p className="text-ink leading-relaxed font-sans text-[13px] normal-case">
              Transmission failed. Initiating fallback mailto protocol...
            </p>
          </div>
        )}

        <div className="flex items-center gap-4 font-mono text-[9px] uppercase tracking-widest text-mid-gray">
          <span className="flex items-center gap-2">OR FIND ME ON</span>
          <span className="flex-1 h-px bg-border-subtle" />
        </div>
        <div className="flex gap-4 mt-4">
          <SocialLink href="https://github.com/sylvernjones557" label="GitHub" icon={<Github className="w-5 h-5" />} />
          <SocialLink href="https://www.linkedin.com/in/sylvester-jones-9802a6271/" label="LinkedIn" icon={<Linkedin className="w-5 h-5" />} />
        </div>
      </div>
    </section>
  );
}
