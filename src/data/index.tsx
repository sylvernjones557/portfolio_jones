import { Trophy, Code2 } from 'lucide-react';

export const SKILLS_DATA = [
  {
    category: 'AI & ML',
    items: ['Agentic AI', 'AI Agents', 'RAG Pipelines', 'LLaMA 3.2', 'Ollama', 'Prompt Engineering', 'Google AI Studio'],
    inverted: true,
  },
  {
    category: 'Frontend',
    items: ['HTML', 'CSS', 'Bootstrap', 'Tailwind CSS', 'JavaScript', 'React.js'],
  },
  {
    category: 'Backend & Languages',
    items: ['PHP', 'Python', 'Java', 'C#', 'C'],
  },
  {
    category: 'Database',
    items: ['Oracle', 'SQL'],
  },
  {
    category: 'Tools & Platforms',
    items: ['VS Code', 'Git', 'GitHub', 'REST APIs', 'DOM Manipulation'],
  },
];

export const EXPERIENCE_DATA = [
  {
    role: 'Junior Engineer(Intern)',
    company: 'Maans AI Pvt Ltd',
    date: 'Apr 2026 – Present',
    type: 'Full-time',
    points: [
      'Onboarded 10+ clients onto custom AI automation stacks, reducing per-task operational time by ~40%.',
      'Engineered storyboarding/mind-mapping AI agents for film directors, cutting pre-production ideation from hours to minutes.',
      'Deployed agentic pipelines that offloaded cognitive tasks, letting directors focus entirely on creative vision.'
    ],
  },
  {
    role: 'Frontend Web Engineer Intern',
    company: 'Geek Theory',
    date: 'Dec 2025 – Mar 2026',
    type: 'Internship',
    points: [
      'Delivered 3+ production frontend builds using spec-driven, AI-assisted coding.',
      'Managed end-to-end server setup, hosting, and deployment pipelines.',
      'Applied user-centric UI design and interaction research to optimize interface intuitiveness.'
    ],
  },
  {
    role: 'Outreach Leader',
    company: 'Loyola College',
    date: 'Jul 2024 – Feb 2025',
    type: 'Leadership',
    points: [
      'Led a 10-member team organizing community programs for elders and differently-abled groups.'
    ],
  },
  {
    role: 'Educational Tour Organizer',
    company: 'Loyola College',
    date: 'Sep 2025',
    type: 'Leadership',
    points: [
      'Planned and executed a 3-day educational tour to Mysore & Chikmagalur for 50 students.'
    ],
  },
  {
    role: 'Student',
    company: 'Loyola College, Chennai',
    date: '2026 – Present',
    type: 'Education',
    points: ['M.Sc Data Science (1st Year)'],
  },
  {
    role: 'Student',
    company: 'Loyola College, Chennai',
    date: '2023 – 2026',
    type: 'Education',
    points: ['Bachelor of Computer Applications (BCA)', 'CGPA: 9.1'],
  },
  {
    role: 'Student',
    company: 'Loyola Matriculation Higher Secondary School, Chennai',
    date: '2021 - 2023',
    type: 'Education',
    points: ['12th Grade: 76% (2022)', '10th Grade: 80% (2020)'],
  },
];

export const PROJECTS_DATA = [
  {
    category: 'BASIC DEVELOPMENT',
    items: [
      {
        id: 'WEB-001',
        name: 'Book Registration App',
        description: 'A client-side book management system using localStorage.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        status: 'completed',
        statusLabel: 'EXIT_CODE: 0',
        pitch: 'Built a client-side book management system using localStorage — enabling full register, store, and manage functionality with zero backend dependency.',
        links: [
          { label: 'GitHub', url: '#' }
        ]
      }
    ]
  },
  {
    category: 'AI DEVELOPMENT',
    items: [
      {
        id: 'AI-001',
        name: 'RAG Applications',
        description: 'Retrieval-Augmented Generation pipelines giving local LLMs persistent domain knowledge.',
        tags: ['LLaMA 3.2', 'Ollama', 'Python', 'RAG Pipeline'],
        status: 'completed',
        statusLabel: 'STATE: CONVERGED',
        pitch: 'Built Retrieval-Augmented Generation pipelines giving local LLMs persistent domain knowledge — delivering context-aware, accurate responses on custom data with no cloud dependency.',
        links: [
          { label: 'GitHub', url: '#' }
        ]
      },
      {
        id: 'AI-002',
        name: 'Personal Intelligence System',
        description: 'A fully on-device personal intelligence system using agentic workflows.',
        tags: ['Ollama', 'LLaMA 3.2', 'Python', 'Local Agents', 'Agentic AI'],
        status: 'working',
        statusLabel: 'STREAM: IN_PROGRESS',
        pitch: 'Architecting a fully on-device personal intelligence system using agentic workflows — achieving cloud-free reasoning and task execution with zero data leaving the local machine.',
        links: [
          { label: 'GitHub', url: '#' }
        ]
      }
    ]
  },
  {
    category: 'COLLEGE FINAL YEAR PROJECT',
    items: [
      {
        id: 'FYP-001',
        name: 'Smart Presence',
        description: 'AI Smart Attendance System Portal verifying attendance via face recognition in seconds.',
        tags: ['Python', 'OpenCV', 'Face Recognition', 'React.js', 'Portal Web App'],
        status: 'working',
        statusLabel: 'SCHEDULER: ACTIVE',
        pitch: 'Eliminated hardware dependency by engineering a phone-camera multi-face recognition system — achieving real-time attendance capture with zero additional infrastructure cost. Reduced a 10–15 min manual roll-call to under 30 seconds by detecting and marking attendance for an entire class in a single camera frame. Delivered a full-stack portal with teacher dashboard, student records, and automated reports — replacing 100% of manual attendance record-keeping.',
        links: [
          { label: 'GitHub', url: '#' }
        ]
      }
    ]
  }
];

export const HACKATHONS_DATA = [
  {
    name: 'AI Food Health Companion — KCG Engineering College',
    date: 'Sep 2025',
    status: 'Participant',
    icon: <Code2 className="w-8 h-8 text-accent" />,
    description: 'Delivered a personalized food & health AI using a RAG pipeline with LLaMA 3.2 (Ollama).',
    pitch: 'Delivered a personalized food & health AI using a RAG pipeline with LLaMA 3.2 (Ollama) — custom model inference with no cloud API calls.',
    technicalMetrics: [
      { label: 'STACK', value: 'LLaMA 3.2, Ollama, Python' },
      { label: 'CLOUD_CALLS', value: 'Zero (100% Local Inference)' }
    ]
  },
  {
    name: 'AI Student Score Prediction System — Stella Maris College',
    date: 'Dec 2024',
    status: 'Participant',
    icon: <Trophy className="w-8 h-8 text-ink" />,
    description: 'Predicted student academic performance and optimized scheduling efficiency.',
    pitch: 'Built an AI app that predicted student academic performance and optimized scheduling efficiency — reducing manual analysis effort to zero.',
    technicalMetrics: [
      { label: 'PREDICTION_MODEL', value: 'Linear Regression / Decision Tree' },
      { label: 'MANUAL_EFFORT', value: 'Reduced to Zero' }
    ]
  }
];
