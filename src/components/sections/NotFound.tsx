import ScrambleTitle from '../ui/ScrambleTitle';

export default function NotFound() {
  const handleHomeClick = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-white text-ink font-sans flex flex-col items-center justify-center p-6 border-[8px] md:border-[12px] border-ink select-none">
      <div className="max-w-md w-full border-2 border-ink bg-[#FAF6EE] shadow-[8px_8px_0px_0px_#0A0A0A] p-8 text-center flex flex-col items-center">
        
        {/* Retro glitched status header */}
        <div className="font-mono text-[9px] uppercase tracking-widest text-accent mb-4 border border-accent/25 px-2 py-0.5 bg-accent/5">
          STATUS // ROUTE_NOT_FOUND (404)
        </div>

        {/* Huge Brutalist 404 */}
        <h1 className="font-display font-black text-7xl md:text-8xl text-ink leading-none uppercase tracking-tighter mb-4 text-stroke">
          404
        </h1>

        <ScrambleTitle text="SYSTEM EXCEPTION" className="text-xl md:text-2xl text-ink font-bold mb-4 uppercase" />

        <p className="text-xs md:text-sm text-dark-gray leading-relaxed mb-8 font-mono">
          SORRY! THE PAGE OR NODE YOU ARE ATTEMPTING TO ACCESS DOES NOT EXIST IN THIS PORTFOLIO SYSTEM.
        </p>

        {/* Back to Home Button */}
        <button 
          onClick={handleHomeClick}
          className="border-2 border-ink bg-ink text-white px-6 py-3 font-mono text-xs uppercase tracking-widest font-bold hover:bg-accent hover:border-accent hover:shadow-[4px_4px_0_0_#0A0A0A] transition-all duration-300 active:translate-y-0.5 active:shadow-none w-full cursor-none"
        >
          [ RETURN_TO_HOME // ]
        </button>
      </div>
    </div>
  );
}
