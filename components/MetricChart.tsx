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
    <div className="relative w-full h-[220px] sm:h-[260px] mt-6 mb-10 flex items-end justify-center px-4 sm:px-12 chart-container">
      {/* Background Lines */}
      <div className="absolute inset-0 flex flex-col justify-between z-0 pointer-events-none pb-[30px] pt-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-full border-b border-dashed border-(--border-subtle) opacity-40 translate-y-[1px]"
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 flex items-end justify-center w-full h-full pb-8 gap-3 sm:gap-14"
        initial="hidden"
        animate="show"
        variants={{
          show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
        }}
      >
        {data.map((metric) => {
          const heightPercent =
            maxTotal > 0 ? (metric.total / maxTotal) * 100 : 0;
          return (
            <div
              key={metric.id}
              onClick={() => onSelect(metric)}
              className="chart-bar group relative flex flex-col items-center justify-end h-full w-10 sm:w-24 md:w-28 cursor-pointer"
            >
              {/* Tooltip on hover */}
              <motion.div className="absolute -top-14 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none bg-gray-900 text-white text-xs py-2 px-3 rounded-xl font-medium whitespace-nowrap shadow-xl z-20 flex flex-col items-center gap-0.5 scale-95 group-hover:scale-100 origin-bottom">
                <span className="text-[11px] text-gray-300 tracking-wide uppercase">
                  View {metric.name}
                </span>
                <span className="font-bold text-green-300">
                  ${metric.total.toLocaleString()}
                </span>
                {/* little triangle pointer */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
              </motion.div>

              <div className="w-full flex items-end justify-center h-full">
                <motion.div
                  variants={{
                    hidden: { height: "0%", opacity: 0 },
                    show: { height: `${heightPercent}%`, opacity: 1 },
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 60,
                    damping: 12,
                    mass: 0.8,
                  }}
                  whileHover={{
                    scaleY: 1.02,
                    scaleX: 1.05,
                  }}
                  className="w-full bg-gradient-to-t rounded-t-xl origin-bottom transition-all duration-300 shadow-sm
                  from-(--brand-dark) to-(--brand-base) hover:from-(--brand-base) hover:to-[#4ade80] hover:shadow-[0_0_24px_var(--brand-glow)]"
                />
              </div>

              {/* Labels bottom */}
              <span className="absolute -bottom-7 w-max text-[11px] sm:text-sm font-semibold tracking-wide text-(--text-muted) group-hover:text-gray-900 transition-colors">
                <span className="hidden sm:inline">{metric.name}</span>
                <span className="sm:hidden">
                  {metric.name.split(" ").slice(-1)[0]}
                </span>
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
