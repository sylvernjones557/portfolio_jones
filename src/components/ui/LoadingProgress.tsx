import { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function LoadingProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Animate the progress bar dynamically during initial boot
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to('#global-loading-bar', {
          opacity: 0,
          y: -4,
          duration: 0.4,
          onComplete: () => setVisible(false)
        });
      }
    });

    tl.to({}, {
      duration: 2.2, // Aligns with the boot sequence duration
      onUpdate: function () {
        setProgress(Math.floor(this.progress() * 100));
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  if (!visible) return null;

  return (
    <div 
      id="global-loading-bar" 
      className="fixed top-0 left-0 right-0 h-[3px] bg-ink/10 z-[9999] pointer-events-none overflow-hidden"
    >
      <div 
        className="h-full bg-accent transition-all duration-100 ease-out shadow-[0_0_8px_#C0392B]" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
