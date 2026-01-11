"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "solid" | "outline";
  href?: string;
  onClick?: () => void;
  cursorText?: string;
  magneticStrength?: number;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function MagneticButton({
  children,
  className = "",
  variant = "solid",
  href,
  onClick,
  cursorText = "XEM",
  magneticStrength = 0.3,
  disabled = false,
  type = "button",
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * magneticStrength;
    const deltaY = (e.clientY - centerY) * magneticStrength;

    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = cn(
    "relative inline-flex items-center justify-center px-8 py-4",
    "font-mono text-sm uppercase tracking-widest",
    "transition-colors duration-300",
    "overflow-hidden group",
    disabled && "opacity-50 cursor-not-allowed"
  );

  const variantStyles = {
    solid: cn(
      "bg-orange-500 text-void",
      "hover:bg-orange-400"
    ),
    outline: cn(
      "bg-transparent text-signal",
      "border border-zinc-700",
      "hover:border-orange-500 hover:text-orange-500"
    ),
  };

  const ButtonContent = (
    <motion.div
      ref={buttonRef}
      className={cn(baseStyles, variantStyles[variant], className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
      data-cursor={cursorText}
    >
      {/* Background animation */}
      <motion.span
        className={cn(
          "absolute inset-0",
          variant === "solid" ? "bg-orange-400" : "bg-orange-500/10"
        )}
        initial={{ x: "-100%" }}
        whileHover={{ x: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* Text */}
      <span className="relative z-10">{children}</span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {ButtonContent}
      </a>
    );
  }

  return (
    <button onClick={disabled ? undefined : onClick} type={type} disabled={disabled}>
      {ButtonContent}
    </button>
  );
}
