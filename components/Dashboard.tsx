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
  const currentViewData = path.length > 0 ? path[path.length - 1].children || [] : data;
  const currentParentId = path.length > 0 ? path[path.length - 1].id : "root";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-(--surface-main) w-full max-w-5xl mx-auto rounded-(--radius-card) p-4 sm:p-6 lg:p-8 shadow-(--shadow-premium) border border-(--border-subtle) relative flex flex-col"
    >
      <div className="absolute inset-0 overflow-hidden rounded-(--radius-card) pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-(--brand-glow) rounded-full blur-[80px] sm:blur-[100px] opacity-20 translate-x-1/2 -translate-y-1/2" />
      </div>
      
      <header className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-8 z-10 w-full">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight mb-1">Infrastructure Costs</h1>
          <p className="text-xs sm:text-sm text-(--text-muted)">Real-time telemetry and cloud resource tracking.</p>
        </div>

        <div className="flex flex-col w-full sm:w-auto items-stretch sm:items-center gap-3">
          <div className="relative group w-full sm:w-auto">
            <button className="w-full justify-center flex items-center gap-2 px-4 py-2 bg-white border border-(--border-subtle) shadow-sm rounded-xl font-medium text-[13px] sm:text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all focus:ring-2 focus:ring-(--brand-light) outline-none whitespace-nowrap">
              <CalendarDays className="w-4 h-4 text-gray-500" />
              Last 30 Days
            </button>
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none bg-gray-900 text-white text-[11px] sm:text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xl z-50 whitespace-nowrap scale-95 group-hover:scale-100">
              Calendar not available 🥺
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-900" />
            </div>
          </div>

          {/* Breadcrumb Navigation */}
          <div className="flex w-full sm:w-auto bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-xl overflow-x-auto custom-scrollbar p-1 shadow-inner relative max-w-full">
            <div className="flex items-center min-w-max relative">
              <div className="relative group">
                <button
                  onClick={() => handleGoBack(-1)}
                  className={`px-3 py-1.5 rounded-lg text-[13px] sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                    path.length === 0 
                      ? "bg-white text-(--brand-dark) shadow-sm" 
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
                        className={`px-3 py-1.5 rounded-lg text-[13px] sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                          index === path.length - 1
                            ? "bg-white text-(--brand-dark) shadow-sm"
                            : "text-gray-500 hover:text-gray-800 hover:bg-white/60"
                        }`}
                      >
                        {segment.name.split(" ")[1] || segment.name}
                      </button>
                      {/* Tooltip for deeper steps back (points to current parent) */}
                      <AnimatePresence>
                        {showBackTooltip && path.length > 1 && index === path.length - 2 && (
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
        </div>
      </header>

      {/* Force re-mount of components when data level changes for fresh animations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentParentId}
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.98 }}
          transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
          className="relative z-10 flex-col"
        >
          <MetricChart
            data={currentViewData}
            onSelect={handleSelect}
          />
          <MetricTable data={currentViewData} />
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}
