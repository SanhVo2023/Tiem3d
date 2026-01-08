"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MagneticButton } from "@/components/ui";

interface ServiceSpec {
  label: string;
  value: string;
}

interface ServiceImage {
  src?: string;
  caption?: string;
}

interface ServiceTemplateProps {
  title: string;
  subtitle?: string;
  description: string;
  specs: ServiceSpec[];
  priceFrom: string;
  images: ServiceImage[];
  accentColor?: "orange" | "cyan";
}

export function ServiceTemplate({
  title,
  subtitle,
  description,
  specs,
  priceFrom,
  images,
  accentColor = "orange",
}: ServiceTemplateProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const leftY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const colorClass = accentColor === "orange" ? "text-orange-500" : "text-cyan-500";
  const borderColorClass = accentColor === "orange" ? "border-orange-500" : "border-cyan-500";

  return (
    <div ref={containerRef} className="min-h-screen bg-void">
      {/* Back Button */}
      <motion.div
        className="fixed top-8 left-8 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-noise hover:text-signal transition-colors group"
          data-cursor="BACK"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-mono text-xs">TRANG CHỦ</span>
        </Link>
      </motion.div>

      <div className="flex min-h-screen">
        {/* Left Column - Sticky Spec Sheet */}
        <motion.div
          className="w-[35%] min-h-screen sticky top-0 flex flex-col justify-between p-8 border-r border-zinc-800"
          style={{ y: leftY }}
        >
          {/* Vertical Title */}
          <div className="flex-1 flex items-center">
            <motion.h1
              className={`text-display text-6xl md:text-7xl lg:text-8xl ${colorClass} writing-mode-vertical`}
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                transform: "rotate(180deg)",
              }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {title}
            </motion.h1>
          </div>

          {/* Specs Table */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {subtitle && (
              <p className="text-mono text-xs text-noise tracking-widest">{subtitle}</p>
            )}

            <p className="text-mono text-sm text-zinc-400 leading-relaxed">
              {description}
            </p>

            {/* Spec Table */}
            <div className={`border-t ${borderColorClass} pt-6`}>
              <p className="text-mono text-xs text-noise mb-4">THÔNG SỐ KỸ THUẬT</p>
              <table className="w-full">
                <tbody>
                  {specs.map((spec, index) => (
                    <tr key={index} className="border-b border-zinc-800">
                      <td className="text-mono text-xs text-noise py-3 pr-4">
                        {spec.label}
                      </td>
                      <td className="text-mono text-sm text-signal py-3 text-right">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Price */}
            <div className="bg-zinc-900 p-6 border border-zinc-800">
              <p className="text-mono text-xs text-noise mb-2">GIÁ TỪ</p>
              <p className={`text-display text-3xl ${colorClass}`}>{priceFrom}</p>
            </div>

            {/* CTA */}
            <MagneticButton
              variant="solid"
              href="/bao-gia"
              className="w-full justify-center"
              cursorText="GỬI"
            >
              BÁO GIÁ NGAY
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Right Column - Scrolling Gallery */}
        <div className="w-[65%] p-0">
          <div className="space-y-0">
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="relative aspect-[4/3] overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                {/* Placeholder Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900">
                  {/* Decorative gradient */}
                  <div
                    className={`absolute inset-0 opacity-20 ${
                      accentColor === "orange"
                        ? "bg-gradient-to-br from-orange-500/20 to-transparent"
                        : "bg-gradient-to-br from-cyan-500/20 to-transparent"
                    }`}
                  />

                  {/* Grid pattern */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                      `,
                      backgroundSize: "40px 40px",
                    }}
                  />

                  {/* Placeholder text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-mono text-xs text-zinc-600">
                      IMAGE {index + 1}
                    </p>
                  </div>
                </div>

                {/* Caption */}
                {image.caption && (
                  <div className="absolute bottom-4 left-4 bg-void/80 backdrop-blur-sm px-3 py-2">
                    <p className="text-mono text-xs text-noise">{image.caption}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
