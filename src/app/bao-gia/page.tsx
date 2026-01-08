"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Upload, Check, FileText, X } from "lucide-react";
import { LenisProvider, CustomCursor } from "@/components/effects";
import { ZaloWidget, MagneticButton } from "@/components/ui";

export default function QuotePage() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      [".stl", ".obj", ".step", ".3mf", ".stp"].some((ext) =>
        file.name.toLowerCase().endsWith(ext)
      )
    );

    if (files.length > 0) {
      simulateUpload(files);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      simulateUpload(files);
    }
  }, []);

  const simulateUpload = (files: File[]) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate temperature/progress animation (0°C to 200°C style)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadedFiles((prev) => [...prev, ...files]);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Cảm ơn bạn! Chúng tôi sẽ liên hệ trong 30 phút.");
  };

  return (
    <LenisProvider>
      <CustomCursor />

      <div className="min-h-screen bg-void relative">
        {/* 3D Grid Floor (Tron Style) */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              perspective: "500px",
              perspectiveOrigin: "50% 100%",
            }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                transformStyle: "preserve-3d",
                transform: "rotateX(60deg) translateY(-50%)",
                backgroundImage: `
                  linear-gradient(rgba(249, 115, 22, ${isDragging ? 0.15 : 0.05}) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(249, 115, 22, ${isDragging ? 0.15 : 0.05}) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
              }}
              animate={{
                backgroundSize: isDragging ? "80px 80px" : "60px 60px",
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Back Button */}
        <motion.div
          className="fixed top-8 left-8 z-50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-noise hover:text-signal transition-colors group"
            data-cursor="BACK"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-mono text-xs">TRANG CHỦ</span>
          </Link>
        </motion.div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-8 py-24">
          <motion.div
            className="w-full max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <p className="text-mono text-xs text-noise tracking-widest mb-4">BÁO GIÁ</p>
              <h1 className="text-display text-4xl md:text-5xl lg:text-6xl text-signal">
                GỬI FILE CỦA BẠN
              </h1>
              <p className="text-mono text-sm text-noise mt-4 max-w-md mx-auto">
                Nhận báo giá chi tiết trong vòng 30 phút
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Upload Zone */}
              <motion.div
                className={`
                  relative p-8 border-2 border-dashed rounded-lg transition-colors duration-300
                  ${isDragging ? "border-orange-500 bg-orange-500/10" : "border-zinc-700 bg-zinc-900/50"}
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                whileHover={{ scale: 1.01 }}
              >
                <input
                  type="file"
                  multiple
                  accept=".stl,.obj,.step,.3mf,.stp"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                <div className="text-center">
                  {/* Upload Icon / Progress */}
                  <AnimatePresence mode="wait">
                    {isUploading ? (
                      <motion.div
                        key="uploading"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="mb-6"
                      >
                        {/* Temperature Gauge */}
                        <div className="relative w-32 h-32 mx-auto">
                          <svg className="w-full h-full -rotate-90">
                            <circle
                              cx="64"
                              cy="64"
                              r="56"
                              fill="none"
                              stroke="rgba(113, 113, 122, 0.3)"
                              strokeWidth="8"
                            />
                            <motion.circle
                              cx="64"
                              cy="64"
                              r="56"
                              fill="none"
                              stroke="#f97316"
                              strokeWidth="8"
                              strokeLinecap="round"
                              strokeDasharray={`${2 * Math.PI * 56}`}
                              initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                              animate={{
                                strokeDashoffset:
                                  2 * Math.PI * 56 * (1 - uploadProgress / 100),
                              }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-display text-2xl text-orange-500">
                              {Math.round(uploadProgress * 2)}°C
                            </span>
                            <span className="text-mono text-xs text-noise">HEATING</span>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="mb-6"
                      >
                        <motion.div
                          className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${
                            isDragging ? "bg-orange-500" : "bg-zinc-800"
                          }`}
                          animate={{
                            scale: isDragging ? 1.1 : 1,
                          }}
                        >
                          <Upload
                            className={`w-8 h-8 ${
                              isDragging ? "text-void" : "text-orange-500"
                            }`}
                          />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <h3 className="text-display text-xl text-signal mb-2">
                    {isDragging ? "THẢ FILE TẠI ĐÂY" : "KÉO THẢ FILE"}
                  </h3>
                  <p className="text-mono text-xs text-noise mb-4">
                    hoặc click để chọn file
                  </p>
                  <p className="text-mono text-xs text-zinc-600">
                    Hỗ trợ: STL, OBJ, STEP, 3MF
                  </p>
                </div>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-6 space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between bg-zinc-800 px-4 py-2 rounded"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-orange-500" />
                          <span className="text-mono text-xs text-signal truncate max-w-[150px]">
                            {file.name}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-noise hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-mono text-xs text-noise mb-2 block">
                    TÊN CỦA BẠN *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-signal text-mono focus:border-orange-500 focus:outline-none transition-colors"
                    placeholder="Nguyễn Văn A"
                  />
                </div>

                <div>
                  <label className="text-mono text-xs text-noise mb-2 block">
                    SỐ ĐIỆN THOẠI / ZALO *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-signal text-mono focus:border-orange-500 focus:outline-none transition-colors"
                    placeholder="0912 345 678"
                  />
                </div>

                <div>
                  <label className="text-mono text-xs text-noise mb-2 block">
                    EMAIL (tùy chọn)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-signal text-mono focus:border-orange-500 focus:outline-none transition-colors"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="text-mono text-xs text-noise mb-2 block">
                    GHI CHÚ
                  </label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, notes: e.target.value }))
                    }
                    className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-signal text-mono focus:border-orange-500 focus:outline-none transition-colors resize-none"
                    placeholder="Số lượng, vật liệu mong muốn, deadline..."
                  />
                </div>

                <MagneticButton
                  variant="solid"
                  className="w-full justify-center"
                  cursorText="GỬI"
                  onClick={() => {}}
                >
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    GỬI YÊU CẦU BÁO GIÁ
                  </span>
                </MagneticButton>

                <p className="text-mono text-xs text-zinc-600 text-center">
                  Chúng tôi sẽ phản hồi trong vòng 30 phút trong giờ làm việc
                </p>
              </form>
            </div>
          </motion.div>
        </div>

        <ZaloWidget />
      </div>
    </LenisProvider>
  );
}
