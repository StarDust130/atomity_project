"use client";

import { motion, type Variants } from "framer-motion";
import type { CloudMetric } from "../hooks/useCloudData";
import { AnimatedCounter } from "./AnimatedCounter";
import { Server } from "lucide-react";

const formatCur = (val: number) =>
  `$${val.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

export function MetricTable({ data }: { data: CloudMetric[] }) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const rowVariants: Variants = {
    hidden: { opacity: 0, y: 25, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 60, damping: 14, mass: 0.8 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full text-sm @container mt-4 flex flex-col relative z-20"
    >
      <div className="relative overflow-x-auto pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth custom-scrollbar">
        <div className="min-w-[800px] lg:min-w-full">
          {/* Header Row */}
          <div className="grid grid-cols-[140px_repeat(7,1fr)] sm:grid-cols-[180px_repeat(7,1fr)] gap-4 mb-2 pb-3 border-b border-(--border-subtle) font-semibold text-(--text-muted) px-2 sm:px-5 tracking-wide text-[11px] sm:text-xs uppercase shrink-0">
            <div>Resource</div>
            <div className="text-right">CPU</div>
            <div className="text-right">RAM</div>
            <div className="text-right">Storage</div>
            <div className="text-right">Network</div>
            <div className="text-right">GPU</div>
            <div className="text-center">Efficiency</div>
            <div className="text-right">Total</div>
          </div>

          {/* Data Rows */}
          <div className="flex flex-col gap-2.5 sm:gap-3">
            {data.map((metric) => (
              <motion.div
                key={metric.id}
                variants={rowVariants}
                whileHover={{ y: -2, scale: 1.005 }}
                className="group grid grid-cols-[140px_repeat(7,1fr)] sm:grid-cols-[180px_repeat(7,1fr)] gap-4 py-3 sm:py-4 items-center px-3 sm:px-5 cursor-pointer transition-all duration-300 rounded-[16px] bg-white/60 backdrop-blur-sm hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/80 hover:border-white shadow-[0_2px_10px_rgb(0,0,0,0.02)]"
              >
                <div className="font-bold flex items-center gap-2.5 sm:gap-4 text-gray-800 whitespace-nowrap leading-tight text-ellipsis overflow-hidden">
                  <div className="w-1.5 sm:w-2 h-8 bg-gray-200/80 group-hover:bg-(--brand-base) rounded-full shrink-0 transition-all duration-500 shadow-inner" />
                  <div className="bg-gray-100/80 p-2 rounded-xl group-hover:bg-green-50 group-hover:text-(--brand-base) transition-colors duration-300 text-gray-400">
                    <Server className="w-4 h-4 shrink-0 transition-colors" />
                  </div>
                  <span className="min-w-0 truncate font-extrabold text-[13px] sm:text-[15px]">
                    {metric.name}
                  </span>
                </div>
                <div className="text-right text-gray-500 tabular-nums font-semibold tracking-tight">
                  {formatCur(metric.cpu)}
                </div>
                <div className="text-right text-gray-500 tabular-nums font-semibold tracking-tight">
                  {formatCur(metric.ram)}
                </div>
                <div className="text-right text-gray-500 tabular-nums font-semibold tracking-tight">
                  {formatCur(metric.storage)}
                </div>
                <div className="text-right text-gray-500 tabular-nums font-semibold tracking-tight">
                  {formatCur(metric.network)}
                </div>
                <div className="text-right text-gray-500 tabular-nums font-semibold tracking-tight">
                  {formatCur(metric.gpu)}
                </div>
                <div className="flex justify-center">
                  <span
                    className={`px-3 py-1.5 text-[11px] sm:text-xs rounded-xl font-bold tracking-wider shadow-sm border uppercase ${
                      metric.efficiency < 20
                        ? "bg-red-50/80 text-red-600 border-red-100/50"
                        : metric.efficiency < 40
                          ? "bg-orange-50/80 text-orange-600 border-orange-100/50"
                          : "bg-green-50/80 text-green-700 border-green-200/50"
                    }`}
                  >
                    {Math.round(metric.efficiency)}%
                  </span>
                </div>
                <div className="text-right font-black text-gray-900 text-sm sm:text-base bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 group-hover:from-(--brand-dark) group-hover:to-(--brand-base) transition-colors duration-300">
                  <AnimatedCounter value={metric.total} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
