"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header, Footer } from "@/components/landing";
import { ZaloWidget } from "@/components/ui";

const processSteps = [
  {
    number: "01",
    title: "Gửi file STL",
    description: "Upload file 3D của bạn. Hỗ trợ STL, OBJ, STEP, 3MF.",
  },
  {
    number: "02",
    title: "Chọn vật liệu",
    description: "PLA, PETG, ABS, TPU - tư vấn vật liệu phù hợp với ứng dụng.",
  },
  {
    number: "03",
    title: "In & Kiểm tra",
    description: "In với độ chính xác cao. QC 100% trước khi giao.",
  },
  {
    number: "04",
    title: "Giao hàng",
    description: "Đóng gói cẩn thận. Ship COD toàn quốc.",
  },
];

const portfolioItems = [
  { title: "Mechanical Gear Set", category: "Cơ khí", image: "/assets/generated/products/product-gear.png" },
  { title: "Custom Enclosure", category: "Electronics", image: "/assets/generated/products/product-enclosure.png" },
  { title: "Mounting Bracket", category: "Cơ khí", image: "/assets/generated/products/product-bracket.png" },
  { title: "Drone Frame", category: "Hobby", image: "/assets/generated/portfolio/portfolio-02.png" },
  { title: "Voronoi Lamp", category: "Decor", image: "/assets/generated/products/product-lamp.png" },
  { title: "Spiral Vase", category: "Art", image: "/assets/generated/products/product-vase.png" },
];

export default function FDMServicePage() {
  return (
    <>
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-24 px-6 md:px-12 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/generated/services/service-fdm-hero.png"
              alt="FDM Printing"
              fill
              className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-500 mb-4"
                >
                  In FDM
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-display text-4xl md:text-5xl lg:text-6xl text-zinc-900 mb-6"
                >
                  IN SỢI FDM
                  <br />
                  <span className="text-gradient">SIÊU BỀN, SIÊU TIẾT KIỆM</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-zinc-600 mb-8"
                >
                  Công nghệ in 3D phổ biến nhất thế giới. Phù hợp cho chi tiết cơ khí,
                  vỏ bảo vệ, nguyên mẫu chức năng. Giá chỉ từ 500đ/gram.
                </motion.p>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex gap-10 mb-8"
                >
                  {[
                    { value: "500đ", label: "/ gram" },
                    { value: "0.1mm", label: "Layer" },
                    { value: "24h", label: "Turnaround" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="text-3xl font-bold text-zinc-900">{stat.value}</p>
                      <p className="text-sm text-zinc-500">{stat.label}</p>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    href="/bao-gia"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white text-sm font-bold tracking-wide rounded-full hover:bg-orange-600 transition-colors"
                  >
                    BÁO GIÁ NGAY →
                  </Link>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="/assets/generated/workspace/printer-bambu-closeup.png"
                  alt="Bambu Lab Printer"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Materials Section */}
        <section className="py-20 px-6 md:px-12 bg-zinc-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-500 mb-4">Vật liệu</p>
              <h2 className="text-display text-3xl md:text-4xl text-zinc-900">CHỌN VẬT LIỆU PHÙ HỢP</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/assets/generated/services/service-fdm-materials.png"
                  alt="FDM Materials"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center space-y-6">
                {[
                  { name: "PLA", desc: "Thân thiện môi trường, dễ in, nhiều màu sắc" },
                  { name: "PETG", desc: "Chịu nhiệt tốt, bền, chống va đập" },
                  { name: "ABS", desc: "Chịu lực cao, chịu nhiệt, dùng ngoài trời" },
                  { name: "TPU", desc: "Đàn hồi, dẻo, chống mài mòn" },
                ].map((mat) => (
                  <div key={mat.name} className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-600 font-bold">{mat.name[0]}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-900">{mat.name}</h3>
                      <p className="text-sm text-zinc-600">{mat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <ProcessSection steps={processSteps} />

        {/* Portfolio Section */}
        <section className="py-20 px-6 md:px-12 bg-zinc-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-500 mb-4">Portfolio</p>
              <h2 className="text-display text-3xl md:text-4xl text-zinc-900">SẢN PHẨM FDM</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {portfolioItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative aspect-square rounded-2xl overflow-hidden"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div>
                      <span className="text-xs text-orange-400 uppercase">{item.category}</span>
                      <h3 className="text-white font-bold">{item.title}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 md:px-12 bg-zinc-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-display text-3xl md:text-4xl text-white mb-6">
              CÓ FILE STL?
            </h2>
            <p className="text-zinc-400 mb-8">
              Upload file - nhận báo giá trong 15 phút
            </p>
            <Link
              href="/bao-gia"
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white text-sm font-bold tracking-wide rounded-full hover:bg-orange-600 transition-colors"
            >
              BÁO GIÁ NGAY →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <ZaloWidget />
    </>
  );
}

function ProcessSection({ steps }: { steps: typeof processSteps }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-500 mb-4">4 bước</p>
          <h2 className="text-display text-3xl md:text-4xl text-zinc-900">QUY TRÌNH ĐƠN GIẢN</h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-orange-600">{step.number}</span>
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-2">{step.title}</h3>
              <p className="text-sm text-zinc-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
