"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header, Footer } from "@/components/landing";
import { ZaloWidget } from "@/components/ui";

const processSteps = [
  { number: "01", title: "Gửi bản vẽ kỹ thuật", description: "Upload file CAD với dung sai và yêu cầu cụ thể." },
  { number: "02", title: "Review & Tối ưu", description: "Đội ngũ kỹ sư review và tối ưu cho in 3D." },
  { number: "03", title: "In chính xác", description: "In với độ chính xác ±0.1mm trên máy chuyên dụng." },
  { number: "04", title: "QC & Đo kiểm", description: "Kiểm tra kích thước, đo đạc và gửi báo cáo." },
];

const portfolioItems = [
  { title: "Mechanical Gears", category: "Cơ khí", image: "/assets/generated/products/product-gear.png" },
  { title: "Enclosure", category: "Vỏ máy", image: "/assets/generated/products/product-enclosure.png" },
  { title: "Bracket", category: "Giá đỡ", image: "/assets/generated/products/product-bracket.png" },
  { title: "Assembly Parts", category: "Lắp ghép", image: "/assets/generated/projects/project3-02-cad.png" },
  { title: "Precision Part", category: "Chính xác", image: "/assets/generated/products/product-dental.png" },
  { title: "Prototype", category: "Prototype", image: "/assets/generated/projects/project1-02-cad.png" },
];

export default function TechnicalPrintingServicePage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative py-24 px-4 md:px-12 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image src="/assets/generated/products/product-gear.png" alt="Technical Printing" fill className="object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white" />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-500 mb-4">In kỹ thuật</motion.p>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-display text-4xl md:text-5xl lg:text-6xl text-zinc-900 mb-6">
                IN CHI TIẾT<br /><span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">KỸ THUẬT</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-zinc-600 mb-8">
                Độ chính xác ±0.1mm. Phù hợp cho chi tiết cơ khí, lắp ghép chính xác, prototype kỹ thuật và sản xuất số lượng nhỏ.
              </motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex gap-10 mb-8">
                {[{ value: "±0.1mm", label: "Tolerance" }, { value: "CAD", label: "Ready" }, { value: "QC", label: "Report" }].map((stat) => (
                  <div key={stat.label}><p className="text-3xl font-bold text-zinc-900">{stat.value}</p><p className="text-sm text-zinc-500">{stat.label}</p></div>
                ))}
              </motion.div>
              <Link href="/bao-gia" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 text-white text-sm font-bold tracking-wide rounded-full hover:bg-blue-600 transition-colors">BÁO GIÁ NGAY →</Link>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/assets/generated/products/product-gear.png" alt="Technical 3D Print" fill className="object-cover" />
            </motion.div>
          </div>
        </section>

        {/* Specs */}
        <section className="py-20 px-4 md:px-12 bg-zinc-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-500 mb-4">Thông số</p>
              <h2 className="text-display text-3xl md:text-4xl text-zinc-900">ĐỘ CHÍNH XÁC CAO</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image src="/assets/generated/services/service-fdm-samples.png" alt="Technical Detail" fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-center space-y-6">
                {[
                  { name: "Tolerance ±0.1mm", desc: "Độ chính xác cao cho chi tiết lắp ghép" },
                  { name: "Nhiều vật liệu", desc: "PLA, PETG, ABS, ASA, Nylon, Carbon Fiber" },
                  { name: "Hỗ trợ file CAD", desc: "STEP, IGES, Solidworks, Fusion 360" },
                  { name: "QC Report", desc: "Báo cáo đo kiểm kích thước đầy đủ" },
                ].map((item) => (
                  <div key={item.name} className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-900">{item.name}</h3>
                      <p className="text-sm text-zinc-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section ref={ref} className="py-20 px-4 md:px-12 bg-zinc-900 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-400 mb-4">Quy trình</p>
              <h2 className="text-display text-3xl md:text-4xl text-white">QUY TRÌNH CHUYÊN NGHIỆP</h2>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div key={step.number} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * 0.15 }} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-blue-400">{step.number}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-zinc-400">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section className="py-20 px-4 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-500 mb-4">Portfolio</p>
              <h2 className="text-display text-3xl md:text-4xl text-zinc-900">DỰ ÁN KỸ THUẬT</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {portfolioItems.map((item, index) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group relative aspect-square rounded-2xl overflow-hidden">
                  <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div><span className="text-xs text-blue-400 uppercase">{item.category}</span><h3 className="text-white font-bold">{item.title}</h3></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 md:px-12 bg-zinc-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-display text-3xl md:text-4xl text-white mb-6">CẦN ĐỘ CHÍNH XÁC CAO?</h2>
            <p className="text-zinc-400 mb-8">Gửi bản vẽ kỹ thuật - nhận báo giá với thông số chi tiết</p>
            <Link href="/bao-gia" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 text-white text-sm font-bold tracking-wide rounded-full hover:bg-blue-600 transition-colors">BÁO GIÁ NGAY →</Link>
          </div>
        </section>
      </main>
      <Footer />
      <ZaloWidget />
    </>
  );
}
