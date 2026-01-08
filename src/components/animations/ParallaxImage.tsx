"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  scale?: number;
}

export function ParallaxImage({
  src,
  alt,
  className = "",
  speed = 0.5,
  scale = 1.2
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}px`, `${speed * 100}px`]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [scale, 1, scale]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y, scale: imageScale }} className="relative w-full h-full">
        <Image src={src} alt={alt} fill className="object-cover" />
      </motion.div>
    </div>
  );
}
