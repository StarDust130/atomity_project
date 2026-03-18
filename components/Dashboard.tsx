"use client";

import { useCloudData } from "../hooks/useCloudData";
import { MetricChart } from "./MetricChart";
import { MetricTable } from "./MetricTable";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { data, isLoading, isError } = useCloudData();

  if (isLoading)
    return (
      <div className="w-full max-w-5xl mx-auto h-[600px] bg-[var(--surface-main)] rounded-2xl shadow-[var(--shadow-premium)] flex items-center justify-center border border-[var(--border-subtle)] animate-pulse">
        <p className="text-[var(--text-muted)] font-medium text-lg">
          Loading telemetry...
        </p>
      </div>
    );

  if (isError || !data)
    return (
      <div className="text-red-500 text-center font-bold">
        Failed to load API data.
      </div>
    );

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[var(--surface-main)] w-full max-w-5xl mx-auto rounded-3xl p-8 shadow-[var(--shadow-premium)] border border-[var(--border-subtle)]"
    >
      <header className="flex items-center gap-4 mb-8 border-b border-[var(--border-subtle)] pb-6">
        <button className="px-4 py-2 bg-white border border-[var(--border-subtle)] rounded-lg font-medium text-sm text-[var(--text-primary)] hover:bg-gray-50 transition-colors shadow-sm">
          Last 30 Days
        </button>

        <div className="relative group">
          <button className="px-4 py-2 bg-[var(--brand-light)] text-[var(--brand-dark)] font-bold rounded-lg text-sm transition-colors hover:bg-[var(--brand-base)] hover:text-white">
            Cluster View
          </button>
        </div>
      </header>

      <MetricChart data={data} />
      <MetricTable data={data} />
    </motion.section>
  );
}
