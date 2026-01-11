"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Upload, MessageCircle } from "lucide-react";
import { MagneticButton } from "@/components/ui";

export function CTAFooter() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  return (
    <section
      ref={containerRef}
      className="relative py-32 px-8 min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Gradient orbs */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] -translate-y-1/2 rounded-full bg-orange-500/5 blur-[150px]" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[150px]" />

      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto"
        style={{ opacity, y }}
      >
        {/* Main Text */}
        <motion.h2
          className="text-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-signal mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          SẴN SÀNG
          <br />
          <span className="text-gradient">CHƯA?</span>
        </motion.h2>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Upload Button */}
          <motion.a
            href="/bao-gia"
            className="group relative flex-1 max-w-xs"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-cursor="GỬI"
          >
            <div className="relative bg-orange-500 hover:bg-orange-400 text-void px-12 py-8 transition-colors overflow-hidden">
              {/* Hover effect */}
              <motion.div
                className="absolute inset-0 bg-orange-400"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative z-10 flex flex-col items-center gap-4">
                <Upload className="w-8 h-8" />
                <span className="text-display text-xl">GỬI FILE STL</span>
                <span className="text-mono text-xs opacity-70">NHẬN BÁO GIÁ TRONG 30 PHÚT</span>
              </div>
            </div>
          </motion.a>

          {/* Zalo Button */}
          <motion.a
            href="https://zalo.me/0777863808"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex-1 max-w-xs"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-cursor="CHAT"
          >
            <div className="relative bg-transparent border-2 border-zinc-700 hover:border-cyan-500 text-signal px-12 py-8 transition-colors overflow-hidden">
              {/* Hover effect */}
              <motion.div
                className="absolute inset-0 bg-cyan-500/10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative z-10 flex flex-col items-center gap-4">
                <MessageCircle className="w-8 h-8 text-cyan-500" />
                <span className="text-display text-xl">ZALO OA</span>
                <span className="text-mono text-xs text-noise">TƯ VẤN TRỰC TIẾP 24/7</span>
              </div>
            </div>
          </motion.a>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          className="mt-24 pt-8 border-t border-zinc-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo / Brand */}
            <div className="text-left">
              <h3 className="text-display text-2xl text-signal">Tiệm 3D</h3>
              <p className="text-mono text-xs text-noise mt-1">TỪ Ý TƯỞNG ĐẾN SẢN PHẨM</p>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col md:flex-row gap-8 text-mono text-xs text-noise">
              <div>
                <p className="text-zinc-600 mb-1">ZALO / ĐIỆN THOẠI</p>
                <p className="text-signal">0777 863 808</p>
              </div>
              <div>
                <p className="text-zinc-600 mb-1">ĐỊA CHỈ</p>
                <p className="text-signal">Thủ Đức, TP.HCM</p>
              </div>
              <div>
                <p className="text-zinc-600 mb-1">GIỜ LÀM VIỆC</p>
                <p className="text-signal">8:00 - 22:00</p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-mono text-xs text-zinc-600 mt-8">
            © 2024 TIỆM 3D. ALL RIGHTS RESERVED.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
