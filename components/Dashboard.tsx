"use client";

import { useState } from "react";
import { useCloudData, type CloudMetric } from "../hooks/useCloudData";
import { MetricChart } from "./MetricChart";
import { MetricTable } from "./MetricTable";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const { data, isLoading, isError } = useCloudData();
  const [selectedParent, setSelectedParent] = useState<CloudMetric | null>(
    null,
  );

  if (isLoading)
    return (
      <div className="max-w-5xl mx-auto h-[600px] bg-white rounded-[var(--radius-card)] shadow-sm animate-pulse flex items-center justify-center">
        Loading telemetry...
      </div>
    );
  if (isError || !data) return <div>Data Error</div>;

  // Determine which level of data to show
  const currentViewData = selectedParent ? selectedParent.children || [] : data;

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[var(--surface-main)] w-full max-w-5xl mx-auto rounded-[var(--radius-card)] p-6 sm:p-10 shadow-[var(--shadow-premium)] border-2 border-[var(--border-subtle)] overflow-hidden"
    >
      <header className="flex flex-row items-start sm:items-center gap-4 mb-8">
        <button className="px-4 py-2 bg-white border border-[var(--border-subtle)] rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors">
          Last 30 Days
        </button>

        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 bg-[var(--brand-light)] text-[var(--brand-dark)] font-bold rounded-lg px-2 py-1">
          <button
            onClick={() => setSelectedParent(null)}
            className={`px-3 py-1 rounded-md transition-colors ${selectedParent ? "hover:bg-[var(--brand-base)] hover:text-white" : ""}`}
          >
            Clusters
          </button>

          <AnimatePresence>
            {selectedParent && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, width: 0 }}
                className="flex items-center gap-2 overflow-hidden"
              >
                <span className="text-[var(--brand-dark)] opacity-50">/</span>
                <span className="px-3 py-1">
                  Namespaces ({selectedParent.name.split(" ")[1]})
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Force re-mount of components when data level changes for fresh animations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedParent ? selectedParent.id : "root"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <MetricChart
            data={currentViewData}
            onSelect={(metric) => {
              if (!selectedParent && metric.children) setSelectedParent(metric);
            }}
          />
          <MetricTable data={currentViewData} />
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}
