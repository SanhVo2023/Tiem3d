"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TextRevealMaskProps {
  children: string;
  className?: string;
}

export function TextRevealMask({ children, className = "" }: TextRevealMaskProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = children.split(" ");

  return (
    <div ref={ref} className={className}>
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
  const opacity = useTransform(progress, range, [0.15, 1]);
  const blur = useTransform(progress, range, [4, 0]);
  const y = useTransform(progress, range, [8, 0]);

  return (
    <span className="relative mr-[0.4em] mt-[0.1em]">
      <motion.span
        style={{ opacity, filter: blur.get() > 0 ? `blur(${blur}px)` : "none", y }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}
