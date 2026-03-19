# 🚀 Atomity Frontend Challenge - My Submission

**Live Demo:** [https://atomity-project-weld.vercel.app/](https://atomity-project-weld.vercel.app/)

## 👋 Hello and Welcome!

Thank you for reviewing my work! This is my submission for the **Atomity Frontend Engineering Challenge**, focusing on the dynamic cluster cost visualization (Option A) to build a beautiful, high-performance cloud dashboard. My goal was to craft a UI that feels like a **premium, top-tier SaaS product**. ✨

---

## 🏗️ Architecture & Approach

### 1. ⚡ Smart Data Fetching (SWR)

I built a custom **Next.js Backend API Route** (`/api/costs`) and fetched data using **SWR**.

- **Why?** It provides local caching, deduplication, and zero extra network requests when navigating back and forth, resulting in **lightning-fast UI updates**. ⚡

### 2. 🎨 Premium Glass Design & Layout (Tailwind CSS)

I implemented a sleek "Glassmorphism" UI using **Tailwind CSS v4**.

- I utilized **Design Tokens** (e.g., `--brand-base`) for scalable theming and consistency. The layout is constrained perfectly to prevent overflow and squishing on mobile devices. 🎨

### 3. 📱 Flawless Mobile Experience

Dashboards often break on mobile. I built a layout that strictly respects viewport bounds:

- Adaptive breadcrumbs, seamless horizontal scroll for tables, and strict flex-wrap constraints ensure it looks crisp and professional on any device screen. 📱

### 4. ✨ Fluid Animations (Framer Motion)

Used **Framer Motion** with `popLayout` and custom spring physics.

- **Why?** Seamless layout transitions. When navigating the hierarchy, old data gracefully exits while new data animates in without layout jumps. ✨

---

## 🛠️ Technical Stack

- **Framework:** Next.js 15 (App Router) + React 19 ⚛️
- **Styling:** Tailwind CSS v4 🎨
- **Animations:** Framer Motion 💫
- **Data Fetcher:** SWR 🔄
- **Language:** TypeScript 📘
- **Icons:** Lucide React 🖼️

---

## ⚖️ Key Decisions & Tradeoffs

- **Data Loading Strategy:** For this scope, loading the full hierarchy upfront provides the most instant, satisfying user experience. In a production environment with thousands of nodes, I would transition to **lazy-loading** nested nodes on demand to optimize bandwidth.
- **State Management:** Avoided heavy global state (like Redux). SWR acting as a server-state cache combined with local component state (for navigation depth) keeps the architecture much simpler and more maintainable.

---

## 🏃‍♂️ How to Run Locally

1. Clone this repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

Thank you for the opportunity! I poured a lot of care into the UX, animations, and clean code. Hope you enjoy interacting with it! 🚀
