"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { SERVICES, NAV_ITEMS } from "@/lib/navigation";
import { BUSINESS } from "@/lib/business";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // The dropdown used to be hover-only with a button that had no onClick, no
  // aria-expanded and no keyboard handler — unreachable by keyboard entirely.
  useEffect(() => {
    if (!isServicesOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsServicesOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isServicesOpen]);

  return (
    <motion.header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-zinc-200 bg-white/95 shadow-sm backdrop-blur-md"
          : "bg-white/80 backdrop-blur-sm"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="group flex items-center gap-2">
            <span className="text-display text-xl text-zinc-900 transition-colors group-hover:text-orange-500">
              {BUSINESS.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) =>
              item.hasDropdown ? (
                <div
                  key={item.href}
                  ref={servicesRef}
                  className="relative"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <div className="flex items-center">
                    {/* A real link, so the services hub is crawlable and
                        reachable without JavaScript. */}
                    <Link
                      href={item.href}
                      className="rounded-lg px-3 py-2 text-sm text-zinc-700 transition-colors hover:text-orange-600"
                    >
                      {item.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setIsServicesOpen((open) => !open)}
                      aria-expanded={isServicesOpen}
                      aria-haspopup="true"
                      aria-label="Mở danh sách dịch vụ"
                      className="rounded-lg p-1 text-zinc-500 transition-colors hover:text-orange-600"
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          isServicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full w-72 overflow-hidden rounded-xl border border-zinc-200 bg-white py-2 shadow-xl"
                      >
                        {SERVICES.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            onClick={() => setIsServicesOpen(false)}
                            className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-orange-600"
                          >
                            {service.name}
                            <span className="font-mono text-[11px] text-zinc-400">
                              {service.tag}
                            </span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm text-zinc-700 transition-colors hover:text-orange-600"
                >
                  {item.name}
                </Link>
              )
            )}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={BUSINESS.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-zinc-600 transition-colors hover:text-orange-600"
            >
              {BUSINESS.phoneDisplay}
            </a>
            <Link
              href="/bao-gia/"
              className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-orange-500"
            >
              Báo giá
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Đóng menu" : "Mở menu"}
            className="rounded-lg p-2 text-zinc-900 lg:hidden"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-zinc-200 bg-white lg:hidden"
          >
            <div className="space-y-1 px-6 py-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2.5 text-base text-zinc-800 transition-colors hover:text-orange-600"
                >
                  {item.name}
                </Link>
              ))}

              {/* Services previously degraded to a non-interactive <p> here, so
                  there was no way to reach any service page on a phone. */}
              <div className="border-t border-zinc-100 pt-3">
                <p className="mb-2 font-mono text-xs uppercase tracking-wider text-zinc-400">
                  Tất cả dịch vụ
                </p>
                {SERVICES.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2 text-sm text-zinc-600 transition-colors hover:text-orange-600"
                  >
                    {service.name}
                    <span className="font-mono text-[11px] text-zinc-400">
                      {service.tag}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-3 border-t border-zinc-100 pt-4">
                <a
                  href={BUSINESS.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#0068ff] px-5 py-3 text-center text-sm font-bold text-white"
                >
                  Chat Zalo {BUSINESS.phoneDisplay}
                </a>
                <Link
                  href="/bao-gia/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-full bg-zinc-900 px-5 py-3 text-center text-sm font-bold text-white"
                >
                  Báo giá ngay
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
