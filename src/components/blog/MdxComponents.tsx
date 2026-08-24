import Link from "next/link";
import Image from "next/image";
import { BUSINESS, formatAddressShort } from "@/lib/business";
import {
  PRICE_DISCLAIMER,
  getPriceTable,
  type PriceTable,
} from "@/data/pricing";

/**
 * Components available inside MDX posts.
 *
 * Posts previously hand-rolled every CTA and price table in markdown, which is
 * how the phone number ended up hardcoded in 24 places and how the FDM rate
 * came to disagree with the service page by 4x. Anything that can go stale
 * lives in a component now.
 */

/* ------------------------------------------------------------------ */
/* Tóm tắt nhanh — the answer box that wins snippets and helps skimmers */
/* ------------------------------------------------------------------ */

export function TomTatNhanh({ children }: { children: React.ReactNode }) {
  return (
    <aside className="not-prose my-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-6">
      <p className="mb-3 font-mono text-xs uppercase tracking-wider text-orange-700">
        Tóm tắt nhanh
      </p>
      <div className="space-y-2 text-[15px] leading-relaxed text-zinc-800 [&_li]:relative [&_li]:pl-6 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-orange-500 [&_li]:before:content-['▸'] [&_ul]:space-y-2">
        {children}
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/* Callout                                                             */
/* ------------------------------------------------------------------ */

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "warning" | "tip";
  title?: string;
  children: React.ReactNode;
}) {
  const styles = {
    info: "border-zinc-200 bg-zinc-50 text-zinc-800",
    warning: "border-amber-300 bg-amber-50 text-amber-950",
    tip: "border-cyan-200 bg-cyan-50 text-cyan-950",
  } as const;

  const labels = { info: "Lưu ý", warning: "Cảnh báo", tip: "Mẹo" } as const;

  return (
    <aside className={`not-prose my-6 rounded-xl border p-5 ${styles[type]}`}>
      <p className="mb-2 font-mono text-xs uppercase tracking-wider opacity-70">
        {title || labels[type]}
      </p>
      <div className="space-y-2 text-[15px] leading-relaxed">{children}</div>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/* Bảng giá — reads src/data/pricing.ts, never hardcoded in a post     */
/* ------------------------------------------------------------------ */

function PriceTableBlock({ table }: { table: PriceTable }) {
  return (
    <div className="not-prose my-8">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-lg font-bold text-zinc-900">{table.title}</h3>
        <span className="font-mono text-xs text-zinc-500">{table.unit}</span>
      </div>

      {table.intro && (
        <p className="mb-4 text-sm leading-relaxed text-zinc-600">{table.intro}</p>
      )}

      <div className="overflow-x-auto rounded-xl border border-zinc-200">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <thead>
            <tr className="bg-zinc-50 text-left">
              <th className="px-4 py-3 font-semibold text-zinc-900">Loại</th>
              <th className="px-4 py-3 font-semibold text-zinc-900">Đặc điểm</th>
              <th className="px-4 py-3 text-right font-semibold text-zinc-900">
                Giá
              </th>
              <th className="px-4 py-3 text-right font-semibold text-zinc-900">
                Thời gian
              </th>
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.name} className="border-t border-zinc-100 align-top">
                <td className="px-4 py-3 font-medium text-zinc-900">{row.name}</td>
                <td className="px-4 py-3 text-zinc-600">
                  {row.detail}
                  {row.note && (
                    <span className="mt-1 block text-xs text-zinc-500">
                      {row.note}
                    </span>
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right font-mono font-medium text-zinc-900">
                  {row.price}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right font-mono text-xs text-zinc-500">
                  {row.lead || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs italic leading-relaxed text-zinc-500">
        {PRICE_DISCLAIMER}
      </p>

      {table.service && (
        <Link
          href={table.service}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-orange-600 hover:text-orange-700"
        >
          Xem chi tiết dịch vụ →
        </Link>
      )}
    </div>
  );
}

export function BangGia({ loai }: { loai: string }) {
  const table = getPriceTable(loai);
  if (!table) return null;
  return <PriceTableBlock table={table} />;
}

/* ------------------------------------------------------------------ */
/* CTA — exactly two per post, each with a copy-pasteable Zalo message  */
/* ------------------------------------------------------------------ */

export function ZaloCTA({
  title = "Gửi file hoặc ảnh, nhận báo giá trong 30 phút",
  children,
  message,
}: {
  title?: string;
  children?: React.ReactNode;
  /** Pre-filled Zalo message. Zalo can't prefill from a link, so we show it
   *  as copy-paste text — the same pattern /bao-gia uses. */
  message?: string;
}) {
  return (
    <aside className="not-prose my-10 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-900 text-white">
      <div className="p-6 sm:p-8">
        <h3 className="text-xl font-bold leading-snug sm:text-2xl">{title}</h3>

        {children && (
          <div className="mt-3 text-sm leading-relaxed text-zinc-300">
            {children}
          </div>
        )}

        {message && (
          <pre className="mt-5 overflow-x-auto whitespace-pre-wrap rounded-xl bg-zinc-800/80 p-4 font-mono text-[13px] leading-relaxed text-zinc-200">
{message}
          </pre>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={BUSINESS.zalo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#0068ff] px-6 py-3 text-sm font-bold transition-colors hover:bg-[#0057d4]"
          >
            Chat Zalo {BUSINESS.phoneDisplay}
          </a>
          <Link
            href="/bao-gia/"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-6 py-3 text-sm font-bold transition-colors hover:border-zinc-500"
          >
            Gửi yêu cầu báo giá
          </Link>
        </div>

        <p className="mt-4 font-mono text-xs text-zinc-500">
          {BUSINESS.hours.display} · {BUSINESS.hours.note}
        </p>
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/* NAP block — both branches, appended to every post                    */
/* ------------------------------------------------------------------ */

export function ThongTinLienHe() {
  return (
    <aside className="not-prose my-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
      <p className="font-bold text-zinc-900">{BUSINESS.name} — In 3D &amp; Thiết kế</p>

      <ul className="mt-4 space-y-3 text-sm text-zinc-700">
        {BUSINESS.branches.map((branch) => (
          <li key={branch.id}>
            <span className="font-medium text-zinc-900">{branch.name}:</span>{" "}
            {formatAddressShort(branch)}
            {branch.landmark && (
              <span className="text-zinc-500"> · {branch.landmark}</span>
            )}
          </li>
        ))}
        <li>
          <span className="font-medium text-zinc-900">Zalo / Gọi:</span>{" "}
          <a
            href={BUSINESS.tel}
            className="font-mono text-orange-600 hover:text-orange-700"
          >
            {BUSINESS.phoneDisplay}
          </a>{" "}
          <span className="text-zinc-500">
            — {BUSINESS.hours.display}, {BUSINESS.hours.note.toLowerCase()}
          </span>
        </li>
      </ul>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/* Đọc thêm                                                            */
/* ------------------------------------------------------------------ */

export function DocThem({ children }: { children: React.ReactNode }) {
  return (
    <aside className="not-prose my-8 rounded-xl border border-zinc-200 p-6">
      <p className="mb-3 font-mono text-xs uppercase tracking-wider text-zinc-500">
        Đọc thêm
      </p>
      <div className="space-y-2 text-[15px] [&_a]:text-orange-600 [&_a:hover]:text-orange-700 [&_li]:leading-relaxed [&_ul]:space-y-2">
        {children}
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/* Figure with caption                                                 */
/* ------------------------------------------------------------------ */

export function Anh({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="not-prose my-8">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-zinc-100">
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-zinc-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
