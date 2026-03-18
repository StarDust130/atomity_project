"use client";

import { motion } from "framer-motion";
import type { CloudMetric } from "../hooks/useCloudData";

export function MetricChart({
  data,
  onSelect,
}: {
  data: CloudMetric[];
  onSelect: (m: CloudMetric) => void;
}) {
  const maxTotal = Math.max(...data.map((d) => d.total));

  return (
    <div className="relative w-full h-64 mt-8 mb-12 flex items-end justify-center px-2 sm:px-8 chart-container">
      <div className="absolute inset-0 flex flex-col justify-between z-0 pointer-events-none pb-8 pt-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-full border-b border-dashed border-[var(--border-subtle)] opacity-60"
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 flex items-end justify-center gap-4 sm:gap-12 w-full h-full"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      >
        {data.map((metric) => {
          const heightPercent = (metric.total / maxTotal) * 100;
          return (
            <div
              key={metric.id}
              onClick={() => onSelect(metric)}
              className="chart-bar relative flex flex-col items-center gap-3 w-16 sm:w-24 cursor-pointer"
            >
              <div className="h-48 w-full flex items-end justify-center">
                <motion.div
                  variants={{
                    hidden: { height: "0%" },
                    show: { height: `${heightPercent}%` },
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 14 }}
                  whileHover={{
                    scaleY: 1.03,
                    backgroundColor: "var(--brand-base)",
                    boxShadow: "0 0 20px var(--brand-glow)",
                  }}
                  className="w-full bg-[var(--brand-light)] rounded-t-xl origin-bottom transition-all duration-300"
                />
              </div>
              <span className="text-xs sm:text-sm font-bold text-[var(--text-primary)] text-center">
                {/* Responsive name splitting */}
                <span className="hidden sm:inline">{metric.name}</span>
                <span className="sm:hidden">
                  {metric.name.split(" ").pop()}
                </span>
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
