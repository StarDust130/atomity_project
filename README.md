# 🚀 Atomity Frontend Engineering Challenge

## 👋 Overview

Greetings! This repository contains my submission for the **Atomity Frontend Engineering Challenge**. I selected **Option A** (the dynamic hierarchical cluster cost visualization from 0:30–0:40 in the video) because it provides an incredible canvas to demonstrate state management, data mapping, caching, and super-smooth fluid animations!

I've taken the base concept and elevated it to a **100x premium SaaS dashboard** standard. 💎

![Screenshot](public/screenshot.png) (Imagine a gorgeous screenshot here!)

---

## 🛠️ Technical Stack & Tools Used

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router) + React 19 ⚛️
- **Language**: TypeScript 🦺 (Strict typing on all data interfaces)
- **Styling**: Tailwind CSS v4 🎨 (Extensively utilizing arbitrary variants, logical properties, and container queries)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) 🎬 (Extensive Spring physics and stagger effects)
- **Data Fetching & Caching**: [SWR](https://swr.vercel.app/) 🔄 (Handling deduplication, loading states natively)
- **Icons**: Lucide React 🖼️

---

## 🧠 Approach & Key Decisions

### 1. 🎨 Design Token Architecture

All core thematic variables (`--brand-base`, `--surface-main`, `--radius-card`, shadows, etc.) were defined purely in `globals.css` and applied globally via Tailwind CSS root injects.

- **Why?** It ensures no scattered hex values `(#10B981)` sit in random components! The design system stays highly organized, composable, and ready for easy "Dark Mode" extension in the future. 🌗

### 2. 🗄️ Data Fetching & Caching

As per requirements to fetch from a public API, I created a real custom Next.js REST API route (`/api/costs`) that successfully mocks database latency using Promises!

- I utilized **SWR (Stale-While-Revalidate)** to consume this hook `useCloudData()`.
- **Why SWR?** It guarantees 1-time fetching logic. If you navigate through the components or tabs, SWR automatically dedups the requests pulling straight from its memory cache—resulting in instant UI renders and completely eliminating redundant network calls! ⚡

### 3. 🎬 Animation Craftsmanship

The animations rely heavily on **Framer Motion `spring` physics**, specifically engineered to mimic the tactile feel of physical interaction (no generic `ease-in-out` here).

- **Charts**: The `<MetricChart />` bars grow vertically relative to max values utilizing a staggered delayed entrance. Hovering them invokes a smooth 3D-like scale & brightness filter. ✨
- **Drill-down Hierarchy**: Used `<AnimatePresence mode="wait">`. Navigating down levels (from Cluster -> Namespace -> Pod) elegantly animates the old table away and springs the new level data in without any abrupt layout jumping! 🏎️

### 4. 📱 Responsive Layout & Modern CSS

The architecture was built Mobile-First!

- I utilized modern explicit CSS features like `backdrop-blur` for glassmorphism and specialized custom scrollbars.
- Using custom Tailwind Grids `grid-cols-[140px_repeat(7,1fr)]` wrapped in a gracefully scrollable X-axis, the Mobile View correctly sustains the complex table structure without ever mangling or wrapping the nested text awkwardly! 📐

### 5. 💡 Clean UX Enhancements

Added interactive tooltips natively rendered through CSS groups (`group-hover`). Nailing those small details like "Click to go back" ensures users aren't left guessing what happens next. Breadcrumbs scale mathematically when nested, optimizing upper space organically.

---

## 🤔 Tradeoffs & Constraints

- **API Scale Structure:** In a true massive environment (like AWS metrics), sending the whole nested tree structure in one payload is bad for payload size.
  - _Tradeoff made:_ I simulated the entire deep tree loading immediately because our JSON tree is small, saving multi-step `loading...` skeletons. In real production, I would execute progressive lazy-loading to fetch children purely on node `onClick`!
- **Component File Over-Abstraction:** The chart math/rendering was extracted to `MetricChart.tsx` and the list rendering to `MetricTable.tsx`. I could have abstracted rows & bars further into `ChartBar.tsx` and `TableRow.tsx`. I kept them in-file to balance separation of concerns and file-hopping overhead given the 6-8 hour time limit! ⏱️

---

## 🔮 Future Improvements (With More Time)

1. 🌗 **Dark Mode Toggle**: The tokens are 90% ready for it! Setting up a custom `next-themes` provider to dynamically mutate the CSS variables would finalize the aesthetic beautifully.
2. ⌨️ **Extensive Accessibility (A11y)**: Enhancing ARIA labels specifically on the interactive SVG charts and allowing physical "Tab + Enter" drill-downs via keyboard handlers. Respecting `@media (prefers-reduced-motion)` in Framer Motion configurations!
3. 📉 **Visual Graph Swap**: Allowing the user to toggle between `Bar Charts` and a `TreeMap` representation of their clusters!

---

## 💻 Running the App Locally

To spin up the project on your machine, simply run:

```bash
# ⬇️ Install dependencies
npm install

# 🚀 Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the smooth transitions. 🥳

Thank you for reviewing my submission. Quality engineering is in the details, and I really enjoyed focusing on them here. 🙇‍♂️
