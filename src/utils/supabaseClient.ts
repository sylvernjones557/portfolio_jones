import { createClient } from '@supabase/supabase-js';
import { PROJECTS_DATA, SKILLS_DATA, HACKATHONS_DATA, EXPERIENCE_DATA } from '../data';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Schema Interfaces
export interface HeroData {
  quote: string;
  sequences: string[];
}

export interface AboutData {
  bio1: string;
  bio2: string;
  bio3?: string;
  languages: string[];
  interests: string[];
  cgpa: string;
  projectsCount: string;
  yearsCount: string;
  hackathonsCount: string;
  openSourceCount?: string;
  certificationsCount?: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  date: string;
  type: string;
  points: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  tags: string[];
  status: 'completed' | 'working' | 'upcoming';
  statusLabel: string;
  pitch: string;
  categoryName?: string;
  technicalMetrics?: { label: string; value: string }[];
  links: { label: string; url: string }[];
}

export interface HackathonItem {
  name: string;
  date: string;
  status: string;
  iconName: 'Trophy' | 'Code2';
  description: string;
  pitch: string;
  technicalMetrics?: { label: string; value: string }[];
}

export interface LinkedInPost {
  id: number;
  date: string;
  topic: string;
  content: string;
  likes: string;
  comments: string;
  url: string;
  colorClass: string;
  hoverColorClass: string;
}

export interface PortfolioState {
  hero: HeroData;
  about: AboutData;
  skills: SkillGroup[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  hackathons: HackathonItem[];
  voice: LinkedInPost[];
}

// Default static seeds if Supabase has no records
const defaultHero: HeroData = {
  quote: "AI engineer who doesn’t just use AI — I build it, deploy it, and make it think.",
  sequences: [
    '_Agentic AI Developer',
    '_Full-Stack Developer',
    '_Data Infrastructure Enthusiast'
  ]
};

const defaultAbout: AboutData = {
  bio1: "1st-year M.Sc Data Science student at Loyola College, Chennai (BCA CGPA 9.1), specializing in Agentic AI, RAG pipelines, and LLM-based solutions. Currently building AI agents for the film industry at Maans AI Pvt Ltd. Proficient in React, JavaScript, Python, and full-stack development with a long-term focus on Data Infrastructure and real-world AI integration.",
  bio2: "",
  languages: ['ENGLISH', 'TAMIL'],
  interests: ['Exploring AI tools & Agentic frameworks', 'Building personal AI projects', 'Listening to music', 'Connecting with people'],
  cgpa: '9.1',
  projectsCount: '4',
  yearsCount: '2+',
  hackathonsCount: '02',
  openSourceCount: '12+',
  certificationsCount: '3'
};

const defaultLinkedInPosts: LinkedInPost[] = [
  {
    id: 1,
    date: 'July 2026',
    topic: 'LOCAL AGENTIC ENGINE // LLaMA 3.2',
    content: 'Running agentic workflows locally is a game-changer. Built a micro-orchestrator that executes goal-directed tools offline using LLaMA 3.2 with 100% data privacy.',
    likes: '142',
    comments: '24',
    url: 'https://www.linkedin.com/in/sylvester-jones-9802a6271/',
    colorClass: 'bg-[#FADBD8]/40',
    hoverColorClass: 'hover:bg-[#FADBD8]/80'
  },
  {
    id: 2,
    date: 'June 2026',
    topic: 'THE FUTURE OF RETRIEVAL // AGENTIC RAG',
    content: 'RAG is evolving to agentic loops. High-performance systems require autonomous agents that retrieve, verify relevance, and self-correct queries iteratively.',
    likes: '98',
    comments: '15',
    url: 'https://www.linkedin.com/in/sylvester-jones-9802a6271/',
    colorClass: 'bg-[#FCF3CF]/40',
    hoverColorClass: 'hover:bg-[#FCF3CF]/80'
  },
  {
    id: 3,
    date: 'March 2026',
    topic: 'PROMPT PROGRAMMING // VITC CHAMPIONSHIP',
    content: 'Steering models is structural programming, not guessing adjectives. Documented templates optimized for Gemini 1.5 following our VITC Prompt-a-thon win.',
    likes: '186',
    comments: '41',
    url: 'https://www.linkedin.com/in/sylvester-jones-9802a6271/',
    colorClass: 'bg-[#D5F5E3]/40',
    hoverColorClass: 'hover:bg-[#D5F5E3]/80'
  }
];

export const defaultState: PortfolioState = {
  hero: defaultHero,
  about: defaultAbout,
  skills: SKILLS_DATA,
  experience: EXPERIENCE_DATA,
  projects: PROJECTS_DATA.flatMap(section => 
    section.items.map(p => ({ ...p, categoryName: section.category }))
  ) as any[],
  hackathons: HACKATHONS_DATA.map(h => ({
    name: h.name,
    date: h.date,
    status: h.status,
    iconName: h.name.includes('Prompt') ? 'Trophy' : 'Code2',
    description: h.description,
    pitch: h.pitch,
    technicalMetrics: h.technicalMetrics
  })),
  voice: defaultLinkedInPosts
};

// API Utilities for Single State Query
export async function getPortfolioState(): Promise<PortfolioState> {
  // Bypassed database connectivity for static deployment
  return defaultState;
}

export async function savePortfolioState(state: PortfolioState): Promise<void> {
  // Bypassed database connectivity for static deployment
  console.log('[Static Mode] Save state bypassed:', state);
}

// Caching layer for resource optimization
export async function getPortfolioStateCached(forceRefresh = false): Promise<PortfolioState> {
  return defaultState;
}

export async function savePortfolioStateCached(state: PortfolioState): Promise<void> {
  console.log('[Static Mode] Save cached state bypassed:', state);
}
