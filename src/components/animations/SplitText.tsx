"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation, Variants } from "framer-motion";

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  staggerChildren?: number;
  type?: "chars" | "words" | "lines";
  animation?: "fadeUp" | "fadeIn" | "slideUp" | "reveal" | "blur";
  once?: boolean;
}

const animations: Record<string, { hidden: Variants["hidden"]; visible: Variants["visible"] }> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { y: "100%" },
    visible: { y: 0 },
  },
  reveal: {
    hidden: { opacity: 0, y: 20, rotateX: 90 },
    visible: { opacity: 1, y: 0, rotateX: 0 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
};

export function SplitText({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  staggerChildren = 0.03,
  type = "chars",
  animation = "fadeUp",
  once = true,
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-10%" });
  const controls = useAnimation();

  const splitContent = () => {
    if (type === "chars") {
      return children.split("").map((char, i) => ({
        content: char === " " ? "\u00A0" : char,
        key: i,
      }));
    }
    if (type === "words") {
      return children.split(" ").map((word, i) => ({
        content: word,
        key: i,
      }));
    }
    return children.split("\n").map((line, i) => ({
      content: line,
      key: i,
    }));
  };

  const items = splitContent();
  const selectedAnimation = animations[animation];

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      initial="hidden"
      animate={controls}
      variants={{
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: staggerChildren,
          },
        },
        hidden: {},
      }}
    >
      {items.map((item) => (
        <span
          key={item.key}
          className={`inline-block overflow-hidden ${type === "words" ? "mr-[0.25em]" : ""}`}
          style={{ perspective: "1000px" }}
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: selectedAnimation.hidden,
              visible: {
                ...selectedAnimation.visible,
                transition: {
                  duration,
                  ease: [0.25, 0.4, 0.25, 1],
                },
              },
            }}
          >
            {item.content}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
