"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  repeat?: number;
}

export function Marquee({
  children,
  className = "",
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  repeat = 4,
}: MarqueeProps) {
  const duration = 100 / speed;

  return (
    <div
      className={cn(
        "group flex overflow-hidden",
        pauseOnHover && "[--pause-on-hover:paused]",
        className
      )}
    >
      {[...Array(repeat)].map((_, i) => (
        <motion.div
          key={i}
          className="flex shrink-0 items-center gap-8"
          animate={{
            x: direction === "left" ? [0, "-100%"] : ["-100%", 0],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            animationPlayState: "var(--pause-on-hover, running)",
          }}
        >
          {children}
        </motion.div>
      ))}
    </div>
  );
}

// Vertical Marquee variant
interface VerticalMarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down";
  pauseOnHover?: boolean;
  repeat?: number;
}

export function VerticalMarquee({
  children,
  className = "",
  speed = 20,
  direction = "up",
  pauseOnHover = true,
  repeat = 4,
}: VerticalMarqueeProps) {
  const duration = 100 / speed;

  return (
    <div
      className={cn(
        "group flex flex-col overflow-hidden",
        pauseOnHover && "[--pause-on-hover:paused]",
        className
      )}
    >
      {[...Array(repeat)].map((_, i) => (
        <motion.div
          key={i}
          className="flex shrink-0 flex-col gap-4"
          animate={{
            y: direction === "up" ? [0, "-100%"] : ["-100%", 0],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {children}
        </motion.div>
      ))}
    </div>
  );
}
