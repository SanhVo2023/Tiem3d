"use client";

import { motion } from "framer-motion";

export function AnimatedPrinter({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Printer Base */}
      <motion.rect
        x="30"
        y="120"
        width="140"
        height="60"
        rx="8"
        fill="#18181b"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Printer Frame - Left */}
      <motion.rect
        x="40"
        y="40"
        width="8"
        height="80"
        fill="#3f3f46"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        style={{ originY: 1 }}
      />

      {/* Printer Frame - Right */}
      <motion.rect
        x="152"
        y="40"
        width="8"
        height="80"
        fill="#3f3f46"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        style={{ originY: 1 }}
      />

      {/* Printer Frame - Top */}
      <motion.rect
        x="40"
        y="35"
        width="120"
        height="8"
        fill="#3f3f46"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      />

      {/* Print Head - Moving */}
      <motion.g
        animate={{ x: [-30, 30, -30] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="85" y="50" width="30" height="20" rx="4" fill="#f97316" />
        {/* Nozzle */}
        <motion.rect
          x="97"
          y="70"
          width="6"
          height="8"
          fill="#ea580c"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      </motion.g>

      {/* Print Bed */}
      <motion.rect
        x="50"
        y="105"
        width="100"
        height="8"
        rx="2"
        fill="#52525b"
        animate={{ y: [105, 115, 105] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Printed Object Growing */}
      <motion.rect
        x="75"
        y="90"
        width="50"
        height="15"
        rx="2"
        fill="#06b6d4"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
        style={{ originY: 1 }}
      />

      {/* Filament Spool */}
      <motion.circle
        cx="170"
        cy="60"
        r="15"
        stroke="#f97316"
        strokeWidth="4"
        fill="none"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{ originX: "170px", originY: "60px" }}
      />
      <circle cx="170" cy="60" r="5" fill="#f97316" />

      {/* Filament Line */}
      <motion.path
        d="M 160 70 Q 140 80 115 55"
        stroke="#f97316"
        strokeWidth="2"
        fill="none"
        strokeDasharray="50"
        animate={{ strokeDashoffset: [50, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* Status LED */}
      <motion.circle
        cx="55"
        cy="140"
        r="4"
        fill="#22c55e"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </svg>
  );
}
