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
    title: "Gửi file 3D",
    description: "Upload model của bạn. Chúng tôi kiểm tra và tối ưu hóa cho resin.",
  },
  {
    number: "02",
    title: "In Resin 8K",
    description: "Độ phân giải 8K (28.5 micron). Chi tiết siêu mịn, bề mặt hoàn hảo.",
  },
  {
    number: "03",
    title: "Xử lý hậu kỳ",
    description: "Wash, cure, và loại bỏ support cẩn thận. QC từng chi tiết.",
  },
  {
    number: "04",
    title: "Đóng gói & Giao",
    description: "Bao bì chống sốc. Ship nhanh toàn quốc.",
  },
];

const portfolioItems = [
  { title: "Anime Figure", category: "Figure", image: "/assets/generated/products/product-figure-01.png" },
  { title: "Chibi Character", category: "Figure", image: "/assets/generated/products/product-figure-02.png" },
  { title: "Mecha Robot", category: "Figure", image: "/assets/generated/products/product-figure-03.png" },
  { title: "D&D Miniature", category: "Miniature", image: "/assets/generated/products/product-mini-01.png" },
  { title: "Miniature Set", category: "Miniature", image: "/assets/generated/products/product-mini-02.png" },
  { title: "Dental Model", category: "Nha khoa", image: "/assets/generated/products/product-dental.png" },
];

export default function ResinPageContent() {
  return (
    <>
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-24 px-6 md:px-12 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/generated/services/service-resin-hero.png"
              alt="Resin Printing"
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
                  className="text-sm font-semibold tracking-[0.2em] uppercase text-cyan-500 mb-4"
                >
                  In Resin 8K
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-display text-4xl md:text-5xl lg:text-6xl text-zinc-900 mb-6"
                >
                  IN RESIN 8K
                  <br />
                  <span className="bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">CHI TIẾT HOÀN HẢO</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-zinc-600 mb-8"
                >
                  Độ phân giải 8K cho chi tiết siêu mịn. Bề mặt láng không cần xử lý.
                  Hoàn hảo cho figure, trang sức, nha khoa, và mọi thứ cần độ chính xác cao.
                </motion.p>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex gap-10 mb-8"
                >
                  {[
                    { value: "8K", label: "Resolution" },
                    { value: "0.05mm", label: "Layer" },
                    { value: "28.5", label: "Micron" },
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
                    className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 text-white text-sm font-bold tracking-wide rounded-full hover:bg-cyan-600 transition-colors"
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
                  src="/assets/generated/workspace/printer-resin-closeup.png"
                  alt="Elegoo Saturn Printer"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Detail Section */}
        <section className="py-20 px-6 md:px-12 bg-zinc-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-cyan-500 mb-4">Chi tiết</p>
              <h2 className="text-display text-3xl md:text-4xl text-zinc-900">ĐỘ CHÍNH XÁC TUYỆT ĐỐI</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/assets/generated/services/service-resin-detail.png"
                  alt="Resin Detail"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center space-y-6">
                {[
                  { name: "8K Resolution", desc: "7680 x 4320 pixel, chi tiết siêu nhỏ" },
                  { name: "Layer 0.025mm", desc: "Không nhìn thấy layer, bề mặt mịn như kính" },
                  { name: "Độ chính xác ±0.05mm", desc: "Phù hợp trang sức, nha khoa, kỹ thuật" },
                  { name: "Nhiều loại resin", desc: "Standard, ABS-like, Flexible, Dental, Castable" },
                ].map((item) => (
                  <div key={item.name} className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-cyan-600 font-bold">✓</span>
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

        {/* Wash & Cure */}
        <section className="py-20 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-sm font-semibold tracking-[0.2em] uppercase text-cyan-500 mb-4">Hậu kỳ</p>
                <h2 className="text-display text-3xl md:text-4xl text-zinc-900 mb-6">WASH & CURE CHUYÊN NGHIỆP</h2>
                <p className="text-zinc-600 mb-6">
                  Quy trình hậu kỳ chuẩn với máy wash và cure chuyên dụng.
                  Đảm bảo sản phẩm sạch, cứng, và bền màu.
                </p>
                <ul className="space-y-3 text-zinc-600">
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-500">●</span> Wash IPA 2 lần, loại bỏ resin dư
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-500">●</span> Cure UV 405nm, đúng thời gian
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-500">●</span> Loại bỏ support cẩn thận, không để vết
                  </li>
                </ul>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/assets/generated/services/service-resin-wash.png"
                  alt="Wash and Cure Station"
                  fill
                  className="object-cover"
                />
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
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-cyan-500 mb-4">Portfolio</p>
              <h2 className="text-display text-3xl md:text-4xl text-zinc-900">SẢN PHẨM RESIN</h2>
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
                      <span className="text-xs text-cyan-400 uppercase">{item.category}</span>
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
              CẦN ĐỘ CHÍNH XÁC CAO?
            </h2>
            <p className="text-zinc-400 mb-8">
              Resin 8K là câu trả lời. Upload file - xem preview và nhận báo giá ngay
            </p>
            <Link
              href="/bao-gia"
              className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 text-white text-sm font-bold tracking-wide rounded-full hover:bg-cyan-600 transition-colors"
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
    <section ref={ref} className="py-20 px-6 md:px-12 bg-zinc-900 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-cyan-400 mb-4">4 bước</p>
          <h2 className="text-display text-3xl md:text-4xl text-white">QUY TRÌNH CHUYÊN NGHIỆP</h2>
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
              <div className="w-16 h-16 mx-auto mb-4 bg-cyan-500/20 border border-cyan-500/30 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-cyan-400">{step.number}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-zinc-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
