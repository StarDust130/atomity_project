"use client";

import { useState } from "react";
import { useCloudData, type CloudMetric } from "../hooks/useCloudData";
import { MetricChart } from "./MetricChart";
import { MetricTable } from "./MetricTable";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, CalendarDays, Loader2, AlertCircle } from "lucide-react";

export default function Dashboard() {
  const { data, isLoading, isError } = useCloudData();
  const [path, setPath] = useState<CloudMetric[]>([]);

  const handleSelect = (metric: CloudMetric) => {
    if (metric.children && metric.children.length > 0) {
      setPath([...path, metric]);
    }
  };

  const handleGoBack = (index: number) => {
    if (index === -1) {
      setPath([]); // Go to root
    } else {
      setPath(path.slice(0, index + 1));
    }
  };

  if (isLoading)
    return (
      <div className="w-full min-h-[300px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          {/* Loader */}
          <Loader2 className="w-8 h-8 text-green-500 animate-spin" />

          {/* Text */}
          <p className="text-sm text-gray-400 font-medium">
            Loading telemetry...
          </p>
        </div>
      </div>
    );
  if (isError || !data)
    return (
      <div className="max-w-5xl mx-auto h-150 flex flex-col items-center justify-center text-red-500 font-medium bg-white rounded-(--radius-card)">
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
        <div className="absolute -top-32 -right-32 w-[600px] h-150 bg-(--brand-glow) rounded-full blur-[120px] opacity-20" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[100px] opacity-30" />
      </div>

      <header className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 mb-8 z-10 w-full">
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
          className="flex flex-row w-full md:w-auto items-center gap-3 justify-between md:justify-end shrink min-w-0"
        >
          {/* Last 30 Days Button with Cool Tooltip 🌟 */}
          <div className="relative group shrink-0">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-100 shadow-sm rounded-2xl font-bold text-[13px] sm:text-sm text-gray-700 hover:shadow-md hover:border-gray-200 transition-all focus:ring-2 focus:ring-(--brand-light) outline-none">
              <CalendarDays className="w-4 h-4 text-(--brand-base)" />
              <span className="hidden sm:inline">Last 30 Days</span>
              <span className="sm:hidden">30D</span>
            </button>

            {/* Tooltip (Desktop Only) */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none hidden sm:flex flex-col items-center z-50 translate-y-2 group-hover:translate-y-0">
              <div className="bg-gray-900 text-white text-xs py-2 px-3 rounded-lg font-semibold whitespace-nowrap shadow-xl flex items-center gap-2">
                <span className="text-gray-400 uppercase text-[10px] tracking-widest border-r border-gray-700 pr-2">
                  Filter
                </span>
                <span>Coming Soon 😆</span>
              </div>
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-900"></div>
            </div>
          </div>

          {/* Breadcrumb Navigation 🧭 Matches Screenshot Exactly */}
          <div className="inline-flex items-center w-auto max-w-full flex-wrap overflow-visible bg-gray-50/80 border border-gray-100 shadow-inner rounded-2xl p-1.5 sm:p-2 min-w-0 shrink-0">
            <div className="flex items-center gap-1 flex-wrap sm:flex-nowrap">
              <div className="relative group flex">
                <button
                  onClick={() => handleGoBack(-1)}
                  className={`px-4 py-1.5 rounded-xl text-[14px] font-extrabold transition-all duration-300 whitespace-nowrap ${
                    path.length === 0
                      ? "bg-white text-(--brand-base) shadow-sm ring-1 ring-gray-100"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
                  }`}
                >
                  Clusters
                </button>
                {/* Tooltip */}
                {path.length > 0 && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none flex flex-col items-center z-50 translate-y-2 group-hover:translate-y-0">
                    <div className="bg-gray-900 text-white text-[11px] py-1.5 px-3 rounded-lg font-semibold whitespace-nowrap shadow-xl">
                      Back to root
                    </div>
                    <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-gray-900"></div>
                  </div>
                )}
              </div>

              <AnimatePresence>
                {path.map((segment, index) => {
                  const isLast = index === path.length - 1;
                  return (
                    <motion.div
                      key={segment.id}
                      initial={{ opacity: 0, scale: 0.9, width: 0 }}
                      animate={{ opacity: 1, scale: 1, width: "auto" }}
                      exit={{ opacity: 0, scale: 0.9, width: 0 }}
                      className="flex items-center"
                    >
                      <ChevronRight className="w-4 h-4 text-gray-400 mx-0.5 sm:mx-1 shrink-0" />
                      <div className="relative group flex">
                        <button
                          onClick={() => handleGoBack(index)}
                          className={`px-4 py-1.5 rounded-xl text-[14px] font-extrabold transition-all duration-300 whitespace-nowrap ${
                            isLast
                              ? "bg-white text-(--brand-base) shadow-sm ring-1 ring-gray-100"
                              : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50"
                          }`}
                        >
                          {segment.name.split(" ")[1] || segment.name}
                        </button>

                        {/* Tooltip */}
                        {!isLast && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none flex flex-col items-center z-50 translate-y-2 group-hover:translate-y-0">
                            <div className="bg-gray-900 text-white text-[11px] py-1.5 px-3 rounded-lg font-semibold whitespace-nowrap shadow-xl">
                              Go back to{" "}
                              {segment.name.split(" ")[1] || segment.name}
                            </div>
                            <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-gray-900"></div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Force re-mount of components when data level changes for fresh animations */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentParentId}
          initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="relative z-10 flex-col w-full"
        >
          <MetricChart data={currentViewData} onSelect={handleSelect} />
          <MetricTable data={currentViewData} />
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}
