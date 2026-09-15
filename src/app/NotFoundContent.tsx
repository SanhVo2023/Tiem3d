import Link from "next/link";
import { Header, Footer } from "@/components/landing";

export default function NotFoundContent() {
  return (
    <>
      <Header />
      <main id="noi-dung" className="flex min-h-[75vh] items-center bg-[#f4f6f7] px-6 pb-16 pt-32">
        <div className="mx-auto w-full max-w-3xl">
          <p className="font-mono text-lg font-semibold text-[#a83e08]">404</p>
          <h1 className="mt-5 text-4xl font-bold leading-tight text-zinc-900 md:text-5xl">Không tìm thấy trang.</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-600">Địa chỉ có thể đã thay đổi hoặc không tồn tại. Bạn có thể xem dịch vụ in 3D hoặc liên hệ tiệm để tìm thông tin cần thiết.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="inline-flex min-h-12 items-center rounded-full bg-zinc-900 px-6 py-3 font-semibold text-white">Về trang chủ</Link>
            <Link href="/dich-vu/" className="inline-flex min-h-12 items-center rounded-full border border-zinc-300 px-6 py-3 font-semibold text-zinc-900">Xem dịch vụ</Link>
            <Link href="/lien-he/" className="inline-flex min-h-12 items-center px-3 py-3 font-semibold text-zinc-900 underline underline-offset-4">Liên hệ tiệm</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
