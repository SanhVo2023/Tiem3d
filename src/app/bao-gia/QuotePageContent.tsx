"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Upload, Check, FileText, X, AlertCircle, MessageCircle, Copy } from "lucide-react";
import { LenisProvider, CustomCursor } from "@/components/effects";
import { ZaloWidget, MagneticButton } from "@/components/ui";

// Vietnamese phone validation regex
const PHONE_REGEX = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  files?: string;
}

export default function QuotePageContent() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [zaloMessage, setZaloMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Vui lòng nhập tên của bạn";
        if (value.trim().length < 2) return "Tên phải có ít nhất 2 ký tự";
        return undefined;
      case "phone":
        if (!value.trim()) return "Vui lòng nhập số điện thoại";
        const cleanPhone = value.replace(/[\s-]/g, "");
        if (!PHONE_REGEX.test(cleanPhone)) {
          return "Số điện thoại không hợp lệ (VD: 0912345678)";
        }
        return undefined;
      case "email":
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Email không hợp lệ";
        }
        return undefined;
      default:
        return undefined;
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name as keyof typeof formData]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateFiles = (files: File[]): { valid: File[]; error?: string } => {
    const validExtensions = [".stl", ".obj", ".step", ".3mf", ".stp"];
    const validFiles: File[] = [];

    for (const file of files) {
      const ext = file.name.toLowerCase().slice(file.name.lastIndexOf("."));
      if (!validExtensions.includes(ext)) {
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        return { valid: [], error: `File "${file.name}" vượt quá 10MB` };
      }
      validFiles.push(file);
    }

    const totalSize = [...uploadedFiles, ...validFiles].reduce((acc, f) => acc + f.size, 0);
    if (totalSize > MAX_FILE_SIZE) {
      return { valid: [], error: "Tổng dung lượng file vượt quá 10MB" };
    }

    return { valid: validFiles };
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const { valid, error } = validateFiles(files);

    if (error) {
      setErrors((prev) => ({ ...prev, files: error }));
      return;
    }

    if (valid.length > 0) {
      setErrors((prev) => ({ ...prev, files: undefined }));
      simulateUpload(valid);
    }
  }, [uploadedFiles]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const { valid, error } = validateFiles(files);

    if (error) {
      setErrors((prev) => ({ ...prev, files: error }));
      return;
    }

    if (valid.length > 0) {
      setErrors((prev) => ({ ...prev, files: undefined }));
      simulateUpload(valid);
    }

    e.target.value = "";
  }, [uploadedFiles]);

  const simulateUpload = (files: File[]) => {
    setIsUploading(true);
    setUploadProgress(0);

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
    setErrors((prev) => ({ ...prev, files: undefined }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    newErrors.name = validateField("name", formData.name);
    newErrors.phone = validateField("phone", formData.phone);
    newErrors.email = validateField("email", formData.email);

    setErrors(newErrors);
    setTouched({ name: true, phone: true, email: true });

    return !Object.values(newErrors).some(Boolean);
  };

  const generateZaloMessage = (): string => {
    let message = `🖨️ YÊU CẦU BÁO GIÁ IN 3D\n\n`;
    message += `👤 Tên: ${formData.name}\n`;
    message += `📞 SĐT: ${formData.phone}\n`;
    if (formData.email) {
      message += `📧 Email: ${formData.email}\n`;
    }
    if (uploadedFiles.length > 0) {
      message += `📁 File: ${uploadedFiles.map(f => f.name).join(", ")}\n`;
      message += `(Sẽ gửi file qua Zalo)\n`;
    }
    if (formData.notes) {
      message += `\n📝 Ghi chú:\n${formData.notes}\n`;
    }
    message += `\n---\nGửi từ tiem3d.com`;
    return message;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Generate message and show success
    const message = generateZaloMessage();
    setZaloMessage(message);
    setIsSuccess(true);

    // Open Zalo chat after a short delay
    setTimeout(() => {
      window.open("https://zalo.me/0384844730", "_blank");
    }, 500);
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(zaloMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = zaloMessage;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setZaloMessage("");
    setFormData({ name: "", phone: "", email: "", notes: "" });
    setUploadedFiles([]);
    setErrors({});
    setTouched({});
    setCopied(false);
  };

  return (
    <LenisProvider>
      <CustomCursor />

      <div className="min-h-screen bg-void relative">
        {/* 3D Grid Floor */}
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
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-8 max-w-lg mx-auto"
                >
                  {/* Success Icon */}
                  <div className="text-center mb-6">
                    <motion.div
                      className="w-20 h-20 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                    >
                      <Check className="w-10 h-10 text-white" />
                    </motion.div>
                    <h2 className="text-display text-2xl text-signal mb-2">
                      GẦN XONG RỒI!
                    </h2>
                    <p className="text-mono text-sm text-noise">
                      Zalo đã được mở. Copy tin nhắn bên dưới và gửi cho chúng tôi.
                    </p>
                  </div>

                  {/* Message to copy */}
                  <div className="bg-zinc-800 rounded-lg p-4 mb-4">
                    <pre className="text-mono text-xs text-zinc-300 whitespace-pre-wrap break-words">
                      {zaloMessage}
                    </pre>
                  </div>

                  {/* Copy button */}
                  <button
                    onClick={copyMessage}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                      copied
                        ? "bg-green-500 text-white"
                        : "bg-orange-500 hover:bg-orange-600 text-white"
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        ĐÃ COPY!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        COPY TIN NHẮN
                      </>
                    )}
                  </button>

                  {/* Open Zalo again */}
                  <a
                    href="https://zalo.me/0384844730"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 mt-3 rounded-lg border border-zinc-700 text-signal hover:bg-zinc-800 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    MỞ LẠI ZALO
                  </a>

                  {/* File reminder */}
                  {uploadedFiles.length > 0 && (
                    <p className="text-mono text-xs text-orange-500 text-center mt-4">
                      💡 Nhớ gửi {uploadedFiles.length} file qua Zalo nhé!
                    </p>
                  )}

                  {/* Reset */}
                  <button
                    onClick={handleReset}
                    className="w-full text-mono text-xs text-zinc-500 hover:text-signal mt-6 transition-colors"
                  >
                    ← Gửi yêu cầu khác
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Header */}
                  <div className="text-center mb-12">
                    <p className="text-mono text-xs text-noise tracking-widest mb-4">BÁO GIÁ</p>
                    <h1 className="text-display text-4xl md:text-5xl lg:text-6xl text-signal">
                      GỬI FILE CỦA BẠN
                    </h1>
                    <p className="text-mono text-sm text-noise mt-4 max-w-md mx-auto">
                      Nhận báo giá chi tiết trong vòng 30 phút qua Zalo
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Upload Zone */}
                    <motion.div
                      className={`
                        relative p-8 border-2 border-dashed rounded-lg transition-colors duration-300
                        ${isDragging ? "border-orange-500 bg-orange-500/10" : "border-zinc-700 bg-zinc-900/50"}
                        ${errors.files ? "border-red-500" : ""}
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
                        <AnimatePresence mode="wait">
                          {isUploading ? (
                            <motion.div
                              key="uploading"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="mb-6"
                            >
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

                      {errors.files && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 text-red-500 text-mono text-xs mt-4 justify-center"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.files}
                        </motion.p>
                      )}

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
                                <span className="text-mono text-xs text-zinc-500">
                                  ({(file.size / 1024 / 1024).toFixed(2)}MB)
                                </span>
                              </div>
                              <button
                                type="button"
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
                          name="name"
                          required
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          onBlur={() => handleBlur("name")}
                          className={`w-full bg-zinc-900 border px-4 py-3 text-signal text-mono focus:border-orange-500 focus:outline-none transition-colors ${
                            errors.name && touched.name ? "border-red-500" : "border-zinc-800"
                          }`}
                          placeholder="Nguyễn Văn A"
                        />
                        {errors.name && touched.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-1 text-red-500 text-mono text-xs mt-2"
                          >
                            <AlertCircle className="w-3 h-3" />
                            {errors.name}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <label className="text-mono text-xs text-noise mb-2 block">
                          SỐ ĐIỆN THOẠI / ZALO *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          onBlur={() => handleBlur("phone")}
                          className={`w-full bg-zinc-900 border px-4 py-3 text-signal text-mono focus:border-orange-500 focus:outline-none transition-colors ${
                            errors.phone && touched.phone ? "border-red-500" : "border-zinc-800"
                          }`}
                          placeholder="0912 345 678"
                        />
                        {errors.phone && touched.phone && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-1 text-red-500 text-mono text-xs mt-2"
                          >
                            <AlertCircle className="w-3 h-3" />
                            {errors.phone}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <label className="text-mono text-xs text-noise mb-2 block">
                          EMAIL (tùy chọn)
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          onBlur={() => handleBlur("email")}
                          className={`w-full bg-zinc-900 border px-4 py-3 text-signal text-mono focus:border-orange-500 focus:outline-none transition-colors ${
                            errors.email && touched.email ? "border-red-500" : "border-zinc-800"
                          }`}
                          placeholder="email@example.com"
                        />
                        {errors.email && touched.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-1 text-red-500 text-mono text-xs mt-2"
                          >
                            <AlertCircle className="w-3 h-3" />
                            {errors.email}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <label className="text-mono text-xs text-noise mb-2 block">
                          GHI CHÚ
                        </label>
                        <textarea
                          name="notes"
                          rows={4}
                          value={formData.notes}
                          onChange={(e) => handleChange("notes", e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-signal text-mono focus:border-orange-500 focus:outline-none transition-colors resize-none"
                          placeholder="Số lượng, vật liệu mong muốn, deadline..."
                        />
                      </div>

                      <MagneticButton
                        variant="solid"
                        className="w-full justify-center"
                        cursorText="GỬI"
                        type="submit"
                      >
                        <span className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4" />
                          GỬI QUA ZALO
                        </span>
                      </MagneticButton>

                      <p className="text-mono text-xs text-zinc-600 text-center">
                        Sẽ mở Zalo để bạn gửi thông tin trực tiếp
                      </p>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <ZaloWidget />
      </div>
    </LenisProvider>
  );
}
