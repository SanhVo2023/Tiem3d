"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BeforeAfterSlider } from "@/components/ui";

export function ManifestoSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const leftX = useTransform(scrollYProgress, [0, 0.5], [-100, 0]);
  const rightX = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative py-32 px-8 min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text */}
          <motion.div
            style={{ x: leftX, opacity }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.p
                className="text-mono text-xs text-noise tracking-widest"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                QUY TRÌNH
              </motion.p>
              <h2 className="text-display text-4xl md:text-5xl lg:text-6xl text-signal leading-tight">
                Từ bản vẽ 3D
                <br />
                <span className="text-noise">trên màn hình...</span>
              </h2>
            </div>

            <div className="h-px w-24 bg-gradient-to-r from-orange-500 to-cyan-500" />

            <h2 className="text-display text-4xl md:text-5xl lg:text-6xl leading-tight">
              <span className="text-noise">Đến vật thể</span>
              <br />
              <span className="text-gradient">trên tay bạn.</span>
            </h2>

            <p className="text-mono text-sm text-noise max-w-md leading-relaxed">
              Độ chính xác đến từng chi tiết. Bề mặt láng mịn hoàn hảo.
              Từ nguyên mẫu đơn lẻ đến sản xuất hàng loạt.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-zinc-800">
              <div>
                <p className="text-display text-3xl text-orange-500">0.05mm</p>
                <p className="text-mono text-xs text-noise mt-1">LAYER HEIGHT</p>
              </div>
              <div>
                <p className="text-display text-3xl text-cyan-500">8K</p>
                <p className="text-mono text-xs text-noise mt-1">RESOLUTION</p>
              </div>
              <div>
                <p className="text-display text-3xl text-signal">24h</p>
                <p className="text-mono text-xs text-noise mt-1">TURNAROUND</p>
              </div>
            </div>
          </motion.div>

          {/* Right - Before/After Slider */}
          <motion.div
            style={{ x: rightX, opacity }}
            className="relative"
          >
            {/* Decorative frame */}
            <div className="absolute -inset-4 border border-zinc-800 pointer-events-none" />
            <div className="absolute -inset-8 border border-zinc-900 pointer-events-none" />

            <BeforeAfterSlider
              beforeLabel="CAD MODEL"
              afterLabel="PRINTED"
              className="rounded-lg"
            />

            {/* Corner accents */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-orange-500" />
            <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-orange-500" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-500" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-500" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
