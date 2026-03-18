"use client";

import { motion } from "framer-motion";
import type { CloudMetric } from "../hooks/useCloudData";
import { AnimatedCounter } from "./AnimatedCounter";

const formatCur = (val: number) =>
  `$${val.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

export function MetricTable({ data }: { data: CloudMetric[] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 120 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full text-sm @container"
    >
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4 pb-3 border-b-2 border-[var(--border-subtle)] font-bold text-[var(--text-primary)] px-2">
        <div>Resource</div>
        <div className="text-right">CPU</div>
        <div className="text-right hidden md:block">RAM</div>
        <div className="text-right hidden lg:block">Storage</div>
        <div className="text-right hidden lg:block">Network</div>
        <div className="text-right hidden lg:block">GPU</div>
        <div className="text-center hidden md:block">Efficiency</div>
        <div className="text-right">Total</div>
      </div>

      {data.map((metric) => (
        <motion.div
          key={metric.id}
          variants={rowVariants}
          whileHover={{ backgroundColor: "var(--bg-base)", x: 4 }}
          className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4 py-4 border-b border-[var(--border-subtle)] items-center px-2 cursor-pointer transition-all"
        >
          <div className="font-bold flex items-center gap-2">
            <div className="w-1.5 h-4 bg-transparent rounded-sm transition-colors" />
            {metric.name}
          </div>
          <div className="text-right text-[var(--text-muted)] tabular-nums">
            {formatCur(metric.cpu)}
          </div>
          <div className="text-right text-[var(--text-muted)] tabular-nums hidden md:block">
            {formatCur(metric.ram)}
          </div>
          <div className="text-right text-[var(--text-muted)] tabular-nums hidden lg:block">
            {formatCur(metric.storage)}
          </div>
          <div className="text-right text-[var(--text-muted)] tabular-nums hidden lg:block">
            {formatCur(metric.network)}
          </div>
          <div className="text-right text-[var(--text-muted)] tabular-nums hidden lg:block">
            {formatCur(metric.gpu)}
          </div>
          <div className="flex justify-center hidden md:flex">
            <span className="px-2 py-1 bg-white border border-[var(--border-subtle)] text-xs rounded-md font-bold">
              {Math.round(metric.efficiency)}%
            </span>
          </div>
          <div className="text-right font-bold text-[var(--text-primary)]">
            <AnimatedCounter value={metric.total} />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
