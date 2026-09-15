import { MessageCircle } from "lucide-react";
import { BUSINESS } from "@/lib/business";

/** A direct contact link remains usable before hydration and with JavaScript off. */
export function ZaloWidget() {
  return (
    <a
      href={BUSINESS.zalo}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Nhắn Zalo cho Tiệm 3D (mở cửa sổ mới)"
      className="fixed bottom-6 right-6 z-40 hidden min-h-12 items-center gap-2 rounded-full bg-[#005ddd] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#0049b0] sm:inline-flex"
    >
      <MessageCircle aria-hidden="true" className="h-5 w-5" />
      <span>Zalo</span>
    </a>
  );
}
