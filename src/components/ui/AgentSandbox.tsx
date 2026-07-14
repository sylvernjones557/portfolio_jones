import { useEffect, useRef, useState } from 'react';

interface LogItem {
  id: string;
  timestamp: string;
  type: 'system' | 'command' | 'thought' | 'tool' | 'success' | 'agent';
  label: string;
  text: string;
}

const INITIAL_SEQUENCE: Omit<LogItem, 'id' | 'timestamp'>[] = [
  { type: 'system', label: 'SYSTEM', text: 'Initializing Agentic AI Workspace S-01...' },
  { type: 'system', label: 'INDEX', text: 'Loading vector indices & agent graphs...' },
  { type: 'agent', label: 'SUPERVISOR', text: 'Mission: Showcase Sylvester\'s agentic expertise.' },
  { type: 'thought', label: 'THOUGHT', text: 'Retrieving core framework proficiencies from memory...' },
  { type: 'tool', label: 'TOOL_CALL', text: 'query_vector_db({ query: "agentic_skills" })' },
  { type: 'success', label: 'OBSERVATION', text: 'Found matches: [LangGraph, CrewAI, Autogen, LLM Reasoning, Vector DBs].' },
  { type: 'thought', label: 'THOUGHT', text: 'Core skills loaded. Terminal active. Standing by for commands.' }
];

const SWARM_SEQUENCE: Omit<LogItem, 'id' | 'timestamp'>[] = [
  { type: 'command', label: 'COMMAND', text: 'spawn_crew_swarm()' },
  { type: 'system', label: 'SYSTEM', text: 'Initializing multi-agent collaboration...' },
  { type: 'agent', label: 'PLANNER_AGENT', text: 'Decomposing task: "Evaluate portfolio design & performance".' },
  { type: 'agent', label: 'CODER_AGENT', text: 'Optimizing DOM performance for GSAP velocity distortions.' },
  { type: 'success', label: 'CODER_AGENT', text: 'GSAP scroll-linked skew rendered at 60fps lock.' },
  { type: 'agent', label: 'REFINER_AGENT', text: 'Evaluating visual alignment and sand/ink color styling.' },
  { type: 'success', label: 'REFINER_AGENT', text: 'Design audited. Status: Clean, brutalist, premium.' },
  { type: 'system', label: 'SYSTEM', text: 'All nodes synchronized. Task completed.' }
];

const MEMORY_SEQUENCE: Omit<LogItem, 'id' | 'timestamp'>[] = [
  { type: 'command', label: 'COMMAND', text: 'inspect_semantic_memory()' },
  { type: 'system', label: 'SYSTEM', text: 'Querying high-dimensional vector database...' },
  { type: 'tool', label: 'TOOL_CALL', text: 'vector_search({ index: "academic_credentials" })' },
  { type: 'success', label: 'RETRIEVED', text: 'Match found: Sylvester Jones (BCA @ Loyola College, Chennai).' },
  { type: 'success', label: 'RETRIEVED', text: 'GPA: 9.1 / 10.0 (Distinction).' },
  { type: 'thought', label: 'THOUGHT', text: 'Recruiter intent detected. Sylvester is highly qualified for Agent development.' },
  { type: 'agent', label: 'SUPERVISOR', text: 'Recommendation: Hire Sylvester Jones. Initiating contact handshake.' }
];

const AUDIT_SEQUENCE: Omit<LogItem, 'id' | 'timestamp'>[] = [
  { type: 'command', label: 'COMMAND', text: 'run_lighthouse_audit()' },
  { type: 'system', label: 'SYSTEM', text: 'Running light audit on local workspace...' },
  { type: 'tool', label: 'AUDITING', text: 'Tailwind CSS system configurations... OK' },
  { type: 'tool', label: 'AUDITING', text: 'Contrast ratio (Background: #F4EFE6 / Ink: #0A0A0A) -> 21:1... PASS (AAA)' },
  { type: 'tool', label: 'AUDITING', text: 'Aesthetics check (Swiss Brutalism styling rules)... PASS (Premium)' },
  { type: 'success', label: 'REPORT', text: 'Site satisfies premium UI guidelines. 100% Agentic score.' }
];

export default function AgentSandbox() {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeTab, setActiveTab] = useState<'main' | 'memory' | 'swarm'>('main');
  const logsEndRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<number[]>([]);

  // Function to clear timeouts
  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(t => clearTimeout(t));
    timeoutsRef.current = [];
  };

  // Function to print a sequence of logs with delay
  const playSequence = (sequence: Omit<LogItem, 'id' | 'timestamp'>[]) => {
    clearAllTimeouts();
    setIsExecuting(true);
    setLogs([]);

    sequence.forEach((item, index) => {
      const timeout = window.setTimeout(() => {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const id = Math.random().toString(36).substring(2, 9);
        
        setLogs(prev => [...prev, { ...item, id, timestamp }]);
        
        if (index === sequence.length - 1) {
          setIsExecuting(false);
        }
      }, index * 600); // 600ms delay between log lines
      
      timeoutsRef.current.push(timeout);
    });
  };

  useEffect(() => {
    playSequence(INITIAL_SEQUENCE);
    return () => clearAllTimeouts();
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const handleAction = (type: 'swarm' | 'memory' | 'audit') => {
    if (isExecuting) return;
    
    if (type === 'swarm') {
      setActiveTab('swarm');
      playSequence(SWARM_SEQUENCE);
    } else if (type === 'memory') {
      setActiveTab('memory');
      playSequence(MEMORY_SEQUENCE);
    } else if (type === 'audit') {
      setActiveTab('main');
      playSequence(AUDIT_SEQUENCE);
    }
  };

  const handleReset = () => {
    if (isExecuting) return;
    setActiveTab('main');
    playSequence(INITIAL_SEQUENCE);
  };

  return (
    <div className="w-full border-2 border-ink bg-white font-mono flex flex-col h-[320px] shadow-[4px_4px_0px_0px_#0A0A0A] relative z-10 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#0A0A0A]">
      {/* Terminal Title Bar */}
      <div className="border-b-2 border-ink bg-off-white px-4 py-2.5 flex items-center justify-between text-[11px] font-bold select-none">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75`}></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span className="text-ink tracking-wider uppercase">sylvester_agent_s01</span>
        </div>
        
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-mid-gray uppercase tracking-widest hidden sm:inline">STATE:</span>
          <span className={`px-2 py-0.5 text-[9px] uppercase border border-ink bg-white ${isExecuting ? 'text-accent border-accent animate-pulse' : 'text-ink'}`}>
            {isExecuting ? 'Thinking' : 'Ready'}
          </span>
        </div>
      </div>

      {/* Terminal Display */}
      <div className="flex-1 p-4 bg-white overflow-y-auto space-y-2 select-text scrollbar-thin scrollbar-thumb-ink scrollbar-track-transparent">
        {logs.map((log) => {
          let typeColor = 'text-mid-gray';
          let prefix = '▶';
          
          if (log.type === 'command') {
            typeColor = 'text-ink font-bold';
            prefix = '$';
          } else if (log.type === 'thought') {
            typeColor = 'text-accent italic';
            prefix = '💭';
          } else if (log.type === 'tool') {
            typeColor = 'text-dark-gray font-bold';
            prefix = '⚙️';
          } else if (log.type === 'success') {
            typeColor = 'text-ink';
            prefix = '✔';
          } else if (log.type === 'agent') {
            typeColor = 'text-accent font-bold';
            prefix = '🤖';
          }

          return (
            <div key={log.id} className="text-[11px] leading-relaxed flex items-start gap-2">
              <span className="text-[9px] text-mid-gray flex-shrink-0 select-none pt-[1px]">{log.timestamp}</span>
              <span className={`${typeColor} flex-shrink-0 select-none`}>{prefix}</span>
              <div className="flex-1">
                <span className={`mr-1.5 font-bold text-[10px] tracking-wide uppercase ${log.type === 'thought' || log.type === 'agent' ? 'text-accent' : 'text-ink'}`}>
                  [{log.label}]
                </span>
                <span className="text-ink break-words">{log.text}</span>
              </div>
            </div>
          );
        })}
        {isExecuting && (
          <div className="flex items-center gap-1 pl-12">
            <span className="inline-block w-1.5 h-3 bg-accent animate-pulse"></span>
          </div>
        )}
        <div ref={logsEndRef} />
      </div>

      {/* Terminal Actions */}
      <div className="border-t-2 border-ink bg-off-white p-2 flex flex-wrap gap-2 justify-between items-center select-none">
        <div className="flex gap-2">
          <button
            onClick={() => handleAction('swarm')}
            disabled={isExecuting}
            className={`border border-ink bg-white px-2 py-1 text-[9px] font-bold uppercase tracking-wider transition-all duration-200 cursor-none
              ${isExecuting ? 'opacity-50 pointer-events-none' : 'hover:bg-ink hover:text-white active:translate-y-0.5'}`}
          >
            [Spawn Swarm]
          </button>
          
          <button
            onClick={() => handleAction('memory')}
            disabled={isExecuting}
            className={`border border-ink bg-white px-2 py-1 text-[9px] font-bold uppercase tracking-wider transition-all duration-200 cursor-none
              ${isExecuting ? 'opacity-50 pointer-events-none' : 'hover:bg-ink hover:text-white active:translate-y-0.5'}`}
          >
            [Inspect Memory]
          </button>
          
          <button
            onClick={() => handleAction('audit')}
            disabled={isExecuting}
            className={`border border-ink bg-white px-2 py-1 text-[9px] font-bold uppercase tracking-wider transition-all duration-200 cursor-none
              ${isExecuting ? 'opacity-50 pointer-events-none' : 'hover:bg-ink hover:text-white active:translate-y-0.5'}`}
          >
            [Audit Portfolio]
          </button>
        </div>

        <button
          onClick={handleReset}
          disabled={isExecuting}
          className={`border border-ink bg-white hover:border-accent hover:text-accent px-2 py-1 text-[9px] font-bold uppercase tracking-wider transition-all duration-200 cursor-none
            ${isExecuting ? 'opacity-50 pointer-events-none' : 'hover:bg-accent hover:text-white active:translate-y-0.5'}`}
        >
          [Reset]
        </button>
      </div>
    </div>
  );
}
