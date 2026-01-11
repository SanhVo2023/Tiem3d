"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQJsonLd } from "@/components/seo/JsonLd";

const faqs = [
  {
    category: "Báo giá & Đặt hàng",
    items: [
      {
        question: "Làm sao để nhận báo giá?",
        answer:
          "Bạn chỉ cần gửi file 3D (STL, OBJ, STEP, 3MF) qua trang Báo giá hoặc Zalo. Chúng tôi sẽ phản hồi chi tiết về giá, thời gian và vật liệu phù hợp trong vòng 30 phút (giờ làm việc).",
      },
      {
        question: "Giá in 3D được tính như thế nào?",
        answer:
          "Giá phụ thuộc vào: khối lượng vật liệu, công nghệ in (FDM từ 500đ/g, Resin từ 800đ/g), độ phức tạp của chi tiết, và số lượng. Đơn hàng số lượng lớn có giá ưu đãi hơn.",
      },
      {
        question: "Có đặt cọc trước không?",
        answer:
          "Đơn dưới 500k: không cần cọc. Đơn từ 500k-2tr: cọc 50%. Đơn trên 2tr: cọc 30-50% tùy thoả thuận. Hỗ trợ chuyển khoản, Momo, ZaloPay.",
      },
    ],
  },
  {
    category: "Vật liệu & Công nghệ",
    items: [
      {
        question: "Nên chọn FDM hay Resin?",
        answer:
          "FDM phù hợp cho chi tiết cơ khí, prototype lớn, vật dụng chịu lực - giá rẻ hơn. Resin phù hợp cho figure, trang sức, chi tiết siêu nhỏ - độ mịn cao hơn. Chúng tôi sẽ tư vấn dựa trên nhu cầu cụ thể của bạn.",
      },
      {
        question: "Có những vật liệu nào?",
        answer:
          "FDM: PLA, PETG, ABS, TPU (dẻo), Carbon Fiber, Wood-fill. Resin: Standard, ABS-like, Flexible, Castable (đúc kim loại), Dental/Medical grade. Liên hệ để được tư vấn vật liệu phù hợp nhất.",
      },
      {
        question: "Độ chính xác và độ phân giải?",
        answer:
          "FDM: layer từ 0.1mm, tolerance ±0.2mm. Resin 8K: layer 0.025mm, tolerance ±0.05mm. Với chi tiết kỹ thuật cao, chúng tôi có thể đạt tolerance chặt hơn theo yêu cầu.",
      },
    ],
  },
  {
    category: "Giao hàng & Bảo hành",
    items: [
      {
        question: "Thời gian in mất bao lâu?",
        answer:
          "Tùy kích thước và số lượng: Chi tiết nhỏ đơn lẻ 1-2 ngày. Chi tiết lớn hoặc số lượng nhiều 3-5 ngày. Có dịch vụ in nhanh 24h với phụ phí.",
      },
      {
        question: "Ship hàng như thế nào?",
        answer:
          "Giao hàng toàn quốc qua GHN, GHTK, J&T. Nội thành HCM: 1-2 ngày. Tỉnh: 2-4 ngày. Hỗ trợ COD. Hàng được đóng gói cẩn thận với foam/bóng khí.",
      },
      {
        question: "Có bảo hành không?",
        answer:
          "Bảo hành lỗi kỹ thuật do in (nứt, layer shift, lỗi bề mặt) trong 7 ngày. Hỗ trợ in lại miễn phí nếu lỗi từ phía chúng tôi. Không bảo hành hư hỏng do vận chuyển hoặc sử dụng sai cách.",
      },
    ],
  },
];

export function FAQSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Flatten FAQs for JSON-LD
  const allFaqs = faqs.flatMap((category) =>
    category.items.map((item) => ({
      question: item.question,
      answer: item.answer,
    }))
  );

  return (
    <>
      <FAQJsonLd faqs={allFaqs} />
      <section ref={sectionRef} className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-500 mb-4">
              FAQ
            </p>
            <h2 className="text-display text-3xl md:text-4xl lg:text-5xl text-zinc-900 mb-4">
              CÂU HỎI THƯỜNG GẶP
            </h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              Những thắc mắc phổ biến về dịch vụ in 3D của chúng tôi
            </p>
          </motion.div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {faqs.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <HelpCircle className="w-5 h-5 text-orange-500" />
                  <h3 className="font-bold text-zinc-900">{category.category}</h3>
                </div>

                {/* FAQ Items */}
                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => {
                    const id = `${categoryIndex}-${itemIndex}`;
                    const isOpen = openItems.includes(id);

                    return (
                      <div
                        key={id}
                        className="border border-zinc-200 rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => toggleItem(id)}
                          className="w-full flex items-center justify-between p-5 text-left hover:bg-zinc-50 transition-colors"
                        >
                          <span className="font-medium text-zinc-900 pr-4">
                            {item.question}
                          </span>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-5 h-5 text-zinc-400 flex-shrink-0" />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 pb-5 text-zinc-600 leading-relaxed">
                                {item.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center p-8 bg-zinc-50 rounded-2xl"
          >
            <p className="text-zinc-600 mb-4">
              Không tìm thấy câu trả lời? Liên hệ trực tiếp với chúng tôi
            </p>
            <a
              href="https://zalo.me/0777863808"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors"
            >
              Chat Zalo ngay
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
