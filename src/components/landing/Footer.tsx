"use client";

import Link from "next/link";
import { MessageCircle, Mail, MapPin, Phone } from "lucide-react";

const services = [
  { name: "Thiết kế 3D", href: "/dich-vu/thiet-ke-3d" },
  { name: "In FDM", href: "/dich-vu/in-fdm" },
  { name: "In Resin 8K", href: "/dich-vu/in-resin" },
  { name: "In hàng loạt", href: "/dich-vu/in-hang-loat" },
  { name: "Hoàn thiện", href: "/dich-vu/hoan-thien" },
  { name: "Dự án trọn gói", href: "/dich-vu/du-an-tron-goi" },
];

const quickLinks = [
  { name: "Trang chủ", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Báo giá", href: "/bao-gia" },
  { name: "Về chúng tôi", href: "/ve-chung-toi" },
];

export function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-display text-2xl text-white">Cái tiệm in 3d</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Từ ý tưởng đến sản phẩm. Dịch vụ thiết kế và in 3D chuyên nghiệp tại Việt Nam.
            </p>
            <div className="flex gap-4">
              <a
                href="https://zalo.me/0123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </a>
              <a
                href="mailto:contact@caitiemoin3d.vn"
                className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <Mail className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-sm font-mono uppercase tracking-wider mb-4">Dịch vụ</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-sm hover:text-orange-500 transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-mono uppercase tracking-wider mb-4">Liên kết</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-orange-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-mono uppercase tracking-wider mb-4">Liên hệ</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-orange-500" />
                <div>
                  <p className="text-sm text-white">0123 456 789</p>
                  <p className="text-xs text-zinc-500">Zalo / Điện thoại</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-orange-500" />
                <div>
                  <p className="text-sm text-white">contact@caitiemoin3d.vn</p>
                  <p className="text-xs text-zinc-500">Email</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-orange-500" />
                <div>
                  <p className="text-sm text-white">TP. Hồ Chí Minh</p>
                  <p className="text-xs text-zinc-500">Việt Nam</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500">
            © 2024 Cái tiệm in 3d. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-zinc-500 hover:text-zinc-400">
              Điều khoản sử dụng
            </Link>
            <Link href="#" className="text-xs text-zinc-500 hover:text-zinc-400">
              Chính sách bảo mật
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
