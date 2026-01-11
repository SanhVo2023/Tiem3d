"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

const services = [
  { name: "In FDM", href: "/dich-vu/in-fdm" },
  { name: "In Resin 8K", href: "/dich-vu/in-resin" },
  { name: "In khổ lớn", href: "/dich-vu/in-kho-lon" },
  { name: "In chi tiết kỹ thuật", href: "/dich-vu/in-ky-thuat" },
  { name: "Thiết kế 3D", href: "/dich-vu/thiet-ke-3d" },
  { name: "Hoàn thiện", href: "/dich-vu/hoan-thien" },
  { name: "In hàng loạt", href: "/dich-vu/in-hang-loat" },
  { name: "Dự án trọn gói", href: "/dich-vu/du-an-tron-goi" },
];

const navItems = [
  { name: "Trang chủ", href: "/" },
  { name: "Dịch vụ", href: "#", hasDropdown: true },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Báo giá", href: "/bao-gia" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-sm"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-display text-xl text-zinc-900 group-hover:text-orange-500 transition-colors">
              Tiệm <span className="text-orange-500">3D</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <button className="flex items-center gap-1 text-sm font-mono text-zinc-600 hover:text-zinc-900 transition-colors">
                      {item.name}
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-2 w-56 bg-white border border-zinc-200 rounded-lg shadow-lg py-2"
                        >
                          {services.map((service) => (
                            <Link
                              key={service.href}
                              href={service.href}
                              className="block px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-orange-500 transition-colors"
                            >
                              {service.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-sm font-mono text-zinc-600 hover:text-zinc-900 transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/bao-gia"
              className="px-4 py-2 bg-orange-500 text-white text-sm font-mono uppercase tracking-wider rounded-lg hover:bg-orange-600 transition-colors"
            >
              Báo giá
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-zinc-900" />
            ) : (
              <Menu className="w-6 h-6 text-zinc-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-zinc-200"
          >
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item) =>
                item.hasDropdown ? (
                  <div key={item.name} className="space-y-2">
                    <p className="text-sm font-mono text-zinc-400 uppercase tracking-wider">
                      {item.name}
                    </p>
                    <div className="pl-4 space-y-2">
                      {services.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          className="block text-sm text-zinc-600 hover:text-orange-500"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-sm font-mono text-zinc-600 hover:text-zinc-900"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              )}
              <Link
                href="/bao-gia"
                className="block w-full text-center px-4 py-3 bg-orange-500 text-white text-sm font-mono uppercase tracking-wider rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Báo giá ngay
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
