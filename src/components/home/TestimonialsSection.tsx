"use client";

import { useRef, useState, useEffect } from "react";
import {motion, useInView, AnimatePresence} from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-4 md:px-6 bg-zinc-950 overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs md:text-sm text-orange-500 font-mono uppercase tracking-widest mb-4 block">
            [ 05 ] Đánh giá
          </span>
          <h2 className="text-display text-4xl md:text-6xl lg:text-7xl text-white mb-4">
            KHÁCH HÀNG
            <br />
            <span className="text-gradient">NÓI GÌ</span>
          </h2>
        </motion.div>

        {/* 3D Carousel */}
        <div className="relative h-[500px] md:h-[450px] perspective-[1000px]">
          {/* Cards Stack */}
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              {testimonials.map((testimonial, index) => {
                const position = (index - activeIndex + testimonials.length) % testimonials.length;
                const isActive = position === 0;
                const isPrev = position === testimonials.length - 1;
                const isNext = position === 1;
                const isFarPrev = position === testimonials.length - 2;
                const isFarNext = position === 2;

                if (!isActive && !isPrev && !isNext && !isFarPrev && !isFarNext) return null;

                let xOffset = 0;
                let scale = 1;
                let zIndex = 0;
                let opacity = 1;
                let rotateY = 0;

                if (isActive) {
                  xOffset = 0;
                  scale = 1;
                  zIndex = 50;
                  opacity = 1;
                  rotateY = 0;
                } else if (isPrev) {
                  xOffset = -280;
                  scale = 0.85;
                  zIndex = 40;
                  opacity = 0.7;
                  rotateY = 15;
                } else if (isNext) {
                  xOffset = 280;
                  scale = 0.85;
                  zIndex = 40;
                  opacity = 0.7;
                  rotateY = -15;
                } else if (isFarPrev) {
                  xOffset = -480;
                  scale = 0.7;
                  zIndex = 30;
                  opacity = 0.4;
                  rotateY = 25;
                } else if (isFarNext) {
                  xOffset = 480;
                  scale = 0.7;
                  zIndex = 30;
                  opacity = 0.4;
                  rotateY = -25;
                }

                return (
                  <motion.div
                    key={testimonial.id}
                    className="absolute w-full max-w-md cursor-pointer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      x: xOffset,
                      scale,
                      zIndex,
                      opacity,
                      rotateY,
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                    onClick={() => {
                      if (!isActive) {
                        setIsAutoPlaying(false);
                        setActiveIndex(index);
                      }
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <TestimonialCard testimonial={testimonial} isActive={isActive} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-[60] w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-[60] w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setActiveIndex(index);
              }}
              className={`transition-all duration-300 rounded-full ${
                index === activeIndex
                  ? "w-8 h-2 bg-gradient-to-r from-orange-500 to-cyan-500"
                  : "w-2 h-2 bg-zinc-700 hover:bg-zinc-600"
              }`}
            />
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
              <p className="text-3xl md:text-4xl font-bold text-white">{stat.value}</p>
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
  isActive: boolean;
}

function TestimonialCard({ testimonial, isActive }: TestimonialCardProps) {
  return (
    <div
      className={`bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 border transition-all duration-300 ${
        isActive
          ? "border-orange-500/50 shadow-[0_0_60px_rgba(249,115,22,0.15)]"
          : "border-zinc-800"
      }`}
    >
      {/* Quote Icon with Gradient */}
      <div className="relative mb-6">
        <Quote className="w-12 h-12 text-orange-500/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent blur-xl" />
      </div>

      {/* Content */}
      <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-6">
        &ldquo;{testimonial.content}&rdquo;
      </p>

      {/* Project Tag */}
      <div className="mb-6">
        <span className="inline-block px-4 py-1.5 text-xs font-mono uppercase tracking-wider bg-gradient-to-r from-orange-500/20 to-cyan-500/20 text-orange-400 rounded-full border border-orange-500/30">
          {testimonial.project}
        </span>
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < testimonial.rating
                ? "fill-orange-400 text-orange-400"
                : "text-zinc-700"
            }`}
          />
        ))}
      </div>

      {/* Author */}
      <div className="flex items-center gap-4 pt-6 border-t border-zinc-800">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-orange-500/20">
          {testimonial.avatar}
        </div>
        <div>
          <p className="font-semibold text-white">{testimonial.name}</p>
          <p className="text-sm text-zinc-500">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}
