import { useState, useEffect, useCallback } from 'react';

const NAV_SECTIONS = ['about', 'skills', 'experience', 'radar', 'projects', 'voice', 'contact'];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  }, []);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none border-[8px] md:border-[12px] border-ink z-[100]"></div>
      <nav
        className={`fixed top-0 w-full z-50 flex items-center justify-between px-6 md:px-10 py-5 transition-all duration-300 border-b border-ink ${
          isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white'
        }`}
      >
        <div className="font-mono font-bold text-xl tracking-tighter">
          &lt;SJ /&gt;
        </div>

        <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest">
          {NAV_SECTIONS.map((id) => (
            <NavLink
              key={id}
              href={`#${id}`}
              label={id.charAt(0).toUpperCase() + id.slice(1)}
              isActive={activeSection === id}
              onClick={(e) => handleNavClick(e, id)}
            />
          ))}
          
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
          {NAV_SECTIONS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleNavClick(e, id)}
              className="font-display font-bold text-4xl uppercase hover:text-accent transition-colors"
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

function NavLink({ href, label, isActive, onClick }: { href: string; label: string; isActive: boolean; onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`border-b-2 transition-colors ${
        isActive ? 'text-accent border-accent' : 'text-ink border-transparent hover:text-accent hover:border-accent'
      }`}
    >
      {label}
    </a>
  );
}
