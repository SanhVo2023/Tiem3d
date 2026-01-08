"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
}

export function TextReveal({ children, className = "" }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = children.split(" ");

  return (
    <div ref={containerRef} className={className}>
      <p className="flex flex-wrap">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          );
        })}
      </p>
    </div>
  );
}

interface WordProps {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}

function Word({ children, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const y = useTransform(progress, range, [10, 0]);

  return (
    <span className="relative mr-[0.25em] mt-[0.1em]">
      <motion.span
        className="inline-block"
        style={{ opacity, y }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// Character-by-character scroll reveal
interface CharRevealProps {
  children: string;
  className?: string;
}

export function CharReveal({ children, className = "" }: CharRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.3"],
  });

  const chars = children.split("");

  return (
    <div ref={containerRef} className={className}>
      <p className="inline">
        {chars.map((char, i) => {
          const start = i / chars.length;
          const end = start + 1 / chars.length;
          return (
            <Char key={i} progress={scrollYProgress} range={[start, end]}>
              {char}
            </Char>
          );
        })}
      </p>
    </div>
  );
}

interface CharProps {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}

function Char({ children, progress, range }: CharProps) {
  const opacity = useTransform(progress, range, [0.1, 1]);

  return (
    <motion.span style={{ opacity }}>
      {children === " " ? "\u00A0" : children}
    </motion.span>
  );
}
