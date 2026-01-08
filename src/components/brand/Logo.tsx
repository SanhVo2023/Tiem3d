"use client";

import { motion } from "framer-motion";

interface LogoProps {
  variant?: "full" | "mark" | "wordmark";
  size?: "sm" | "md" | "lg" | "xl";
  color?: "dark" | "light" | "gradient";
  animate?: boolean;
}

const sizes = {
  sm: { mark: 24, text: "text-lg" },
  md: { mark: 32, text: "text-xl" },
  lg: { mark: 48, text: "text-3xl" },
  xl: { mark: 64, text: "text-5xl" },
};

export function Logo({
  variant = "full",
  size = "md",
  color = "dark",
  animate = false,
}: LogoProps) {
  const s = sizes[size];

  const textColor = {
    dark: "text-zinc-900",
    light: "text-white",
    gradient: "text-gradient",
  }[color];

  const accentColor = {
    dark: "#f97316",
    light: "#f97316",
    gradient: "#f97316",
  }[color];

  // The Mark - Abstract 3D cube/printer nozzle
  const Mark = () => (
    <motion.svg
      width={s.mark}
      height={s.mark}
      viewBox="0 0 48 48"
      fill="none"
      initial={animate ? { rotate: -10, scale: 0.9 } : undefined}
      animate={animate ? { rotate: 0, scale: 1 } : undefined}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {/* 3D Cube base */}
      <motion.path
        d="M24 4L44 16V32L24 44L4 32V16L24 4Z"
        fill={color === "light" ? "rgba(255,255,255,0.1)" : "rgba(249,115,22,0.1)"}
        stroke={accentColor}
        strokeWidth="2"
        initial={animate ? { pathLength: 0 } : undefined}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      {/* Inner details - printer nozzle abstraction */}
      <motion.path
        d="M24 16L36 23V33L24 40L12 33V23L24 16Z"
        fill={accentColor}
        initial={animate ? { scale: 0, opacity: 0 } : undefined}
        animate={animate ? { scale: 1, opacity: 1 } : undefined}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
      {/* Highlight */}
      <motion.path
        d="M24 16L36 23L24 30L12 23L24 16Z"
        fill={color === "light" ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.4)"}
        initial={animate ? { opacity: 0 } : undefined}
        animate={animate ? { opacity: 1 } : undefined}
        transition={{ duration: 0.3, delay: 0.5 }}
      />
    </motion.svg>
  );

  // Wordmark with stylized Vietnamese text
  const Wordmark = () => (
    <motion.div
      className={`flex flex-col leading-none ${s.text}`}
      initial={animate ? { opacity: 0, x: -10 } : undefined}
      animate={animate ? { opacity: 1, x: 0 } : undefined}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <span className={`text-display tracking-tight ${textColor}`}>
        CÁI TIỆM
      </span>
      <span className="flex items-center gap-1">
        <span className={`text-display tracking-tight ${textColor}`}>IN</span>
        <span className="text-display tracking-tight text-orange-500">3D</span>
      </span>
    </motion.div>
  );

  // Single line wordmark for header
  const WordmarkInline = () => (
    <motion.span
      className={`text-display tracking-tight ${s.text} ${textColor}`}
      initial={animate ? { opacity: 0, y: 10 } : undefined}
      animate={animate ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5 }}
    >
      Cái Tiệm In <span className="text-orange-500">3D</span>
    </motion.span>
  );

  if (variant === "mark") {
    return <Mark />;
  }

  if (variant === "wordmark") {
    return <WordmarkInline />;
  }

  return (
    <motion.div
      className="flex items-center gap-3"
      initial={animate ? { opacity: 0 } : undefined}
      animate={animate ? { opacity: 1 } : undefined}
    >
      <Mark />
      <Wordmark />
    </motion.div>
  );
}

// Hero logo - Large display version
export function HeroLogo({ animate = true }: { animate?: boolean }) {
  return (
    <div className="relative">
      {/* Main text */}
      <motion.div
        className="text-display text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] tracking-tighter"
        initial={animate ? { opacity: 0, y: 50 } : undefined}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <span className="block text-zinc-900">CÁI TIỆM</span>
        <span className="block">
          <span className="text-zinc-900">IN </span>
          <span className="text-gradient-animated">3D</span>
        </span>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute -right-4 top-0 text-orange-500 text-6xl font-bold"
        initial={animate ? { opacity: 0, scale: 0, rotate: -45 } : undefined}
        animate={animate ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        ●
      </motion.div>
    </div>
  );
}
