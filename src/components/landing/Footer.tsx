import Link from "next/link";
import { BUSINESS, formatAddressShort } from "@/lib/business";
import { SERVICES, QUICK_LINKS } from "@/lib/navigation";

export function Footer() {
  return (
    <footer className="bg-[#151719] text-zinc-300">
      <div className="mx-auto max-w-7xl px-6 pb-28 pt-14 md:pb-12 md:pt-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_0.7fr_1.2fr]">
          <div>
            <Link href="/" className="inline-flex min-h-11 items-center text-2xl font-bold tracking-tight text-white">{BUSINESS.name}<span className="ml-1 text-orange-400">.</span></Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">In 3D theo yêu cầu, thiết kế và hoàn thiện mô hình tại TP.HCM. Nhận đơn trực tuyến, giao hàng qua đơn vị vận chuyển.</p>
            <a href={BUSINESS.tel} className="mt-5 inline-flex min-h-11 items-center text-lg font-semibold text-white hover:text-orange-300">{BUSINESS.phoneDisplay}</a>
            <p className="text-sm leading-relaxed">Tư vấn {BUSINESS.hours.display}<br />Mỗi ngày, kể cả Chủ nhật</p>
            <a href={BUSINESS.zalo} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-orange-300 underline underline-offset-4">Nhắn Zalo cho tiệm</a>
          </div>
          <nav aria-label="Dịch vụ ở chân trang">
            <h2 className="mb-3 text-base font-semibold text-white">Dịch vụ</h2>
            <ul>{SERVICES.map(service => <li key={service.href}><Link href={service.href} className="inline-flex min-h-10 items-center py-2 text-sm hover:text-white hover:underline">{service.name}</Link></li>)}</ul>
          </nav>
          <nav aria-label="Khám phá">
            <h2 className="mb-3 text-base font-semibold text-white">Khám phá</h2>
            <ul>{QUICK_LINKS.map(link => <li key={link.href}><Link href={link.href} className="inline-flex min-h-10 items-center py-2 text-sm hover:text-white hover:underline">{link.name}</Link></li>)}</ul>
            <a href={`mailto:${BUSINESS.email}`} className="mt-3 inline-flex min-h-11 items-center text-sm underline underline-offset-4">Gửi email</a>
          </nav>
          <div>
            <h2 className="mb-4 text-base font-semibold text-white">Thông tin cơ sở</h2>
            <ul className="space-y-6">{BUSINESS.branches.map(branch => (
              <li key={branch.id}>
                <Link href={`/khu-vuc/${branch.id}/`} className="inline-flex min-h-10 items-center font-semibold text-white hover:underline">{branch.name}</Link>
                <p className="text-sm leading-relaxed">{formatAddressShort(branch)}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">{branch.customerVisits ? "Vui lòng liên hệ trước khi đến." : "Không đón khách. Nhận đơn trực tuyến, giao qua đơn vị vận chuyển."}</p>
              </li>
            ))}</ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-zinc-700 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {BUSINESS.name}</p>
          <p>Từ bản vẽ đến sản phẩm thực.</p>
        </div>
      </div>
    </footer>
  );
}
