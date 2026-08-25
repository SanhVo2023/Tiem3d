"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";
import Image from "@/components/ui/Img";
import { Footer } from "@/components/landing";
import { ZaloWidget } from "@/components/ui";
import { Marquee } from "@/components/animations/Marquee";
import { MagneticElement } from "@/components/animations/MagneticElement";
import { CountUp } from "@/components/animations/CountUp";
import { TestimonialsSection, FAQSection } from "@/components/home";
import { Menu, X, ChevronDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/navigation";
import { BUSINESS } from "@/lib/business";
import LayerField from "@/components/home/LayerField";

// ============================================
// MAIN PAGE - SUPER PREMIUM
// ============================================
export default function Home() {
  // Which surface the header is currently floating over. The page alternates
  // dark and light sections, so a simple "past the hero" flag put a white bar
  // on top of the dark services and testimonials sections.
  const [headerOnDark, setHeaderOnDark] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  // Reads the surface directly under the header by watching a 1px band at the
  // header's own height, so each section declares its own palette via
  // data-surface and the header follows.
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-surface]")
    );
    if (sections.length === 0) return;

    const HEADER_BAND = 84; // header top offset + its height

    const read = () => {
      // The section whose box contains the band wins; the last match down the
      // page is the one actually on top.
      let surface: string | null = null;
      for (const section of sections) {
        const { top, bottom } = section.getBoundingClientRect();
        if (top <= HEADER_BAND && bottom > HEADER_BAND) {
          surface = section.dataset.surface ?? null;
        }
      }
      if (surface) setHeaderOnDark(surface === "dark");
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        read();
        ticking = false;
      });
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      {/* The intro loader used to hold a 2s splash before a 2.2-3.4s hero
          stagger, so the primary CTA was invisible for ~3.9 seconds and LCP
          could not fire until then. Both are gone. */}
      <a href="#noi-dung" className="skip-link">
        Tới nội dung chính
      </a>

      <FloatingHeader onDark={headerOnDark} />

      <main id="noi-dung" className="overflow-x-hidden">
        <CinematicHero heroRef={heroRef} />
        <TypographyMarquee />
        <ServicesSection />
        <ManifestoSection />
        <ProcessTimeline />
        <PortfolioBento />
        <StatsReveal />
        <TestimonialsSection />
        <MagneticCTA />
        <FAQSection />
      </main>
      <Footer />
      <ZaloWidget />
    </>
  );
}

// ============================================
// FLOATING HEADER - Glass Morphism
// ============================================
function FloatingHeader({ onDark }: { onDark: boolean }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  // The header is always present. It used to be hidden until 20% scroll, which
  // left the homepage with no navigation at all in the first viewport.
  // The header is always present; onDark controls which palette it wears.
  const services = SERVICES;

  return (
    <motion.header
      className="fixed top-4 left-4 right-4 z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
    >
      <div
        className={`max-w-7xl mx-auto px-4 md:px-6 py-3 rounded-2xl border transition-colors duration-300 ${
          onDark
            ? "bg-zinc-950/50 backdrop-blur-xl border-white/10"
            : "bg-white/95 backdrop-blur-xl border-zinc-200 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <span
                className={`text-display text-lg md:text-xl transition-colors duration-300 ${
                  onDark ? "text-white" : "text-zinc-900"
                }`}
              >
                TIỆM <span className="text-orange-500">3D</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="/" onDark={onDark}>Trang chủ</NavLink>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <div
                className={`flex items-center rounded-full ${
                  onDark ? "hover:bg-white/10" : "hover:bg-zinc-100"
                }`}
              >
                <Link
                  href="/dich-vu/"
                  className={`py-2 pl-4 pr-1 text-sm transition-colors ${
                    onDark
                      ? "text-zinc-300 hover:text-white"
                      : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  Dịch vụ
                </Link>
                <button
                  type="button"
                  onClick={() => setIsServicesOpen((open) => !open)}
                  aria-expanded={isServicesOpen}
                  aria-haspopup="true"
                  aria-label="Mở danh sách dịch vụ"
                  className={`py-2 pr-3 pl-1 transition-colors ${
                    onDark
                      ? "text-zinc-400 hover:text-white"
                      : "text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  <motion.span
                    className="inline-block"
                    animate={{ rotate: isServicesOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.span>
                </button>
              </div>

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

            <NavLink href="/bang-gia/" onDark={onDark}>Bảng giá</NavLink>
            <NavLink href="/portfolio/" onDark={onDark}>Portfolio</NavLink>
            <NavLink href="/blog/" onDark={onDark}>Blog</NavLink>
            <NavLink href="/lien-he/" onDark={onDark}>Liên hệ</NavLink>

            {/* CTA Button */}
            <MagneticElement strength={0.2}>
              <Link
                href="/bao-gia/"
                className={`ml-2 px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 flex items-center gap-2 group ${
                  onDark
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "bg-zinc-900 text-white hover:bg-orange-500"
                }`}
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
            className={`md:hidden p-2 rounded-xl ${
              onDark ? "text-white hover:bg-white/10" : "hover:bg-zinc-100"
            }`}
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
                <MobileNavLink href="/dich-vu/" onClick={() => setIsMobileMenuOpen(false)}>
                  Dịch vụ
                </MobileNavLink>
                <div className="py-2">
                  <p className="text-[10px] text-zinc-400 uppercase tracking-widest px-4 mb-2">
                    Tất cả dịch vụ
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
                <MobileNavLink href="/bang-gia/" onClick={() => setIsMobileMenuOpen(false)}>
                  Bảng giá
                </MobileNavLink>
                <MobileNavLink href="/portfolio/" onClick={() => setIsMobileMenuOpen(false)}>
                  Portfolio
                </MobileNavLink>
                <MobileNavLink href="/blog/" onClick={() => setIsMobileMenuOpen(false)}>
                  Blog
                </MobileNavLink>
                <MobileNavLink href="/lien-he/" onClick={() => setIsMobileMenuOpen(false)}>
                  Liên hệ
                </MobileNavLink>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-4"
                >
                  <Link
                    href="/bao-gia/"
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

function NavLink({
  href,
  children,
  onDark = false,
}: {
  href: string;
  children: React.ReactNode;
  onDark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 text-sm transition-colors rounded-full ${
        onDark
          ? "text-zinc-300 hover:text-white hover:bg-white/10"
          : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
      }`}
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
// CINEMATIC HERO - Giant Typography + GSAP Parallax
// ============================================
// The three things every enquiry opens with — what can you print it in, how
// fine, how fast — answered before anyone has to ask. Material names track
// src/data/pricing.ts; no prices live here.
const HERO_SPECS = [
  { label: "Vật liệu", value: "PLA · PETG · ABS · TPU · Resin" },
  { label: "Độ dày lớp", value: "0,03 – 0,30 mm" },
  { label: "Khổ in", value: "Tới 500 mm+" },
  { label: "Báo giá", value: "30 phút qua Zalo" },
  { label: "Giao hàng", value: "COD toàn quốc" },
];

function CinematicHero({
  heroRef,
}: {
  heroRef: React.RefObject<HTMLDivElement | null>;
}) {
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Parallax on scroll. The layer field drifts slower than the page so the hero
  // has depth; the content lifts and fades as it leaves.
  useEffect(() => {
    if (reduceMotion) return;
    let ctx: ReturnType<typeof import("gsap").default.context> | null = null;

    const initParallax = async () => {
      const gsapModule = await import("gsap");
      const ScrollTriggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      const ScrollTrigger = ScrollTriggerModule.default;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        if (bgRef.current) {
          gsap.to(bgRef.current, {
            y: 120,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.5,
            },
          });
        }
        if (contentRef.current) {
          gsap.to(contentRef.current, {
            y: -60,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "55% top",
              scrub: 0.3,
            },
          });
        }
        if (scrollIndicatorRef.current) {
          gsap.to(scrollIndicatorRef.current, {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "25% top",
              scrub: true,
            },
          });
        }
      }, heroRef);
    };

    initParallax();
    return () => {
      if (ctx) ctx.revert();
    };
  }, [heroRef, reduceMotion]);

  // One orchestrated entrance rather than scattered per-element delays. The
  // whole sequence resolves inside 700ms, so the CTA is never what the visitor
  // is waiting on.
  const rise = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      ref={heroRef}
      data-surface="dark"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-zinc-950"
    >
      {/* WebGL layer field — contours warming as a print head climbs past.
          The print-bed grid sits underneath as a plain CSS layer, so the hero
          still has a ground under reduced motion and on anything without a
          WebGL context, where the canvas draws nothing at all. */}
      <div ref={bgRef} className="absolute inset-0 z-0 will-change-transform">
        <div aria-hidden className="absolute inset-0 grid-bg-orange opacity-60" />
        <LayerField />
      </div>

      {/* Ground the type: darken the lower half and the left edge so every line
          clears contrast regardless of what the shader is doing behind it. */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-gradient-to-b from-zinc-950/70 via-zinc-950/30 to-zinc-950"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-[radial-gradient(120%_90%_at_10%_50%,rgba(9,9,11,0.78)_0%,transparent_58%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-32 pb-24 md:px-8 md:pt-36 md:pb-28">
        <motion.div
          ref={contentRef}
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="grid gap-12 will-change-transform lg:grid-cols-12 lg:items-end lg:gap-10"
        >
          {/* ---- Left: the offer ---- */}
          <div className="lg:col-span-7">
            <motion.h1 variants={rise} className="text-white">
              <span className="text-mono-sm mb-5 block tracking-[0.32em] text-orange-400 md:mb-6">
                In 3D FDM · Resin · Thiết kế
              </span>
              <span className="text-display-sentence block text-hero">
                <span className="text-zinc-500">Từ bản vẽ đến</span>
                <br />
                sản phẩm thực
              </span>
            </motion.h1>

            <motion.p
              variants={rise}
              className="mt-7 max-w-xl text-lg leading-relaxed text-zinc-300 md:mt-8 md:text-xl"
            >
              Xưởng in 3D ở{" "}
              {BUSINESS.branches.map((b) => b.shortName).join(" và ")}. Gửi ảnh
              hoặc bản vẽ tay — chúng tôi dựng mẫu, in, sơn hoàn thiện và giao
              tận nơi.{" "}
              <span className="text-white">Chưa có file 3D vẫn in được.</span>
            </motion.p>

            <motion.div
              variants={rise}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4 md:mt-10"
            >
              <MagneticElement strength={0.15}>
                <Link
                  href="/bao-gia/"
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-orange-500 px-8 py-4 text-base font-bold text-white transition-colors duration-300 hover:bg-orange-600 sm:w-auto"
                >
                  <span>Gửi ảnh, nhận báo giá</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </MagneticElement>
              <Link
                href={BUSINESS.zalo}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-4 text-base font-bold text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-zinc-900 sm:w-auto"
              >
                Nhắn Zalo {BUSINESS.phoneDisplay}
              </Link>
            </motion.div>
          </div>

          {/* ---- Right: the spec plate ----
              The shop's own machine language used as page furniture, in the
              mono face the rest of the site reserves for numbers and specs. */}
          <motion.div variants={rise} className="lg:col-span-5">
            <dl className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-7">
              <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-white/10 pb-4">
                <span className="text-mono-sm tracking-[0.28em] text-zinc-400">
                  Thông số xưởng
                </span>
                <span className="text-mono-sm flex shrink-0 items-center gap-2 tracking-widest text-orange-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  {BUSINESS.hours.display}
                </span>
              </div>
              {HERO_SPECS.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-baseline justify-between gap-4 border-b border-white/5 py-3 last:border-0 last:pb-0"
                >
                  <dt className="text-sm text-zinc-400">{spec.label}</dt>
                  <dd className="text-mono-sm text-right text-sm text-zinc-100">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollIndicatorRef}
        aria-hidden
        className="pointer-events-none absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 md:block"
      >
        <div className="animate-bounce-slow flex flex-col items-center gap-2">
          <span className="text-mono-sm tracking-[0.3em] text-zinc-500">
            Cuộn xuống
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-zinc-500 to-transparent" />
        </div>
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
    <div data-surface="dark" className="py-6 bg-zinc-950 border-y border-zinc-800 overflow-hidden">
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
      image: "/assets/generated/services/service-fdm-hero.webp",
      color: "#f97316",
      href: "/dich-vu/in-fdm",
    },
    {
      number: "02",
      title: "IN RESIN 8K",
      subtitle: "Chi tiết · Siêu mịn",
      desc: "Elegoo Saturn 4 Ultra. Figure, trang sức, chi tiết micro.",
      image: "/assets/generated/services/service-resin-hero.webp",
      color: "#06b6d4",
      href: "/dich-vu/in-resin",
    },
    {
      number: "03",
      title: "IN KHỔ LỚN",
      subtitle: "500mm+",
      desc: "Mô hình kiến trúc, props cosplay, prototype lớn.",
      image: "/assets/generated/workspace/workspace-fdm-farm.webp",
      color: "#eab308",
      href: "/dich-vu/in-kho-lon",
    },
    {
      number: "04",
      title: "KỸ THUẬT",
      subtitle: "±0.1mm",
      desc: "Chi tiết cơ khí, bánh răng, dung sai lắp ghép.",
      image: "/assets/generated/products/product-gear.webp",
      color: "#3b82f6",
      href: "/dich-vu/in-ky-thuat",
    },
    {
      number: "05",
      title: "THIẾT KẾ",
      subtitle: "CAD · 3D",
      desc: "Thiết kế model 3D từ bản vẽ hoặc mô tả.",
      image: "/assets/generated/services/service-design-hero.webp",
      color: "#a855f7",
      href: "/dich-vu/thiet-ke-3d",
    },
    {
      number: "06",
      title: "HOÀN THIỆN",
      subtitle: "Sơn · Mạ",
      desc: "Xử lý bề mặt, airbrush, mạ chrome.",
      image: "/assets/generated/services/service-finish-hero.webp",
      color: "#10b981",
      href: "/dich-vu/hoan-thien",
    },
    {
      number: "07",
      title: "HÀNG LOẠT",
      subtitle: "-40%",
      desc: "Print farm 24/7. Số lượng lớn, giá tối ưu.",
      image: "/assets/generated/services/service-batch-hero.webp",
      color: "#ef4444",
      href: "/dich-vu/in-hang-loat",
    },
    {
      number: "08",
      title: "TRỌN GÓI",
      subtitle: "E2E",
      desc: "Từ ý tưởng đến sản phẩm hoàn chỉnh.",
      image: "/assets/generated/hero/hero-main.webp",
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
    <section ref={sectionRef} data-surface="dark" className="relative">
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
                    className="text-watermark font-black leading-none"
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
                <div className="w-full h-full border-2 border-orange-500/20 rounded-full" />
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
                  className="w-full h-full bg-gradient-to-br from-orange-500/15 to-orange-500/0 backdrop-blur-sm"
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
                  <div className="w-12 h-[2px] bg-gradient-to-r from-orange-500 to-orange-500/0" />
                  <span className="text-xs text-zinc-500 font-mono uppercase tracking-[0.3em]">
                    Dịch vụ
                  </span>
                </motion.div>

                {/* Main Heading with Staggered Animation */}
                <div className="mb-8">
                  <div className="overflow-hidden">
                    <motion.h2
                      className="text-display text-feature text-white leading-[0.9]"
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                    >
                      CHÚNG TÔI
                    </motion.h2>
                  </div>
                  <div className="overflow-hidden">
                    <motion.h2
                      className="text-display text-feature leading-[0.9]"
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
          {services.map((service) => (
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
// MANIFESTO SECTION - Kinetic Typography
// ============================================
function ManifestoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-20%" });

  // GSAP text animation
  useEffect(() => {
    if (!isInView || !textRef.current) return;

    let ctx: ReturnType<typeof import("gsap").default.context> | null = null;

    const animateText = async () => {
      const gsapModule = await import("gsap");
      const gsap = gsapModule.default;

      ctx = gsap.context(() => {
        // Animate each word
        const words = textRef.current?.querySelectorAll(".word");
        if (words) {
          gsap.fromTo(
            words,
            {
              opacity: 0,
              y: 100,
              rotateX: -90,
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 1,
              ease: "power3.out",
              stagger: 0.1,
            }
          );
        }

        // Animate the line
        const line = sectionRef.current?.querySelector(".animated-line");
        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            { scaleX: 1, duration: 1.5, ease: "power3.inOut", delay: 0.5 }
          );
        }
      }, sectionRef);
    };

    animateText();

    return () => {
      if (ctx) ctx.revert();
    };
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      data-surface="dark"
      className="relative py-24 md:py-32 bg-zinc-950 overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-watermark font-black text-zinc-900/30 select-none leading-none">
          3D
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 text-center">
        {/* Main Typography */}
        <div
          ref={textRef}
          className="perspective-[1000px]"
          style={{ perspective: "1000px" }}
        >
          {/* Line 1 */}
          <div className="overflow-hidden mb-2 md:mb-4">
            <span className="word inline-block text-display text-feature text-white leading-[0.9] tracking-tight">
              BIẾN
            </span>{" "}
            <span className="word inline-block text-display text-feature text-white leading-[0.9] tracking-tight">
              Ý
            </span>{" "}
            <span className="word inline-block text-display text-feature text-white leading-[0.9] tracking-tight">
              TƯỞNG
            </span>
          </div>

          {/* Line 2 - Gradient */}
          <div className="overflow-hidden">
            <span className="word inline-block text-display text-feature leading-[0.9] tracking-tight text-gradient-animated">
              THÀNH
            </span>{" "}
            <span className="word inline-block text-display text-feature leading-[0.9] tracking-tight text-gradient-animated">
              HIỆN
            </span>{" "}
            <span className="word inline-block text-display text-feature leading-[0.9] tracking-tight text-gradient-animated">
              THỰC
            </span>
          </div>
        </div>

        {/* Animated Line */}
        <div className="flex justify-center mt-10 md:mt-14">
          <div
            className="animated-line h-[3px] w-32 md:w-48 bg-gradient-to-r from-orange-500 to-amber-400 origin-center"
            style={{ transformOrigin: "center" }}
          />
        </div>

        {/* Tagline */}
        <motion.p
          className="mt-8 md:mt-10 text-lg md:text-xl text-zinc-400 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Từ <span className="text-white font-semibold">bản phác thảo</span> đến{" "}
          <span className="text-white font-semibold">sản phẩm hoàn chỉnh</span>
        </motion.p>
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
      image: "/assets/generated/process/process-upload.webp",
      time: "5 phút",
    },
    {
      number: "02",
      title: "Nhận báo giá",
      description: "Báo giá chi tiết trong vòng 30 phút. Bao gồm công nghệ, vật liệu, thời gian.",
      image: "/assets/generated/process/process-quote.webp",
      time: "30 phút",
    },
    {
      number: "03",
      title: "Sản xuất",
      description: "In 3D với công nghệ phù hợp. Theo dõi tiến độ realtime qua Zalo.",
      image: "/assets/generated/process/process-printing.webp",
      time: "1-5 ngày",
    },
    {
      number: "04",
      title: "Giao hàng",
      description: "Đóng gói cẩn thận, ship COD toàn quốc. Hỗ trợ sau bán hàng.",
      image: "/assets/generated/process/process-packing.webp",
      time: "1-3 ngày",
    },
  ];

  return (
    <section ref={ref} data-surface="light" className="py-20 md:py-32 px-4 md:px-6 bg-white">
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
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-400"
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
      description: "FDM 60cm, sơn hiệu ứng đồng",
      image: "/assets/generated/projects/tuong-phat/phat-05-display.webp",
      href: "/portfolio/tuong-phat-a-di-da/",
      span: "col-span-2 row-span-2",
    },
    {
      title: "Rồng trang trí 80cm",
      description: "9 đốt tháo rời, sơn nhũ vàng",
      image: "/assets/generated/projects/rong-trang-tri/rong-05-display.webp",
      href: "/portfolio/rong-trang-tri-tet/",
      span: "col-span-1 row-span-1",
    },
    {
      title: "Tượng anime 70cm",
      description: "8 khối, phủ bóng 2K",
      image: "/assets/generated/projects/tuong-anime-lon/goku-05-display.webp",
      href: "/portfolio/tuong-anime-lon-70cm/",
      span: "col-span-1 row-span-1",
    },
    {
      title: "Linh vật thương hiệu",
      description: "30 bản, đồng đều màu",
      image: "/assets/generated/projects/mascot-cua-hang/mascot-05-display.webp",
      href: "/portfolio/mascot-cua-hang/",
      span: "col-span-2 row-span-1",
    },
  ];

  return (
    <section ref={ref} data-surface="light" className="py-20 md:py-32 px-4 md:px-6 bg-zinc-50">
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
              className={`relative rounded-2xl md:rounded-3xl overflow-hidden group ${item.span}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* The whole tile is the link — it used to be cursor-pointer with
                  nothing to click. */}
              <Link href={item.href} className="absolute inset-0 z-10" aria-label={item.title} />
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
    <section ref={ref} data-surface="dark" className="py-24 md:py-40 bg-zinc-950 overflow-hidden">
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
      data-surface="light"
      className="relative py-32 md:py-48 px-4 md:px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50" />

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
        className="absolute bottom-20 right-10 w-80 md:w-[500px] h-80 md:h-[500px] bg-amber-500/10 rounded-full blur-[120px]"
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
          className="text-display text-feature text-zinc-900 leading-[0.95] mb-8"
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
              href="https://zalo.me/0384844730"
              className="inline-flex items-center justify-center px-10 md:px-14 py-5 md:py-6 bg-white border-2 border-zinc-300 text-zinc-700 text-lg md:text-xl font-bold rounded-full hover:border-zinc-900 hover:text-zinc-900 transition-all duration-300 shadow-lg"
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
