import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor from './components/ui/CustomCursor';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import AgentRadar from './components/sections/AgentRadar';
import Projects from './components/sections/Projects';
import Hackathons from './components/sections/Hackathons';
import Voice from './components/sections/Voice';
import Contact from './components/sections/Contact';
import LoadingProgress from './components/ui/LoadingProgress';
import NotFound from './components/sections/NotFound';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  // Refresh GSAP ScrollTrigger on mount to capture layout shifts
  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => clearTimeout(timer);
  }, []);

  const isNotFound = window.location.pathname !== '/' && window.location.pathname !== '';

  if (isNotFound) {
    return (
      <div className="min-h-screen bg-white text-ink font-sans selection:bg-accent selection:text-white">
        <CustomCursor />
        <NotFound />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-ink font-sans selection:bg-accent selection:text-white">
      <LoadingProgress />
      <CustomCursor />
      
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <AgentRadar />
        <Projects />
        <Hackathons />
        <Voice />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
