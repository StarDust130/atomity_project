"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

export function AnimatedCounter({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const controls = animate(count, value, { duration: 1.2, ease: "easeOut" });
    const unsubscribe = rounded.on("change", (v) =>
      setDisplay(`$${v.toLocaleString()}`),
    );

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value, count, rounded]);

  return <motion.span className="tabular-nums">{display}</motion.span>;
}
