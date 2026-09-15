"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, Copy, MessageCircle, Paperclip, Phone } from "lucide-react";
import { Header, Footer } from "@/components/landing";
import { BUSINESS } from "@/lib/business";
import { SERVICES } from "@/lib/navigation";
import { buildQuoteMessage, validateQuote, type QuoteErrors, type QuoteRequest } from "@/lib/quote";

const INITIAL_REQUEST: QuoteRequest = { name: "", phone: "", service: "Cần tư vấn", notes: "" };

export default function QuotePageContent() {
  const [request, setRequest] = useState(INITIAL_REQUEST);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [message, setMessage] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const previewRef = useRef<HTMLElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (message) previewRef.current?.focus();
  }, [message]);

  function update(field: keyof QuoteRequest, value: string) {
    setRequest((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
    setMessage("");
    setCopyStatus("");
  }

  function prepareMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateQuote(request);
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      formRef.current?.querySelector<HTMLElement>('[name="' + firstError + '"]')?.focus();
      return;
    }
    setCopyStatus("");
    setMessage(buildQuoteMessage(request));
  }

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message);
      setCopyStatus("Đã sao chép. Mở Zalo, dán nội dung và gửi cho Tiệm 3D.");
    } catch {
      messageRef.current?.focus();
      messageRef.current?.select();
      setCopyStatus("Trình duyệt chưa cho phép sao chép. Nội dung đã được chọn; hãy dùng lệnh Sao chép rồi dán vào Zalo.");
    }
  }

  return (
    <>
      <Header />
      <main id="noi-dung" className="min-h-screen bg-[#f4f6f7] pb-20 pt-28 sm:pt-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <nav aria-label="Đường dẫn" className="mb-8 text-sm text-zinc-600">
            <Link href="/" className="hover:underline">Trang chủ</Link>
            <span aria-hidden="true" className="mx-3">/</span>
            <span aria-current="page">Báo giá in 3D</span>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-zinc-950 sm:text-5xl">
                Báo giá in 3D.<br />Bắt đầu từ món đồ bạn cần.
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-600">
                Kể cho Tiệm 3D ý tưởng, số lượng và kích thước dự kiến.
                Chúng tôi sẽ tư vấn cách làm, vật liệu và chi phí phù hợp.
              </p>
              <a href={BUSINESS.zalo} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#0068d9] px-6 py-3 font-semibold text-white hover:bg-[#0055b3]">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />Nhắn Zalo trực tiếp
              </a>
              <div className="mt-10 space-y-6 border-t border-zinc-300 pt-8">
                <div className="flex gap-3">
                  <Paperclip className="mt-1 h-5 w-5 shrink-0 text-zinc-600" aria-hidden="true" />
                  <div>
                    <h2 className="font-semibold text-zinc-950">Có ảnh hoặc file 3D?</h2>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-600">Đính kèm ảnh, bản vẽ, STL, OBJ, STEP hoặc 3MF trực tiếp trong cuộc trò chuyện Zalo. Chưa có file cũng có thể nhờ tư vấn.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="mt-1 h-5 w-5 shrink-0 text-zinc-600" aria-hidden="true" />
                  <div>
                    <h2 className="font-semibold text-zinc-950">Muốn trao đổi nhanh?</h2>
                    <a href={BUSINESS.tel} className="mt-1 inline-block py-1 text-lg font-semibold text-[#a83e08] underline-offset-4 hover:underline">{BUSINESS.phoneDisplay}</a>
                    <p className="text-sm text-zinc-600">{BUSINESS.hours.display}, {BUSINESS.hours.days.toLowerCase()}</p>
                  </div>
                </div>
                <Link href="/bang-gia/" className="inline-flex min-h-11 items-center gap-2 font-semibold text-zinc-900 underline underline-offset-4">Xem giá tham khảo<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-8">
              <h2 className="text-2xl font-semibold text-zinc-950">Chuẩn bị yêu cầu báo giá</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">Điền thông tin, xem lại rồi sao chép sang Zalo. Nội dung chỉ được gửi khi bạn bấm gửi trong Zalo.</p>
              <form ref={formRef} onSubmit={prepareMessage} noValidate className="quote-request-form mt-7 space-y-5">
                <div>
                  <label htmlFor="quote-name" className="form-label">Tên của bạn <span className="font-normal text-zinc-600">(bắt buộc)</span></label>
                  <input id="quote-name" name="name" autoComplete="name" required maxLength={100} value={request.name} onChange={(event) => update("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "quote-name-error" : undefined} className="form-input" />
                  {errors.name && <p id="quote-name-error" className="form-error">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="quote-phone" className="form-label">Số di động <span className="font-normal text-zinc-600">(không bắt buộc)</span></label>
                  <input id="quote-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={24} value={request.phone} onChange={(event) => update("phone", event.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "quote-phone-error" : "quote-phone-help"} className="form-input" />
                  {errors.phone ? <p id="quote-phone-error" className="form-error">{errors.phone}</p> : <p id="quote-phone-help" className="mt-2 text-sm text-zinc-600">Có thể để trống nếu bạn muốn trao đổi qua Zalo.</p>}
                </div>
                <div>
                  <label htmlFor="quote-service" className="form-label">Bạn cần hỗ trợ gì?</label>
                  <select id="quote-service" name="service" value={request.service} onChange={(event) => update("service", event.target.value)} className="form-input">
                    <option>Cần tư vấn</option>
                    {SERVICES.map((service) => <option key={service.href}>{service.name}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="quote-notes" className="form-label">Mô tả yêu cầu <span className="font-normal text-zinc-600">(bắt buộc)</span></label>
                  <textarea id="quote-notes" name="notes" required rows={5} maxLength={3000} value={request.notes} onChange={(event) => update("notes", event.target.value)} aria-invalid={Boolean(errors.notes)} aria-describedby={errors.notes ? "quote-notes-error" : "quote-notes-help"} className="form-input resize-y" placeholder="Ví dụ: Mình cần in 2 bánh răng thay thế, đường kính khoảng 38 mm. Có ảnh và mẫu cũ, cần dùng trong tuần tới." />
                  {errors.notes ? <p id="quote-notes-error" className="form-error">{errors.notes}</p> : <p id="quote-notes-help" className="mt-2 text-sm text-zinc-600">Mục đích sử dụng, kích thước, số lượng và thời gian bạn cần.</p>}
                </div>
                <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-zinc-950 px-5 py-3 font-semibold text-white hover:bg-zinc-800">Xem nội dung gửi Zalo<ArrowRight className="h-5 w-5" aria-hidden="true" /></button>
                <p className="text-xs leading-relaxed text-zinc-600">Thông tin trong biểu mẫu được xử lý trên thiết bị của bạn. Tiệm 3D chưa nhận được nội dung cho tới khi bạn gửi qua Zalo.</p>
              </form>

              {message && (
                <section ref={previewRef} tabIndex={-1} aria-labelledby="quote-preview-title" className="mt-8 scroll-mt-24 rounded-xl border border-orange-200 bg-orange-50 p-4 sm:p-5">
                  <h2 id="quote-preview-title" className="text-lg font-semibold text-zinc-950">Nội dung đã sẵn sàng</h2>
                  <p className="mt-1 text-sm text-zinc-600">Chưa được gửi. Sao chép nội dung, mở Zalo rồi dán và gửi.</p>
                  <label htmlFor="quote-message" className="sr-only">Nội dung để sao chép sang Zalo</label>
                  <textarea ref={messageRef} id="quote-message" readOnly value={message} rows={9} className="form-input mt-4 resize-y text-sm" />
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <button type="button" onClick={copyMessage} className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-3 font-semibold text-zinc-950 hover:bg-zinc-50"><Copy className="h-4 w-4" aria-hidden="true" />1. Sao chép nội dung</button>
                    <a href={BUSINESS.zalo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-[#0068d9] px-4 py-3 font-semibold text-white hover:bg-[#0055b3]"><MessageCircle className="h-4 w-4" aria-hidden="true" />2. Mở Zalo để gửi</a>
                  </div>
                  <p role="status" aria-live="polite" className="mt-3 text-sm leading-relaxed text-zinc-700">{copyStatus}</p>
                </section>
              )}
              <noscript>
                <style>{".quote-request-form { display: none; }"}</style>
                <p className="mt-5 rounded-lg bg-orange-50 p-4 text-sm text-zinc-800">Biểu mẫu cần JavaScript. Bạn vẫn có thể dùng nút Nhắn Zalo trực tiếp hoặc gọi điện để gửi yêu cầu.</p>
              </noscript>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
