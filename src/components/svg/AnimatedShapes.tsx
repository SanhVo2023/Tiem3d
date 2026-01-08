"use client";

import { motion } from "framer-motion";

// Morphing blob shape
export function MorphingBlob({ className = "", color = "#f97316" }: { className?: string; color?: string }) {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        fill={color}
        animate={{
          d: [
            "M 100 20 Q 150 20 170 60 Q 190 100 170 140 Q 150 180 100 180 Q 50 180 30 140 Q 10 100 30 60 Q 50 20 100 20",
            "M 100 30 Q 160 30 175 70 Q 180 110 160 150 Q 140 180 100 175 Q 60 170 35 135 Q 20 100 40 55 Q 60 30 100 30",
            "M 100 25 Q 145 15 165 55 Q 185 95 165 145 Q 145 185 100 180 Q 55 175 35 140 Q 15 100 35 55 Q 55 25 100 25",
            "M 100 20 Q 150 20 170 60 Q 190 100 170 140 Q 150 180 100 180 Q 50 180 30 140 Q 10 100 30 60 Q 50 20 100 20",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        opacity={0.1}
      />
    </motion.svg>
  );
}

// Rotating gear
export function AnimatedGear({ className = "", size = 100 }: { className?: string; size?: number }) {
  const teeth = 8;
  const innerRadius = size * 0.3;
  const outerRadius = size * 0.45;
  const toothHeight = size * 0.1;

  const createGearPath = () => {
    let path = "";
    for (let i = 0; i < teeth; i++) {
      const angle1 = (i * 360) / teeth;
      const angle2 = ((i + 0.3) * 360) / teeth;
      const angle3 = ((i + 0.7) * 360) / teeth;
      const angle4 = ((i + 1) * 360) / teeth;

      const r1 = outerRadius;
      const r2 = outerRadius + toothHeight;

      const x1 = size / 2 + r1 * Math.cos((angle1 * Math.PI) / 180);
      const y1 = size / 2 + r1 * Math.sin((angle1 * Math.PI) / 180);
      const x2 = size / 2 + r2 * Math.cos((angle2 * Math.PI) / 180);
      const y2 = size / 2 + r2 * Math.sin((angle2 * Math.PI) / 180);
      const x3 = size / 2 + r2 * Math.cos((angle3 * Math.PI) / 180);
      const y3 = size / 2 + r2 * Math.sin((angle3 * Math.PI) / 180);
      const x4 = size / 2 + r1 * Math.cos((angle4 * Math.PI) / 180);
      const y4 = size / 2 + r1 * Math.sin((angle4 * Math.PI) / 180);

      if (i === 0) {
        path += `M ${x1} ${y1} `;
      }
      path += `L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4} `;
    }
    path += "Z";
    return path;
  };

  return (
    <motion.svg
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <path d={createGearPath()} fill="#27272a" />
      <circle cx={size / 2} cy={size / 2} r={innerRadius} fill="#18181b" />
      <circle cx={size / 2} cy={size / 2} r={innerRadius * 0.4} fill="#3f3f46" />
    </motion.svg>
  );
}

// Floating particles
export function FloatingParticles({ className = "" }: { className?: string }) {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <svg viewBox="0 0 100 100" className={className} preserveAspectRatio="none">
      {particles.map((p) => (
        <motion.circle
          key={p.id}
          cx={p.x}
          cy={p.y}
          r={p.size / 2}
          fill={p.id % 2 === 0 ? "#f97316" : "#06b6d4"}
          opacity={0.3}
          animate={{
            y: [p.y, p.y - 20, p.y],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

// 3D Cube wireframe
export function WireframeCube({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={className}
      animate={{ rotateY: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Front face */}
      <motion.rect
        x="25"
        y="25"
        width="50"
        height="50"
        fill="none"
        stroke="#f97316"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2 }}
      />
      {/* Back face */}
      <motion.rect
        x="35"
        y="15"
        width="50"
        height="50"
        fill="none"
        stroke="#06b6d4"
        strokeWidth="1"
        opacity={0.5}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
      {/* Connecting lines */}
      <motion.line x1="25" y1="25" x2="35" y2="15" stroke="#71717a" strokeWidth="1" />
      <motion.line x1="75" y1="25" x2="85" y2="15" stroke="#71717a" strokeWidth="1" />
      <motion.line x1="25" y1="75" x2="35" y2="65" stroke="#71717a" strokeWidth="1" />
      <motion.line x1="75" y1="75" x2="85" y2="65" stroke="#71717a" strokeWidth="1" />
    </motion.svg>
  );
}
