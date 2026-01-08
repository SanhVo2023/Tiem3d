"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { SplitText } from "@/components/animations/SplitText";

interface ProcessStep {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface LandingProcessProps {
  title?: string;
  subtitle?: string;
  steps: ProcessStep[];
  accentColor?: "orange" | "cyan";
}

export function LandingProcess({
  title = "QUY TRÌNH LÀM VIỆC",
  subtitle = "Đơn giản và minh bạch",
  steps,
  accentColor = "orange",
}: LandingProcessProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const colors = {
    orange: {
      icon: "bg-orange-100 text-orange-500",
      iconHover: "group-hover:bg-orange-500 group-hover:text-white",
      line: "bg-zinc-200",
      lineActive: "bg-gradient-to-r from-orange-500 to-cyan-500",
      number: "text-orange-500 border-orange-500",
      numberHover: "group-hover:bg-orange-500 group-hover:text-white",
    },
    cyan: {
      icon: "bg-cyan-100 text-cyan-500",
      iconHover: "group-hover:bg-cyan-500 group-hover:text-white",
      line: "bg-zinc-200",
      lineActive: "bg-gradient-to-r from-cyan-500 to-orange-500",
      number: "text-cyan-500 border-cyan-500",
      numberHover: "group-hover:bg-cyan-500 group-hover:text-white",
    },
  };

  const c = colors[accentColor];

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-12 bg-zinc-50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-mono-sm text-zinc-400 mb-4">{subtitle}</p>
          <h2 className="text-display text-3xl md:text-4xl lg:text-5xl text-zinc-900">
            <SplitText animation="fadeUp" staggerChildren={0.03}>
              {title}
            </SplitText>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line - background */}
          <div className={`absolute top-10 left-12 right-12 h-[2px] ${c.line} hidden md:block`} />

          {/* Connecting line - animated */}
          <motion.div
            className={`absolute top-10 left-12 h-[2px] ${c.lineActive} hidden md:block`}
            style={{ width: lineWidth }}
          />

          <div className={`grid md:grid-cols-${Math.min(steps.length, 4)} gap-8`}>
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  className="relative text-center group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                >
                  {/* Step number */}
                  <motion.span
                    className={`absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border-2 flex items-center justify-center text-xs font-bold z-10 transition-all duration-300 ${c.number} ${c.numberHover}`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {index + 1}
                  </motion.span>

                  {/* Icon */}
                  <motion.div
                    className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-500 ${c.icon} ${c.iconHover}`}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="w-8 h-8" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-display text-xl text-zinc-900 mb-3 group-hover:text-orange-500 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-mono text-zinc-500 leading-relaxed">{step.description}</p>

                  {/* Hover decoration */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-zinc-200 transition-all duration-300 -z-10"
                    style={{ padding: "1rem", margin: "-1rem" }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
