"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageCircle, Upload } from "lucide-react";
import { SplitText } from "@/components/animations/SplitText";

interface LandingCTAProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryCTA?: {
    label: string;
    href: string;
    icon?: "upload" | "arrow";
  };
  secondaryCTA?: {
    label: string;
    href: string;
  };
  accentColor?: "orange" | "cyan";
}

export function LandingCTA({
  title = "SẴN SÀNG BẮT ĐẦU?",
  subtitle = "Liên hệ ngay",
  description = "Nhận báo giá miễn phí trong vòng 30 phút",
  primaryCTA = { label: "GỬI YÊU CẦU BÁO GIÁ", href: "/bao-gia", icon: "upload" },
  secondaryCTA = { label: "CHAT ZALO", href: "https://zalo.me/0777863808" },
  accentColor = "orange",
}: LandingCTAProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const colors = {
    orange: {
      gradient: "from-orange-500 via-orange-600 to-orange-500",
      glow: "bg-orange-400",
    },
    cyan: {
      gradient: "from-cyan-500 via-cyan-600 to-cyan-500",
      glow: "bg-cyan-400",
    },
  };

  const c = colors[accentColor];

  return (
    <section
      ref={ref}
      className={`py-28 px-6 md:px-12 bg-gradient-to-br ${c.gradient} text-white relative overflow-hidden`}
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <motion.div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full ${c.glow} opacity-20 blur-[150px]`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 grid-bg opacity-10" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Subtitle */}
        <motion.p
          className="text-mono-sm opacity-70 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 0.7, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {subtitle}
        </motion.p>

        {/* Title */}
        <h2 className="text-display text-5xl md:text-6xl lg:text-7xl mb-8">
          <SplitText animation="slideUp" staggerChildren={0.03}>
            {title}
          </SplitText>
        </h2>

        {/* Description */}
        <motion.p
          className="text-mono-lg opacity-80 mb-12 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 0.8, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href={primaryCTA.href}
            className="group btn bg-white text-zinc-900 hover:bg-zinc-100 hover:shadow-xl"
            data-cursor="GỬI"
          >
            {primaryCTA.icon === "upload" ? (
              <Upload className="w-4 h-4 mr-2" />
            ) : (
              <ArrowRight className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-1" />
            )}
            {primaryCTA.label}
          </Link>
          <Link
            href={secondaryCTA.href}
            className="btn bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/40"
            data-cursor="CHAT"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            {secondaryCTA.label}
          </Link>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 border border-white/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-32 h-32 border border-white/10 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </section>
  );
}
