"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Upload, Layers, Printer, Package } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: Upload,
    title: "GỬI FILE",
    description: "Upload file STL/OBJ của bạn",
    detail: "Hỗ trợ STL, OBJ, STEP, 3MF",
  },
  {
    id: 2,
    icon: Layers,
    title: "SLICING",
    description: "Chúng tôi tối ưu hóa model",
    detail: "Báo giá trong 30 phút",
  },
  {
    id: 3,
    icon: Printer,
    title: "PRINTING",
    description: "In với độ chính xác cao",
    detail: "Kiểm tra chất lượng 100%",
  },
  {
    id: 4,
    icon: Package,
    title: "SHIP COD",
    description: "Giao hàng toàn quốc",
    detail: "Đóng gói an toàn, bảo hiểm",
  },
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <section
      ref={containerRef}
      className="relative py-32 px-8 min-h-screen bg-zinc-950"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-mono text-xs text-noise tracking-widest mb-4">QUY TRÌNH</p>
          <h2 className="text-display text-4xl md:text-5xl lg:text-6xl text-signal">
            4 BƯỚC ĐƠN GIẢN
          </h2>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Animated Path SVG */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <svg
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
            >
              {/* Background line */}
              <line
                x1="50%"
                y1="0"
                x2="50%"
                y2="100%"
                stroke="rgba(113, 113, 122, 0.3)"
                strokeWidth="2"
                strokeDasharray="8 8"
              />

              {/* Animated line */}
              <motion.line
                x1="50%"
                y1="0"
                x2="50%"
                y2="100%"
                stroke="#f97316"
                strokeWidth="3"
                style={{
                  pathLength: scrollYProgress,
                }}
                filter="url(#glow)"
              />

              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </svg>
          </div>

          {/* Steps */}
          <div className="relative space-y-24">
            {steps.map((step, index) => (
              <ProcessStep
                key={step.id}
                step={step}
                index={index}
                scrollProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ProcessStepProps {
  step: typeof steps[0];
  index: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}

function ProcessStep({ step, index, scrollProgress }: ProcessStepProps) {
  const isEven = index % 2 === 0;
  const Icon = step.icon;

  // Calculate when this step should be "active" based on scroll
  const stepProgress = useTransform(
    scrollProgress,
    [index * 0.25, (index + 1) * 0.25],
    [0, 1]
  );

  return (
    <motion.div
      className={`relative flex items-center gap-8 ${isEven ? "flex-row" : "flex-row-reverse"}`}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Content */}
      <div className={`flex-1 ${isEven ? "text-right pr-8" : "text-left pl-8"}`}>
        <motion.div
          initial={{ opacity: 0.5 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-mono text-xs text-noise mb-2">BƯỚC {step.id}</p>
          <h3 className="text-display text-2xl md:text-3xl text-signal mb-2">
            {step.title}
          </h3>
          <p className="text-mono text-sm text-noise mb-1">{step.description}</p>
          <p className="text-mono text-xs text-zinc-600">{step.detail}</p>
        </motion.div>
      </div>

      {/* Icon Node */}
      <motion.div
        className="relative z-10 flex-shrink-0"
        whileHover={{ scale: 1.1 }}
      >
        <motion.div
          className="w-16 h-16 rounded-full bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center transition-colors duration-300"
          whileInView={{
            borderColor: "#f97316",
            backgroundColor: "rgba(249, 115, 22, 0.1)",
          }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <Icon className="w-6 h-6 text-orange-500" />
        </motion.div>

        {/* Pulse effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-orange-500"
          initial={{ scale: 1, opacity: 0 }}
          whileInView={{
            scale: [1, 1.5, 1.5],
            opacity: [0.5, 0, 0],
          }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, times: [0, 0.5, 1] }}
        />
      </motion.div>

      {/* Empty space for alignment */}
      <div className="flex-1" />
    </motion.div>
  );
}
