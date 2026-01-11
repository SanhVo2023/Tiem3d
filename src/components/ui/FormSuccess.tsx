"use client";

import { motion } from "framer-motion";
import { CheckCircle, PartyPopper } from "lucide-react";
import Link from "next/link";

interface FormSuccessProps {
  title?: string;
  message?: string;
  onReset?: () => void;
}

export function FormSuccess({
  title = "Gửi thành công!",
  message = "Chúng tôi sẽ liên hệ với bạn trong vòng 30 phút.",
  onReset,
}: FormSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="text-center py-12 px-6"
    >
      {/* Success Icon Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.1,
        }}
        className="relative inline-block mb-6"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        {/* Celebration particles */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute -top-2 -right-2"
        >
          <PartyPopper className="w-8 h-8 text-orange-500" />
        </motion.div>
      </motion.div>

      {/* Success rings */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full border-2 border-green-400/30"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1 + i * 0.3, opacity: 0 }}
            transition={{
              duration: 1.5,
              delay: 0.3 + i * 0.2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
        ))}
      </motion.div>

      {/* Text Content */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-display text-2xl md:text-3xl text-signal mb-4"
      >
        {title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-noise text-mono text-sm mb-8 max-w-md mx-auto"
      >
        {message}
      </motion.p>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        {onReset && (
          <button
            onClick={onReset}
            className="px-6 py-3 bg-zinc-800 text-signal text-mono text-sm rounded-lg hover:bg-zinc-700 transition-colors"
          >
            Gửi yêu cầu khác
          </button>
        )}
        <Link
          href="/"
          className="px-6 py-3 bg-orange-500 text-white text-mono text-sm rounded-lg hover:bg-orange-600 transition-colors"
        >
          Về trang chủ
        </Link>
      </motion.div>
    </motion.div>
  );
}
