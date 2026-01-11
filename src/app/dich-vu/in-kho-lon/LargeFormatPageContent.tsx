"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header, Footer } from "@/components/landing";
import { ZaloWidget } from "@/components/ui";

const processSteps = [
  { number: "01", title: "Gửi file & Kích thước", description: "Upload model và cho biết kích thước mong muốn." },
  { number: "02", title: "Tối ưu & Chia nhỏ", description: "Chúng tôi tối ưu model, chia thành các phần nếu cần." },
  { number: "03", title: "In công nghiệp", description: "In trên máy công nghiệp với build volume lớn." },
  { number: "04", title: "Lắp ráp & Giao", description: "Lắp ráp các phần, hoàn thiện và giao hàng." },
];

const portfolioItems = [
  { title: "Architectural Model", category: "Kiến trúc", image: "/assets/generated/portfolio/portfolio-01.png" },
  { title: "Large Props", category: "Cosplay", image: "/assets/generated/projects/project4-06-finished.png" },
  { title: "Display Model", category: "Trưng bày", image: "/assets/generated/products/product-lamp.png" },
  { title: "Industrial Part", category: "Công nghiệp", image: "/assets/generated/products/product-enclosure.png" },
  { title: "Sculpture", category: "Nghệ thuật", image: "/assets/generated/products/product-figure-01.png" },
  { title: "Prototype", category: "Prototype", image: "/assets/generated/products/product-bracket.png" },
];

export default function LargeFormatPageContent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative py-24 px-4 md:px-12 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image src="/assets/generated/workspace/workspace-fdm-farm.png" alt="Large Format Printing" fill className="object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white" />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-sm font-semibold tracking-[0.2em] uppercase text-amber-500 mb-4">In khổ lớn</motion.p>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-display text-4xl md:text-5xl lg:text-6xl text-zinc-900 mb-6">
                IN 3D<br /><span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">KHỔ LỚN</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-zinc-600 mb-8">
                Máy in công nghiệp với build volume lên đến 500mm+. Hoàn hảo cho mô hình kiến trúc, props lớn, và prototype kích thước thực.
              </motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex gap-10 mb-8">
                {[{ value: "500mm+", label: "Build Size" }, { value: "1:1", label: "Tỷ lệ thực" }, { value: "FDM", label: "Công nghiệp" }].map((stat) => (
                  <div key={stat.label}><p className="text-3xl font-bold text-zinc-900">{stat.value}</p><p className="text-sm text-zinc-500">{stat.label}</p></div>
                ))}
              </motion.div>
              <Link href="/bao-gia" className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-white text-sm font-bold tracking-wide rounded-full hover:bg-amber-600 transition-colors">BÁO GIÁ NGAY →</Link>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/assets/generated/workspace/workspace-fdm-farm.png" alt="Large Format 3D Printer" fill className="object-cover" />
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-4 md:px-12 bg-zinc-900 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-amber-400 mb-4">Đặc điểm</p>
              <h2 className="text-display text-3xl md:text-4xl text-white">LỚN HƠN, MẠNH HƠN</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Build Volume 500mm+", desc: "In các chi tiết lớn mà không cần chia nhỏ" },
                { title: "Độ bền công nghiệp", desc: "Vật liệu chịu lực, chịu nhiệt cao" },
                { title: "Lắp ráp chuyên nghiệp", desc: "Chia nhỏ và lắp ráp hoàn hảo cho model siêu lớn" },
              ].map((item) => (
                <div key={item.title} className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-amber-500/20 rounded-full flex items-center justify-center">
                    <span className="text-amber-400 text-2xl">✓</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-zinc-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section ref={ref} className="py-20 px-4 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-amber-500 mb-4">Quy trình</p>
              <h2 className="text-display text-3xl md:text-4xl text-zinc-900">CÁCH THỨC HOẠT ĐỘNG</h2>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div key={step.number} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * 0.15 }} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center"><span className="text-xl font-bold text-amber-600">{step.number}</span></div>
                  <h3 className="text-lg font-bold text-zinc-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-zinc-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 px-4 md:px-12 bg-zinc-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-amber-500 mb-4">Ứng dụng</p>
              <h2 className="text-display text-3xl md:text-4xl text-zinc-900">PHÙ HỢP CHO</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {portfolioItems.map((item, index) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group relative aspect-square rounded-2xl overflow-hidden">
                  <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div><span className="text-xs text-amber-400 uppercase">{item.category}</span><h3 className="text-white font-bold">{item.title}</h3></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 md:px-12 bg-zinc-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-display text-3xl md:text-4xl text-white mb-6">CẦN IN CHI TIẾT LỚN?</h2>
            <p className="text-zinc-400 mb-8">Gửi file và kích thước mong muốn - nhận báo giá trong 30 phút</p>
            <Link href="/bao-gia" className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-white text-sm font-bold tracking-wide rounded-full hover:bg-amber-600 transition-colors">BÁO GIÁ NGAY →</Link>
          </div>
        </section>
      </main>
      <Footer />
      <ZaloWidget />
    </>
  );
}
