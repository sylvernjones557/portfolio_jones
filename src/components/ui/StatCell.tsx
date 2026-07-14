export default function StatCell({ value, label, className = '', inverted = false }: { value: string; label: string; className?: string, inverted?: boolean }) {
  return (
    <div className={`stat-card cursor-none p-6 md:p-8 flex flex-col justify-center ${inverted ? 'bg-ink text-white' : 'bg-white text-ink hover:bg-off-white'} transition-colors group ${className}`}>
      <span className={`font-black text-4xl md:text-5xl ${inverted ? '' : 'text-accent'} mb-2 group-hover:scale-110 group-hover:-translate-y-1 origin-left transition-transform duration-300`}>
        {value}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}
