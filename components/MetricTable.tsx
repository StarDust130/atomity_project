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
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 12 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full text-sm @container mt-2 flex flex-col"
    >
      {/* Header Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-8 gap-4 mb-2 pb-3 border-b border-(--border-subtle) font-semibold text-(--text-muted) px-2 sm:px-4 tracking-wide text-xs uppercase shrink-0">
        <div>Resource</div>
        <div className="text-right hidden md:block">CPU</div>
        <div className="text-right hidden md:block">RAM</div>
        <div className="text-right hidden lg:block">Storage</div>
        <div className="text-right hidden lg:block">Network</div>
        <div className="text-right hidden lg:block">GPU</div>
        <div className="text-center hidden md:block">Efficiency</div>
        <div className="text-right">Total</div>
      </div>

      {/* Data Rows */}
      <div className="flex flex-col gap-1.5 pb-4">
        {data.map((metric) => (
          <motion.div
            key={metric.id}
            variants={rowVariants}
            whileHover={{ y: -2, scale: 1.005 }}
            className="group grid grid-cols-2 md:grid-cols-5 lg:grid-cols-8 gap-4 py-3 sm:py-4 items-center px-3 sm:px-4 cursor-pointer transition-all duration-300 rounded-xl hover:bg-white hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] border border-transparent hover:border-(--border-subtle)"
          >
            <div className="font-bold flex items-center gap-2.5 sm:gap-3 text-gray-800 break-all whitespace-normal leading-tight">
              <div className="w-1.5 sm:w-2 h-6 bg-gray-200 group-hover:bg-(--brand-base) rounded-full shrink-0 transition-colors duration-400" />
              <Server className="w-4 h-4 text-gray-400 group-hover:text-(--brand-base) shrink-0 transition-colors" />
              <span className="min-w-0 break-words">{metric.name}</span>
            </div>
            <div className="text-right text-(--text-muted) tabular-nums font-medium hidden md:block">
              {formatCur(metric.cpu)}
            </div>
            <div className="text-right text-(--text-muted) tabular-nums font-medium hidden md:block">
              {formatCur(metric.ram)}
            </div>
            <div className="text-right text-(--text-muted) tabular-nums font-medium hidden lg:block">
              {formatCur(metric.storage)}
            </div>
            <div className="text-right text-(--text-muted) tabular-nums font-medium hidden lg:block">
              {formatCur(metric.network)}
            </div>
            <div className="text-right text-(--text-muted) tabular-nums font-medium hidden lg:block">
              {formatCur(metric.gpu)}
            </div>
            <div className="flex justify-center hidden md:flex">
              <span
                className={`px-2.5 py-1 text-xs rounded-lg font-bold tracking-tight ${
                  metric.efficiency < 20
                    ? "bg-red-50 text-red-600"
                    : metric.efficiency < 40
                      ? "bg-orange-50 text-orange-600"
                      : "bg-green-50 text-green-700"
                }`}
              >
                {Math.round(metric.efficiency)}%
              </span>
            </div>
            <div className="text-right font-bold text-gray-900 text-sm sm:text-[15px]">
              <AnimatedCounter value={metric.total} />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
