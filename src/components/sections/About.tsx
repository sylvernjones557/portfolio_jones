import { useState, useEffect } from 'react';
import { getPortfolioStateCached, AboutData } from '../../utils/supabaseClient';
import StatCell from '../ui/StatCell';
import ScrambleTitle from '../ui/ScrambleTitle';
import RevealText from '../ui/RevealText';
import avatar from '../../assets/avatar.jpg';
import style1 from '../../assets/580a30ee-d343-4d35-846f-a28304472ce4.jpg';
import style2 from '../../assets/IMG-20250912-WA0077.jpg';
import style3 from '../../assets/WhatsApp Image 2026-07-12 at 16.04.39.jpeg';
import style4 from '../../assets/file_00000000ca5071fa8f1a6c45b150595a.png';

const SLIDESHOW_IMAGES = [style1, style2, style3, style4];
const PHOTO_CAPTIONS = [
  "STYLE_FRAME_01: Casual street-side posture capture.",
  "STYLE_FRAME_02: Event frame captured on-campus.",
  "STYLE_FRAME_03: Candid capture featuring clean background.",
  "STYLE_FRAME_04: High-contrast monochrome layout frame."
];

export default function About() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [isPostcardOpen, setIsPostcardOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardSlide, setCardSlide] = useState(0);

  useEffect(() => {
    getPortfolioStateCached().then(state => {
      if (state && state.about) {
        setAboutData(state.about);
      }
    }).catch(err => console.error('Error loading About state:', err));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCardSlide(prev => (prev + 1) % SLIDESHOW_IMAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % SLIDESHOW_IMAGES.length);
  };

  const handlePrev = () => {
    setCurrentSlide(prev => (prev - 1 + SLIDESHOW_IMAGES.length) % SLIDESHOW_IMAGES.length);
  };

  if (!aboutData || !aboutData.bio1) {
    return (
      <section id="about" className="border-b border-ink py-24 bg-white flex items-center justify-center font-mono text-xs">
        // RETRIEVING BIO STATS PARAMETERS...
      </section>
    );
  }

  return (
    <section id="about" className="border-b border-ink flex flex-col md:flex-row flex-wrap lg:flex-nowrap relative">
      {/* Left Column: Bio */}
      <div className="order-2 md:order-none w-full lg:w-[48%] p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-ink flex flex-col justify-center">
        <ScrambleTitle text="01 — Bio" className="text-2xl mb-6 text-ink" />
        
        <div className="space-y-4 font-sans text-dark-gray text-sm md:text-base leading-relaxed max-w-xl">
          <RevealText text={aboutData.bio1} />
          <RevealText text={aboutData.bio2} delay={0.2} />
          {aboutData.bio3 && <RevealText text={aboutData.bio3} delay={0.4} />}
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-ink pt-8">
          <div>
            <h2 className="font-bold text-[10px] font-mono mb-4 uppercase tracking-widest text-mid-gray">// LANGUAGES</h2>
            <div className="flex flex-wrap gap-2">
              {aboutData.languages && aboutData.languages.map((lang, idx) => (
                <span 
                  key={idx} 
                  className="border border-ink bg-ink text-white hover:bg-accent px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[2.5px_2.5px_0px_0px_#C0392B] cursor-pointer select-none flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  {lang}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-bold text-[10px] font-mono mb-4 uppercase tracking-widest text-mid-gray">// INTERESTS</h2>
            <div className="flex flex-wrap gap-2">
              {aboutData.interests && aboutData.interests.map((interest, idx) => (
                <span 
                  key={idx} 
                  className="border border-ink bg-ink text-white hover:bg-indigo-600 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[2.5px_2.5px_0px_0px_#ed6f5c] cursor-pointer select-none flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Middle Column: Editorial Photo Card (Triggers Postcard Popup) */}
      <div className="order-1 md:order-none w-full md:w-1/2 lg:w-[22%] p-8 border-b md:border-b-0 md:border-r border-ink flex items-center justify-center bg-off-white/30">
        <div 
          onClick={() => { setIsPostcardOpen(true); setCurrentSlide(0); }}
          className="w-full max-w-[240px] border-2 border-ink bg-white shadow-[4px_4px_0_0_#0A0A0A] hover:shadow-[4px_4px_0_0_#ed6f5c] hover:-translate-y-0.5 transition-all duration-300 p-4 group select-none cursor-pointer"
        >
          <div className="border border-ink bg-off-white aspect-[4/5] overflow-hidden flex items-center justify-center relative mb-4">
            <img 
              src={SLIDESHOW_IMAGES[cardSlide]} 
              alt="Sylvester Jones" 
              className="w-full h-full object-cover transition-all duration-500 ease-in-out"
            />
            <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
              <span className="font-mono text-[10px] text-white uppercase tracking-widest border border-white px-2.5 py-1 bg-ink/75">
                OPEN POSTCARD //
              </span>
            </div>
          </div>
          <div className="font-mono text-[9px] uppercase tracking-widest text-mid-gray border-t border-ink/10 pt-3 flex justify-between">
            <span className="font-bold">MY STYLE // VIEW</span>
            <span className="text-accent font-bold animate-pulse">GALLERY_LINK</span>
          </div>
        </div>
      </div>

      {/* Right Column: Stats Grid */}
      <div className="order-3 md:order-none w-full md:w-1/2 lg:w-[30%] grid grid-cols-2 grid-rows-3">
        <StatCell value={aboutData.cgpa} label="CGPA" />
        <StatCell value={aboutData.projectsCount} label="Projects" className="border-l border-ink" inverted={true} />
        <StatCell value={aboutData.yearsCount} label="Years Building" className="border-t border-ink bg-off-white" />
        <StatCell value={aboutData.hackathonsCount} label="Hackathons" className="border-t border-l border-ink" />
        <StatCell value={aboutData.openSourceCount || '—'} label="Open Source" className="border-t border-ink bg-off-white" />
        <StatCell value={aboutData.certificationsCount || '—'} label="Certifications" className="border-t border-l border-ink" />
      </div>

      {/* 4. Postcard Slideshow Pop-up Overlay */}
      {isPostcardOpen && (
        <div 
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 backdrop-blur-md bg-ink/50"
          onClick={() => setIsPostcardOpen(false)}
        >
          {/* Brutalist Vintage Postcard Container (Scrollable on mobile) */}
          <div 
            className="w-full max-w-4xl border-2 border-ink bg-[#FAF6EE] shadow-[8px_8px_0px_0px_#0A0A0A] p-6 md:p-8 flex flex-col md:flex-row gap-6 relative select-text max-h-[90vh] overflow-y-auto md:overflow-visible"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Stamp / Close Header on Mobile */}
            <button 
              onClick={() => setIsPostcardOpen(false)}
              className="absolute top-3 right-3 border-2 border-ink bg-white hover:bg-accent hover:text-white px-2.5 py-1 font-mono text-[11px] font-bold z-10 cursor-pointer shadow-[3px_3px_0px_0px_#0A0A0A] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none"
            >
              [X]
            </button>

            {/* Left Column: Photo Slideshow Panel */}
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              <div className="border border-ink bg-off-white aspect-[4/5] w-full max-h-[40vh] md:max-h-none relative overflow-hidden flex items-center justify-center">
                <img 
                  src={SLIDESHOW_IMAGES[currentSlide]} 
                  alt={`Sylvester Jones Style ${currentSlide}`} 
                  className="w-full h-full object-cover transition-all duration-300"
                />
                
                {/* Photo Counter Overlay */}
                <div className="absolute bottom-4 left-4 bg-ink text-white font-mono text-[10px] px-2 py-0.5 border border-white">
                  FRAME: {currentSlide + 1} / {SLIDESHOW_IMAGES.length}
                </div>
              </div>

              {/* Navigation Slideshow Buttons */}
              <div className="flex gap-4 items-center">
                <button 
                  onClick={handlePrev}
                  className="flex-1 border border-ink bg-white hover:bg-ink hover:text-white px-4 py-2 font-mono text-[10px] uppercase font-bold tracking-wider cursor-pointer active:translate-y-0.5 transition-colors"
                >
                  [ PREV ]
                </button>
                <button 
                  onClick={handleNext}
                  className="flex-1 border border-ink bg-white hover:bg-ink hover:text-white px-4 py-2 font-mono text-[10px] uppercase font-bold tracking-wider cursor-pointer active:translate-y-0.5 transition-colors"
                >
                  [ NEXT ]
                </button>
              </div>
            </div>

            {/* Postcard Center Dashed Divider line */}
            <div className="hidden md:block w-px border-l border-dashed border-ink/30 my-2" />

            {/* Right Column: Postcard Message & Stamp Panel */}
            <div className="w-full md:w-1/2 flex flex-col justify-between py-2">
              {/* Top Row: Vintage Digital Stamp & Badge */}
              <div className="flex justify-between items-start">
                <div className="font-mono text-[9px] uppercase tracking-widest text-mid-gray">
                  // POSTCARD BROADCAST
                  <div className="font-bold text-ink mt-1">SERIES: STYLE_DIARY_V5</div>
                </div>

                {/* Brutalist Digital Stamp */}
                <div className="w-16 h-20 border-2 border-dashed border-ink/40 p-1 bg-white flex flex-col justify-between select-none">
                  <div className="border border-ink/20 aspect-square overflow-hidden flex items-center justify-center text-[8px] bg-off-white/40">
                    <span className="font-mono scale-95 font-bold uppercase text-[7px] text-accent">INDIA</span>
                  </div>
                  <div className="font-mono text-[7px] font-bold text-center border-t border-ink/20 pt-1 leading-none text-mid-gray">
                    07_2026
                  </div>
                </div>
              </div>

              {/* Middle Row: Note Message (using classic signature look) */}
              <div className="my-6 border-b border-ink/10 pb-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-accent mb-2">// LOG ENTRY</p>
                <p className="font-serif italic text-base leading-relaxed text-ink-soft pr-2">
                  "Capturing various phases of visual focus. A student of Data Science & Builder of Agents, currently building the future of automated structures."
                </p>
                <div className="font-mono text-[10px] text-mid-gray mt-4 leading-normal">
                  {PHOTO_CAPTIONS[currentSlide]}
                </div>
              </div>

              {/* Bottom Address Area: Brutalist standard structure */}
              <div className="border-t border-ink/15 pt-4 font-mono text-[10px] tracking-wide uppercase text-ink flex flex-col gap-1.5 mt-auto">
                <div className="flex justify-between border-b border-ink/5 pb-1">
                  <span className="text-mid-gray">ADDRESSED TO:</span>
                  <span className="font-bold">VISITOR_RECRUITER</span>
                </div>
                <div className="flex justify-between border-b border-ink/5 pb-1">
                  <span className="text-mid-gray">LOCATION:</span>
                  <span className="font-bold">CHENNAI, IN // 600034</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-mid-gray">STATUS:</span>
                  <span className="font-bold text-green-700">TRANSMISSION_STABLE</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
