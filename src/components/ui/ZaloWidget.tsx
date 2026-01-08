"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

interface ZaloWidgetProps {
  zaloLink?: string;
  responseTime?: string;
}

export function ZaloWidget({
  zaloLink = "https://zalo.me/0123456789", // Placeholder - replace with actual
  responseTime = "5 phút",
}: ZaloWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-4 min-w-[260px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                  {/* Zalo Icon */}
                  <div className="w-10 h-10 rounded-full bg-[#0068ff] flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  {/* Online indicator */}
                  <motion.div
                    className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-zinc-900"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
                <div>
                  <p className="text-signal text-sm font-medium">Chat với chúng tôi</p>
                  <p className="text-noise text-xs">Đang online</p>
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-noise hover:text-signal transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status */}
            <div className="bg-zinc-800/50 rounded-md p-3 mb-4">
              <p className="text-mono text-xs text-noise">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2" />
                Trả lời trong {responseTime}
              </p>
            </div>

            {/* CTA Button */}
            <a
              href={zaloLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#0068ff] hover:bg-[#0057d4] text-white text-center py-3 rounded-md transition-colors font-medium"
            >
              Mở Zalo
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative w-14 h-14 rounded-full bg-[#0068ff] flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        data-cursor="CHAT"
      >
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!isExpanded && (
          <motion.div
            className="absolute inset-0 rounded-full bg-[#0068ff]"
            animate={{
              scale: [1, 1.4],
              opacity: [0.4, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        )}

        {/* Online badge */}
        {!isExpanded && (
          <div className="absolute -top-1 -right-1 flex items-center gap-1 bg-zinc-900 px-2 py-0.5 rounded-full border border-zinc-800">
            <motion.div
              className="w-2 h-2 rounded-full bg-green-500"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="text-[10px] text-signal font-mono">ONLINE</span>
          </div>
        )}
      </motion.button>
    </div>
  );
}
