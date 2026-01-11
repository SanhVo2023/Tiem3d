"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone } from "lucide-react";

interface ContactWidgetProps {
  zaloLink?: string;
  phoneNumber?: string;
  contactName?: string;
  responseTime?: string;
}

export function ZaloWidget({
  zaloLink = "https://zalo.me/0777863808",
  phoneNumber = "0777863808",
  contactName = "Mr Sanh",
  responseTime = "5 phút",
}: ContactWidgetProps) {
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
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mb-4 min-w-[280px] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">S</span>
                  </div>
                  <motion.div
                    className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-zinc-900"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{contactName}</p>
                  <p className="text-zinc-400 text-xs">Tiệm 3D • Đang online</p>
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-zinc-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status */}
            <div className="bg-zinc-800/50 rounded-xl p-3 mb-4">
              <p className="text-xs text-zinc-400 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                Thường trả lời trong {responseTime}
              </p>
            </div>

            {/* Contact Options */}
            <div className="space-y-3">
              {/* Zalo Button */}
              <a
                href={zaloLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full p-3 bg-[#0068ff] hover:bg-[#0057d4] rounded-xl transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-white font-semibold text-sm">Chat Zalo</p>
                  <p className="text-white/70 text-xs">Nhắn tin ngay</p>
                </div>
                <motion.div
                  className="text-white/50 group-hover:text-white"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </a>

              {/* Call Button */}
              <a
                href={`tel:${phoneNumber}`}
                className="flex items-center gap-3 w-full p-3 bg-orange-500 hover:bg-orange-600 rounded-xl transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-white font-semibold text-sm">Gọi điện</p>
                  <p className="text-white/70 text-xs">{phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3")}</p>
                </div>
                <motion.div
                  className="text-white/50 group-hover:text-white"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </a>
            </div>

            {/* Opening Hours */}
            <div className="mt-4 pt-3 border-t border-zinc-800">
              <p className="text-[10px] text-zinc-500 text-center">
                Mở cửa 8:00 - 22:00 • Thủ Đức, TP.HCM
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Floating Buttons Container */}
      <div className="flex flex-col gap-3 items-end">
        {/* Call Button - Smaller, above main button */}
        {!isExpanded && (
          <motion.a
            href={`tel:${phoneNumber}`}
            className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-orange-600 transition-all"
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Gọi điện"
          >
            <Phone className="w-5 h-5 text-white" />
          </motion.a>
        )}

        {/* Main Zalo/Chat Button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative w-14 h-14 rounded-full bg-[#0068ff] flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isExpanded ? "Đóng" : "Liên hệ"}
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
              animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
          )}

          {/* Online badge */}
          {!isExpanded && (
            <div className="absolute -top-1 -right-1 flex items-center gap-1 bg-zinc-900 px-2 py-0.5 rounded-full border border-zinc-800">
              <motion.div
                className="w-2 h-2 rounded-full bg-green-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-[10px] text-white font-mono">ONLINE</span>
            </div>
          )}
        </motion.button>
      </div>
    </div>
  );
}
