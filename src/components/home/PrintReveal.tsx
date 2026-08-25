"use client";

import { useEffect, useState } from "react";
import {
  motion,
  animate,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";
import Image from "@/components/ui/Img";
import { getCaseStudyBySlug, coverImage, type CaseStudy } from "@/lib/portfolio";

/**
 * The hero's focal visual: a real job building up the way it did on the machine.
 *
 * The previous hero was an abstract contour field. It was legible only if you
 * already knew it was meant to be slicer output — and for a shop whose product
 * is physical and photogenic, showing no printed object at all was the bigger
 * miss. This shows four finished jobs, each revealed bottom-to-top behind a
 * nozzle line, which is the one image of this craft everybody recognises.
 *
 * The four are chosen to span the range a visitor might be wondering about:
 * fine detail, a cosplay prop, something large, and a functional part. Names,
 * specs and photos come from src/lib/portfolio.ts, so every frame is a real job
 * and links to its write-up.
 */

// Fine detail -> cosplay -> large format -> functional. Whatever you came to
// ask about, one of these four is close to it.
const SHOWCASE = [
  "figure-anime-resin-8k",
  "mu-iron-man-mk85",
  "tuong-phat-a-di-da",
  "banh-rang-thay-the",
]
  .map((slug) => getCaseStudyBySlug(slug))
  .filter((study): study is CaseStudy => Boolean(study));

const BUILD_MS = 2400;
const HOLD_MS = 3400;

export default function PrintReveal() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const progress = useMotionValue(reduceMotion ? 1 : 0);

  const study = SHOWCASE[index];

  // Reveal from the build plate upward, then hold, then move to the next job.
  useEffect(() => {
    if (reduceMotion) {
      progress.set(1);
      return;
    }
    progress.set(0);
    const controls = animate(progress, 1, {
      duration: BUILD_MS / 1000,
      ease: [0.33, 0, 0.2, 1],
    });
    const next = window.setTimeout(
      () => setIndex((i) => (i + 1) % SHOWCASE.length),
      BUILD_MS + HOLD_MS
    );
    return () => {
      controls.stop();
      window.clearTimeout(next);
    };
  }, [index, reduceMotion, progress]);

  // Everything below is driven off the single progress value, so the mask, the
  // nozzle line and the layer readout can never disagree with each other.
  const clipPath = useTransform(progress, (v) => `inset(${(1 - v) * 100}% 0 0 0)`);
  const nozzleBottom = useTransform(progress, (v) => `${v * 100}%`);
  const nozzleOpacity = useTransform(progress, [0, 0.04, 0.93, 1], [0, 1, 1, 0]);
  const captionOpacity = useTransform(progress, [0.72, 0.96], [0, 1]);
  const layerLabel = useTransform(progress, (v) => {
    const total = 380;
    return `Lớp ${String(Math.round(v * total)).padStart(3, "0")} / ${total}`;
  });

  if (!study) return null;

  const material =
    study.specs.find((s) => s.label === "Vật liệu")?.value ??
    study.specs.find((s) => s.label === "Công nghệ")?.value ??
    "";
  const size = study.specs.find((s) =>
    ["Chiều cao", "Chiều dài", "Kích thước", "Đường kính", "Tỉ lệ"].includes(s.label)
  )?.value;

  return (
    <div className="relative">
      {/* Build chamber */}
      <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 lg:aspect-[4/5]">
        {/* Empty build plate, visible before the part covers it */}
        <div aria-hidden className="absolute inset-0 grid-bg-orange opacity-40" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_100%,rgba(249,115,22,0.16)_0%,transparent_70%)]"
        />

        <motion.div
          key={study.slug}
          className="absolute inset-0"
          style={{ clipPath }}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          <Image
            src={coverImage(study)}
            alt={`${study.title} — sản phẩm in 3D hoàn thiện tại Tiệm 3D`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
            priority={index === 0}
          />
          {/* Layer striping across the finished part, so the surface reads as
              printed rather than moulded. */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.13] mix-blend-overlay"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(0,0,0,0.9) 0px, rgba(0,0,0,0.9) 1px, transparent 1px, transparent 4px)",
            }}
          />
        </motion.div>

        {/* The nozzle: a hot line at the build front. */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 h-px"
          style={{ bottom: nozzleBottom, opacity: nozzleOpacity }}
        >
          <div className="h-px w-full bg-orange-400 shadow-[0_0_18px_4px_rgba(249,115,22,0.55)]" />
        </motion.div>

        {/* Live layer readout, in the mono face the site keeps for numbers. */}
        {!reduceMotion && (
          <motion.span
            className="text-mono-sm absolute left-4 top-4 rounded-full bg-zinc-950/70 px-3 py-1.5 text-orange-300 backdrop-blur-sm"
            style={{ opacity: nozzleOpacity }}
          >
            {layerLabel}
          </motion.span>
        )}

        {/* Caption — arrives with the finished part. */}
        <motion.div
          style={{ opacity: captionOpacity }}
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950 via-zinc-950/75 to-transparent p-4 pt-12 md:p-5 md:pt-14"
        >
          <Link href={`/portfolio/${study.slug}/`} className="group block">
            <p className="text-base font-semibold text-white group-hover:text-orange-400 transition-colors md:text-lg">
              {study.shortTitle}
            </p>
            <p className="text-mono-sm mt-1 text-zinc-400">
              {[size, material].filter(Boolean).join(" · ")}
            </p>
          </Link>
        </motion.div>
      </div>

      {/* Which job is showing */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {SHOWCASE.map((item, i) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Xem ${item.shortTitle}`}
            aria-current={i === index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-orange-500" : "w-1.5 bg-white/25 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
