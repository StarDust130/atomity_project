# Atomity Frontend Challenge - Cloud Cost Dashboard

## Overview
This repository contains my submission for the Atomity Frontend Engineering Challenge. I selected **Option A** (hierarchical cluster cost visualization) because it provides the best canvas to demonstrate state management, data mapping, and physical layout animations.

## Architecture & Technical Decisions

1. **Component Structure**: Separated into `Dashboard.tsx` (orchestrator), `MetricChart.tsx` (visuals), and `MetricTable.tsx` (data grid). This ensures components are reusable and maintain the single-responsibility principle.
2. **Animation Approach**: Used `framer-motion`. I specifically utilized `spring` physics instead of linear easings for the bar charts to mimic the natural, snappy feel of modern SaaS dashboards. Table rows stagger in to establish visual hierarchy on load.
3. **Data Fetching & Caching**: Implemented `SWR` pointing to a custom Next.js API route. 
   - *Why SWR?* The brief explicitly warned against redundant network requests. SWR provides built-in deduplication, revalidation controls, and handles the loading state natively.
4. **Design Tokens**: Defined core variables in `globals.css`. Components reference `var(--color-brand-light)` rather than hardcoded hex values, ensuring the UI is scalable and ready for a theme provider if needed in the future.
5. **Modern CSS**: Utilized CSS Grid for the data table to ensure column alignment without complex HTML table markup.

## Running Locally
```bash
npm install
npm run dev