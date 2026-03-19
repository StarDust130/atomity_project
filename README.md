# Ì∫Ä Atomity Frontend Challenge - My Submission

## Ì±ã Hello and Welcome!

Thank you for reviewing my work! This is my submission for the **Atomity Frontend Engineering Challenge**. I chose **Option A** (the dynamic cluster cost visualization) to build a beautiful, high-performance cloud dashboard. 

My main goal was to make this look, feel, and run like a **premium, top-tier SaaS product**. Ì≤é

---

## Ìª†Ô∏è My Approach: How I Built It

I wanted to make my code super clean and my UI incredibly smooth. Here is exactly what I did in simple words:

### 1. ‚ö° Smart Data Fetching (SWR)
To make this real, I built a custom **Next.js Backend API Route** (`/api/costs`) instead of just hiding fake data in the UI components. 
To get this data to the screen, I used a library called **SWR**:
* **Why SWR?** It is a highly intelligent "memory cache". When you click through the dashboard, SWR remembers the data you already loaded. This means zero extra network requests and **instant, lightning-fast clicks!** ÌøéÔ∏è

### 2. Ìæ® Premium Glass Design (Tailwind CSS)
I designed a sleek, modern "Glassmorphism" look using **Tailwind CSS**. 
Instead of typing messy color codes everywhere, I set up professional **Design Tokens** (like `--brand-base`) inside my `globals.css` file.
* **Why?** It keeps my code organized. If the team ever wants to add a "Dark Mode", I only have to change the colors in one single file and the entire app updates instantly! Ìºó

### 3. Ì≥± Flawless Mobile Experience 
Dashboards usually look terrible on cell phones because tables get squished. I made sure this app is **100% Mobile Responsive**. 
I built a smooth horizontal swipe system for the data table. Now, no matter how small your phone screen is, the numbers look crisp, clear, and perfectly spaced! Ì≥±Ì±à

### 4. Ìæ¨ Beautiful Animations (Framer Motion)
A high-end app should never look jittery or choppy. I used **Framer Motion** with custom **Spring Physics** (giving elements real-world bounce and weight).
* When you click a bar chart, the old data softly fades out, and the detailed nested data seamlessly animates right into place! ‚ú®
* Hover over the bar charts to see the custom dark-mode hover tooltips!

### 5. Ì≤° Helpful Smart Tooltips & Navigation
I added interactive **Dark CSS Tooltips** across the top navigation breadcrumbs. Whenever you get lost in the nested folders, simply hover over the breadcrumbs and a beautiful dark label perfectly pops up to say exactly where you will go back to! Ì∑≠

---

## Ì≤ª Technical Stack Overview

* **Framework:** Next.js 15 (App Router) + React 19 ‚öõÔ∏è
* **Styling:** Tailwind CSS v4 Ìæ®
* **Animations:** Framer Motion Ìæ¨
* **Data Fetcher:** SWR Ì¥Ñ
* **Language:** TypeScript Ì∂∫ (To keep my code perfectly safe from bugs)
* **Icons:** Lucide React Ì∂ºÔ∏è

---

## Ì¥î Tradeoffs & Honest Thoughts

If I had a large database with thousands of servers, I would not fetch the entire cluster folder at once. I would set up "lazy-loading" so it only downloads the specific folder you clicked on. 
However, for this challenge, the file size was small enough that fetching it all instantly upfront gave the best user experience! ‚è±Ô∏è

---

## ÌøÉ‚Äç‚ôÇÔ∏è How to Run It on Your Machine

1. Clone this repository to your computer.
2. Open your terminal and install the tools:
   ```bash
   npm install
   ```
3. Start the local server! Ì∫Ä
   ```bash
   npm run dev
   ```
4. Open your web browser and go to: [http://localhost:3000](http://localhost:3000)

---

Thank you so much for the opportunity! I poured a lot of love into every small pixel, animation transition, and line of code. I hope you enjoy interacting with it just as much as I enjoyed building it! Ìæâ Ìπá‚Äç‚ôÇÔ∏è
