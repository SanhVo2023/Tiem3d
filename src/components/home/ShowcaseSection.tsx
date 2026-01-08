"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

// Showcase items with different aspect ratios for Pinterest masonry effect
const showcaseItems = [
  // Figures & Collectibles
  { id: 1, category: "figures", title: "Anime Figure", subtitle: "Resin 8K", aspectRatio: "3/4", color: "cyan" },
  { id: 2, category: "figures", title: "Mecha Robot", subtitle: "FDM + Paint", aspectRatio: "4/5", color: "orange" },
  { id: 3, category: "figures", title: "Character Bust", subtitle: "Resin", aspectRatio: "1/1", color: "cyan" },

  // Mechanical & Functional
  { id: 4, category: "mechanical", title: "Gear Assembly", subtitle: "PETG", aspectRatio: "1/1", color: "orange" },
  { id: 5, category: "mechanical", title: "Enclosure", subtitle: "ABS", aspectRatio: "4/3", color: "orange" },
  { id: 6, category: "mechanical", title: "Prototype", subtitle: "PLA", aspectRatio: "3/4", color: "cyan" },

  // Art & Decor
  { id: 7, category: "art", title: "Geometric Lamp", subtitle: "PLA White", aspectRatio: "4/5", color: "gradient" },
  { id: 8, category: "art", title: "Abstract Sculpture", subtitle: "Resin", aspectRatio: "3/4", color: "cyan" },
  { id: 9, category: "art", title: "Voronoi Vase", subtitle: "Gradient PLA", aspectRatio: "2/3", color: "orange" },

  // Dental & Medical
  { id: 10, category: "medical", title: "Dental Model", subtitle: "Dental Resin", aspectRatio: "4/3", color: "cyan" },
  { id: 11, category: "medical", title: "Anatomical Heart", subtitle: "Clear Resin", aspectRatio: "1/1", color: "cyan" },

  // Cosplay & Props
  { id: 12, category: "cosplay", title: "Helmet", subtitle: "FDM + Chrome", aspectRatio: "3/4", color: "orange" },
  { id: 13, category: "cosplay", title: "Armor Piece", subtitle: "PLA + Paint", aspectRatio: "4/5", color: "gradient" },
  { id: 14, category: "cosplay", title: "Prop Weapon", subtitle: "FDM", aspectRatio: "16/9", color: "orange" },

  // More items
  { id: 15, category: "figures", title: "Diorama", subtitle: "Mixed Media", aspectRatio: "16/9", color: "gradient" },
  { id: 16, category: "mechanical", title: "Custom Jig", subtitle: "Carbon Fiber", aspectRatio: "1/1", color: "orange" },
];

const categories = [
  { id: "all", label: "TẤT CẢ" },
  { id: "figures", label: "FIGURES" },
  { id: "mechanical", label: "CƠ KHÍ" },
  { id: "art", label: "NGHỆ THUẬT" },
  { id: "medical", label: "Y TẾ" },
  { id: "cosplay", label: "COSPLAY" },
];

export function ShowcaseSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState<typeof showcaseItems[0] | null>(null);

  const filteredItems = activeCategory === "all"
    ? showcaseItems
    : showcaseItems.filter(item => item.category === activeCategory);

  return (
    <section className="relative py-32 px-8 min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-mono text-xs text-noise tracking-widest mb-4">SHOWCASE</p>
          <h2 className="text-display text-4xl md:text-5xl lg:text-6xl text-signal mb-8">
            DỰ ÁN NỔI BẬT
          </h2>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-mono text-xs px-4 py-2 border transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-orange-500 border-orange-500 text-void"
                    : "bg-transparent border-zinc-700 text-noise hover:border-orange-500 hover:text-orange-500"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Pinterest Masonry Grid */}
        <motion.div
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <ShowcaseCard
                key={item.id}
                item={item}
                index={index}
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-mono text-sm text-noise mb-4">
            Muốn dự án của bạn xuất hiện ở đây?
          </p>
          <a
            href="/bao-gia"
            className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors"
          >
            <span className="text-mono text-sm">BẮT ĐẦU DỰ ÁN</span>
            <span>→</span>
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

interface ShowcaseCardProps {
  item: typeof showcaseItems[0];
  index: number;
  onClick: () => void;
}

function ShowcaseCard({ item, index, onClick }: ShowcaseCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="break-inside-avoid mb-4"
    >
      <motion.div
        className="relative overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800 group cursor-pointer"
        style={{ aspectRatio: item.aspectRatio }}
        onClick={onClick}
        whileHover={{ scale: 0.98 }}
        data-cursor="XEM"
      >
        {/* Placeholder Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900">
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(${item.color === "orange" ? "rgba(249, 115, 22, 0.1)" : item.color === "cyan" ? "rgba(6, 182, 212, 0.1)" : "rgba(249, 115, 22, 0.05)"} 1px, transparent 1px),
                linear-gradient(90deg, ${item.color === "orange" ? "rgba(249, 115, 22, 0.1)" : item.color === "cyan" ? "rgba(6, 182, 212, 0.1)" : "rgba(6, 182, 212, 0.05)"} 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />

          {/* Decorative glow */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-[60px] opacity-30 ${
              item.color === "orange" ? "bg-orange-500" :
              item.color === "cyan" ? "bg-cyan-500" :
              "bg-gradient-to-r from-orange-500 to-cyan-500"
            }`}
          />

          {/* Placeholder text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-mono text-xs text-zinc-600">{item.id}</p>
          </div>
        </div>

        {/* Overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h4 className="text-display text-lg text-signal">{item.title}</h4>
          <p className="text-mono text-xs text-noise">{item.subtitle}</p>
        </div>

        {/* Zoom icon */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-8 rounded-full bg-void/80 flex items-center justify-center">
            <ZoomIn className="w-4 h-4 text-signal" />
          </div>
        </div>

        {/* Category tag */}
        <div className="absolute top-4 left-4">
          <span
            className={`text-mono text-[10px] px-2 py-1 rounded ${
              item.color === "orange" ? "bg-orange-500/20 text-orange-500" :
              item.color === "cyan" ? "bg-cyan-500/20 text-cyan-500" :
              "bg-zinc-800 text-signal"
            }`}
          >
            {item.category.toUpperCase()}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface LightboxProps {
  item: typeof showcaseItems[0];
  onClose: () => void;
}

function Lightbox({ item, onClose }: LightboxProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-void/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-signal hover:text-orange-500 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Content */}
      <motion.div
        className="relative max-w-4xl w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image placeholder */}
        <div
          className="relative rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800"
          style={{ aspectRatio: item.aspectRatio }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
            <div className="text-center">
              <p className="text-display text-2xl text-signal mb-2">{item.title}</p>
              <p className="text-mono text-sm text-noise">{item.subtitle}</p>
              <p className="text-mono text-xs text-zinc-600 mt-4">
                [Image placeholder - replace with actual image]
              </p>
            </div>
          </div>
        </div>

        {/* Info bar */}
        <div className="flex items-center justify-between mt-4 p-4 bg-zinc-900 rounded-lg border border-zinc-800">
          <div>
            <h3 className="text-display text-xl text-signal">{item.title}</h3>
            <p className="text-mono text-sm text-noise">{item.subtitle}</p>
          </div>
          <span
            className={`text-mono text-xs px-3 py-1 border ${
              item.color === "orange" ? "text-orange-500 border-orange-500" :
              item.color === "cyan" ? "text-cyan-500 border-cyan-500" :
              "text-signal border-zinc-600"
            }`}
          >
            {item.category.toUpperCase()}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
