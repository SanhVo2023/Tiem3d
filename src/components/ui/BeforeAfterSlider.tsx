"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "TRƯỚC",
  afterLabel = "SAU",
  className = "",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  // Placeholder component when no image provided
  const PlaceholderImage = ({ type, label }: { type: "before" | "after"; label: string }) => (
    <div className={cn(
      "absolute inset-0 flex items-center justify-center",
      type === "before"
        ? "bg-gradient-to-br from-zinc-800 to-zinc-900"
        : "bg-gradient-to-br from-zinc-700 to-zinc-800"
    )}>
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: type === "before"
            ? `linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
               linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)`
            : `linear-gradient(rgba(249, 115, 22, 0.3) 1px, transparent 1px),
               linear-gradient(90deg, rgba(249, 115, 22, 0.3) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Wireframe / Solid icon */}
      <div className="relative z-10 text-center">
        {type === "before" ? (
          // Wireframe cube
          <svg width="80" height="80" viewBox="0 0 80 80" className="mx-auto mb-4 text-cyan-500">
            <path
              d="M40 10 L70 25 L70 55 L40 70 L10 55 L10 25 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M40 10 L40 40 M70 25 L40 40 M10 25 L40 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
            <path
              d="M40 40 L40 70"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        ) : (
          // Solid cube
          <svg width="80" height="80" viewBox="0 0 80 80" className="mx-auto mb-4 text-orange-500">
            <path
              d="M40 10 L70 25 L70 55 L40 70 L10 55 L10 25 Z"
              fill="currentColor"
              fillOpacity="0.2"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M40 10 L40 40 L70 25"
              fill="currentColor"
              fillOpacity="0.1"
            />
            <path
              d="M40 40 L40 70 L70 55 L70 25"
              fill="currentColor"
              fillOpacity="0.3"
            />
          </svg>
        )}
        <p className="text-mono text-xs text-noise">{label}</p>
      </div>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full aspect-[4/3] overflow-hidden cursor-ew-resize select-none bg-zinc-900",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* After Image (Right / Background) */}
      <div className="absolute inset-0">
        {afterImage ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${afterImage})` }}
          />
        ) : (
          <PlaceholderImage type="after" label="PRINTED PART" />
        )}
        {/* After Label */}
        <span className="absolute bottom-4 right-4 text-mono text-xs text-signal/70 bg-void/50 px-2 py-1 z-10">
          {afterLabel}
        </span>
      </div>

      {/* Before Image (Left / Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <div
          className="relative h-full"
          style={{ width: `${100 / (sliderPosition / 100 || 1)}%` }}
        >
          {beforeImage ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${beforeImage})` }}
            />
          ) : (
            <PlaceholderImage type="before" label="CAD MODEL" />
          )}
        </div>
        {/* Before Label */}
        <span className="absolute bottom-4 left-4 text-mono text-xs text-signal/70 bg-void/50 px-2 py-1 z-10">
          {beforeLabel}
        </span>
      </div>

      {/* Slider Handle */}
      <motion.div
        className="absolute top-0 bottom-0 w-1 bg-orange-500 cursor-ew-resize z-20"
        style={{ left: `${sliderPosition}%`, marginLeft: "-2px" }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* Handle Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Arrows */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-void"
            >
              <path
                d="M8 12L4 8M4 8L8 4M4 8H12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 12L20 16M20 16L16 20M20 16H12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 w-1 bg-orange-500 blur-sm" />
      </motion.div>
    </div>
  );
}
