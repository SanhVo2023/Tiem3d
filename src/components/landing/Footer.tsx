"use client";

import Link from "next/link";
import { MessageCircle, Mail, MapPin, Phone, Clock } from "lucide-react";
import { BUSINESS, formatAddressShort, mapsUrl } from "@/lib/business";
import { SERVICES, QUICK_LINKS } from "@/lib/navigation";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-zinc-900 text-zinc-400">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-display text-2xl text-white">{BUSINESS.name}</span>
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              Dịch vụ in 3D và thiết kế chuyên nghiệp tại TP.HCM. FDM, Resin
              8K/14K/16K, sơn hoàn thiện mô hình.
            </p>
            <p className="text-xs text-zinc-500 mb-6">
              Phục vụ: {BUSINESS.serviceAreas.join(" • ")}
            </p>
            <div className="flex gap-4">
              <a
                href={BUSINESS.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-[#0068ff] transition-colors"
                aria-label="Chat Zalo"
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </a>
              <a
                href={BUSINESS.tel}
                className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-orange-500 transition-colors"
                aria-label={`Gọi ${BUSINESS.phoneDisplay}`}
              >
                <Phone className="w-5 h-5 text-white" />
              </a>
              <a
                href={`mailto:${BUSINESS.email}`}
                className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-orange-500 transition-colors"
                aria-label={`Email ${BUSINESS.email}`}
              >
                <Mail className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-sm font-mono uppercase tracking-wider mb-4">
              Dịch vụ
            </h4>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
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
            <h4 className="text-white text-sm font-mono uppercase tracking-wider mb-4">
              Liên kết
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
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

          {/* Contact — one block per branch */}
          <div>
            <h4 className="text-white text-sm font-mono uppercase tracking-wider mb-4">
              Liên hệ
            </h4>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-orange-500 flex-shrink-0" />
                <div>
                  <a
                    href={BUSINESS.tel}
                    className="text-sm text-white hover:text-orange-500 transition-colors font-mono"
                  >
                    {BUSINESS.phoneDisplay}
                  </a>
                  <p className="text-xs text-zinc-500">Zalo / Điện thoại</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 mt-0.5 text-orange-500 flex-shrink-0" />
                <div>
                  <a
                    href={BUSINESS.zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white hover:text-orange-500 transition-colors"
                  >
                    Chat Zalo ngay
                  </a>
                  <p className="text-xs text-zinc-500">Báo giá nhanh trong 30 phút</p>
                </div>
              </li>

              {BUSINESS.branches.map((branch) => (
                <li key={branch.id} className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 text-orange-500 flex-shrink-0" />
                  <div>
                    <a
                      href={mapsUrl(branch)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white hover:text-orange-500 transition-colors"
                    >
                      {branch.name}
                    </a>
                    <p className="text-xs text-zinc-500">{formatAddressShort(branch)}</p>
                    {branch.landmark && (
                      <p className="text-xs text-zinc-600">{branch.landmark}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Opening Hours */}
            <div className="mt-6 p-4 bg-zinc-800/50 rounded-lg">
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Clock className="w-3 h-3" />
                Giờ làm việc
              </p>
              <p className="text-sm text-white font-mono">{BUSINESS.hours.display}</p>
              <p className="text-xs text-zinc-500">{BUSINESS.hours.days}</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs text-zinc-500">
              © {year} {BUSINESS.legalName}. All rights reserved.
            </p>
            <p className="text-xs text-zinc-600 mt-1">
              In 3D FDM • In 3D Resin 8K/14K/16K • Thiết kế 3D • Sơn mô hình
            </p>
          </div>
          <div className="flex gap-6">
            <Link
              href="/bao-gia/"
              className="text-xs text-zinc-500 hover:text-orange-500 transition-colors"
            >
              Báo giá ngay
            </Link>
            <a
              href={BUSINESS.tel}
              className="text-xs text-zinc-500 hover:text-orange-500 transition-colors font-mono"
            >
              {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
