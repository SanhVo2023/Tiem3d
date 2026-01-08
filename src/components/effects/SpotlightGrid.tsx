"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface SpotlightGridProps {
  className?: string;
}

export function SpotlightGrid({ className = "" }: SpotlightGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Grid Pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(249, 115, 22, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249, 115, 22, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Spotlight Effect */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          x: spotlightX,
          y: spotlightY,
          width: 600,
          height: 600,
          marginLeft: -300,
          marginTop: -300,
        }}
      >
        <motion.div
          className="w-full h-full rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, transparent 70%)`,
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Highlighted Grid (only visible in spotlight) */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          x: spotlightX,
          y: spotlightY,
          width: 400,
          height: 400,
          marginLeft: -200,
          marginTop: -200,
        }}
      >
        <motion.div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(249, 115, 22, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(249, 115, 22, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            maskImage: `radial-gradient(circle, black 0%, transparent 70%)`,
            WebkitMaskImage: `radial-gradient(circle, black 0%, transparent 70%)`,
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </div>
  );
}
