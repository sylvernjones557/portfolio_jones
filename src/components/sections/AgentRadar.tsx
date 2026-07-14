import { useEffect, useRef, useState } from 'react';
import ScrambleTitle from '../ui/ScrambleTitle';

interface RadarNode {
  id: string;
  name: string;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  description: string;
  status: 'ACTIVE' | 'LISTENING' | 'OPTIMIZED' | 'STABLE';
  whyILikeIt: string;
}

export default function AgentRadar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeNode, setActiveNode] = useState<RadarNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<RadarNode | null>(null);
  const [radarStatus, setRadarStatus] = useState<string>("SYSTEM_IDLE // STANDBY");
  const nodesRef = useRef<RadarNode[]>([
    { 
      id: '1', 
      name: 'DATA_SCIENCE', 
      x: 0.5, 
      y: 0.25, 
      baseX: 0.5, 
      baseY: 0.25, 
      description: 'Statistical modeling, data mining, and predictive analytics to drive decisions.', 
      status: 'ACTIVE',
      whyILikeIt: 'Data Science acts as the compass for steering agentic decision loops. I enjoy uncovering patterns in complex datasets and utilizing mathematical structures to build predictions.'
    },
    { 
      id: '2', 
      name: 'AI_SOLUTIONS', 
      x: 0.25, 
      y: 0.45, 
      baseX: 0.25, 
      baseY: 0.45, 
      description: 'Custom generative AI systems, RAG pipelines, and autonomous agent architectures.', 
      status: 'OPTIMIZED',
      whyILikeIt: 'Building systems that do not just predict but execute tasks autonomously is the most exciting engineering challenge today. AI solutions enable automated pipelines that replace cognitive labor.'
    },
    { 
      id: '3', 
      name: 'FAST_DEV', 
      x: 0.75, 
      y: 0.45, 
      baseX: 0.75, 
      baseY: 0.45, 
      description: 'Accelerated full-stack production delivery using spec-driven development.', 
      status: 'ACTIVE',
      whyILikeIt: 'Speed is a vital competitive edge. I like shipping production code rapidly and iterating quickly to turn system architectures into tangible, responsive user experiences.'
    },
    { 
      id: '4', 
      name: 'DATA_INFRA', 
      x: 0.35, 
      y: 0.75, 
      baseX: 0.35, 
      baseY: 0.75, 
      description: 'Database design, query optimization, and real-time backend integrations.', 
      status: 'STABLE',
      whyILikeIt: 'An AI agent is only as good as the memory and context layers backing it. I focus on optimizing database schemas and pipelines to achieve low-latency response loops.'
    },
    { 
      id: '5', 
      name: 'AGENTIC_RAG', 
      x: 0.65, 
      y: 0.75, 
      baseX: 0.65, 
      baseY: 0.75, 
      description: 'Self-correcting, autonomous information retrieval and vector search pipelines.', 
      status: 'LISTENING',
      whyILikeIt: 'Standard RAG is static; agentic RAG is alive. I enjoy building self-correcting agents that evaluate retrieved document relevance and rewrite sub-queries autonomously.'
    },
  ]);

  // Disable body scroll when modal is active
  useEffect(() => {
    if (selectedNode) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [selectedNode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    let angle = 0;
    
    // Track mouse / touch position
    const interactionPoint = { x: -1000, y: -1000, isDown: false };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const getCoordinates = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      if ('touches' in e) {
        if (e.touches.length > 0) {
          return {
            x: e.touches[0].clientX - rect.left,
            y: e.touches[0].clientY - rect.top
          };
        }
      } else {
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      }
      return null;
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const coords = getCoordinates(e);
      if (coords) {
        interactionPoint.x = coords.x;
        interactionPoint.y = coords.y;
        
        // Check if cursor is over any node
        let foundNode = false;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) * 0.4;

        nodesRef.current.forEach(node => {
          const nodeX = centerX + (node.x - 0.5) * 2 * radius;
          const nodeY = centerY + (node.y - 0.5) * 2 * radius;
          const dist = Math.hypot(coords.x - nodeX, coords.y - nodeY);
          
          if (dist < 20) {
            setActiveNode(node);
            setRadarStatus(`NODE_LOCKED // ${node.name} [${node.status}]`);
            foundNode = true;
          }
        });

        if (!foundNode && activeNode) {
          setActiveNode(null);
          setRadarStatus("RADAR_SWEEP // ACTIVE_LISTENING");
        }
      }
    };

    const handleLeave = () => {
      interactionPoint.x = -1000;
      interactionPoint.y = -1000;
      setActiveNode(null);
      setRadarStatus("SYSTEM_IDLE // STANDBY");
    };

    const handleClick = (e: MouseEvent) => {
      const coords = getCoordinates(e);
      if (coords) {
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) * 0.4;

        nodesRef.current.forEach(node => {
          const nodeX = centerX + (node.x - 0.5) * 2 * radius;
          const nodeY = centerY + (node.y - 0.5) * 2 * radius;
          const dist = Math.hypot(coords.x - nodeX, coords.y - nodeY);
          
          if (dist < 22) {
            setSelectedNode(node);
          }
        });
      }
    };

    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseleave', handleLeave);
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('touchstart', (e) => {
      handleMove(e);
    });
    canvas.addEventListener('touchmove', handleMove);
    canvas.addEventListener('touchend', handleLeave);

    // Render loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.45;

      // Draw outer brutalist radar rings
      ctx.strokeStyle = '#0A0A0A';
      ctx.lineWidth = 1.5;

      // Ring 1 (outermost)
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Ring 2
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.7, 0, Math.PI * 2);
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Ring 3
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.4, 0, Math.PI * 2);
      ctx.stroke();

      // Axis lines
      ctx.strokeStyle = 'rgba(10, 10, 10, 0.15)';
      ctx.beginPath();
      ctx.moveTo(centerX - radius, centerY);
      ctx.lineTo(centerX + radius, centerY);
      ctx.moveTo(centerX, centerY - radius);
      ctx.lineTo(centerX, centerY + radius);
      ctx.stroke();

      // Draw radar sweep line
      angle += 0.015;
      const sweepX = centerX + Math.cos(angle) * radius;
      const sweepY = centerY + Math.sin(angle) * radius;

      // Draw sweep gradient beam
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, 'rgba(192, 57, 43, 0.05)');
      gradient.addColorStop(1, 'rgba(192, 57, 43, 0.15)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, angle - 0.25, angle);
      ctx.closePath();
      ctx.fill();

      // Sweep line itself
      ctx.strokeStyle = '#C0392B';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(sweepX, sweepY);
      ctx.stroke();

      // Draw node connection web
      ctx.strokeStyle = 'rgba(10, 10, 10, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      const nodeCoords = nodesRef.current.map(node => {
        // Apply slight float animation
        const floatOffset = Math.sin(Date.now() * 0.002 + parseInt(node.id)) * 4;
        const nodeX = centerX + (node.baseX - 0.5) * 2 * (radius * 0.8);
        const nodeY = centerY + (node.baseY - 0.5) * 2 * (radius * 0.8) + floatOffset;
        node.x = (nodeX - centerX) / (2 * radius) + 0.5;
        node.y = (nodeY - centerY) / (2 * radius) + 0.5;
        return { x: nodeX, y: nodeY };
      });

      // Connect all nodes to center and to each other in sequence
      for (let i = 0; i < nodeCoords.length; i++) {
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(nodeCoords[i].x, nodeCoords[i].y);
        for (let j = i + 1; j < nodeCoords.length; j++) {
          ctx.moveTo(nodeCoords[i].x, nodeCoords[i].y);
          ctx.lineTo(nodeCoords[j].x, nodeCoords[j].y);
        }
      }
      ctx.stroke();

      // Draw nodes
      nodesRef.current.forEach((node, index) => {
        const coords = nodeCoords[index];
        const isHovered = activeNode?.id === node.id;

        // Pulse outer indicator ring
        if (isHovered) {
          ctx.strokeStyle = '#C0392B';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(coords.x, coords.y, 14 + Math.sin(Date.now() * 0.01) * 3, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Draw solid node circle
        ctx.fillStyle = isHovered ? '#C0392B' : '#0A0A0A';
        ctx.beginPath();
        ctx.arc(coords.x, coords.y, 7, 0, Math.PI * 2);
        ctx.fill();

        // Node inner dot
        ctx.fillStyle = '#FAF6EE';
        ctx.beginPath();
        ctx.arc(coords.x, coords.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Node Label
        ctx.fillStyle = '#0A0A0A';
        ctx.font = 'bold 9px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, coords.x, coords.y - 16);
      });

      // Draw interactive point ripple if active
      if (interactionPoint.x > -1000) {
        ctx.strokeStyle = 'rgba(192, 57, 43, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(interactionPoint.x, interactionPoint.y, 25, 0, Math.PI * 2);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMove);
        canvas.removeEventListener('mouseleave', handleLeave);
        canvas.removeEventListener('click', handleClick);
        canvas.removeEventListener('touchstart', handleMove);
        canvas.removeEventListener('touchmove', handleMove);
        canvas.removeEventListener('touchend', handleLeave);
      }
    };
  }, [activeNode]);

  return (
    <section id="radar" className="border-b border-ink flex flex-col md:flex-row relative bg-white">
      {/* Title Panel */}
      <div className="w-full md:w-1/3 p-6 md:p-12 border-b md:border-b-0 md:border-r border-ink flex flex-col justify-between">
        <div>
          <ScrambleTitle text="04 — My Radar" className="text-3xl md:text-4xl text-ink mb-4" />
          <p className="text-sm text-dark-gray font-mono uppercase tracking-widest mt-4">
            An interactive neural system mapping my primary focus areas, capabilities, and technical fit.
          </p>
        </div>

        {/* Live Terminal Telemetry Panel */}
        <div className="mt-8 border border-ink bg-off-white p-4 font-mono text-[10px] space-y-3 shadow-[3px_3px_0px_0px_#0A0A0A]">
          <div className="flex justify-between items-center text-mid-gray border-b border-ink/10 pb-2">
            <span>// TELEMETRY ACTIVE</span>
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
          </div>
          <div>
            <span className="text-mid-gray">STATUS: </span>
            <span className="font-bold text-ink uppercase tracking-wide">{radarStatus}</span>
          </div>
          {activeNode ? (
            <div className="space-y-1.5 border-t border-ink/10 pt-2 transition-all duration-300">
              <div className="text-accent font-bold">// CLICK TO INSPECT NODE</div>
              <div className="text-dark-gray leading-normal normal-case font-sans text-xs">
                {activeNode.description}
              </div>
            </div>
          ) : (
            <div className="text-mid-gray border-t border-ink/10 pt-2 text-[9px] uppercase tracking-wider italic">
              Touch/hover nodes to monitor statuses. Click on a node to view my domain focus.
            </div>
          )}
        </div>
      </div>

      {/* Radar Field Panel */}
      <div className="w-full md:w-2/3 h-[360px] md:h-[480px] bg-off-white/40 flex items-center justify-center relative overflow-hidden select-none">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full cursor-crosshair"
        />
        
        {/* Floating tech markings */}
        <div className="absolute top-4 left-4 font-mono text-[8px] text-mid-gray pointer-events-none">
          SYS.LOC // 12.09.256
        </div>
        <div className="absolute bottom-4 right-4 font-mono text-[8px] text-mid-gray pointer-events-none">
          RANGE // 4500KM
        </div>
      </div>

      {/* Modal Popup Overlay */}
      {selectedNode && (
        <div 
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 backdrop-blur-md bg-ink/50"
          onClick={() => setSelectedNode(null)}
        >
          <div 
            className="w-full max-w-md border-2 border-ink bg-[#FAF6EE] shadow-[6px_6px_0px_0px_#0A0A0A] p-6 relative font-mono text-xs select-text"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedNode(null)}
              className="absolute top-3 right-3 border border-ink bg-white hover:bg-accent hover:text-white px-2 py-0.5 text-[10px] font-bold cursor-pointer"
            >
              [X]
            </button>

            <div className="border-b border-ink pb-3 mb-4">
              <span className="text-[9px] text-mid-gray uppercase tracking-widest">// RADAR CORE // NODE_{selectedNode.id}</span>
              <h3 className="font-display font-black text-xl text-ink uppercase tracking-tight mt-1">
                {selectedNode.name}
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-[10px] text-accent uppercase font-bold tracking-widest mb-1.5">// WORK FOCUS</h4>
                <p className="text-dark-gray font-sans text-xs normal-case leading-relaxed">
                  {selectedNode.description}
                </p>
              </div>

              <div className="border-t border-ink/10 pt-3">
                <h4 className="text-[10px] text-accent uppercase font-bold tracking-widest mb-1.5">// WHY I WORK IN THIS DOMAIN</h4>
                <p className="text-ink leading-relaxed font-sans text-xs normal-case italic">
                  "{selectedNode.whyILikeIt}"
                </p>
              </div>
            </div>

            <div className="border-t border-ink pt-4 mt-6 flex justify-between items-center text-[10px]">
              <span className="text-mid-gray">STATUS: <span className="font-bold text-green-700">{selectedNode.status}</span></span>
              <button 
                onClick={() => setSelectedNode(null)}
                className="border border-ink bg-white hover:bg-ink hover:text-white px-3 py-1 font-bold uppercase cursor-pointer"
              >
                [DISMISS]
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
