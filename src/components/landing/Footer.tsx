"use client";

import Link from "next/link";
import { MessageCircle, Mail, MapPin, Phone } from "lucide-react";

const services = [
  { name: "Thiết kế 3D theo yêu cầu", href: "/dich-vu/thiet-ke-3d" },
  { name: "In 3D FDM (PLA, PETG)", href: "/dich-vu/in-fdm" },
  { name: "In 3D Resin 8K/14K/16K", href: "/dich-vu/in-resin" },
  { name: "In 3D màu (Multicolor)", href: "/dich-vu/in-hang-loat" },
  { name: "Sơn hoàn thiện mô hình", href: "/dich-vu/hoan-thien" },
  { name: "Dự án trọn gói", href: "/dich-vu/du-an-tron-goi" },
];

const serviceAreas = [
  "Thủ Đức",
  "Quận 9",
  "Quận 2",
  "Bình Thạnh",
  "TP. Hồ Chí Minh",
];

const quickLinks = [
  { name: "Trang chủ", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Báo giá", href: "/bao-gia" },
];

export function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-display text-2xl text-white">Tiệm 3D</span>
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              Dịch vụ in 3D và thiết kế chuyên nghiệp tại Thủ Đức, TP.HCM.
              FDM, Resin 8K/14K/16K, sơn hoàn thiện mô hình.
            </p>
            <p className="text-xs text-zinc-500 mb-6">
              Phục vụ: {serviceAreas.join(" • ")}
            </p>
            <div className="flex gap-4">
              <a
                href="https://zalo.me/0777863808"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-[#0068ff] transition-colors"
                aria-label="Chat Zalo"
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </a>
              <a
                href="tel:0777863808"
                className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-orange-500 transition-colors"
                aria-label="Gọi điện"
              >
                <Phone className="w-5 h-5 text-white" />
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

            <h4 className="text-white text-sm font-mono uppercase tracking-wider mb-4 mt-8">Khu vực phục vụ</h4>
            <ul className="space-y-2">
              {serviceAreas.map((area) => (
                <li key={area} className="text-sm text-zinc-500">
                  {area}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-mono uppercase tracking-wider mb-4">Liên hệ</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-orange-500 flex-shrink-0" />
                <div>
                  <a href="tel:0777863808" className="text-sm text-white hover:text-orange-500 transition-colors">
                    0777 863 808
                  </a>
                  <p className="text-xs text-zinc-500">Zalo / Điện thoại</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 mt-0.5 text-orange-500 flex-shrink-0" />
                <div>
                  <a
                    href="https://zalo.me/0777863808"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white hover:text-orange-500 transition-colors"
                  >
                    Chat Zalo ngay
                  </a>
                  <p className="text-xs text-zinc-500">Báo giá nhanh trong 30 phút</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-orange-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white">Thủ Đức, TP. Hồ Chí Minh</p>
                  <p className="text-xs text-zinc-500">61 Đường Số 1, P. Linh Tây</p>
                </div>
              </li>
            </ul>

            {/* Opening Hours */}
            <div className="mt-6 p-4 bg-zinc-800/50 rounded-lg">
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Giờ làm việc</p>
              <p className="text-sm text-white">8:00 - 22:00</p>
              <p className="text-xs text-zinc-500">Thứ 2 - Chủ nhật</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs text-zinc-500">
              © 2024 Tiệm 3D - Dịch Vụ In 3D & Thiết Kế Thủ Đức. All rights reserved.
            </p>
            <p className="text-xs text-zinc-600 mt-1">
              In 3D FDM • In 3D Resin 8K/14K/16K • Thiết kế 3D • Sơn mô hình
            </p>
          </div>
          <div className="flex gap-6">
            <Link href="/bao-gia" className="text-xs text-zinc-500 hover:text-orange-500 transition-colors">
              Báo giá ngay
            </Link>
            <a
              href="tel:0777863808"
              className="text-xs text-zinc-500 hover:text-orange-500 transition-colors"
            >
              0777 863 808
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
