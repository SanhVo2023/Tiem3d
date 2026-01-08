"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
}

export function HorizontalScroll({ children, className = "" }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.666%"]);

  return (
    <section
      ref={containerRef}
      className={cn("relative h-[300vh]", className)}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div
          ref={scrollRef}
          className="flex gap-8 px-8"
          style={{ x }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

interface HorizontalScrollCardProps {
  children: React.ReactNode;
  className?: string;
  image?: string;
  tag?: string;
  title?: string;
}

export function HorizontalScrollCard({
  children,
  className = "",
  image,
  tag,
  title,
}: HorizontalScrollCardProps) {
  return (
    <motion.div
      className={cn(
        "relative flex-shrink-0 w-[80vw] md:w-[50vw] h-[70vh] rounded-lg overflow-hidden",
        "bg-zinc-900 border border-zinc-800",
        "group",
        className
      )}
      whileHover={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background Image with Parallax */}
      {image && (
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent" />
        </motion.div>
      )}

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-8">
        {/* Tag */}
        {tag && (
          <span className="absolute top-6 right-6 text-mono text-xs text-orange-500 border border-orange-500 px-3 py-1">
            {tag}
          </span>
        )}

        {/* Title */}
        {title && (
          <h3 className="text-display text-4xl md:text-5xl text-signal mb-4">
            {title}
          </h3>
        )}

        {children}
      </div>
    </motion.div>
  );
}
