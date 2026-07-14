# Sylvester Jones | Developer Portfolio

A high-performance, responsive developer portfolio showcasing projects, experience, and core focus areas. Built with a modern, high-contrast brutalist design system featuring premium micro-interactions, hardware-accelerated animations, and an interactive canvas radar tracking system.

---

## 🚀 Key Features

* **High-Contrast Brutalist Aesthetic:** Clean typography (Space Grotesk & JetBrains Mono), vibrant crimson accents, and sharp grid borders.
* **04 — My Radar:** An interactive HTML5 Canvas neural network sweep displaying core capabilities: Data Science, AI Solutions, Fast Development, Data Infrastructure, and Agentic RAG. Tapping/clicking nodes opens dedicated detail dialog cards.
* **03 — Timeline:** A vertical timeline showcasing roles at Maans AI and Geek Theory, optimized with punchy bullet points to minimize mobile scrolling.
* **Mobile-Optimized Experience:** Automatic smooth-scrolling bypass for touch viewports, cursor disablement on mobile screens, and flex-order sorting to showcase visual style first.
* **Contact Transmission System:** A secure contact portal equipped with fallback mailto protocols and beautiful fixed brutalist feedback toasts.
* **Client-Side Exception Router:** Dedicated custom brutalist 404 (SYSTEM EXCEPTION) page handling invalid URL routing.

---

## 🛠️ Tech Stack

* **Frontend Framework:** React 19, TypeScript
* **Styling System:** Vanilla CSS / Tailwind CSS v4
* **Animation Library:** GSAP (GreenSock Animation Platform) + `@gsap/react`
* **Scroll Physics:** Lenis Smooth Scroll
* **Backend Database Integration:** Supabase Client API

---

## 💻 Local Workstation Setup

### Prerequisites
* [Node.js](https://nodejs.org) (v18+ recommended)
* npm (v9+)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/sylvernjones557/portfolio_jones.git
   cd portfolio_jones
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_public_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Vercel Deployment

This project is structured for zero-configuration deployment on **Vercel**:
1. Connect Vercel to your GitHub account.
2. Import the `portfolio_jones` repository.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as Environment Variables in the project configuration.
4. Click **Deploy**. Vercel will automatically compile and host the static application.
