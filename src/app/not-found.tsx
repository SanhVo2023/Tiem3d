"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Home, Search, MessageCircle } from "lucide-react";
import { MagneticElement } from "@/components/animations/MagneticElement";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(249, 115, 22, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(249, 115, 22, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating Blobs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px]"
        animate={{
          scale: [1.1, 1, 1.1],
          x: [0, -20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Giant 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="relative mb-8"
        >
          <span
            className="text-[30vw] md:text-[20vw] font-black leading-none tracking-tighter"
            style={{
              WebkitTextStroke: "2px rgba(249, 115, 22, 0.3)",
              WebkitTextFillColor: "transparent",
            }}
          >
            404
          </span>
          {/* Glowing "4" */}
          <motion.span
            className="absolute top-0 left-0 text-[30vw] md:text-[20vw] font-black leading-none tracking-tighter text-gradient opacity-50"
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            404
          </motion.span>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-display text-2xl md:text-4xl text-white mb-4">
            KHÔNG TÌM THẤY TRANG
          </h1>
          <p className="text-zinc-400 text-base md:text-lg mb-8 max-w-md mx-auto">
            Trang bạn tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không khả dụng.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MagneticElement strength={0.15}>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-zinc-900 font-bold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300"
            >
              <Home className="w-5 h-5" />
              Về trang chủ
            </Link>
          </MagneticElement>

          <MagneticElement strength={0.15}>
            <Link
              href="/bao-gia"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-zinc-700 text-white font-bold rounded-full hover:border-orange-500 hover:text-orange-500 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              Liên hệ hỗ trợ
            </Link>
          </MagneticElement>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-12 pt-8 border-t border-zinc-800"
        >
          <p className="text-xs text-zinc-600 uppercase tracking-widest mb-4">
            Trang phổ biến
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: "In FDM", href: "/dich-vu/in-fdm" },
              { name: "In Resin", href: "/dich-vu/in-resin" },
              { name: "Portfolio", href: "/portfolio" },
              { name: "Báo giá", href: "/bao-gia" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-400 text-sm rounded-full hover:border-orange-500 hover:text-orange-500 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-8"
        >
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Quay lại trang trước</span>
          </button>
        </motion.div>
      </div>

      {/* Decorative 3D Elements */}
      <motion.div
        className="absolute top-[20%] right-[10%] w-16 h-16 border-2 border-orange-500/20 rounded-xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ transform: "perspective(500px) rotateX(45deg) rotateZ(45deg)" }}
      />
      <motion.div
        className="absolute bottom-[25%] left-[15%] w-12 h-12 border-2 border-cyan-500/20 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
