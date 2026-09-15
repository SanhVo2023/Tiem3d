export interface QuoteRequest {
  name: string;
  phone: string;
  service: string;
  notes: string;
}

export type QuoteErrors = Partial<Record<"name" | "phone" | "notes", string>>;

function normalizePhone(value: string): string {
  return value.trim().replace(/[\s().-]/g, "").replace(/^(?:\+84|84)/, "0");
}

export function validateQuote(request: QuoteRequest): QuoteErrors {
  const errors: QuoteErrors = {};
  if (request.name.trim().length < 2) {
    errors.name = "Nhập tên của bạn (ít nhất 2 ký tự).";
  }
  if (request.phone.trim() && !/^0[35789]\d{8}$/.test(normalizePhone(request.phone))) {
    errors.phone = "Kiểm tra số di động, ví dụ 0384 844 730, hoặc để trống để trao đổi qua Zalo.";
  }
  if (!request.notes.trim()) {
    errors.notes = "Mô tả món đồ bạn muốn làm, số lượng hoặc kích thước dự kiến.";
  }
  return errors;
}

export function buildQuoteMessage(request: QuoteRequest): string {
  return [
    "Chào Tiệm 3D, mình muốn nhận tư vấn và báo giá.",
    "",
    `Họ tên: ${request.name.trim()}`,
    ...(request.phone.trim() ? [`Số điện thoại: ${normalizePhone(request.phone)}`] : []),
    `Dịch vụ: ${request.service.trim() || "Cần tư vấn"}`,
    "",
    "Yêu cầu:",
    request.notes.trim(),
  ].join("\n");
}
