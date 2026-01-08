"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface GlitchTextProps {
  children: string;
  className?: string;
  glitchOnHover?: boolean;
}

export function GlitchText({
  children,
  className = "",
  glitchOnHover = true,
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => glitchOnHover && setIsGlitching(true)}
      onMouseLeave={() => glitchOnHover && setIsGlitching(false)}
    >
      {/* Main text */}
      <span className="relative z-10">{children}</span>

      {/* Glitch layers */}
      <motion.span
        className="absolute inset-0 text-cyan-500 z-0"
        animate={{
          x: isGlitching ? [-2, 2, -1, 1, 0] : 0,
          opacity: isGlitching ? [0.8, 0.6, 0.8, 0.7, 0] : 0,
        }}
        transition={{ duration: 0.3, ease: "linear" }}
        aria-hidden
      >
        {children}
      </motion.span>

      <motion.span
        className="absolute inset-0 text-orange-500 z-0"
        animate={{
          x: isGlitching ? [2, -2, 1, -1, 0] : 0,
          opacity: isGlitching ? [0.8, 0.6, 0.8, 0.7, 0] : 0,
        }}
        transition={{ duration: 0.3, ease: "linear" }}
        aria-hidden
      >
        {children}
      </motion.span>
    </span>
  );
}

// Scramble text effect
interface ScrambleTextProps {
  children: string;
  className?: string;
  scrambleOnHover?: boolean;
  duration?: number;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

export function ScrambleText({
  children,
  className = "",
  scrambleOnHover = true,
  duration = 500,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(children);

  const scramble = () => {
    const originalText = children;
    const iterations = duration / 50;
    let iteration = 0;

    const interval = setInterval(() => {
      setDisplayText(
        originalText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return originalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= originalText.length) {
        clearInterval(interval);
        setDisplayText(originalText);
      }

      iteration += originalText.length / iterations;
    }, 50);
  };

  return (
    <span
      className={`inline-block font-mono ${className}`}
      onMouseEnter={() => scrambleOnHover && scramble()}
    >
      {displayText}
    </span>
  );
}
