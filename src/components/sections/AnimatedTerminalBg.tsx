import { useEffect, useRef } from 'react';

const CHARS = ['>', '_', '/', '\\', '|', '[', ']', '{', '}', '*', '#', '@', '&', '%', '+', '=', '~', '^', ':', ';', '!'];
const GRID_SIZE = 56;

interface CharCell {
  x: number;
  y: number;
  char: string;
  phase: number;
  baseAlpha: number;
}

export default function AnimatedTerminalBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cellsRef = useRef<CharCell[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const timeRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    if (window.innerWidth < 768) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;
    let W = window.innerWidth;
    let H = window.innerHeight;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      canvas!.style.width = W + 'px';
      canvas!.style.height = H + 'px';
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.floor(W / GRID_SIZE);
      const rows = Math.floor(H / GRID_SIZE);
      const cells: CharCell[] = [];
      // Offset to center the grid
      const offsetX = (W - cols * GRID_SIZE) / 2;
      const offsetY = (H - rows * GRID_SIZE) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          cells.push({
            x: offsetX + c * GRID_SIZE + GRID_SIZE / 2,
            y: offsetY + r * GRID_SIZE + GRID_SIZE / 2,
            char: CHARS[Math.floor(Math.random() * CHARS.length)],
            phase: Math.random() * Math.PI * 2,
            baseAlpha: 0.04 + Math.random() * 0.1,
          });
        }
      }
      cellsRef.current = cells;
    };

    resize();
    window.addEventListener('resize', resize);

    let lastMouseUpdate = 0;
    const handleMouse = (e: MouseEvent) => {
      // Throttle: only read mouse position, no DOM work
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouse);

    const draw = (now: number) => {
      timeRef.current = now / 1000;

      ctx!.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < cellsRef.current.length; i++) {
        const cell = cellsRef.current[i];
        const floatY = Math.sin(timeRef.current * 0.8 + cell.phase) * 2;
        const breathAlpha = 0.5 + 0.5 * Math.sin(timeRef.current * 0.6 + cell.phase);

        // Distance from mouse
        const dx = mx - cell.x;
        const dy = my - cell.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let alpha = cell.baseAlpha * breathAlpha;
        let scale = 1;
        let color = '#0A0A0A';

        if (dist < 100) {
          const intensity = 1 - dist / 100;
          alpha = 0.3 + intensity * 0.7;
          scale = 1 + intensity * 0.3;
          color = '#C0392B';
        }

        ctx!.globalAlpha = alpha;
        ctx!.fillStyle = color;
        ctx!.font = `${12 * scale}px "JetBrains Mono", monospace`;
        ctx!.textAlign = 'center';
        ctx!.textBaseline = 'middle';
        ctx!.fillText(cell.char, cell.x, cell.y + floatY);
      }

      ctx!.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 select-none"
    />
  );
}
