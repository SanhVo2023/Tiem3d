"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header, Footer } from "@/components/landing";
import { ZaloWidget } from "@/components/ui";

const processSteps = [
  { number: "01", title: "Tư vấn & Lên ý tưởng", description: "Trao đổi chi tiết về dự án. Tư vấn giải pháp tối ưu." },
  { number: "02", title: "Thiết kế 3D", description: "Tạo model 3D theo yêu cầu. Chỉnh sửa đến khi hoàn hảo." },
  { number: "03", title: "In & Hoàn thiện", description: "In 3D + xử lý bề mặt + sơn màu theo yêu cầu." },
  { number: "04", title: "Giao sản phẩm", description: "Đóng gói cao cấp. Sản phẩm hoàn chỉnh trong tay bạn." },
];

const portfolioItems = [
  { title: "Phone Stand Project", category: "From Idea", image: "/assets/generated/projects/project1-01-sketch.png" },
  { title: "CAD Design", category: "Design", image: "/assets/generated/projects/project1-02-cad.png" },
  { title: "Printing", category: "Production", image: "/assets/generated/projects/project1-03-printing.png" },
  { title: "Finished Product", category: "Result", image: "/assets/generated/projects/project1-04-finished.png" },
  { title: "Cosplay Helmet", category: "Full Project", image: "/assets/generated/projects/project4-06-finished.png" },
  { title: "Custom Figure", category: "End to End", image: "/assets/generated/projects/project2-05-finished.png" },
];

export default function FullServicePageContent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative py-24 px-6 md:px-12 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image src="/assets/generated/workspace/workspace-overview.png" alt="Workshop" fill className="object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white" />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-500 mb-4">Dự án trọn gói</motion.p>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-display text-4xl md:text-5xl lg:text-6xl text-zinc-900 mb-6">
                TỪ Ý TƯỞNG<br /><span className="text-gradient">ĐẾN SẢN PHẨM HOÀN CHỈNH</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-zinc-600 mb-8">
                Bạn chỉ cần ý tưởng - chúng tôi lo phần còn lại. Tư vấn, thiết kế, in ấn, hoàn thiện.
              </motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex gap-10 mb-8">
                {[{ value: "End", label: "to End" }, { value: "1", label: "Liên hệ" }, { value: "100%", label: "Hài lòng" }].map((stat) => (
                  <div key={stat.label}><p className="text-3xl font-bold text-zinc-900">{stat.value}</p><p className="text-sm text-zinc-500">{stat.label}</p></div>
                ))}
              </motion.div>
              <Link href="/bao-gia" className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white text-sm font-bold tracking-wide rounded-full hover:bg-orange-600 transition-colors">BÁO GIÁ NGAY →</Link>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/assets/generated/hero/hero-main.png" alt="Full Service" fill className="object-cover" />
            </motion.div>
          </div>
        </section>

        {/* Journey Showcase */}
        <section className="py-20 px-6 md:px-12 bg-zinc-900 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-400 mb-4">Hành trình</p>
              <h2 className="text-display text-3xl md:text-4xl text-white">TỪ Ý TƯỞNG ĐẾN THỰC TẾ</h2>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[
                { img: "/assets/generated/projects/project1-01-sketch.png", label: "Sketch" },
                { img: "/assets/generated/projects/project1-02-cad.png", label: "Design" },
                { img: "/assets/generated/projects/project1-03-printing.png", label: "Print" },
                { img: "/assets/generated/projects/project1-04-finished.png", label: "Done" },
              ].map((step, i) => (
                <motion.div key={step.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative aspect-square rounded-xl overflow-hidden">
                  <Image src={step.img} alt={step.label} fill className="object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-sm font-bold text-white">{step.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section ref={ref} className="py-20 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-500 mb-4">Quy trình</p>
              <h2 className="text-display text-3xl md:text-4xl text-zinc-900">TẤT CẢ TRONG 1</h2>
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
        <section className="py-20 px-6 md:px-12 bg-zinc-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-500 mb-4">Case Studies</p>
              <h2 className="text-display text-3xl md:text-4xl text-zinc-900">DỰ ÁN HOÀN CHỈNH</h2>
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
            <h2 className="text-display text-3xl md:text-4xl text-white mb-6">CÓ Ý TƯỞNG LỚN?</h2>
            <p className="text-zinc-400 mb-8">Liên hệ tư vấn miễn phí - chúng tôi sẽ biến ý tưởng thành hiện thực</p>
            <Link href="/bao-gia" className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white text-sm font-bold tracking-wide rounded-full hover:bg-orange-600 transition-colors">BÁO GIÁ NGAY →</Link>
          </div>
        </section>
      </main>
      <Footer />
      <ZaloWidget />
    </>
  );
}
