"use client";

import { useState, useEffect } from "react";
import { useCloudData, type CloudMetric } from "../hooks/useCloudData";
import { MetricChart } from "./MetricChart";
import { MetricTable } from "./MetricTable";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, CalendarDays, Loader2, AlertCircle } from "lucide-react";

export default function Dashboard() {
  const { data, isLoading, isError } = useCloudData();
  const [path, setPath] = useState<CloudMetric[]>([]);
  const [showBackTooltip, setShowBackTooltip] = useState(false);
  const [hasSeenTooltip, setHasSeenTooltip] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showBackTooltip) {
      timer = setTimeout(() => setShowBackTooltip(false), 3500);
    }
    return () => clearTimeout(timer);
  }, [showBackTooltip]);

  const handleSelect = (metric: CloudMetric) => {
    if (metric.children && metric.children.length > 0) {
      setPath([...path, metric]);
      if (!hasSeenTooltip) {
        setShowBackTooltip(true);
        setHasSeenTooltip(true);
      }
    }
  };

  const handleGoBack = (index: number) => {
    if (index === -1) {
      setPath([]); // Go to root
    } else {
      setPath(path.slice(0, index + 1));
    }
    setShowBackTooltip(false);
  };

  if (isLoading)
    return (
      <div className="max-w-5xl mx-auto h-[600px] bg-white rounded-(--radius-card) shadow-sm animate-pulse flex items-center justify-center text-(--text-muted) font-medium">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-(--brand-base) animate-spin" />
          Loading telemetry...
        </div>
      </div>
    );
  if (isError || !data)
    return (
      <div className="max-w-5xl mx-auto h-[600px] flex flex-col items-center justify-center text-red-500 font-medium bg-white rounded-(--radius-card)">
        <AlertCircle className="w-8 h-8 mb-2" />
        Failed to load data
      </div>
    );

  // Determine which level of data to show
  const currentViewData =
    path.length > 0 ? path[path.length - 1].children || [] : data;
  const currentParentId = path.length > 0 ? path[path.length - 1].id : "root";

  return (
    <motion.section
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-(--surface-main) backdrop-blur-2xl w-full max-w-5xl mx-auto rounded-[24px] sm:rounded-[32px] p-4 sm:p-8 lg:p-10 shadow-(--shadow-premium) border border-(--border-subtle) relative flex flex-col overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-(--brand-glow) rounded-full blur-[120px] opacity-20" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[100px] opacity-30" />
      </div>

      <header className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-5 md:gap-6 mb-8 z-10 w-full">
        <div className="flex flex-col">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-1 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600"
          >
            Infrastructure Costs
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xs sm:text-sm font-medium text-(--text-muted)"
          >
            Real-time telemetry and cloud resource tracking.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-row w-full md:w-auto items-center gap-2 sm:gap-3 justify-between md:justify-end shrink-0"
        >
          <div className="relative group shrink-0">
            <button className="justify-center flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white/80 backdrop-blur-md border border-white shadow-sm rounded-xl font-semibold text-[13px] sm:text-sm text-gray-700 hover:bg-white hover:shadow-md hover:scale-105 transition-all focus:ring-2 focus:ring-(--brand-light) outline-none whitespace-nowrap">
              <CalendarDays className="w-4 h-4 text-(--brand-base)" />
              <span className="hidden sm:inline">Last 30 Days</span>
              <span className="sm:hidden">30D</span>
            </button>
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none bg-gray-900 text-white text-[11px] sm:text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xl z-50 whitespace-nowrap scale-95 group-hover:scale-100">
              Calendar not available 🥺
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-900" />
            </div>
          </div>

          {/* Breadcrumb Navigation */}
          <div className="flex w-full sm:w-auto bg-gray-50/80 backdrop-blur-md border border-gray-200/60 rounded-xl overflow-x-auto custom-scrollbar p-1.5 shadow-inner relative max-w-full">
            <div className="flex items-center min-w-max relative gap-1">
              <div className="relative group">
                <button
                  onClick={() => handleGoBack(-1)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-[10px] text-[13px] sm:text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                    path.length === 0
                      ? "bg-white text-(--brand-dark) shadow-sm ring-1 ring-gray-200/50"
                      : "text-gray-500 hover:text-gray-800 hover:bg-white/60"
                  }`}
                >
                  Clusters
                </button>
                {/* Tooltip for the FIRST step back (points to Clusters when inside Cluster A) */}
                <AnimatePresence>
                  {showBackTooltip && path.length === 1 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: -5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -5 }}
                      className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xl z-50 whitespace-nowrap pointer-events-none"
                    >
                      Click here to go back
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {path.map((segment, index) => (
                  <motion.div
                    key={segment.id}
                    initial={{ opacity: 0, scale: 0.9, width: 0 }}
                    animate={{ opacity: 1, scale: 1, width: "auto" }}
                    exit={{ opacity: 0, scale: 0.9, width: 0 }}
                    className="flex items-center overflow-visible relative"
                  >
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 shrink-0 mx-0.5" />
                    <div className="relative group">
                      <button
                        onClick={() => handleGoBack(index)}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-[10px] text-[13px] sm:text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                          index === path.length - 1
                            ? "bg-white text-(--brand-dark) shadow-sm ring-1 ring-gray-200/50"
                            : "text-gray-500 hover:text-gray-800 hover:bg-white/60"
                        }`}
                      >
                        {segment.name.split(" ")[1] || segment.name}
                      </button>
                      {/* Tooltip for deeper steps back (points to current parent) */}
                      <AnimatePresence>
                        {showBackTooltip &&
                          path.length > 1 &&
                          index === path.length - 2 && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8, y: -5 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.8, y: -5 }}
                              className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xl z-50 whitespace-nowrap pointer-events-none"
                            >
                              Click to go back
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                            </motion.div>
                          )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Force re-mount of components when data level changes for fresh animations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentParentId}
          initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex-col"
        >
          <MetricChart data={currentViewData} onSelect={handleSelect} />
          <MetricTable data={currentViewData} />
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}
