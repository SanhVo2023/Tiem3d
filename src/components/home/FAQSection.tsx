"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQJsonLd } from "@/components/seo/JsonLd";

const faqs = [
  {
    question: "Làm sao để nhận báo giá?",
    answer:
      "Gửi file 3D (STL, OBJ, STEP) qua trang Báo giá hoặc Zalo. Chúng tôi phản hồi trong 30 phút với chi tiết giá, thời gian và vật liệu phù hợp.",
  },
  {
    question: "Giá in 3D được tính như thế nào?",
    answer:
      "Giá tính theo khối lượng vật liệu: FDM từ 500đ/g, Resin từ 800đ/g. Đơn số lượng lớn được giảm giá đến 40%.",
  },
  {
    question: "Nên chọn FDM hay Resin?",
    answer:
      "FDM: chi tiết cơ khí, prototype lớn, giá rẻ. Resin 8K: figure, trang sức, chi tiết siêu mịn. Chúng tôi sẽ tư vấn phù hợp nhu cầu của bạn.",
  },
  {
    question: "Thời gian hoàn thành bao lâu?",
    answer:
      "Chi tiết nhỏ: 1-2 ngày. Chi tiết lớn/số lượng nhiều: 3-5 ngày. Có dịch vụ in nhanh 24h. Giao hàng toàn quốc qua GHN, GHTK, hỗ trợ COD.",
  },
  {
    question: "Có bảo hành không?",
    answer:
      "Bảo hành 7 ngày với lỗi kỹ thuật (nứt, layer shift, lỗi bề mặt). In lại miễn phí nếu lỗi từ phía chúng tôi.",
  },
];

export function FAQSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <FAQJsonLd faqs={faqs} />
      <section data-surface="light" ref={sectionRef} className="py-16 md:py-20 px-6 md:px-12 bg-zinc-50">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-display text-2xl md:text-3xl text-zinc-900 mb-2">
              CÂU HỎI THƯỜNG GẶP
            </h2>
            <p className="text-zinc-500 text-sm">
              Giải đáp nhanh những thắc mắc phổ biến
            </p>
          </motion.div>

          {/* FAQ Items */}
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white border border-zinc-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-zinc-50 transition-colors"
                  >
                    <span className="font-medium text-zinc-900 text-sm md:text-base pr-4">
                      {faq.question}
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
                        <div className="px-4 pb-4 text-zinc-600 text-sm leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Contact link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-8 text-sm text-zinc-500"
          >
            Còn thắc mắc?{" "}
            <a
              href="https://zalo.me/0384844730"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-600 font-medium"
            >
              Chat Zalo ngay
            </a>
          </motion.p>
        </div>
      </section>
    </>
  );
}
