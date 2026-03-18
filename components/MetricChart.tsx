"use client";

import { motion } from "framer-motion";
import type { CloudMetric } from "../hooks/useCloudData";

export function MetricChart({ data }: { data: CloudMetric[] }) {
  const maxTotal = Math.max(...data.map((d) => d.total));

  return (
    <div className="relative w-full h-64 mt-8 mb-10 flex items-end justify-between px-6">
      {/* Structural Dashed Grid */}
      <div className="absolute inset-0 flex flex-col justify-between z-0 pointer-events-none pb-8 pt-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-full border-b border-dashed border-[var(--border-subtle)]"
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 flex items-end justify-around w-full h-full"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
      >
        {data.map((metric) => {
          const heightPercent = (metric.total / maxTotal) * 100;
          return (
            <div
              key={metric.id}
              className="relative flex flex-col items-center gap-3 w-16 md:w-20 group cursor-pointer"
            >
              <div className="h-48 w-full flex items-end justify-center">
                <motion.div
                  variants={{
                    hidden: { height: "0%", opacity: 0 },
                    show: { height: `${heightPercent}%`, opacity: 1 },
                  }}
                  transition={{ type: "spring", stiffness: 90, damping: 14 }}
                  whileHover={{
                    scaleY: 1.02,
                    backgroundColor: "var(--brand-base)",
                  }}
                  className="w-full bg-[var(--brand-light)] rounded-t-xl origin-bottom transition-colors duration-200"
                />
              </div>
              <span className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-dark)] transition-colors">
                {metric.name.split(" ")[1]}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
