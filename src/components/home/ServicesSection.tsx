"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Pen, Printer, Paintbrush, Package, Cog, Heart, Sparkles } from "lucide-react";

const services = [
  {
    id: "modeling",
    title: "THIẾT KẾ 3D",
    tag: "TỪ Ý TƯỞNG",
    description: "Biến phác thảo của bạn thành file 3D chuyên nghiệp. Từ concept đến model hoàn chỉnh, sẵn sàng in.",
    specs: ["Blender / Fusion 360", "Mechanical / Organic", "Reverse Engineering"],
    icon: Pen,
    color: "cyan",
    href: "/dich-vu/thiet-ke-3d",
  },
  {
    id: "fdm",
    title: "IN SỢI FDM",
    tag: "SIÊU BỀN",
    description: "Công nghệ in 3D phổ biến nhất. Phù hợp cho chi tiết cơ khí, vỏ bảo vệ, nguyên mẫu chức năng.",
    specs: ["PLA / PETG / ABS", "0.1 - 0.3mm Layer", "300x300x400mm"],
    icon: Printer,
    color: "orange",
    href: "/dich-vu/fdm",
  },
  {
    id: "resin",
    title: "IN RESIN 8K",
    tag: "SIÊU MỊN",
    description: "Độ phân giải cực cao cho chi tiết tinh xảo. Hoàn hảo cho mô hình, trang sức, nha khoa.",
    specs: ["0.05mm Layer", "8K Resolution", "Dental / Jewelry"],
    icon: Sparkles,
    color: "cyan",
    href: "/dich-vu/resin",
  },
  {
    id: "pod",
    title: "IN HÀNG LOẠT",
    tag: "POD",
    description: "Print-on-Demand cho số lượng lớn. 20+ máy in chạy đồng thời. Giá tốt nhất cho batch lớn.",
    specs: ["20+ Printers", "Fast Turnaround", "Bulk Pricing"],
    icon: Package,
    color: "orange",
    href: "/dich-vu/pod",
  },
  {
    id: "finishing",
    title: "SƠN & HẬU KỲ",
    tag: "HOÀN THIỆN",
    description: "Xử lý bề mặt chuyên nghiệp. Sơn màu, mạ kim loại, đánh bóng, lắp ráp.",
    specs: ["Airbrush / Spray", "Chrome Plating", "Assembly"],
    icon: Paintbrush,
    color: "gradient",
    href: "/dich-vu/hoan-thien",
  },
  {
    id: "project",
    title: "DỰ ÁN TRỌN GÓI",
    tag: "END-TO-END",
    description: "Từ ý tưởng đến sản phẩm hoàn chỉnh. Chúng tôi lo toàn bộ quy trình cho bạn.",
    specs: ["Consultation", "Design to Print", "Delivery"],
    icon: Cog,
    color: "gradient",
    href: "/dich-vu/du-an",
  },
];

const verticals = [
  { name: "Figures & Mô hình", icon: "🎭" },
  { name: "Cơ khí & Prototype", icon: "⚙️" },
  { name: "Nha khoa", icon: "🦷" },
  { name: "Y tế", icon: "🏥" },
  { name: "Nghệ thuật & Decor", icon: "🎨" },
  { name: "Cosplay & Props", icon: "🎮" },
];

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate horizontal scroll based on vertical scroll
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section
      ref={containerRef}
      className="relative h-[400vh]"
    >
      {/* Section Header - Fixed at top */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Header */}
        <div className="absolute top-16 left-8 z-10">
          <p className="text-mono text-xs text-noise tracking-widest mb-2">DỊCH VỤ</p>
          <h2 className="text-display text-4xl md:text-5xl text-signal">
            CHÚNG TÔI LÀM GÌ?
          </h2>
        </div>

        {/* Verticals Tags */}
        <motion.div
          className="absolute top-16 right-8 z-10 hidden lg:flex flex-wrap gap-2 max-w-md justify-end"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {verticals.map((v, i) => (
            <motion.span
              key={v.name}
              className="text-mono text-xs text-noise bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {v.icon} {v.name}
            </motion.span>
          ))}
        </motion.div>

        {/* Progress indicator */}
        <div className="absolute top-32 right-8 z-10">
          <motion.div
            className="w-24 h-1 bg-zinc-800 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-orange-500"
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            />
          </motion.div>
        </div>

        {/* Horizontal scroll container */}
        <div className="absolute inset-0 flex items-center pt-24">
          <motion.div
            className="flex gap-8 px-8"
            style={{ x }}
          >
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  service: typeof services[0];
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <Link href={service.href}>
      <motion.div
        className="relative flex-shrink-0 w-[85vw] md:w-[50vw] lg:w-[35vw] h-[70vh] rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800 group cursor-pointer"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 0.98 }}
        data-cursor="XEM"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-50">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(${service.color === "orange" ? "rgba(249, 115, 22, 0.03)" : service.color === "cyan" ? "rgba(6, 182, 212, 0.03)" : "rgba(249, 115, 22, 0.02)"} 1px, transparent 1px),
                linear-gradient(90deg, ${service.color === "orange" ? "rgba(249, 115, 22, 0.03)" : service.color === "cyan" ? "rgba(6, 182, 212, 0.03)" : "rgba(6, 182, 212, 0.02)"} 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Placeholder Image Area */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/80 to-transparent" />

          {/* Decorative icon */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Icon
              className={`w-24 h-24 ${
                service.color === "orange" ? "text-orange-500/20" :
                service.color === "cyan" ? "text-cyan-500/20" :
                "text-zinc-700"
              }`}
            />
          </div>
        </motion.div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-8">
          {/* Tag */}
          <div className="self-end">
            <span
              className={`text-mono text-xs px-3 py-1 border ${
                service.color === "orange" ? "text-orange-500 border-orange-500" :
                service.color === "cyan" ? "text-cyan-500 border-cyan-500" :
                "text-signal border-zinc-600"
              }`}
            >
              {service.tag}
            </span>
          </div>

          {/* Bottom content */}
          <div className="space-y-6">
            {/* Icon + Title */}
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  service.color === "orange" ? "bg-orange-500/10 text-orange-500" :
                  service.color === "cyan" ? "bg-cyan-500/10 text-cyan-500" :
                  "bg-zinc-800 text-signal"
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-display text-3xl md:text-4xl text-signal">
                {service.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-mono text-sm text-noise max-w-md leading-relaxed">
              {service.description}
            </p>

            {/* Specs */}
            <div className="flex flex-wrap gap-3">
              {service.specs.map((spec, i) => (
                <span
                  key={i}
                  className="text-mono text-xs text-noise bg-zinc-800/50 px-3 py-1 rounded"
                >
                  {spec}
                </span>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              className="flex items-center gap-2 text-signal group-hover:text-orange-500 transition-colors"
              whileHover={{ x: 10 }}
            >
              <span className="text-mono text-sm">XEM CHI TIẾT</span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>

        {/* Hover border effect */}
        <motion.div
          className={`absolute inset-0 border-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity ${
            service.color === "orange" ? "border-orange-500" :
            service.color === "cyan" ? "border-cyan-500" :
            "border-gradient"
          }`}
          style={{
            borderImage: service.color === "gradient"
              ? "linear-gradient(135deg, #f97316, #06b6d4) 1"
              : undefined,
          }}
        />
      </motion.div>
    </Link>
  );
}
