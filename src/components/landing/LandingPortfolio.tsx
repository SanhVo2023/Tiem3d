"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SplitText } from "@/components/animations/SplitText";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image?: string;
}

interface LandingPortfolioProps {
  title?: string;
  subtitle?: string;
  items: PortfolioItem[];
  viewAllHref?: string;
  accentColor?: "orange" | "cyan";
}

export function LandingPortfolio({
  title = "DỰ ÁN TIÊU BIỂU",
  subtitle = "Portfolio",
  items,
  viewAllHref = "/portfolio",
  accentColor = "orange",
}: LandingPortfolioProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const colors = {
    orange: {
      tag: "tag-primary",
      hover: "group-hover:border-orange-300",
      overlay: "group-hover:bg-orange-500",
    },
    cyan: {
      tag: "tag-secondary",
      hover: "group-hover:border-cyan-300",
      overlay: "group-hover:bg-cyan-500",
    },
  };

  const c = colors[accentColor];

  return (
    <section ref={ref} className="py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-end justify-between mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="text-mono-sm text-zinc-400 mb-4">{subtitle}</p>
            <h2 className="text-display text-3xl md:text-4xl lg:text-5xl text-zinc-900">
              <SplitText animation="fadeUp" staggerChildren={0.03}>
                {title}
              </SplitText>
            </h2>
          </div>
          <Link
            href={viewAllHref}
            className="hidden sm:flex items-center gap-2 text-mono text-zinc-600 hover:text-orange-500 transition-colors link-underline"
            data-cursor="XEM"
          >
            XEM TẤT CẢ
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.slice(0, 6).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              <Link
                href={`/portfolio/${item.id}`}
                className="group block"
                data-cursor="XEM"
              >
                <div
                  className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 transition-all duration-500 ${c.hover} hover:shadow-lg`}
                >
                  {/* Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100">
                    <motion.div
                      className="text-center"
                      whileHover={{ scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-zinc-200/50 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-lg bg-zinc-300/50" />
                      </div>
                      <p className="text-mono-sm text-zinc-400">IMAGE</p>
                    </motion.div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/80 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-white flex items-center justify-center"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <ArrowUpRight className="w-5 h-5 text-zinc-900" />
                    </motion.div>
                  </div>

                  {/* Category tag */}
                  <span className={`absolute top-4 left-4 tag ${c.tag}`}>
                    {item.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-4 text-lg font-semibold text-zinc-900 group-hover:text-orange-500 transition-colors">
                  {item.title}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile view all */}
        <motion.div
          className="mt-12 text-center sm:hidden"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <Link href={viewAllHref} className="btn btn-outline">
            XEM TẤT CẢ
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
