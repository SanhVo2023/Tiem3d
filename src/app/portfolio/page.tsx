"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Header, Footer } from "@/components/landing";
import { ZaloWidget } from "@/components/ui";

const categories = [
  { id: "all", label: "Tất cả" },
  { id: "figure", label: "Figures" },
  { id: "mechanical", label: "Cơ khí" },
  { id: "cosplay", label: "Cosplay" },
  { id: "art", label: "Nghệ thuật" },
  { id: "prototype", label: "Prototype" },
];

const projects = [
  {
    id: "1",
    title: "Dragon Figurine",
    category: "figure",
    service: "Resin 8K",
    image: "/assets/generated/portfolio/portfolio-01.png"
  },
  {
    id: "2",
    title: "Drone Frame",
    category: "mechanical",
    service: "Carbon PETG",
    image: "/assets/generated/portfolio/portfolio-02.png"
  },
  {
    id: "3",
    title: "Architectural Model",
    category: "prototype",
    service: "PLA",
    image: "/assets/generated/portfolio/portfolio-03.png"
  },
  {
    id: "4",
    title: "Articulated Dragon",
    category: "art",
    service: "FDM",
    image: "/assets/generated/portfolio/portfolio-04.png"
  },
  {
    id: "5",
    title: "Custom Keycaps",
    category: "art",
    service: "Resin",
    image: "/assets/generated/portfolio/portfolio-05.png"
  },
  {
    id: "6",
    title: "Prosthetic Hand",
    category: "prototype",
    service: "PETG",
    image: "/assets/generated/portfolio/portfolio-06.png"
  },
  {
    id: "7",
    title: "Castle Diorama",
    category: "figure",
    service: "Resin + FDM",
    image: "/assets/generated/portfolio/portfolio-07.png"
  },
  {
    id: "8",
    title: "Dashboard Mount",
    category: "mechanical",
    service: "ABS",
    image: "/assets/generated/portfolio/portfolio-08.png"
  },
  {
    id: "9",
    title: "Anime Figure",
    category: "figure",
    service: "Resin 8K",
    image: "/assets/generated/products/product-figure-01.png"
  },
  {
    id: "10",
    title: "Chibi Character",
    category: "figure",
    service: "Resin",
    image: "/assets/generated/products/product-figure-02.png"
  },
  {
    id: "11",
    title: "Mecha Robot",
    category: "figure",
    service: "Resin 8K",
    image: "/assets/generated/products/product-figure-03.png"
  },
  {
    id: "12",
    title: "Planetary Gears",
    category: "mechanical",
    service: "PETG",
    image: "/assets/generated/products/product-gear.png"
  },
  {
    id: "13",
    title: "Electronics Enclosure",
    category: "prototype",
    service: "ABS",
    image: "/assets/generated/products/product-enclosure.png"
  },
  {
    id: "14",
    title: "Voronoi Lamp",
    category: "art",
    service: "PLA",
    image: "/assets/generated/products/product-lamp.png"
  },
  {
    id: "15",
    title: "Spiral Vase",
    category: "art",
    service: "Gradient PLA",
    image: "/assets/generated/products/product-vase.png"
  },
  {
    id: "16",
    title: "Iron Man Helmet",
    category: "cosplay",
    service: "FDM + Paint",
    image: "/assets/generated/projects/project4-06-finished.png"
  },
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <>
      <Header />

      <main className="pt-16 min-h-screen bg-white">
        {/* Hero */}
        <section className="py-20 px-6 md:px-12 bg-zinc-50">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-500 mb-4">Portfolio</p>
            <h1 className="text-display text-4xl md:text-5xl lg:text-6xl text-zinc-900 mb-6">
              DỰ ÁN CỦA CHÚNG TÔI
            </h1>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              Từ figure chi tiết đến chi tiết cơ khí chính xác. Khám phá những dự án chúng tôi đã thực hiện.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 px-6 md:px-12 border-b border-zinc-200 sticky top-16 bg-white/90 backdrop-blur-sm z-40">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 text-sm font-semibold rounded-full transition-all ${
                    activeCategory === cat.id
                      ? "bg-zinc-900 text-white"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-12 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              layout
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-20">
                <p className="text-zinc-500">Không có dự án nào trong danh mục này.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 md:px-12 bg-zinc-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-display text-3xl md:text-4xl mb-6">
              MUỐN DỰ ÁN CỦA BẠN Ở ĐÂY?
            </h2>
            <p className="text-zinc-400 mb-8">
              Liên hệ với chúng tôi để bắt đầu dự án của bạn
            </p>
            <a
              href="/bao-gia"
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white text-sm font-bold uppercase tracking-wider rounded-full hover:bg-orange-600 transition-colors"
            >
              Bắt đầu dự án →
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <ZaloWidget />
    </>
  );
}

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div className="group relative aspect-square rounded-2xl overflow-hidden bg-zinc-100 cursor-pointer">
        {/* Image */}
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase bg-orange-500 text-white rounded-full mb-2">
              {project.service}
            </span>
            <h3 className="text-white font-bold text-lg">{project.title}</h3>
          </div>
        </div>

        {/* Category badge */}
        <span className="absolute top-4 left-4 px-3 py-1.5 text-xs font-semibold uppercase bg-white/90 text-zinc-700 rounded-full">
          {project.category}
        </span>
      </div>
    </motion.div>
  );
}
