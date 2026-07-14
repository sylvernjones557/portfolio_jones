# Sylvester Jones — Full Portfolio Knowledge Library

> **Live at:** `http://localhost:3001`
> **Built with:** React 19 + TypeScript + Vite 6 + Tailwind v4 + GSAP + Lenis + Motion + Canvas 2D

---

## Table of Contents
1. [Tech Stack & Dependencies](#1-tech-stack--dependencies)
2. [Design System (Colors, Fonts, Tones, Visual Language)](#2-design-system)
3. [App Structure, Routing & Layout Architecture](#3-app-structure-routing--layout-architecture)
4. [The Complete Audience Scroll Journey](#4-the-complete-audience-scroll-journey)
   - [4.1 Entry Point — The Boot Sequence](#41-entry-point--the-boot-sequence)
   - [4.2 Hero Section — First Impression & Parallax](#42-hero-section--first-impression--parallax)
   - [4.3 About — Bio & Stats](#43-about--bio--stats)
   - [4.4 Skills — Category Cards & Hover Magic](#44-skills--category-cards--hover-magic)
   - [4.5 Experience — Scrolling Timeline](#45-experience--scrolling-timeline)
   - [4.6 Projects — Grid & Brutalist Modals](#46-projects--grid--brutalist-modals)
   - [4.7 Hackathons — Battlegrounds](#47-hackathons--battlegrounds)
   - [4.8 Blog — AI Journal](#48-blog--ai-journal)
   - [4.9 Contact — Let's Build](#49-contact--lets-build)
5. [Navigation System (Navbar)](#5-navigation-system-navbar)
   - [5.1 Scroll-Aware Styling](#51-scroll-aware-styling)
   - [5.2 Active Section Tracking via IntersectionObserver](#52-active-section-tracking-via-intersectionobserver)
   - [5.3 Smooth Scroll Navigation](#53-smooth-scroll-navigation)
   - [5.4 Mobile Hamburger Menu](#54-mobile-hamburger-menu)
   - [5.5 Brutalist Border Frame](#55-brutalist-border-frame)
6. [Smooth Scroll & Lenis Integration](#6-smooth-scroll--lenis-integration)
7. [Animation Philosophy & All ScrollTriggers](#7-animation-philosophy--all-scrolltriggers)
   - [7.1 GSAP + ScrollTrigger Patterns](#71-gsap--scrolltrigger-patterns)
   - [7.2 Scrub-Based Animations](#72-scrub-based-animations)
   - [7.3 Velocity-Based Distortion (Hero)](#73-velocity-based-distortion-hero)
   - [7.4 Scroll Animations Master Table](#74-scroll-animations-master-table)
8. [The Interactive AI Robot Mascot — Full Build Story](#8-the-interactive-ai-robot-mascot--full-build-story)
   - [8.1 Design & Intent](#81-design--intent)
   - [8.2 Version 1 Build Process](#82-version-1-build-process)
   - [8.3 Component Architecture](#83-component-architecture)
   - [8.4 Eye-Tracking Mechanics](#84-eye-tracking-mechanics)
   - [8.5 Speech Bubble & Personality System](#85-speech-bubble--personality-system)
   - [8.6 Responsive & Accessibility](#86-responsive--accessibility)
   - [8.7 File-by-File Details](#87-file-by-file-details)
   - [8.8 The SVG Analysis & Cleanup](#88-the-svg-analysis--cleanup)
   - [8.9 v2 & v3 Roadmap](#89-v2--v3-roadmap)
9. [The Data Layer (localStorage CRUD)](#9-the-data-layer-localstorage-crud)
   - [9.1 Data Flow](#91-data-flow)
   - [9.2 All Data Tables](#92-all-data-tables)
   - [9.3 Admin Dashboard](#93-admin-dashboard)
10. [Canvas Terminal Background](#10-canvas-terminal-background)
11. [Performance & Responsiveness](#11-performance--responsiveness)
    - [11.1 Performance Decisions](#111-performance-decisions)
    - [11.2 Responsive Breakpoints](#112-responsive-breakpoints)
    - [11.3 Edge Cases Handled](#113-edge-cases-handled)
12. [Future AI Figurine / 3D Agent Development](#12-future-ai-figurine--3d-agent-development)

---

## 1. Tech Stack & Dependencies

| Layer | Choice | Version | Purpose |
|---|---|---|---|
| **Framework** | React + TypeScript | 19.0.1 | Type safety, component architecture |
| **Build Tool** | Vite | 6.4.2 | Fast HMR, ESBuild transforms, Rollup bundling |
| **Styling** | Tailwind CSS | 4.1.14 | Utility-first CSS with `@theme` custom tokens |
| **Animation Core** | GSAP | 3.15.0 | High-performance JS animations |
| **GSAP React** | `@gsap/react` | 2.1.2 | `useGSAP()` hook — scoped lifecycle |
| **Scroll Plugin** | GSAP ScrollTrigger | — | Scroll-linked animations, scrub, pinning |
| **Smooth Scroll** | Lenis | 1.3.23 | Interpolated smooth scrolling |
| **Motion Library** | `motion` (Framer Motion v12) | 12.23.24 | Declarative spring/gesture animations (robot) |
| **Typewriter** | `react-type-animation` | 3.2.0 | Hero role rotator |
| **Icons** | `lucide-react` | 0.546.0 | GitHub, LinkedIn, Trophy, Code2 icons |
| **Canvas** | Native Canvas 2D API | — | Terminal background particle system |
| **3D (available)** | `@react-three/fiber` + `drei` + `three` | 9.6.1 / 10.7.7 / 0.184.0 | Ready for future 3D figurine |
| **CSS Utility** | `clsx` + `tailwind-merge` | 2.1.1 / 3.6.0 | Conditional class merging |
| **AI SDK** | `@google/genai` | 1.29.0 | Google Gemini integration (admin chat) |
| **Server** | Express | 4.21.2 | Backend API proxy |
| **Types** | `@types/react`, `@types/node`, `@types/three` | — | TypeScript declarations |

---

## 2. Design System

### Color Palette

```
Token            Hex         Usage
──────────────────────────────────────────────────
WHITE            #F4EFE6    Page background (warm paper-like)
OFF-WHITE        #EBE4D8    Alternate section backgrounds (About, Skills, Experience)
INK              #0A0A0A    All borders, body text, shadows (near-black)
DARK-GRAY        #3D3D3D    Body paragraphs, secondary text
MID-GRAY         #888888    Subtitles, metadata, date labels, tags
ACCENT           #C0392B    Red — hover states, highlights, status badges, UI power color
BORDER-SUBTLE    #E0E0E0    Soft dividers, subtle separators
WHITE/10         #FFFFFF1A  Contact section ink box border
WHITE/20         #FFFFFF33  Contact link dividers
INK/20           #0A0A0A33  Robot speech bubble border
```

### Typography

| Font Family | Weights | Usage Locations |
|---|---|---|
| **Space Grotesk** (`--font-display`) | 700, 900 | Hero name (18vw), section titles, LET'S BUILD heading, mobile menu links |
| **JetBrains Mono** (`--font-mono`) | 400, 700 | All UI labels, skill tags, nav links, boot sequence, timeline entries, stat values, code snippets, badges, contact links, robot speech |
| **Inter** (`--font-sans`) | 400 | Body paragraphs in About, experience bullet points, bio text |

### Visual Language — Brutalist

Core principles applied throughout:

| Principle | Implementation |
|---|---|
| **Raw borders** | `border-ink` (black 1-2px borders everywhere), `border-[8px] md:border-[12px]` on viewport frame |
| **Heavy shadows** | `shadow-[4px_4px_0_0_#0A0A0A]` on card hover |
| **No rounded corners** | Only speech bubble uses `rounded-lg`, rest is brutally square |
| **Uppercase labels** | All section headers, nav items, metadata use `font-mono text-[10px] uppercase tracking-widest` |
| **Accent as power color** | Red appears only on interaction — hover states, active nav links, status badges, DONE markers, bullet triangles |
| **Character-level effects** | Hero chars individually respond to hover (scale + rotate + red) |
| **Text stroke** | `.text-stroke` utility: `-webkit-text-stroke: 2px #0A0A0A; color: transparent` — used for "JONES" hero outline |
| **Monochrome + red** | Entire site is black/white/gray + one accent red |

### Layout Conventions

- All sections: `border-b border-ink` (bottom border separator)
- All sections: `py-16 md:py-24` or varied padding
- Alternating backgrounds: `bg-white` → `bg-off-white` → `bg-white` → etc.
- Content max-width: `max-w-7xl` with `px-6 md:px-12`
- Section IDs match nav targets: `hero`, `about`, `skills`, `experience`, `projects`, `blog`, `contact`

---

## 3. App Structure, Routing & Layout Architecture

### Hash-Based Router (App.tsx)

The app uses `window.location.hash` changes (not React Router) for view switching:

```tsx
type AppView = 'portfolio' | 'blog-portal' | 'blog-post' | 'admin';
```

| Hash | View Shown | Components Rendered |
|---|---|---|
| `#/` or none | **Portfolio** (full page) | Hero, About, Skills, Experience, Projects, Hackathons, Blog, Contact |
| `#/blog` | **Blog Portal** | BlogPortal (article index list) |
| `#/blog/:id` | **Blog Post Reader** | BlogPostReader (single article) |
| `#/admin` or `#/control-room` | **Admin Dashboard** | AdminDashboard (content CRUD UI) |

### View Lifecycle

```tsx
useEffect(() => {
  const handleHashChange = () => {
    const hash = window.location.hash;
    // Parse hash → setView() + setActivePostId()
    // Refresh ScrollTrigger after 100ms for layout shifts
    setTimeout(() => ScrollTrigger.refresh(), 100);
  };
  window.addEventListener('hashchange', handleHashChange);
  return () => window.removeEventListener('hashchange', handleHashChange);
}, []);
```

### Persistent Elements

| Element | Visible On | Condition |
|---|---|---|
| `CustomCursor` | All public views | Not admin |
| `Navbar` | All public views | Not admin; border frame always rendered |
| `Footer` | All public views | Not admin |
| `InteractiveMascot` | All public views | Not admin; fixed bottom-right |

### Component Tree (Portfolio View)

```
App.tsx
├── CustomCursor.tsx (fixed, z-[9999])
├── Navbar.tsx (fixed, z-50)
│   ├── &lt;SJ /&gt; logo
│   ├── NavLinks[] (desktop horizontal)
│   ├── Resume button
│   └── Hamburger → MobileMenu (fullscreen overlay, z-[100])
├── <main>
│   ├── Hero.tsx
│   │   ├── HeroBootSequence.tsx (overlay, z-50)
│   │   ├── AnimatedTerminalBg.tsx (canvas, z-0)
│   │   └── TypeAnimation
│   ├── About.tsx
│   │   ├── ScrambleTitle.tsx
│   │   ├── RevealText.tsx (×2)
│   │   └── StatCell.tsx (×4)
│   ├── Skills.tsx
│   │   └── skill-category-card[] (each with inline SkillItem[])
│   ├── Experience.tsx
│   │   ├── ScrambleTitle.tsx
│   │   ├── timeline-line (GSAP scrub)
│   │   ├── progressRef (GSAP scrub)
│   │   └── timeline-entry[] (GSAP scroll-triggered)
│   ├── Projects.tsx
│   │   ├── project-card[] (grid)
│   │   └── ProjectModal (brutalist overlay)
│   ├── Hackathons.tsx
│   │   ├── hackathon-card[]
│   │   └── HackModal (brutalist overlay)
│   ├── Blog.tsx
│   │   └── article-card[]
│   └── Contact.tsx
│       ├── SocialLink.tsx (×2)
│       └── Contact links
├── Footer.tsx
└── InteractiveMascot.tsx (fixed, z-50)
    └── AIRobot.tsx
```

---

## 4. The Complete Audience Scroll Journey

This section documents exactly what the user **sees, feels, and experiences** as they scroll from the top of the page to the bottom.

### 4.1 Entry Point — The Boot Sequence

**File:** `HeroBootSequence.tsx`

**What happens on page load:**

1. The page loads with `body.style.overflow = 'hidden'` — no scroll possible yet
2. A **full-screen black overlay** appears with `z-50`, covering everything
3. Console-like text appears line by line at **400ms intervals**:

```
> INITIALIZING KERNEL          [DONE]
> LOADING AGENTIC ENGINES      [DONE]
> MOUNTING VECTOR STORE        [DONE]
> CALIBRATING NEURAL ROUTER    [DONE]
> ESTABLISHING SECURE SHELL    [DONE]
```

4. Each line fades in with `opacity: 0 → 1` over 300ms
5. The word `DONE` appears in accent red next to each completed log line
6. After all 5 lines (2000ms): a divider line + `SYSTEM_READY. WELCOME, RECRUITER.` in red appears
7. A blinking cursor `▊` pulses below
8. After 500ms: the entire black overlay **slides up** (`yPercent: -100`) and fades out over 700ms (`power4.inOut` easing)
9. `body.style.overflow` is restored — user can now scroll
10. `bootComplete = true` → the hero content (which was rendering underneath the whole time) is now visible

**On `prefers-reduced-motion: reduce`:** The boot sequence skips entirely — `onComplete()` fires immediately.

**What the user perceives:** A system booting up, then the screen slides away to reveal a portfolio hero. Establishes the "AI Engineer" brand identity.

### 4.2 Hero Section — First Impression & Parallax

**File:** `Hero.tsx`

**Visual layout (top to bottom):**

```
┌─────────────────────────────────────────┐
│  — Portfolio 2026 / Chennai, IN          │ STATUS: BUILDING IN PUBLIC
│                                         │
│                                         │
│         S Y L V E S T E R               │ ← 18vw font, full width
│                                         │
│              J O N E S                  │ ← "text-stroke" (outline only)
│                                         │
│        _AI Engineer (typewriter)         │ ← cycles every 1.5s
│                                         │
│  ─────────────────────────────────────  │
│  — Statement / Focus    "AI engineer    │ ← italic quote
│                          who doesn't    │
│                          just use AI..."│
└─────────────────────────────────────────┘
```

**Animation layers (all running simultaneously):**

| Layer | Trigger | Effect |
|---|---|---|
| **Character reveal** | On mount (0.1s delay) | Each letter animates from `y:120, skewY:8, opacity:0` → `y:0, skewY:0, opacity:1` with `stagger:0.03`, `duration:0.9`, `power4.out`. 12 letters in "SYLVESTER" × 0.03 = 0.36s stagger spread. |
| **Parallax row 1** | Scroll (scrubbed) | "SYLVESTER" slides left (`xPercent:-15`) as user scrolls down |
| **Parallax row 2** | Scroll (scrubbed) | "JONES" slides right (`xPercent:15`) as user scrolls down |
| **Velocity skew** | Scroll (onUpdate) | Fast scroll = `skewX: ±12deg` + `scaleX: 1.15` stretch, smoothing out over 0.35s |
| **Quote fade** | `top 95%` | Quote fades up from `y:40, opacity:0` |
| **Typewriter** | Infinite loop | Role text cycles every 1500ms via `react-type-animation` |
| **Character hover** | User hovers a letter | `scale: 1.12`, `rotate: -3deg` (row1) / `+3deg` (row2), turns red |

**Canvas background (behind everything):**
- Terminal characters floating in a grid with sine-wave oscillation
- Characters near cursor glow red
- More details in [Section 10](#10-canvas-terminal-background)

**As the user scrolls away from Hero:**
- The parallax rows stretch apart (one left, one right), creating a dramatic "unfolding" effect
- The velocity skew adds a cinematic stretch when scrolling fast
- The terminal canvas fades out (behind other content via z-index)

### 4.3 About — Bio & Stats

**File:** `About.tsx`

**Layout:** Two columns (3/5 + 2/5 on desktop, stacked on mobile)

```
┌──────────────────────────────────┬────────────────┐
│ 01 — Bio                         │    CGPA        │
│                                  │    8.6         │
│ [Word-by-word reveal]            │                │
│ "Sylvester is an AI engineer     ├────────────────┤
│  who specializes in..."          │   Projects     │
│                                  │    12+         │
│ [Second paragraph with delay]    │                │
│                                  ├────────────────┤
│ // LANGUAGES   // INTERESTS      │  Years Building│
│ ▪ Tamil        ▪ AI Agents       │     5          │
│ ▪ English      ▪ RAG Systems     │                │
│ ▪ Telugu       ▪ Brutalist UI    ├────────────────┤
│                                 │   Hackathons   │
│                                  │      10       │
│                                  │               │
└──────────────────────────────────┴────────────────┘
```

**Scroll animations:**
- `ScrambleTitle` "01 — Bio": Characters cycle through random CHYPHERS before settling — triggers at `top 85%`
- `RevealText` paragraph 1: Each word slides up from `y:110%` (hidden by overflow parent) — triggers at `top 90%`, `stagger:0.015`, `duration:0.8`
- `RevealText` paragraph 2: Same but `delay:0.2`
- `StatCell` grid: No scroll entrance animation, only hover effects (`scale:110%`, `-translateY`) via CSS

**What user feels:** The words "type themselves out" in a staggered cascade, building the narrative piece by piece.

### 4.4 Skills — Category Cards & Hover Magic

**File:** `Skills.tsx`

**Layout:** 12-column grid (4 + 8 split)

```
┌──────────────────┬──────────────────────────────────────┐
│ 02 — Skills      │  ┌──────────┐  ┌──────────────────┐  │
│                  │  │ AI & ML  │  │   Frontend       │  │
│ A peek at the    │  │ Agentic AI│  │ HTML • CSS       │  │
│ stack fueling    │  │ AI Agents│  │ Tailwind • React  │  │
│ the pipeline     │  │ RAG      │  │ TypeScript • Vite │  │
│                  │  └──────────┘  └──────────────────┘  │
│                  │  ┌──────────┐  ┌──────────────────┐  │
│                  │  │ Backend  │  │   Database       │  │
│                  │  │ Python   │  │ Oracle • SQL     │  │
│                  │  │ PHP • Java│  │                  │  │
│                  │  └──────────┘  └──────────────────┘  │
│                  │  ┌──────────────────────────────────┐ │
│                  │  │            Tools                 │ │
│                  │  │ Git • GitHub • VS Code • Docker  │ │
│                  │  └──────────────────────────────────┘ │
└──────────────────┴──────────────────────────────────────┘
```

**Scroll animations:**
- Cards stagger in: `opacity:0, y:30` → `opacity:1, y:0` at `stagger:0.12`, triggered at `top 80%`

**Skill Item hover effect (CSS only, no GSAP):**
```
┌──────────────────┐
│  Agentic AI      │ ← border-gray, white bg
│                  │
│  [RED SLIDE UP]  │ ← hidden below (translate-y-full)
└──────────────────┘
         ↓ hover
┌──────────────────┐
│  Agentic AI      │ ← text turns white (via staggered character swap)
│                  │
│  ██████████████  │ ← red background slides up (translate-y: 0)
└──────────────────┘
```

Each character of the skill name is wrapped in a `<span>`. On hover:
- A red `div` slides up from below (`translateY: 0`)
- Each character span animates upward with `transitionDelay: idx * 15ms`, revealing white text

**What user feels:** A "retro terminal" card layout where skills light up red on interaction — tactile, responsive.

### 4.5 Experience — Scrolling Timeline

**File:** `Experience.tsx`

**Layout:** Two columns (1/3 pinned + 2/3 scrollable)

```
┌──────────────────┬──────────────────────────────────────┐
│ 03 — Timeline    │  │●  AI Engineer • XYZ Corp          │
│                  │  │   Full-time • Apr 2026 – Present  │
│ Tracing the      │  │  ▸ Built agentic RAG pipeline...  │
│ trajectory from  │  │  ▸ Deployed LLM inference...      │
│ raw code to      │  │                                    │
│ agentic arch.    │  │●  Intern • ABC Tech               │
│                  │  │   Internship • Jun 2025 – Aug 2025│
│ [PROGRESS BAR]   │  │  ▸ Developed data pipeline...     │
│ ┃ (scroll-fills) │  └────────────────────────────────────┘
└──────────────────┘
```

**Scroll animations:**
- **Timeline line** (vertical red line): Grows from top via `scaleY: 0 → 1`, `scrub: true`, triggered from `top center` to `bottom center` of the section
- **Progress bar** (in the left column): Fills from top via `scaleY: 0 → 1`, `scrub: 0.5`, triggered from `top 50%` to `bottom 80%`
- **Each timeline entry**: `opacity:0, x:-20` → `opacity:1, x:0` with individual `ScrollTrigger` at `top 85%`

**What user feels:** A "live" timeline that grows as you scroll — the red line draws itself down the page, each entry slides in from the left like a terminal log appearing.

### 4.6 Projects — Grid & Brutalist Modals

**File:** `Projects.tsx`

**Layout:** Responsive grid (1 col mobile → 2 col tablet → 3 col desktop)

```
┌─────────────────────┬─────────────────────┬─────────────────────┐
│ #001                │ #002                │ #003                │
│ ┌─────────┐         │ ┌─────────┐         │ ┌─────────┐         │
│ │ WORKING │         │ │COMPLETED│         │ │ UPCOMING│         │
│ └─────────┘         │ └─────────┘         │ └─────────┘         │
│                     │                     │                     │
│ Project Name        │ Project Name        │ Project Name        │
│ Description...      │ Description...      │ Description...      │
│                     │                     │                     │
│ [tag] [tag] [tag]   │ [tag] [tag]         │ [tag] [tag] [tag]   │
│                     │                     │                     │
│ INSPECT // →        │ INSPECT // →        │ INSPECT // →        │
└─────────────────────┴─────────────────────┴─────────────────────┘
```

**Scroll animations:**
- Cards stagger in: `opacity:0, y:30` → `opacity:1, y:0`, `stagger:0.1`, triggered at `top 80%`

**Card hover:** `translateY(-8px)` + `shadow-[4px_4px_0_0_#0A0A0A]` + `z-10`

**Modal (on click):**
```
┌────────────────────────────────────────────────┐
│ [X] ESC                                         │
│                                                 │
│  #001  [WORKING]                                │
│                                                 │
│  Project Name                                   │
│  ─────────────────────────────────────────      │
│                                                 │
│  Full pitch paragraph here...                   │
│                                                 │
│  ┌──────────────┐  ┌──────────────┐            │
│  │ Metric       │  │ Metric       │            │
│  │ Value        │  │ Value        │            │
│  └──────────────┘  └──────────────┘            │
│                                                 │
│  Tags: [tag] [tag] [tag]                        │
│                                                 │
│  [View Live →]  [GitHub →]                      │
└────────────────────────────────────────────────┘
```

Modal appears with `backdrop-blur-md bg-ink/40` backdrop, CSS `animate-fade-in`. No GSAP for modal (pure CSS).

### 4.7 Hackathons — Battlegrounds

**File:** `Hackathons.tsx`

**Layout:** Pinned left title + vertical card list

```
┌──────────────────┬──────────────────────────────────────┐
│ 05 — Battlegrounds│ ┌────────────────────────────────────┐│
│                   │ │ [🏆]  Prompt-a-thon    1st Place  ││
│                   │ │      Mar 2026                      ││
│                   │ │      Built an agentic RAG...       ││
│                   │ │      INSPECT //                    ││
│                   │ └────────────────────────────────────┘│
│                   │ ┌────────────────────────────────────┐│
│                   │ │ [💻]  Make-a-thon       Finalist   ││
│                   │ │      Feb 2026                      ││
│                   │ │      Developed a full-stack...     ││
│                   │ │      INSPECT //                    ││
│                   │ └────────────────────────────────────┘│
└──────────────────┴──────────────────────────────────────┘
```

**Scroll animations:** Cards stagger at `stagger:0.15` (wider than Projects), same pattern.

**Modal:** Same brutalist overlay pattern as Projects.

### 4.8 Blog — AI Journal

**File:** `Blog.tsx`

**Layout:** Left-bordered article list

```
┌────────────────────────────────────────────┐
│  06 — AI Journal         View All Posts →  │
│                                            │
│  ┃                                          │
│  ┃  MAR 15, 2026 • 5 min read              │
│  ┃  Why RAG is more than just vector search│
│  ┃  Exploring hybrid search approaches...   │
│  ┃                                          │
│  ┃  MAR 01, 2026 • 4 min read              │
│  ┃  Building my Personal Intelligence System│
│  ┃  How I built a local-first AI...         │
│  ┃                                          │
│  ┃  FEB 15, 2026 • 3 min read              │
│  ┃  The Brutalist Web is back               │
│  ┃  Why minimal, content-first design...    │
└────────────────────────────────────────────┘
```

**Scroll animations:** Cards fade up: `opacity:0, y:20` → `opacity:1, y:0`, `stagger:0.1`, triggered at `top 85%`
**Hover:** `padding-left` increases (card indents), title turns accent red.

### 4.9 Contact — Let's Build

**File:** `Contact.tsx`

**Layout:** Two columns (left ink box + right links)

```
┌──────────────────────────┬──────────────────────────┐
│ 🖤 LET'S                 │  Looking for an AI        │
│     BUILD                │  engineer to scale your   │
│                          │  data infra or build      │
│ LINKEDIN       →         │  agentic systems?         │
│ GITHUB          →        │  Let's connect.           │
│ EMAIL           →        │                          │
│                          │  ┌──────────────────────┐ │
│                          │  │ GitHub        [icon]  │ │
│                          │  └──────────────────────┘ │
│                          │  ┌──────────────────────┐ │
│                          │  │ LinkedIn      [icon]  │ │
│                          │  └──────────────────────┘ │
└──────────────────────────┴──────────────────────────┘
```

**Scroll animations:** Two `.contact-column` elements stagger in: `opacity:0, y:30` → `opacity:1, y:0`, `stagger:0.2`, triggered at `top 85%`

**Hover effects:**
- Left column links: text turns accent red on hover
- Right column SocialLink cards: `bg-ink` fills in, text/icon turn white

---

## 5. Navigation System (Navbar)

**File:** `Navbar.tsx`

### 5.1 Scroll-Aware Styling

```tsx
const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 60);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

When `scrollY > 60px`:
- Navbar changes from `bg-white` → `bg-white/95 backdrop-blur-sm shadow-sm`
- Smooth transition over 300ms via `transition-all duration-300`

### 5.2 Active Section Tracking via IntersectionObserver

```tsx
const NAV_SECTIONS = ['about', 'skills', 'experience', 'projects', 'blog', 'contact'];

NAV_SECTIONS.forEach((id) => {
  const el = document.getElementById(id);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(id);
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  observer.observe(el);
});
```

**How the rootMargin works:** The viewport is divided into zones:
- `-40%` top margin = the section must be 40% past the top of the viewport to be "active"
- `-55%` bottom margin = the section can be 55% past the bottom before losing active status
- This creates a centered detection zone (roughly 5% of viewport height), ensuring only one section is active at a time

**Visual result:** As the user scrolls, the navbar link for the current section gets `text-accent border-accent`. All others stay `text-ink`.

### 5.3 Smooth Scroll Navigation

On nav link click:
```tsx
el.scrollIntoView({ behavior: 'smooth', block: 'start' });
```

Lenis intercepts this and provides the smooth interpolated scroll.

### 5.4 Mobile Hamburger Menu

- Three-bar button visible on `md:hidden`
- Opens a full-screen `bg-ink text-white` overlay with `z-[100]`
- Nav links are `font-display font-bold text-4xl uppercase`
- Close button `[X]` in top-right

### 5.5 Brutalist Border Frame

```tsx
<div className="fixed inset-0 pointer-events-none border-[8px] md:border-[12px] border-ink z-[100]"></div>
```

A thick black border wraps the **entire viewport** (not the page content). This is a signature brutalist element — it frames the content and stays fixed regardless of scroll position.

---

## 6. Smooth Scroll & Lenis Integration

**File:** `SmoothScroll.tsx`

```tsx
<ReactLenis
  root
  ref={lenisRef}
  autoRaf={false}
  onScroll={ScrollTrigger.update}
  options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}
>
  {children}
</ReactLenis>
```

**Configuration:**
| Option | Value | Effect |
|---|---|---|
| `lerp` | 0.1 | Interpolation factor — lower = smoother but more lag. 0.1 is snappy. |
| `duration` | 1.5 | Max scroll duration in seconds |
| `smoothWheel` | true | Enables smooth interpolation for mouse wheel |
| `autoRaf` | false | We manually sync with GSAP's ticker |
| `root` | true | Apply to document root (not an element) |

**GSAP ticker sync:**
```tsx
function update(time: number) {
  lenisRef.current?.lenis?.raf(time * 1000);
}
gsap.ticker.add(update);
```

This ensures Lenis and GSAP share the same render loop, preventing scroll jank.

**ScrollTrigger sync:**
```tsx
onScroll={ScrollTrigger.update}
```

Every Lenis scroll event triggers `ScrollTrigger.update()`, keeping all GSAP ScrollTrigger animations in sync.

**CSS overrides (index.css):**
```css
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-stopped { overflow: hidden; }
[data-lenis-prevent] { overscroll-behavior: contain; }
```

---

## 7. Animation Philosophy & All ScrollTriggers

### 7.1 GSAP + ScrollTrigger Patterns

Every scroll-triggered animation follows this pattern:

```tsx
useGSAP(() => {
  gsap.fromTo('.target-class',
    { opacity: 0, y: 30 },                            // FROM state
    { opacity: 1, y: 0, stagger: 0.1, duration: 0.6,  // TO state
      ease: 'power2.out',
      scrollTrigger: { trigger: '.target-class', start: 'top 80%' }
    }
  );
}, { scope: containerRef });
```

**Key rules:**
- `useGSAP({ scope: containerRef })` — scopes all GSAP queries to the container, prevents leaks
- `scrollTrigger.start: 'top 80-85%'` — animation fires when element enters viewport
- `stagger` values range from 0.015 (RevealText words) to 0.2 (Contact columns)
- `ease: 'power2.out'` for general entrances, `'power4.out'` for hero character reveal (more dramatic)

### 7.2 Scrub-Based Animations

Used in **Experience** for continuous scroll-linked progress:

```tsx
// Timeline line grows with scroll
gsap.fromTo(line,
  { scaleY: 0 },
  { scaleY: 1, transformOrigin: 'top', ease: 'none',
    scrollTrigger: { trigger: containerRef, start: 'top center',
      end: 'bottom center', scrub: true } }
);

// Progress bar fill (with slight lag)
gsap.fromTo(progressRef.current,
  { scaleY: 0 },
  { scaleY: 1, ease: "none",
    scrollTrigger: { trigger: containerRef, start: "top 50%",
      end: "bottom 80%", scrub: 0.5 } }
);
```

### 7.3 Velocity-Based Distortion (Hero)

```tsx
ScrollTrigger.create({
  trigger: containerRef.current,
  start: 'top top',
  end: 'bottom top',
  onUpdate: (self) => {
    const velocity = self.getVelocity(); // px/sec
    const normalizedVel = Math.max(-1, Math.min(1, velocity / 3500));
    const skewAngle = normalizedVel * 12;
    const scaleX = 1 + Math.abs(normalizedVel) * 0.15;

    gsap.to(rows, {
      skewX: -skewAngle,
      scaleX: scaleX,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  }
});
```

Converts scroll velocity to a skew/stretch distortion on the hero name rows. Fast scrolling = dramatic slant + horizontal stretch. Smoothes out over 0.35s.

### 7.4 Scroll Animations Master Table

| Section | Target Elements | ScrollTrigger Start | From State | To State | Stagger | Duration | Ease | Scrub? |
|---|---|---|---|---|---|---|---|---|
| **Hero** | `.char` (letter spans) | Auto (mount) | `y:120, skewY:8, opacity:0` | `y:0, skewY:0, opacity:1` | 0.03 | 0.9s | power4.out | No |
| **Hero** | Row1 (SYLVESTER) | `top top` → `bottom top` | — | `xPercent:-15` | — | — | none | Yes |
| **Hero** | Row2 (JONES) | `top top` → `bottom top` | — | `xPercent:15` | — | — | none | Yes |
| **Hero** | Quote | `top 95%` | `y:40, opacity:0` | `y:0, opacity:1` | — | 0.8s | power3.out | No |
| **Hero** | Name rows (velocity) | `top top` → `bottom top` | — | `skewX:±12, scaleX:1.15` | — | 0.35s | power2.out | onUpdate |
| **About** | RevealText words | `top 90%` | `y:110%` | `y:0%` | 0.015 | 0.8s | power4.out | No |
| **About** | ScrambleTitle chars | `top 85%` | Random cipher | Actual char | 0.03 | — | — | No |
| **Skills** | `.skill-category-card` | `top 80%` | `opacity:0, y:30` | `opacity:1, y:0` | 0.12 | 0.6s | power2.out | No |
| **Experience** | `.timeline-line` | `top center` → `bottom center` | `scaleY:0` | `scaleY:1` | — | — | none | Yes |
| **Experience** | Progress bar | `top 50%` → `bottom 80%` | `scaleY:0` | `scaleY:1` | — | — | none | Yes (0.5) |
| **Experience** | `.timeline-entry` | `top 85%` (each) | `opacity:0, x:-20` | `opacity:1, x:0` | Per entry | 0.6s | power2.out | No |
| **Projects** | `.project-card` | `top 80%` | `opacity:0, y:30` | `opacity:1, y:0` | 0.1 | 0.6s | power2.out | No |
| **Hackathons** | `.hackathon-card` | `top 80%` | `opacity:0, y:30` | `opacity:1, y:0` | 0.15 | 0.6s | power2.out | No |
| **Blog** | `.article-card` | `top 85%` | `opacity:0, y:20` | `opacity:1, y:0` | 0.1 | 0.5s | power2.out | No |
| **Contact** | `.contact-column` | `top 85%` | `opacity:0, y:30` | `opacity:1, y:0` | 0.2 | 0.6s | power2.out | No |

---

## 8. The Interactive AI Robot Mascot — Full Build Story

### 8.1 Design & Intent

The robot mascot was designed to be a **fourth-wall-breaking AI companion** that:
- Lives in the bottom-right corner as a persistent brand element
- Follows the user's cursor with its eyes (creates a "live" feeling)
- Speaks developer-humor quotes that cycle automatically
- Reacts to clicks with escalating snarky responses
- Reinforces the "AI Engineer" personal brand

### 8.2 Version 1 Build Process

**Step 1 — Asset preparation:**
- User provided a raw SVG of their robot (traced from a photo, ~40 paths)
- Cleaned by removing the white background path to make it transparent
- Saved as `src/assets/robot.svg`

**Step 2 — Pupil positioning:**
- Analyzed SVG viewBox coordinates (400×300)
- Located eye whites at: `translate(203,139)` and `translate(230,139)`
- Calculated center points as percentages:
  - Left pupil: 47.75% from left, 49.33% from top
  - Right pupil: 55.75% from left, 49.67% from top
- Overlaid two `<div>` elements as black dots (3% width, `aspect-ratio:1`, `border-radius:50%`)

**Step 3 — Eye tracking:**
- Mouse position tracked on `window.mousemove`
- Offset calculated from viewport center: `dx = (clientX - cx) / cx`, `dy = (clientY - cy) / cy`
- Multiplied by 1.2 for natural movement range (±1.2%)
- Applied via `style.left` and `style.top` with `transition: 0.08s ease-out` for smooth following

**Step 4 — Speech bubble:**
- 8 dev quotes in rotation via `setInterval(4000)`
- `AnimatePresence` for fade transitions (0.2s)
- Small triangle tail via CSS pseudo-border trick

**Step 5 — Interaction:**
- `motion.div` wrapping the robot: `whileHover: scale(1.06)`, `whileTap: scale(0.97)`
- Click counter with 5 escalating messages
- `prefers-reduced-motion` check: disables all animations

**Step 6 — Integration:**
- Imported into `App.tsx`, rendered after Footer, hidden on admin view
- Made responsive: `w-36 md:w-48 lg:w-56` (mobile through desktop)
- Removed `hidden md:block` to show on all screen sizes

### 8.3 Component Architecture

```
InteractiveMascot.tsx (parent state machine)
├── State: pupilOffset, quoteIndex, clickCount, customMessage, isHovered, isReducedMotion
├── Effect: mousemove → update pupilOffset
├── Effect: setInterval → cycle quotes (4s)
├── Effect: timeout → clear custom message (2.5s)
├── Effect: detect reduced motion on mount
└── Render:
    ├── <div fixed bottom-3 right-3 z-50>
    │   ├── <AnimatePresence>
    │   │   └── <motion.div speech bubble>
    │   │       └── "{displayedText}"
    │   │       └── ▼ tail triangle
    │   └── <motion.div robot container (w-36 md:w-48 lg:w-56)>
    │       └── AIRobot
    │           ├── <img src=robot.svg>
    │           ├── <div left pupil> (absolute, rounded-full bg-ink)
    │           └── <div right pupil> (absolute, rounded-full bg-ink)
```

### 8.4 Eye-Tracking Mechanics

```
viewport center (cx, cy)
        │
        │  distance mapped to ±1.2%
        ▼
pupilOffset.x = (mouseX - cx) / cx * 1.2
pupilOffset.y = (mouseY - cy) / cy * 1.2
        │
        ▼
leftPupil.style.left  = `${47.75 + pupilOffset.x}%`
leftPupil.style.top   = `${49.33 + pupilOffset.y}%`
rightPupil.style.left = `${55.75 + pupilOffset.x}%`
rightPupil.style.top  = `${49.67 + pupilOffset.y}%`
```

CSS: `transition: left 0.08s ease-out, top 0.08s ease-out` — creates a smooth, slightly-lagging "following" effect.

Max pupil travel: ~4.8px on a 400px-wide SVG (1.2% × 400). This keeps pupils within the eye whites.

### 8.5 Speech Bubble & Personality System

**Cycling quotes (every 4s):**
```
"Hello, I'm Sylvester's robot!"
"Don't touch me."
"I'm watching you code..."
"Have you tried turning it off and on?"
"01001000 01101001"           ← "HI" in binary
"Debugging in progress..."
"I run on coffee and curiosity."
"A good engineer is a lazy engineer."
```

**Click escalation (5 levels):**
```
Click 1:  "Don't touch me."
Click 2:  "Stop that!"
Click 3:  "I'm telling Sylvester."
Click 4:  "Alright, downloading crypto miner..."
Click 5+: "Just kidding. Or am I?"
```

Each custom message auto-clears after 2.5s, then resumes the normal quote cycle.

**Visual style:**
- `bg-white border border-ink/20 rounded-lg shadow-sm`
- `font-mono text-[9px] md:text-[10px]` (JetBrains Mono)
- `whitespace-nowrap` (prevents line breaks)
- Fade up from `y:6` on entry, fade up to `y:-6` on exit (0.2s duration)

### 8.6 Responsive & Accessibility

| Concern | Handling |
|---|---|
| **Mobile (<768px)** | Visible at `w-36 h-27` (144×108px), positioned `bottom-3 right-3` |
| **Tablet (768px+)** | `w-48 h-36` (192×144px) |
| **Desktop (1024px+)** | `w-56 h-42` (224×168px) |
| **Touch devices** | No cursor tracking (`mousemove` doesn't fire on touch), pupils stay centered. `onTap` from motion handles taps. |
| **Reduced motion** | `window.matchMedia('(prefers-reduced-motion: reduce)').matches` — disables pupil tracking, speech bubble animation, hover/tap scale |
| **Admin dashboard** | Mascot not rendered |
| **High DPI** | SVG is vector, scales cleanly at any resolution |

### 8.7 File-by-File Details

**`src/assets/robot.svg`**
- Cleaned SVG (no white background)
- 43 path elements with fills: `#F0373B` (body reds), `#352237` (dark outlines), `#F8F9FA` (eye whites), `#E4494C` (lightning bolt), etc.
- ViewBox: `0 0 400 300`
- Transparent background — floats over any section

**`src/components/ui/AIRobot.tsx`**
- Imports SVG as URL: `import robotUrl from '../../assets/robot.svg'`
- Renders `<img>` in a relative container
- Two absolute-positioned pupil `<div>`s with `rounded-full bg-ink`
- Pupil positions driven by percentage props (`pupilOffsetX`, `pupilOffsetY`)
- Image is `pointer-events-none` (clicks fall through to the motion container)
- CSS `transition: left 0.08s ease-out, top 0.08s ease-out` on pupils

**`src/components/ui/InteractiveMascot.tsx`**
- State management for all interactive features
- `useRef` for initial render tracking (prevents clearing custom message on mount)
- `useCallback` for event handlers (prevents unnecessary re-subscriptions)
- All motion animations respect `isReducedMotion`
- Fixed positioning: `bottom-3 md:bottom-4 right-3 md:right-4`

### 8.8 The SVG Analysis & Cleanup

The raw SVG was auto-traced from a photo, producing complex path shapes. Key decisions:

| Decision | Rationale |
|---|---|
| **Removed white background** | Robot needs to float transparently over the portfolio sections |
| **Kept all 43 paths** | Preserves the exact traced appearance |
| **Overlaid new pupil dots** | Original SVG has no separable pupil elements — the eyes are complex path shapes. Adding new `div` elements is cleaner than trying to isolate existing eye paths. |
| **Percentage-based positioning** | Scales perfectly with any container size. Pupils move as percentages of the container, not absolute pixels. |
| **CSS transition on pupils** | Spring physics from `motion` would be smoother but adds complexity. Simple CSS transition performs well and follows cursor naturally. |

### 8.9 v2 & v3 Roadmap

**v2 (Next — Expand Personality):**
- [ ] `copy` event listener → "Copying text? Bold strategy. Let's see if it compiles."
- [ ] `scroll` position tracking → contextual quotes based on section ("They claim full-stack but spent an hour on a trailing comma" when near Skills)
- [ ] Idle animation after 10s without mouse movement → robot "falls asleep" (eyes close or dim)
- [ ] MP4 overlay on click → user's robot video plays for 3s as a "reaction"

**v3 (3D Figurine — Future):**
- [ ] Model robot in Three.js using `@react-three/fiber`
- [ ] Replace 2D SVG with 3D render
- [ ] 3D eye tracking — rotate eyeballs toward camera/cursor
- [ ] Idle breathing animation (slight hover oscillation)
- [ ] AI chat integration via `@google/genai` SDK

---

## 9. The Data Layer (localStorage CRUD)

### 9.1 Data Flow

```
data/index.tsx (static typed arrays)
        │
        ▼
utils/db.ts (localStorage CRUD layer)
  ├── initializeDatabase()  — seeds localStorage on first load
  │     └── Creates tables: hero, about, skills, experience, projects, hackathons, blogs
  │
  ├── Section components call db.getX() on mount
  │     └── Reads from localStorage → renders content
  │
  └── AdminDashboard calls db.updateX() at runtime
        └── Writes to localStorage → re-renders sections
```

### 9.2 All Data Tables

| Table | Type | Used By | Key Fields |
|---|---|---|---|
| `hero` | object | Hero.tsx | `quote: string`, `sequences: string[]` |
| `about` | object | About.tsx | `bio1, bio2, languages[], interests[], cgpa, projectsCount, yearsCount, hackathonsCount` |
| `skills` | array | Skills.tsx | `{ category: string, items: string[] }[]` |
| `experience` | array | Experience.tsx | `{ role, company, date, type, points[] }[]` |
| `projects` | object (categorized) | Projects.tsx | `{ category: string, items: ProjectItem[] }` |
| `hackathons` | array | Hackathons.tsx | Uses static HACKATHONS_DATA directly |
| `blogs` | array | Blog.tsx, BlogPortal, BlogPostReader | `{ id, date, title, excerpt, readTime, category, fullContent, codeSnippet?, posterMetrics? }[]` |
| `analytics` | array | (analytics logging) | Visit tracking, click events |

### 9.3 Admin Dashboard

Accessible at `#/admin` or `#/control-room`. Provides:
- Edit hero quote and role sequences
- Edit about bio, languages, interests
- Edit skills categories and items
- View and edit experience entries
- View and edit projects
- View and edit blog posts
- All changes persist in localStorage

---

## 10. Canvas Terminal Background

**File:** `AnimatedTerminalBg.tsx`

| Aspect | Detail |
|---|---|
| **Rendering** | `<canvas>` element, 2D context, single `requestAnimationFrame` loop |
| **Grid** | Characters placed at 56px intervals (`GRID_SIZE=56`), centered via offset calculations |
| **Characters** | 21 terminal symbols: `>`, `_`, `/`, `\`, `|`, `[`, `]`, `{`, `}`, `*`, `#`, `@`, `&`, `%`, `+`, `=`, `~`, `^`, `:`, `;`, `!` |
| **Float animation** | `floatY = Math.sin(time * 0.8 + phase) * 2` — ±2px vertical oscillation |
| **Breathing opacity** | `breathAlpha = 0.5 + 0.5 * sin(time * 0.6 + phase)` — ranges 0 to 1 |
| **Mouse interaction** | Cells within 100px of cursor: alpha increases, scale increases, color = `#C0392B` (accent) |
| **Responsiveness** | Recalculates grid on resize. DPR-aware: `canvas.width = width * devicePixelRatio` |
| **Accessibility** | Disabled on `prefers-reduced-motion: reduce` |
| **Mobile** | Disabled on screens < 768px |
| **Z-index** | `z-0` (behind all hero content) |

---

## 11. Performance & Responsiveness

### 11.1 Performance Decisions

| Decision | Why |
|---|---|
| **Canvas over DOM** for terminal bg | Eliminated 400+ DOM nodes and GSAP tweens — single draw loop |
| **useGSAP({ scope })** | Prevents animation leaks on re-render, scopes querySelector |
| **DPR-scaled canvas** | Sharp on Retina without overpainting |
| **Lenis + GSAP ticker sync** | Shared render loop prevents scroll jank |
| **No CSS-in-JS** | Tailwind is build-time, zero runtime cost |
| **CSS transitions for pupil tracking** | Simpler than `motion` spring for 60fps cursor following |
| **Prefer `useCallback` + `useRef`** | Minimizes effect re-subscriptions |

### 11.2 Responsive Breakpoints

| Breakpoint | Width | Changes |
|---|---|---|
| **Mobile** | < 768px | No custom cursor, no canvas terminal, hamburger nav, single-column layouts, robot at `w-36` |
| **Tablet** | 768px+ | Custom cursor enabled, 2-column layouts (About, Experience, Contact), robot at `w-48` |
| **Desktop** | 1024px+ | 3-column project grid, full parallax effects, robot at `w-56` |

Section layout changes by breakpoint:
- **About**: 1 col → 2 cols (`md:flex-row`)
- **Skills**: 1 col → 2 cols (`md:grid-cols-12`)
- **Experience**: 1 col → 2 cols (`md:flex-row`)
- **Projects**: 1 col → 2 col → 3 col (`md:grid-cols-2 lg:grid-cols-3`)
- **Contact**: 1 col → 2 cols (`md:flex-row`)

### 11.3 Edge Cases Handled

| Case | Handling |
|---|---|
| `prefers-reduced-motion: reduce` | Disables GSAP animations, canvas terminal, robot pupil tracking, speech bubble animation, hover/tap scale |
| `pointer: coarse` (touch) | Custom cursor hidden (`media query`), robot responds to taps via `onTap` |
| Admin dashboard | Mascot hidden, custom cursor shown, navbar hidden |
| Blog reader view | Mascot visible, navbar hidden |
| Empty data (loading) | About shows loading state, Experience returns null |
| Boot sequence cleanup | Timeouts cleared on unmount, `body.style.overflow` restored |
| Lenis stopped state | `overflow: hidden` during modal open (via Projects/Hackathons) |
| ScrollTrigger refresh | Run after hash route changes (100ms delay for layout shifts) |

---

## 12. Future AI Figurine / 3D Agent Development

### Current State

- `motion` (Framer Motion) and `@react-three/fiber` + `three` are already in `package.json`
- Robot mascot is currently 2D SVG-based
- All interactive state management is in `InteractiveMascot.tsx`

### Proposed Roadmap

**Phase A — 3D Robot Figurine (Three.js)**
- Model the robot using `@react-three/fiber` + `@react-three/drei`
- Add idle animation loop (hover oscillation, LED blink)
- Replace 2D SVG with 3D render in `InteractiveMascot.tsx`
- 3D eye tracking → rotate eyeball groups toward camera/cursor
- Use `drei` `useCursor` and `useGLTF` for model loading

**Phase B — AI Agent Integration**
- Connect figurine to LLM (Gemini via `@google/genai`)
- Make robot respond to user input (chat bubble input field)
- Context-aware responses based on which section user is viewing
- Personality: snarky, self-aware, fourth-wall-breaking

**Phase C — Autonomous Behavior**
- Robot notices user idle → triggers emote animation
- Reacts to page events (scroll speed, section changes, copy, click patterns)
- Learns preferences over time (localStorage-based memory)

### Architecture Notes for Agent Work

```
src/
  components/
    three/
      RobotFigurine.tsx    ← 3D model component (R3F)
      RobotScene.tsx       ← Canvas + lighting + controls
    ui/
      AIRobot.tsx          ← Current 2D SVG (coexists as fallback)
      InteractiveMascot.tsx ← State machine that toggles 2D/3D
  hooks/
    useRobotAI.ts          ← NEW: LLM integration hook
    useIdleDetector.ts     ← NEW: idle state detection
```

---

## Quick Start & Dev Commands

```bash
cd D:\PORTFOLIO

npm install          # Install all dependencies
npm run dev          # Vite dev server (port 3000)

# Or with custom port:
npx vite --port=3001 --host=0.0.0.0

npm run build        # Production build → dist/
npm run preview      # Preview production build
npm run lint         # TypeScript check: tsc --noEmit
npm run clean        # Clean dist/ and server.js
```

---

*Generated: June 2026 — Full knowledge library for Sylvester Jones portfolio.*
*Covers: Architecture → Audience journey → Scroll system → Robot mascot build → Data layer → Future 3D agent development.*
*Next focus: AI figurine / 3D agent integration (Phase A of roadmap).*
