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
    <div className="relative w-full h-[220px] sm:h-[300px] mt-8 mb-12 flex items-end justify-center px-0 sm:px-12 chart-container">
      {/* Background Lines */}
      <div className="absolute inset-0 flex flex-col justify-between z-0 pointer-events-none pb-[40px] pt-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-full border-b border-dashed border-gray-200/60 opacity-60 translate-y-[1px]"
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 flex items-end justify-between sm:justify-center w-full h-full pb-10 gap-2 sm:gap-16 max-w-2xl mx-auto"
        initial="hidden"
        animate="show"
        variants={{
          show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
        }}
      >
        {data.map((metric) => {
          const heightPercent =
            maxTotal > 0 ? (metric.total / maxTotal) * 100 : 0;
          return (
            <div
              key={metric.id}
              onClick={() => onSelect(metric)}
              className="chart-bar group relative flex flex-col items-center justify-end h-full w-full max-w-[48px] sm:max-w-none sm:w-28 md:w-32 cursor-pointer"
            >
              {/* Tooltip on hover */}
              <motion.div className="absolute -top-16 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none bg-white/90 backdrop-blur-xl border border-white/50 text-gray-800 text-xs py-2 px-3 sm:px-4 rounded-2xl font-medium whitespace-nowrap shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-20 flex flex-col items-center gap-0.5 scale-90 group-hover:scale-100 origin-bottom">
                <span className="text-[10px] sm:text-[11px] text-gray-500 tracking-wider uppercase font-semibold">
                  {metric.name}
                </span>
                <span className="text-sm border-t border-gray-100 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-(--brand-dark) to-(--brand-base) mt-0.5 pt-0.5">
                  ${metric.total.toLocaleString()}
                </span>
              </motion.div>

              <div className="w-full flex items-end justify-center h-full relative">
                {/* Optional glow effect behind bar */}
                <div
                  className="absolute bottom-0 w-full bg-(--brand-base) blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-t-2xl z-0"
                  style={{ height: `${heightPercent}%` }}
                />

                <motion.div
                  variants={{
                    hidden: { height: "0%", opacity: 0 },
                    show: { height: `${heightPercent}%`, opacity: 1 },
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 50,
                    damping: 10,
                    mass: 0.9,
                  }}
                  whileHover={{
                    scaleY: 1.03,
                    scaleX: 1.05,
                  }}
                  className="w-full relative z-10 bg-gradient-to-t rounded-t-2xl origin-bottom transition-all duration-400 shadow-sm
                  from-(--brand-dark) via-(--brand-base) to-[#34d399] 
                  hover:from-(--brand-base) hover:via-[#34d399] hover:to-[#6ee7b7] 
                  border border-white/20
                  group-hover:shadow-[0_0_25px_var(--brand-glow)]"
                />
              </div>

              {/* Labels bottom */}
              <span className="absolute -bottom-8 w-max text-[11px] sm:text-sm font-bold tracking-wide text-(--text-muted) group-hover:text-gray-900 transition-colors">
                <span className="hidden sm:inline">{metric.name}</span>
                <span className="sm:hidden">
                  {metric.name.length > 6
                    ? metric.name.split(" ").slice(-1)[0]
                    : metric.name}
                </span>
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
