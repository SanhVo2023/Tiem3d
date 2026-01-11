"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Minh Tuấn",
    role: "Maker / DIY Enthusiast",
    avatar: "MT",
    rating: 5,
    content:
      "In figure rồng cho bộ sưu tập, chi tiết vảy rõ từng cái. Đội ngũ tư vấn vật liệu rất nhiệt tình, chọn đúng loại resin 8K như mong muốn.",
    project: "Figure Rồng Resin 8K",
  },
  {
    id: 2,
    name: "Hồng Anh",
    role: "Kỹ sư Cơ khí",
    avatar: "HA",
    rating: 5,
    content:
      "Cần gấp 50 chi tiết nhựa cho dự án prototype. Báo giá 15 phút, giao hàng đúng 3 ngày như cam kết. Sẽ quay lại lần sau.",
    project: "Prototype Enclosure ABS",
  },
  {
    id: 3,
    name: "Phước Lộc",
    role: "Cosplayer",
    avatar: "PL",
    rating: 5,
    content:
      "Mũ Iron Man hoàn thiện quá đẹp! Từ in FDM đến sơn airbrush đều chuyên nghiệp. Đội ngũ còn hướng dẫn cách lắp ráp chi tiết.",
    project: "Iron Man Helmet Full-size",
  },
  {
    id: 4,
    name: "Thanh Hằng",
    role: "Chủ Shop Online",
    avatar: "TH",
    rating: 5,
    content:
      "Đặt 200 móc khóa custom cho shop. Giá sỉ hợp lý, chất lượng đồng đều, không có hàng lỗi. Đã hợp tác được 6 tháng.",
    project: "Móc khóa Custom PLA",
  },
  {
    id: 5,
    name: "Văn Đức",
    role: "Kiến trúc sư",
    avatar: "VD",
    rating: 5,
    content:
      "Sa bàn dự án ra mắt đúng deadline nhờ in nhanh 24h. Chất lượng in rất cao, khách hàng ấn tượng với chi tiết nhỏ.",
    project: "Architectural Scale Model",
  },
  {
    id: 6,
    name: "Quỳnh Mai",
    role: "Designer 3D",
    avatar: "QM",
    rating: 5,
    content:
      "Gửi file lúc 10h tối, sáng hôm sau đã có báo giá chi tiết. Hỗ trợ sửa file miễn phí, rất chu đáo.",
    project: "Sculpture Art Piece",
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-12 bg-zinc-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-500 mb-4">
            Đánh giá
          </p>
          <h2 className="text-display text-3xl md:text-4xl lg:text-5xl text-zinc-900 mb-4">
            KHÁCH HÀNG NÓI GÌ
          </h2>
          <p className="text-zinc-600 max-w-2xl mx-auto">
            Hơn 500+ khách hàng đã tin tưởng và hợp tác cùng chúng tôi
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { value: "500+", label: "Khách hàng" },
            { value: "2,000+", label: "Dự án hoàn thành" },
            { value: "4.9/5", label: "Đánh giá trung bình" },
            { value: "98%", label: "Hài lòng" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-bold text-zinc-900">{stat.value}</p>
              <p className="text-sm text-zinc-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  testimonial: (typeof testimonials)[0];
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      {/* Quote Icon */}
      <Quote className="w-8 h-8 text-orange-100 mb-4" />

      {/* Content */}
      <p className="text-zinc-700 flex-grow mb-4 leading-relaxed">
        "{testimonial.content}"
      </p>

      {/* Project Tag */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 text-xs font-semibold bg-orange-50 text-orange-600 rounded-full">
          {testimonial.project}
        </span>
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < testimonial.rating
                ? "fill-orange-400 text-orange-400"
                : "text-zinc-200"
            }`}
          />
        ))}
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-zinc-100">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
          {testimonial.avatar}
        </div>
        <div>
          <p className="font-semibold text-zinc-900 text-sm">{testimonial.name}</p>
          <p className="text-xs text-zinc-500">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}
