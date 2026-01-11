"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useInView,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/landing";
import { ZaloWidget } from "@/components/ui";
import { Marquee } from "@/components/animations/Marquee";
import { MagneticElement } from "@/components/animations/MagneticElement";
import { CountUp } from "@/components/animations/CountUp";
import { TestimonialsSection, FAQSection } from "@/components/home";
import { Menu, X, ChevronDown, ArrowRight, ArrowUpRight } from "lucide-react";

// ============================================
// MAIN PAGE - SUPER PREMIUM
// ============================================
export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
  });

  // Intro loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Premium Intro Loader */}
      <AnimatePresence>
        {isLoading && <IntroLoader />}
      </AnimatePresence>

      {/* Floating Header */}
      <FloatingHeader scrollProgress={scrollProgress} />

      <main className="overflow-x-hidden">
        <CinematicHero heroRef={heroRef} scrollYProgress={scrollYProgress} />
        <TypographyMarquee />
        <ServicesSection />
        <ManifestoSection />
        <ProcessTimeline />
        <PortfolioBento />
        <StatsReveal />
        <TestimonialsSection />
        <FAQSection />
        <MagneticCTA />
      </main>
      <Footer />
      <ZaloWidget />
    </>
  );
}

// ============================================
// INTRO LOADER - Cinematic Brand Reveal
// ============================================
function IntroLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-zinc-950 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="relative">
        {/* Logo reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center"
        >
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          >
            <span className="text-display text-4xl md:text-6xl text-white block">
              TIỆM
            </span>
          </motion.div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-display text-5xl md:text-8xl text-gradient-animated"
          >
            3D
          </motion.span>
        </motion.div>

        {/* Loading bar */}
        <motion.div
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-zinc-800 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 to-cyan-500"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1, ease: "linear", repeat: 1 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ============================================
// FLOATING HEADER - Glass Morphism
// ============================================
function FloatingHeader({ scrollProgress }: { scrollProgress: number }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const showHeader = scrollProgress > 0.2;

  const services = [
    { name: "In FDM", href: "/dich-vu/in-fdm", tag: "Bền" },
    { name: "In Resin 8K", href: "/dich-vu/in-resin", tag: "Chi tiết" },
    { name: "In khổ lớn", href: "/dich-vu/in-kho-lon", tag: "500mm+" },
    { name: "In kỹ thuật", href: "/dich-vu/in-ky-thuat", tag: "±0.1mm" },
    { name: "Thiết kế 3D", href: "/dich-vu/thiet-ke-3d", tag: "CAD" },
    { name: "Hoàn thiện", href: "/dich-vu/hoan-thien", tag: "Sơn · Mạ" },
    { name: "In hàng loạt", href: "/dich-vu/in-hang-loat", tag: "-40%" },
    { name: "Trọn gói", href: "/dich-vu/du-an-tron-goi", tag: "E2E" },
  ];

  return (
    <motion.header
      className="fixed top-4 left-4 right-4 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: showHeader ? 0 : -100,
        opacity: showHeader ? 1 : 0,
      }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <span className="text-display text-lg md:text-xl text-zinc-900">
                TIỆM{" "}
                <span className="text-gradient-animated">3D</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="/">Trang chủ</NavLink>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors rounded-full hover:bg-zinc-100">
                Dịch vụ
                <motion.span
                  animate={{ rotate: isServicesOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.span>
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl border border-zinc-200 rounded-2xl shadow-2xl p-2 grid grid-cols-1 gap-1"
                  >
                    {services.map((service, i) => (
                      <motion.div
                        key={service.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                      >
                        <Link
                          href={service.href}
                          className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm text-zinc-700 hover:bg-orange-50 hover:text-orange-600 transition-colors group"
                        >
                          <span>{service.name}</span>
                          <span className="text-[10px] font-mono text-zinc-400 group-hover:text-orange-400 bg-zinc-100 group-hover:bg-orange-100 px-2 py-0.5 rounded-full">
                            {service.tag}
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink href="/portfolio">Portfolio</NavLink>

            {/* CTA Button */}
            <MagneticElement strength={0.2}>
              <Link
                href="/bao-gia"
                className="ml-2 px-6 py-2.5 bg-zinc-900 text-white text-sm font-semibold rounded-full hover:bg-orange-500 transition-all duration-300 flex items-center gap-2 group"
              >
                <span>Báo giá</span>
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </MagneticElement>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-xl hover:bg-zinc-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-4 pb-2 space-y-1">
                <MobileNavLink href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  Trang chủ
                </MobileNavLink>
                <div className="py-2">
                  <p className="text-[10px] text-zinc-400 uppercase tracking-widest px-4 mb-2">
                    Dịch vụ
                  </p>
                  {services.map((service, i) => (
                    <motion.div
                      key={service.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <MobileNavLink href={service.href} onClick={() => setIsMobileMenuOpen(false)}>
                        {service.name}
                      </MobileNavLink>
                    </motion.div>
                  ))}
                </div>
                <MobileNavLink href="/portfolio" onClick={() => setIsMobileMenuOpen(false)}>
                  Portfolio
                </MobileNavLink>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-4"
                >
                  <Link
                    href="/bao-gia"
                    className="block w-full text-center py-4 bg-zinc-900 text-white font-bold rounded-xl"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Báo giá ngay
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors rounded-full hover:bg-zinc-100"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-3 text-zinc-700 hover:bg-zinc-50 rounded-xl transition-colors"
    >
      {children}
    </Link>
  );
}

// ============================================
// CINEMATIC HERO - Giant Typography + Parallax
// ============================================
function CinematicHero({
  heroRef,
  scrollYProgress,
}: {
  heroRef: React.RefObject<HTMLDivElement | null>;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-zinc-950"
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY, scale: bgScale }}
      >
        <Image
          src="/assets/generated/hero/hero-main.png"
          alt="3D Printing Workshop"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/40 to-zinc-950" />
      </motion.div>

      {/* Grid overlay */}
      <div className="absolute inset-0 z-[1] opacity-20">
        <div className="w-full h-full grid-bg-orange" />
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-[20%] right-[10%] w-24 h-24 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-orange-500/30 to-transparent blur-2xl"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[30%] left-[5%] w-32 h-32 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-cyan-500/20 to-transparent blur-3xl"
        animate={{
          y: [0, 40, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 w-full px-4 md:px-6 text-center">
        <motion.div style={{ opacity, scale, y }} className="origin-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
            className="mb-6 md:mb-8"
          >
            <span className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-xs md:text-sm text-zinc-400 font-mono uppercase tracking-wider">
                Dịch vụ in 3D chuyên nghiệp tại Việt Nam
              </span>
            </span>
          </motion.div>

          {/* Giant Brand Typography */}
          <div className="space-y-0">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 2.4, ease: [0.76, 0, 0.24, 1] }}
                className="text-display text-[15vw] md:text-[11vw] lg:text-[9vw] leading-[0.85] tracking-tighter text-white"
              >
                CÁI TIỆM
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 2.5, ease: [0.76, 0, 0.24, 1] }}
                className="text-display text-[15vw] md:text-[11vw] lg:text-[9vw] leading-[0.85] tracking-tighter"
              >
                <span className="text-white">IN </span>
                <span className="text-gradient-animated">3D</span>
              </motion.h1>
            </div>
          </div>

          {/* Tagline with staggered reveal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.8 }}
            className="mt-8 md:mt-12"
          >
            <p className="text-base md:text-xl lg:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              <span className="text-white font-medium">Từ bản vẽ đến sản phẩm thực.</span>
              <br className="hidden md:block" />
              {" "}FDM · Resin 8K · Hoàn thiện chuyên nghiệp
            </p>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            {[
              { text: "Báo giá 30 phút", icon: "⚡" },
              { text: "Ship COD toàn quốc", icon: "📦" },
              { text: "Bảo hành sản phẩm", icon: "✓" },
            ].map((item, i) => (
              <motion.span
                key={item.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.2 + i * 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-sm text-zinc-300"
              >
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </motion.span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.4 }}
            className="mt-10 md:mt-14 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <MagneticElement strength={0.15}>
              <Link
                href="/bao-gia"
                className="group inline-flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-white text-zinc-900 font-bold text-base md:text-lg rounded-full hover:bg-orange-500 hover:text-white transition-all duration-500 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              >
                <span>BÁO GIÁ NGAY</span>
                <motion.span
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </Link>
            </MagneticElement>
            <MagneticElement strength={0.15}>
              <Link
                href="https://zalo.me/0777863808"
                className="inline-flex items-center justify-center gap-2 px-8 md:px-10 py-4 md:py-5 bg-transparent border-2 border-white/30 text-white font-bold text-base md:text-lg rounded-full hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300"
              >
                <span>CHAT ZALO</span>
              </Link>
            </MagneticElement>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
          style={{ opacity }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-zinc-500 font-mono uppercase tracking-widest">
              Scroll
            </span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-500 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// TYPOGRAPHY MARQUEE
// ============================================
function TypographyMarquee() {
  const items = [
    { text: "FDM", highlight: false },
    { text: "RESIN 8K", highlight: true },
    { text: "KHỔ LỚN", highlight: false },
    { text: "CHI TIẾT CAO", highlight: true },
    { text: "THIẾT KẾ", highlight: false },
    { text: "HOÀN THIỆN", highlight: true },
    { text: "SẢN XUẤT", highlight: false },
  ];

  return (
    <div className="py-6 bg-zinc-950 border-y border-zinc-800 overflow-hidden">
      <Marquee speed={30}>
        <div className="flex items-center gap-12 px-6">
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-12">
              <span
                className={`text-2xl md:text-4xl font-bold tracking-tight whitespace-nowrap ${
                  item.highlight ? "text-gradient" : "text-white"
                }`}
              >
                {item.text}
              </span>
              <span className="text-orange-500 text-2xl">◆</span>
            </span>
          ))}
        </div>
      </Marquee>
    </div>
  );
}

// ============================================
// SERVICES SECTION - GSAP ScrollTrigger Pin & Scroll
// Proper "horizontal scroll on vertical scroll" with pinning
// ============================================
function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      number: "01",
      title: "IN FDM",
      subtitle: "Bền · Kinh tế",
      desc: "Máy in Bambu Lab A1 Combo. Prototype, chi tiết lớn, sản phẩm chịu lực.",
      image: "/assets/generated/services/service-fdm-hero.png",
      color: "#f97316",
      href: "/dich-vu/in-fdm",
    },
    {
      number: "02",
      title: "IN RESIN 8K",
      subtitle: "Chi tiết · Siêu mịn",
      desc: "Elegoo Saturn 4 Ultra. Figure, trang sức, chi tiết micro.",
      image: "/assets/generated/services/service-resin-hero.png",
      color: "#06b6d4",
      href: "/dich-vu/in-resin",
    },
    {
      number: "03",
      title: "IN KHỔ LỚN",
      subtitle: "500mm+",
      desc: "Mô hình kiến trúc, props cosplay, prototype lớn.",
      image: "/assets/generated/workspace/workspace-fdm-farm.png",
      color: "#eab308",
      href: "/dich-vu/in-kho-lon",
    },
    {
      number: "04",
      title: "KỸ THUẬT",
      subtitle: "±0.1mm",
      desc: "Chi tiết cơ khí, bánh răng, dung sai lắp ghép.",
      image: "/assets/generated/products/product-gear.png",
      color: "#3b82f6",
      href: "/dich-vu/in-ky-thuat",
    },
    {
      number: "05",
      title: "THIẾT KẾ",
      subtitle: "CAD · 3D",
      desc: "Thiết kế model 3D từ bản vẽ hoặc mô tả.",
      image: "/assets/generated/services/service-design-hero.png",
      color: "#a855f7",
      href: "/dich-vu/thiet-ke-3d",
    },
    {
      number: "06",
      title: "HOÀN THIỆN",
      subtitle: "Sơn · Mạ",
      desc: "Xử lý bề mặt, airbrush, mạ chrome.",
      image: "/assets/generated/services/service-finish-hero.png",
      color: "#10b981",
      href: "/dich-vu/hoan-thien",
    },
    {
      number: "07",
      title: "HÀNG LOẠT",
      subtitle: "-40%",
      desc: "Print farm 24/7. Số lượng lớn, giá tối ưu.",
      image: "/assets/generated/services/service-batch-hero.png",
      color: "#ef4444",
      href: "/dich-vu/in-hang-loat",
    },
    {
      number: "08",
      title: "TRỌN GÓI",
      subtitle: "E2E",
      desc: "Từ ý tưởng đến sản phẩm hoàn chỉnh.",
      image: "/assets/generated/hero/hero-main.png",
      color: "#6366f1",
      href: "/dich-vu/du-an-tron-goi",
    },
  ];

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap").default.context> | null = null;

    // Dynamic import GSAP to avoid SSR issues
    const initGSAP = async () => {
      const gsapModule = await import("gsap");
      const ScrollTriggerModule = await import("gsap/ScrollTrigger");

      const gsap = gsapModule.default;
      const ScrollTrigger = ScrollTriggerModule.default;

      gsap.registerPlugin(ScrollTrigger);

      const track = trackRef.current;
      const section = triggerRef.current;

      if (!track || !section) return;

      // Use GSAP context for proper cleanup
      ctx = gsap.context(() => {
        // Calculate how far to scroll horizontally
        const scrollAmount = track.scrollWidth - window.innerWidth;

        // Create the horizontal scroll animation
        gsap.to(track, {
          x: -scrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 0.5,
            end: () => `+=${scrollAmount}`,
            invalidateOnRefresh: true,
          },
        });

        // Animate header content as user scrolls
        const headerContent = section.querySelector('.header-content');
        const headerBg = section.querySelector('.header-bg-elements');

        if (headerContent) {
          gsap.to(headerContent, {
            opacity: 0,
            x: -100,
            scale: 0.9,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${window.innerWidth * 0.5}`,
              scrub: 0.5,
            },
          });
        }

        if (headerBg) {
          gsap.to(headerBg, {
            opacity: 0,
            scale: 1.2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${window.innerWidth * 0.4}`,
              scrub: 0.5,
            },
          });
        }
      }, sectionRef);
    };

    initGSAP();

    // Cleanup on unmount
    return () => {
      if (ctx) {
        ctx.revert();
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      {/* The trigger/pin container */}
      <div ref={triggerRef} className="h-screen w-full overflow-hidden bg-zinc-950">
        {/* The horizontal track */}
        <div
          ref={trackRef}
          className="flex items-center h-full"
          style={{ width: "fit-content" }}
        >
          {/* HEADER PANEL - Cinematic Intro (narrower for less gap) */}
          <div className="flex-shrink-0 w-[85vw] md:w-[70vw] lg:w-[60vw] h-full relative overflow-hidden">
            {/* Background Elements - will fade out on scroll */}
            <div className="header-bg-elements">
              {/* Animated Dot Grid Background */}
              <div className="absolute inset-0 opacity-30">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle, rgba(249,115,22,0.3) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                  }}
                />
              </div>

              {/* Giant "8" Background Element */}
              <div className="absolute right-[-20%] top-1/2 -translate-y-1/2 pointer-events-none select-none">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 1.5, ease: [0.25, 0.4, 0.25, 1] }}
                >
                  <span
                    className="text-[40vh] md:text-[60vh] font-black leading-none"
                    style={{
                      WebkitTextStroke: '2px rgba(249,115,22,0.2)',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    8
                  </span>
                </motion.div>
              </div>

              {/* Floating 3D Shapes */}
              <motion.div
                className="absolute top-[15%] right-[15%] w-16 h-16 md:w-24 md:h-24"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full border-2 border-orange-500/20 rounded-xl"
                  style={{ transform: 'perspective(500px) rotateX(45deg) rotateZ(45deg)' }}
                />
              </motion.div>

              <motion.div
                className="absolute bottom-[25%] right-[25%] w-12 h-12 md:w-20 md:h-20"
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -180, -360],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full border-2 border-cyan-500/20 rounded-full" />
              </motion.div>

              <motion.div
                className="absolute top-[35%] right-[5%] w-10 h-10 md:w-16 md:h-16"
                animate={{
                  y: [0, 25, 0],
                  x: [0, -10, 0],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              >
                <div
                  className="w-full h-full bg-gradient-to-br from-orange-500/10 to-cyan-500/10 backdrop-blur-sm"
                  style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
                />
              </motion.div>
            </div>

            {/* Main Content - will animate out on scroll */}
            <div className="header-content relative h-full flex items-center">
              <div className="px-8 md:px-16 lg:px-24 max-w-4xl">
                {/* Section Label */}
                <motion.div
                  className="flex items-center gap-4 mb-8"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="w-12 h-[2px] bg-gradient-to-r from-orange-500 to-cyan-500" />
                  <span className="text-xs text-zinc-500 font-mono uppercase tracking-[0.3em]">
                    Dịch vụ
                  </span>
                </motion.div>

                {/* Main Heading with Staggered Animation */}
                <div className="mb-8">
                  <div className="overflow-hidden">
                    <motion.h2
                      className="text-display text-5xl md:text-7xl lg:text-[8rem] text-white leading-[0.85]"
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                    >
                      CHÚNG TÔI
                    </motion.h2>
                  </div>
                  <div className="overflow-hidden">
                    <motion.h2
                      className="text-display text-5xl md:text-7xl lg:text-[8rem] leading-[0.85]"
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                    >
                      <span className="text-gradient-animated">LÀM GÌ?</span>
                    </motion.h2>
                  </div>
                </div>

                {/* Description */}
                <motion.p
                  className="text-lg md:text-xl lg:text-2xl text-zinc-400 mb-12 max-w-xl leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <span className="text-white">8 dịch vụ</span> in 3D chuyên nghiệp.
                  <br />
                  Từ prototype đến sản xuất hàng loạt.
                </motion.p>

                {/* Service Preview Pills */}
                <motion.div
                  className="flex flex-wrap gap-3 mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  {["FDM", "Resin 8K", "Khổ lớn", "Kỹ thuật", "Thiết kế", "Hoàn thiện", "Hàng loạt", "Trọn gói"].map((service, i) => (
                    <motion.span
                      key={service}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs md:text-sm text-zinc-400 font-mono"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.9 + i * 0.05 }}
                      whileHover={{
                        backgroundColor: 'rgba(249,115,22,0.1)',
                        borderColor: 'rgba(249,115,22,0.3)',
                        color: '#f97316'
                      }}
                    >
                      {service}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Scroll Hint with Animation */}
                <motion.div
                  className="flex items-center gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center"
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-5 h-5 text-zinc-500" />
                    </motion.div>
                    <div className="text-zinc-600">
                      <p className="text-sm font-mono uppercase tracking-wider">Scroll</p>
                      <p className="text-xs text-zinc-700">để khám phá</p>
                    </div>
                  </div>

                  {/* Progress dots */}
                  <div className="hidden md:flex items-center gap-2 ml-8">
                    <div className="w-8 h-1 bg-orange-500 rounded-full" />
                    <div className="w-2 h-1 bg-zinc-700 rounded-full" />
                    <div className="w-2 h-1 bg-zinc-700 rounded-full" />
                    <div className="w-2 h-1 bg-zinc-700 rounded-full" />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
          </div>

          {/* SERVICE CARDS */}
          {services.map((service, index) => (
            <div
              key={service.number}
              className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[40vw] xl:w-[35vw] h-full flex items-center px-4"
            >
              <Link href={service.href} className="block w-full group">
                <div className="relative h-[70vh] rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 transition-all duration-500 group-hover:border-zinc-700 group-hover:shadow-2xl group-hover:shadow-black/50">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover opacity-60 transition-all duration-700 group-hover:opacity-80 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
                  </div>

                  {/* Card Content */}
                  <div className="relative h-full flex flex-col justify-between p-6 md:p-8">
                    {/* Top Row */}
                    <div className="flex items-start justify-between">
                      {/* Number */}
                      <div
                        className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: service.color }}
                      >
                        <span className="text-white font-bold text-lg md:text-xl font-mono">
                          {service.number}
                        </span>
                      </div>

                      {/* Arrow */}
                      <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-45">
                        <ArrowUpRight className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Bottom Content */}
                    <div>
                      {/* Subtitle */}
                      <p className="text-xs md:text-sm font-mono uppercase tracking-wider mb-2" style={{ color: service.color }}>
                        {service.subtitle}
                      </p>

                      {/* Title */}
                      <h3 className="text-display text-3xl md:text-4xl lg:text-5xl text-white mb-4 transition-transform duration-300 group-hover:-translate-y-1">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-sm">
                        {service.desc}
                      </p>

                      {/* CTA Link */}
                      <div className="mt-6 flex items-center gap-2 text-sm font-medium opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" style={{ color: service.color }}>
                        <span>Xem chi tiết</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}

          {/* End spacer */}
          <div className="flex-shrink-0 w-[20vw]" />
        </div>
      </div>
    </section>
  );
}

// ============================================
// MANIFESTO SECTION
// ============================================
function ManifestoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section ref={ref} className="py-24 md:py-40 px-4 md:px-6 bg-zinc-950 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="relative"
        >
          {/* Large Quote */}
          <div className="text-[20vw] md:text-[15vw] text-zinc-900 font-bold absolute -top-[0.3em] -left-[0.05em] select-none pointer-events-none">
            "
          </div>

          <motion.p
            className="text-2xl md:text-4xl lg:text-5xl text-white leading-tight md:leading-snug max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-zinc-500">Chúng tôi tin rằng</span>{" "}
            <span className="text-white">mọi ý tưởng đều xứng đáng được hiện thực hóa.</span>{" "}
            <span className="text-gradient">Không chỉ in 3D,</span>{" "}
            <span className="text-zinc-500">mà là biến tầm nhìn của bạn thành sản phẩm thực.</span>
          </motion.p>

          {/* Signature */}
          <motion.div
            className="mt-12 md:mt-16 flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="w-12 h-[2px] bg-gradient-to-r from-orange-500 to-cyan-500" />
            <p className="text-sm text-zinc-500 font-mono uppercase tracking-widest">
              Tiệm 3D, 2024
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// PROCESS TIMELINE
// ============================================
function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const steps = [
    {
      number: "01",
      title: "Gửi yêu cầu",
      description: "Upload file 3D (.stl, .obj, .step) hoặc mô tả ý tưởng của bạn. Chấp nhận mọi định dạng.",
      image: "/assets/generated/process/process-upload.png",
      time: "5 phút",
    },
    {
      number: "02",
      title: "Nhận báo giá",
      description: "Báo giá chi tiết trong vòng 30 phút. Bao gồm công nghệ, vật liệu, thời gian.",
      image: "/assets/generated/process/process-quote.png",
      time: "30 phút",
    },
    {
      number: "03",
      title: "Sản xuất",
      description: "In 3D với công nghệ phù hợp. Theo dõi tiến độ realtime qua Zalo.",
      image: "/assets/generated/process/process-printing.png",
      time: "1-5 ngày",
    },
    {
      number: "04",
      title: "Giao hàng",
      description: "Đóng gói cẩn thận, ship COD toàn quốc. Hỗ trợ sau bán hàng.",
      image: "/assets/generated/process/process-packing.png",
      time: "1-3 ngày",
    },
  ];

  return (
    <section ref={ref} className="py-20 md:py-32 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs md:text-sm text-orange-500 font-mono uppercase tracking-widest mb-4 block">
            [ 02 ] Quy trình
          </span>
          <h2 className="text-display text-4xl md:text-6xl lg:text-7xl text-zinc-900">
            ĐƠN GIẢN
            <br />
            <span className="text-gradient">4 BƯỚC</span>
          </h2>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="group relative"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[calc(100%+1rem)] w-[calc(100%-2rem)] h-[2px]">
                  <motion.div
                    className="h-full bg-gradient-to-r from-orange-500 to-cyan-500"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
                    style={{ originX: 0 }}
                  />
                </div>
              )}

              {/* Card */}
              <div className="relative p-6 md:p-8 rounded-3xl bg-zinc-50 border border-zinc-200 hover:border-orange-300 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-orange-500/5">
                {/* Image */}
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-zinc-100">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Number Badge */}
                  <div className="absolute top-3 left-3 w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold font-mono">{step.number}</span>
                  </div>
                  {/* Time Badge */}
                  <div className="absolute bottom-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full">
                    <span className="text-xs font-mono text-zinc-600">{step.time}</span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-bold text-zinc-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-zinc-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// PORTFOLIO BENTO
// ============================================
function PortfolioBento() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const items = [
    {
      title: "Tượng Phật A Di Đà",
      description: "FDM 60cm, sơn vàng đồng",
      image: "/assets/generated/projects/tuong-phat/phat-08-finished.png",
      span: "col-span-2 row-span-2",
    },
    {
      title: "Rồng Trang Trí",
      description: "FDM 80cm, sơn đỏ vàng",
      image: "/assets/generated/projects/rong-trang-tri/rong-07-finished.png",
      span: "col-span-1 row-span-1",
    },
    {
      title: "Tượng Goku 50cm",
      description: "FDM + LED effects",
      image: "/assets/generated/projects/tuong-anime-lon/goku-08-finished.png",
      span: "col-span-1 row-span-1",
    },
    {
      title: "Mascot Cửa Hàng 1m",
      description: "FDM khổ lớn, 15kg filament",
      image: "/assets/generated/projects/mascot-cua-hang/mascot-08-finished.png",
      span: "col-span-2 row-span-1",
    },
  ];

  return (
    <section ref={ref} className="py-20 md:py-32 px-4 md:px-6 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div>
            <span className="text-xs md:text-sm text-orange-500 font-mono uppercase tracking-widest mb-4 block">
              [ 03 ] Portfolio
            </span>
            <h2 className="text-display text-4xl md:text-6xl lg:text-7xl text-zinc-900">
              IN ĐƯỢC
              <br />
              <span className="text-gradient">MỌI THỨ</span>
            </h2>
          </div>
          <MagneticElement strength={0.15}>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-zinc-300 text-zinc-700 font-semibold rounded-full hover:border-orange-500 hover:text-orange-500 transition-all duration-300 group"
            >
              <span>Xem tất cả</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </MagneticElement>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[140px] md:auto-rows-[200px]">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              className={`relative rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer ${item.span}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-white font-bold text-sm md:text-lg mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-xs md:text-sm font-mono">
                    {item.description}
                  </p>
                </motion.div>
              </div>

              {/* Hover Arrow */}
              <motion.div
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.1 }}
              >
                <ArrowUpRight className="w-5 h-5 text-white" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// STATS REVEAL
// ============================================
function StatsReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const stats = [
    { value: 20, suffix: "+", label: "Máy in FDM & Resin", description: "Print farm 24/7" },
    { value: 5, suffix: " năm", label: "Kinh nghiệm", description: "Hoạt động từ 2019" },
    { value: 500, suffix: "+", label: "Dự án", description: "Hoàn thành thành công" },
    { value: 98, suffix: "%", label: "Hài lòng", description: "Khách hàng quay lại" },
  ];

  return (
    <section ref={ref} className="py-24 md:py-40 bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs md:text-sm text-orange-500 font-mono uppercase tracking-widest mb-4 block">
            [ 04 ] Con số
          </span>
          <h2 className="text-display text-4xl md:text-6xl lg:text-7xl text-white">
            NĂNG LỰC
            <br />
            <span className="text-gradient">THỰC TẾ</span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center relative"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                {/* Number */}
                <div className="flex items-baseline justify-center gap-1 mb-3">
                  <span className="text-5xl md:text-7xl lg:text-8xl font-bold text-white">
                    {isInView ? <CountUp value={stat.value} duration={2.5} /> : "0"}
                  </span>
                  <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-gradient">
                    {stat.suffix}
                  </span>
                </div>

                {/* Label */}
                <p className="text-base md:text-lg text-white font-medium mb-1">
                  {stat.label}
                </p>
                <p className="text-sm text-zinc-500">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// MAGNETIC CTA
// ============================================
function MagneticCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-48 px-4 md:px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-cyan-50" />

      {/* Floating Blobs */}
      <motion.div
        className="absolute top-20 left-10 w-64 md:w-96 h-64 md:h-96 bg-orange-500/10 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 md:w-[500px] h-80 md:h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs md:text-sm text-orange-500 font-mono uppercase tracking-widest mb-6 block">
            Bắt đầu ngay
          </span>
        </motion.div>

        <motion.h2
          className="text-display text-5xl md:text-7xl lg:text-[10rem] text-zinc-900 leading-[0.9] mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          SẴN SÀNG
          <br />
          <span className="text-gradient-animated">BẮT ĐẦU?</span>
        </motion.h2>

        <motion.p
          className="text-lg md:text-2xl text-zinc-600 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Gửi yêu cầu ngay. Báo giá chi tiết trong 30 phút.
          <br className="hidden md:block" />
          Hoàn toàn <span className="text-orange-500 font-semibold">miễn phí</span>.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <MagneticElement strength={0.15}>
            <Link
              href="/bao-gia"
              className="group inline-flex items-center justify-center gap-3 px-10 md:px-14 py-5 md:py-6 bg-zinc-900 text-white text-lg md:text-xl font-bold rounded-full hover:bg-orange-500 transition-all duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
            >
              <span>BÁO GIÁ NGAY</span>
              <motion.span
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-6 h-6" />
              </motion.span>
            </Link>
          </MagneticElement>

          <MagneticElement strength={0.15}>
            <Link
              href="https://zalo.me/0777863808"
              className="inline-flex items-center justify-center px-10 md:px-14 py-5 md:py-6 bg-white border-2 border-zinc-300 text-zinc-700 text-lg md:text-xl font-bold rounded-full hover:border-cyan-500 hover:text-cyan-500 transition-all duration-300 shadow-lg"
            >
              CHAT ZALO
            </Link>
          </MagneticElement>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          className="mt-14 flex flex-wrap justify-center gap-6 md:gap-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            { icon: "⚡", text: "Báo giá 30 phút" },
            { icon: "📦", text: "Ship COD toàn quốc" },
            { icon: "✓", text: "Bảo hành sản phẩm" },
            { icon: "🔄", text: "Hoàn tiền 100%" },
          ].map((badge) => (
            <span
              key={badge.text}
              className="flex items-center gap-2 text-sm md:text-base text-zinc-500"
            >
              <span className="text-lg">{badge.icon}</span>
              <span>{badge.text}</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
