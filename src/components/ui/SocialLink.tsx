import { ReactNode } from 'react';

export default function SocialLink({ href, label, icon }: { href: string; label: string; icon: ReactNode }) {
  return (
    <a href={href} className="border border-ink p-4 flex items-center justify-start gap-4 group hover:bg-ink transition-colors cursor-none">
      <div className="text-ink group-hover:text-white transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 group-hover:animate-bounce">
        {icon}
      </div>
      <span className="font-mono text-xs uppercase text-ink group-hover:text-white transition-colors tracking-widest font-bold">
        {label}
      </span>
    </a>
  );
}
