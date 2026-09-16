"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { SERVICES, NAV_ITEMS } from "@/lib/navigation";
import { BUSINESS } from "@/lib/business";

export function Header({ variant = "default" }: { variant?: "default" | "studio" }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dropdownRef = useRef<HTMLDetailsElement>(null);

  function closeMenu() {
    dialogRef.current?.close();
    setMenuOpen(false);
  }

  useEffect(() => {
    const closeDropdown = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node) && dropdownRef.current) {
        dropdownRef.current.open = false;
      }
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && dropdownRef.current?.open) {
        dropdownRef.current.open = false;
        dropdownRef.current.querySelector("summary")?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => {
      if (desktop.matches) closeMenu();
    };
    document.addEventListener("pointerdown", closeDropdown);
    document.addEventListener("keydown", onEscape);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("pointerdown", closeDropdown);
      document.removeEventListener("keydown", onEscape);
      desktop.removeEventListener("change", onResize);
    };
  }, []);

  const active = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href.replace(/\/$/, "")));

  return (
    <header className={"site-header" + (variant === "studio" ? " site-header-studio" : "")}>
      <a href="#noi-dung" className="skip-link">Tới nội dung chính</a>
      <div className="site-header-inner">
        <Link href="/" aria-label="Tiệm 3D — Trang chủ" className="site-wordmark">
          Tiệm<span className="brand-mark" aria-hidden="true">3D</span>
        </Link>
        <nav aria-label="Điều hướng chính" className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.filter((item) => item.href !== "/").map((item) => item.hasDropdown ? (
            <details key={item.href} ref={dropdownRef} className="nav-services">
              <summary className="nav-link cursor-pointer list-none">
                {item.name}<ChevronDown className="h-4 w-4" aria-hidden="true" />
              </summary>
              <div className="nav-service-panel">
                <Link href="/dich-vu/" onClick={() => { if (dropdownRef.current) dropdownRef.current.open = false; }} className="flex min-h-11 items-center justify-between rounded-lg px-3 font-semibold text-zinc-950 hover:bg-zinc-100">
                  Tất cả dịch vụ<ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                {SERVICES.map((service) => (
                  <Link key={service.href} href={service.href} onClick={() => { if (dropdownRef.current) dropdownRef.current.open = false; }} className="flex min-h-11 items-center justify-between gap-4 rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100">
                    {service.name}<span className="text-xs text-zinc-500">{service.tag}</span>
                  </Link>
                ))}
              </div>
            </details>
          ) : (
            <Link key={item.href} href={item.href} aria-current={active(item.href) ? "page" : undefined} className="nav-link">{item.name}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/bao-gia/" className="header-quote">Nhận báo giá<ArrowRight className="hidden h-4 w-4 sm:block" aria-hidden="true" /></Link>
          <button type="button" aria-label="Mở menu" aria-expanded={menuOpen} aria-controls="mobile-navigation" className="header-menu-toggle flex h-11 w-11 items-center justify-center rounded-lg text-zinc-950 hover:bg-zinc-100 lg:hidden" onClick={() => { dialogRef.current?.showModal(); setMenuOpen(true); }}>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
      <dialog id="mobile-navigation" ref={dialogRef} onClose={() => setMenuOpen(false)} aria-labelledby="mobile-menu-title" className="mobile-navigation">
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-3">
          <h2 id="mobile-menu-title" className="text-lg font-semibold text-zinc-950">Khám phá Tiệm 3D</h2>
          <button type="button" onClick={closeMenu} aria-label="Đóng menu" className="flex h-11 w-11 items-center justify-center rounded-lg text-zinc-900 hover:bg-zinc-100"><X className="h-6 w-6" aria-hidden="true" /></button>
        </div>
        <nav aria-label="Điều hướng trên điện thoại" className="mobile-navigation-content">
          {NAV_ITEMS.map((item) => <Link key={item.href} href={item.href} onClick={closeMenu} aria-current={active(item.href) ? "page" : undefined} className="flex min-h-12 items-center rounded-lg px-3 font-semibold text-zinc-800 hover:bg-zinc-100">{item.name}</Link>)}
          <details className="my-3 border-y border-zinc-200 py-2">
            <summary className="cursor-pointer px-3 py-3 font-semibold text-zinc-800">Chọn dịch vụ in 3D</summary>
            {SERVICES.map((service) => <Link key={service.href} href={service.href} onClick={closeMenu} className="flex min-h-11 items-center rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100">{service.name}</Link>)}
          </details>
          <Link href="/bao-gia/" onClick={closeMenu} className="header-quote my-3 justify-center">Nhận tư vấn & báo giá</Link>
          <a href={BUSINESS.tel} className="flex min-h-12 items-center justify-center font-semibold text-zinc-800">Gọi {BUSINESS.phoneDisplay}</a>
        </nav>
      </dialog>
    </header>
  );
}
