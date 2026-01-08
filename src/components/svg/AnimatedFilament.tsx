"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface AnimatedFilamentProps {
  className?: string;
}

export function AnimatedFilament({ className = "" }: AnimatedFilamentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <div ref={containerRef} className={className}>
    <svg
      viewBox="0 0 400 800"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main flowing path */}
      <motion.path
        d="M 200 0
           Q 100 100 200 200
           Q 300 300 200 400
           Q 100 500 200 600
           Q 300 700 200 800"
        stroke="url(#gradient)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        style={{ pathLength }}
      />

      {/* Glow effect */}
      <motion.path
        d="M 200 0
           Q 100 100 200 200
           Q 300 300 200 400
           Q 100 500 200 600
           Q 300 700 200 800"
        stroke="url(#gradient)"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
        filter="blur(8px)"
        style={{ pathLength }}
      />

      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
    </svg>
    </div>
  );
}

// Horizontal flowing line for sections
export function FlowingLine({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 100"
      className={className}
      fill="none"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M 0 50 Q 300 20 600 50 Q 900 80 1200 50"
        stroke="url(#hGradient)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <defs>
        <linearGradient id="hGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="20%" stopColor="#f97316" />
          <stop offset="80%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
    </svg>
  );
}
