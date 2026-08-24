"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui";

export function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Static Background */}
      <div className="absolute inset-0 z-0">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />

        {/* Static gradient orbs - no animation */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-orange-500/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(249, 115, 22, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(249, 115, 22, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Brand Logo */}
      <motion.div
        className="absolute top-8 left-8 z-30"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-display text-xl md:text-2xl text-zinc-100">
          Tiệm 3D
        </h2>
        <p className="text-mono text-xs text-zinc-500 tracking-widest mt-1">
          TỪ Ý TƯỞNG ĐẾN SẢN PHẨM
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center px-4">
          {/* Main Text */}
          <motion.h1
            className="text-display"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="block text-5xl md:text-7xl lg:text-8xl"
              style={{
                background: "linear-gradient(135deg, #f4f4f5 0%, #a1a1aa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              TỪ Ý TƯỞNG
            </span>
            <span
              className="block text-5xl md:text-7xl lg:text-8xl mt-2"
              style={{
                background: "linear-gradient(135deg, #f97316 0%, #06b6d4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ĐẾN THỰC TẾ.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-mono text-sm md:text-base text-zinc-500 mt-6 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Thiết kế 3D • In 3D • Hoàn thiện sản phẩm
          </motion.p>
        </div>
      </div>

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
            href="https://zalo.me/0384844730"
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
    </section>
  );
}
