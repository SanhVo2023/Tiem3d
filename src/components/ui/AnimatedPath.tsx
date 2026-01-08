"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface AnimatedPathProps {
  className?: string;
}

export function AnimatedPath({ className = "" }: AnimatedPathProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className={className}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 400"
        preserveAspectRatio="none"
        className="absolute inset-0"
      >
        {/* Background path (gray) */}
        <motion.path
          d="M50 0 L50 100 L20 150 L80 200 L20 250 L80 300 L50 350 L50 400"
          fill="none"
          stroke="rgba(113, 113, 122, 0.3)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Animated path (orange) */}
        <motion.path
          d="M50 0 L50 100 L20 150 L80 200 L20 250 L80 300 L50 350 L50 400"
          fill="none"
          stroke="#f97316"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            pathLength,
          }}
          filter="url(#glow)"
        />

        {/* Glow filter */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
}

interface ProcessStepProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  index: number;
  isActive?: boolean;
}

export function ProcessStep({
  icon,
  title,
  description,
  index,
  isActive = false,
}: ProcessStepProps) {
  return (
    <motion.div
      className={`relative flex items-center gap-6 ${
        index % 2 === 0 ? "flex-row" : "flex-row-reverse"
      }`}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Icon Circle */}
      <motion.div
        className={`
          relative w-16 h-16 rounded-full flex items-center justify-center
          ${isActive ? "bg-orange-500 text-void" : "bg-zinc-900 text-zinc-500 border border-zinc-800"}
          transition-colors duration-300
        `}
        whileHover={{ scale: 1.1 }}
      >
        {icon}

        {/* Pulse effect when active */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full bg-orange-500"
            animate={{
              scale: [1, 1.5],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        )}
      </motion.div>

      {/* Content */}
      <div className={`flex-1 ${index % 2 === 0 ? "text-left" : "text-right"}`}>
        <h4 className="text-display text-xl text-signal mb-1">{title}</h4>
        {description && (
          <p className="text-mono text-xs text-noise">{description}</p>
        )}
      </div>
    </motion.div>
  );
}
