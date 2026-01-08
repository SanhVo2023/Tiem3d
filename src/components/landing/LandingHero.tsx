"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SplitText } from "@/components/animations/SplitText";
import { Counter } from "@/components/animations/MorphingText";

interface LandingHeroProps {
  tag: string;
  title: string;
  titleAccent?: string;
  description: string;
  primaryCTA?: {
    label: string;
    href: string;
  };
  secondaryCTA?: {
    label: string;
    href: string;
  };
  stats?: {
    value: string;
    label: string;
  }[];
  accentColor?: "orange" | "cyan";
}

export function LandingHero({
  tag,
  title,
  titleAccent,
  description,
  primaryCTA = { label: "BÁO GIÁ NGAY", href: "/bao-gia" },
  secondaryCTA = { label: "CHAT ZALO", href: "https://zalo.me/0123456789" },
  stats,
  accentColor = "orange",
}: LandingHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const accentClasses = {
    orange: {
      tag: "tag-primary",
      button: "btn-primary",
      accent: "text-gradient",
      glow: "bg-orange-500",
    },
    cyan: {
      tag: "tag-secondary",
      button: "bg-cyan-500 hover:bg-cyan-600",
      accent: "text-cyan-500",
      glow: "bg-cyan-500",
    },
  };

  const colors = accentClasses[accentColor];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center py-24 px-6 md:px-12 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        <div
          className={`absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10 ${colors.glow}`}
        />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-zinc-500/5 blur-[120px]" />
      </motion.div>

      <motion.div
        className="relative z-10 max-w-6xl mx-auto w-full"
        style={{ opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className={`tag ${colors.tag} mb-8 inline-block`}>{tag}</span>
            </motion.div>

            {/* Title */}
            <h1 className="text-display text-4xl md:text-5xl lg:text-6xl text-zinc-900 mb-6 leading-[0.95]">
              <SplitText animation="slideUp" staggerChildren={0.02} delay={0.1}>
                {title}
              </SplitText>
              {titleAccent && (
                <>
                  <br />
                  <span className={colors.accent}>
                    <SplitText animation="slideUp" staggerChildren={0.02} delay={0.3}>
                      {titleAccent}
                    </SplitText>
                  </span>
                </>
              )}
            </h1>

            {/* Description */}
            <motion.p
              className="text-mono-lg text-zinc-500 mb-10 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link
                href={primaryCTA.href}
                className={`btn ${colors.button} group`}
                data-cursor="GỬI"
              >
                {primaryCTA.label}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={secondaryCTA.href}
                className="btn btn-outline"
                data-cursor="CHAT"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {secondaryCTA.label}
              </Link>
            </motion.div>

            {/* Stats */}
            {stats && stats.length > 0 && (
              <motion.div
                className="flex gap-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {stats.map((stat, index) => {
                  const numericValue = parseInt(stat.value.replace(/\D/g, ""));
                  const suffix = stat.value.replace(/\d/g, "");
                  const isNumeric = !isNaN(numericValue) && numericValue > 0;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    >
                      <p className={`text-3xl md:text-4xl font-bold ${accentColor === "orange" ? "text-orange-500" : "text-cyan-500"}`}>
                        {isNumeric ? (
                          <Counter from={0} to={numericValue} suffix={suffix} />
                        ) : (
                          stat.value
                        )}
                      </p>
                      <p className="text-mono-sm text-zinc-400 mt-1">{stat.label}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 card-hover">
              {/* Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100">
                <div className="text-center">
                  <motion.div
                    className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                      accentColor === "orange" ? "bg-orange-100" : "bg-cyan-100"
                    }`}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className={`w-8 h-8 rounded-lg ${accentColor === "orange" ? "bg-orange-500" : "bg-cyan-500"}`} />
                  </motion.div>
                  <p className="text-mono-sm text-zinc-400">Hero Image</p>
                </div>
              </div>

              {/* Corner badges */}
              <motion.div
                className={`absolute top-4 right-4 w-3 h-3 rounded-full ${accentColor === "orange" ? "bg-orange-500" : "bg-cyan-500"}`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="absolute bottom-4 left-4 tag">{tag}</div>
            </div>

            {/* Floating decoration */}
            <motion.div
              className={`absolute -top-4 -right-4 w-24 h-24 rounded-2xl border-2 ${
                accentColor === "orange" ? "border-orange-200" : "border-cyan-200"
              } -z-10`}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
