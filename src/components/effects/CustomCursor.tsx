"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (!isVisible) setIsVisible(true);
    },
    [cursorX, cursorY, isVisible]
  );

  const handleMouseEnter = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const cursorText = target.closest("[data-cursor]")?.getAttribute("data-cursor");
    const isClickable = target.closest("a, button, [role='button'], input, textarea, select, [data-clickable]");

    if (cursorText) {
      setIsHovering(true);
      setHoverText(cursorText);
    }

    if (isClickable) {
      setIsPointer(true);
    }
  }, []);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("[data-cursor]")) {
      setIsHovering(false);
      setHoverText("");
    }

    if (target.closest("a, button, [role='button'], input, textarea, select, [data-clickable]")) {
      setIsPointer(false);
    }
  }, []);

  useEffect(() => {
    // Only run on devices with fine pointer (mouse)
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isHovering ? 1 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.15 }}
        >
          {/* Dot */}
          <motion.div
            className="rounded-full bg-orange-500"
            animate={{
              width: isHovering ? 80 : isPointer ? 16 : 10,
              height: isHovering ? 80 : isPointer ? 16 : 10,
              backgroundColor: isHovering ? "#f97316" : "#f97316",
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />

          {/* Ring */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-orange-500"
            animate={{
              width: isHovering ? 80 : isPointer ? 40 : 36,
              height: isHovering ? 80 : isPointer ? 40 : 36,
              opacity: isHovering ? 0 : isPointer ? 0.6 : 0.4,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />

          {/* Text */}
          <motion.span
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
            animate={{
              opacity: isHovering ? 1 : 0,
              scale: isHovering ? 1 : 0.5,
            }}
            transition={{ duration: 0.15 }}
          >
            {hoverText}
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Trail effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: useSpring(cursorX, { damping: 35, stiffness: 200 }),
          y: useSpring(cursorY, { damping: 35, stiffness: 200 }),
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-orange-500/30"
          animate={{
            opacity: isVisible && !isHovering ? 0.5 : 0,
            scale: isPointer ? 1.5 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </>
  );
}
