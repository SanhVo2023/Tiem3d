"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header, Footer } from "@/components/landing";
import { ZaloWidget } from "@/components/ui";

const processSteps = [
  { number: "01", title: "Gửi file & Số lượng", description: "Upload file 3D và cho biết số lượng cần in." },
  { number: "02", title: "Báo giá bulk", description: "Nhận báo giá với discount lên đến 40%." },
  { number: "03", title: "Sản xuất hàng loạt", description: "20+ máy in chạy đồng thời. QC từng sản phẩm." },
  { number: "04", title: "Đóng gói & Giao", description: "Đóng gói theo yêu cầu. Giao hàng nhanh." },
];

const portfolioItems = [
  { title: "Batch Production", category: "Industrial", image: "/assets/generated/services/service-batch-hero.png" },
  { title: "Print Farm", category: "Workspace", image: "/assets/generated/services/service-batch-farm.png" },
  { title: "Mass Parts", category: "Production", image: "/assets/generated/workspace/workspace-fdm-farm.png" },
  { title: "Keycaps Batch", category: "Merch", image: "/assets/generated/portfolio/portfolio-05.png" },
  { title: "Multiple Prints", category: "Production", image: "/assets/generated/products/product-bracket.png" },
  { title: "Packaged Items", category: "Shipping", image: "/assets/generated/process/process-packing.png" },
];

export default function BatchPageContent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative py-24 px-6 md:px-12 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image src="/assets/generated/services/service-batch-hero.png" alt="Batch Printing" fill className="object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white" />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-500 mb-4">Print-on-Demand</motion.p>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-display text-4xl md:text-5xl lg:text-6xl text-zinc-900 mb-6">
                IN HÀNG LOẠT<br /><span className="text-gradient">NHANH & TIẾT KIỆM</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-zinc-600 mb-8">
                20+ máy in FDM và Resin chạy 24/7. Discount lên đến 40% cho batch lớn.
              </motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex gap-10 mb-8">
                {[{ value: "20+", label: "Máy in" }, { value: "40%", label: "Discount" }, { value: "24/7", label: "Production" }].map((stat) => (
                  <div key={stat.label}><p className="text-3xl font-bold text-zinc-900">{stat.value}</p><p className="text-sm text-zinc-500">{stat.label}</p></div>
                ))}
              </motion.div>
              <Link href="/bao-gia" className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white text-sm font-bold tracking-wide rounded-full hover:bg-orange-600 transition-colors">BÁO GIÁ NGAY →</Link>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/assets/generated/workspace/workspace-fdm-farm.png" alt="Print Farm" fill className="object-cover" />
            </motion.div>
          </div>
        </section>

        {/* Process */}
        <section ref={ref} className="py-20 px-6 md:px-12 bg-zinc-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-500 mb-4">Quy trình</p>
              <h2 className="text-display text-3xl md:text-4xl text-zinc-900">QUY TRÌNH SẢN XUẤT</h2>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div key={step.number} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * 0.15 }} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center"><span className="text-xl font-bold text-orange-600">{step.number}</span></div>
                  <h3 className="text-lg font-bold text-zinc-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-zinc-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section className="py-20 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-500 mb-4">Portfolio</p>
              <h2 className="text-display text-3xl md:text-4xl text-zinc-900">DỰ ÁN BATCH</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {portfolioItems.map((item, index) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group relative aspect-square rounded-2xl overflow-hidden">
                  <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div><span className="text-xs text-orange-400 uppercase">{item.category}</span><h3 className="text-white font-bold">{item.title}</h3></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 md:px-12 bg-zinc-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-display text-3xl md:text-4xl text-white mb-6">CẦN SỐ LƯỢNG LỚN?</h2>
            <p className="text-zinc-400 mb-8">Nhận báo giá bulk với discount tốt nhất</p>
            <Link href="/bao-gia" className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white text-sm font-bold tracking-wide rounded-full hover:bg-orange-600 transition-colors">BÁO GIÁ NGAY →</Link>
          </div>
        </section>
      </main>
      <Footer />
      <ZaloWidget />
    </>
  );
}
