"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/ui";
import { SpotlightGrid } from "@/components/effects";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Text scale animation - flies towards user on scroll
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 15]);
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);

  // Video reveals as text scales
  const videoOpacity = useTransform(scrollYProgress, [0, 0.3], [0.3, 1]);

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background Grid */}
        <SpotlightGrid />

        {/* Video Background (placeholder - dark gradient for now) */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ opacity: videoOpacity }}
        >
          {/* Placeholder video background - replace with /assets/images/hero/hero-main.jpg */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-void to-zinc-950">
            {/* Animated gradient orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-orange-500/10 blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
          </div>

          {/* When you have actual video/image, use this:
          <Image
            src="/assets/images/hero/hero-main.jpg"
            alt="3D Printing Workshop"
            fill
            className="object-cover"
            priority
          />
          */}
        </motion.div>

        {/* Brand Logo */}
        <motion.div
          className="absolute top-8 left-8 z-30"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-display text-xl md:text-2xl text-signal">
            Tiệm 3D
          </h2>
          <p className="text-mono text-xs text-noise tracking-widest mt-1">
            TỪ Ý TƯỞNG ĐẾN SẢN PHẨM
          </p>
        </motion.div>

        {/* Text Mask Container */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{
            opacity: textOpacity,
          }}
        >
          <motion.div
            className="text-center px-4"
            style={{
              scale: textScale,
            }}
          >
            {/* Main Text */}
            <h1 className="text-display">
              <motion.span
                className="block text-5xl md:text-7xl lg:text-8xl text-signal"
                style={{
                  background: "linear-gradient(135deg, #f4f4f5 0%, #a1a1aa 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                TỪ Ý TƯỞNG
              </motion.span>
              <motion.span
                className="block text-5xl md:text-7xl lg:text-8xl mt-2"
                style={{
                  background: "linear-gradient(135deg, #f97316 0%, #06b6d4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                ĐẾN THỰC TẾ.
              </motion.span>
            </h1>

            {/* Subtitle */}
            <motion.p
              className="text-mono text-sm md:text-base text-noise mt-6 max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Thiết kế 3D • In 3D • Hoàn thiện sản phẩm
            </motion.p>
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="absolute bottom-20 left-0 right-0 z-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              variant="solid"
              href="/bao-gia"
              cursorText="GỬI"
            >
              BÁO GIÁ NHANH
            </MagneticButton>
            <MagneticButton
              variant="outline"
              href="https://zalo.me/0777863808"
              cursorText="CHAT"
            >
              CHAT ZALO
            </MagneticButton>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-zinc-700 rounded-full flex justify-center"
            animate={{ borderColor: ["#3f3f46", "#f97316", "#3f3f46"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-3 bg-orange-500 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
