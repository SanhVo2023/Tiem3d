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
import { asset } from "@/lib/cdn";
import { getCaseStudyBySlug, coverImage, type CaseStudy } from "@/lib/portfolio";

/**
 * The hero's focal visual: a real job building up the way it did on the machine.
 *
 * The four are chosen to span the range a visitor might be wondering about:
 * fine detail, a cosplay prop, something large, and a functional part. Names,
 * specs and photos come from src/lib/portfolio.ts, so every frame is a real job
 * and links to its write-up.
 *
 * The loop is one continuous machine cycle rather than a crossfade — build up,
 * hold, then the nozzle sweeps back down and takes the part with it, clearing
 * the plate for the next job. Nothing fades in or out, because a printer does
 * not do that. The part swaps while the plate is empty, so the change is
 * invisible and the motion never stops to reset.
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

const BUILD_MS = 2200;
const HOLD_MS = 3800;
const CLEAR_MS = 700;

// Layers snap into place in steps instead of the mask sliding smoothly, while
// the nozzle keeps gliding — so the head runs slightly ahead and the material
// catches up to it, which is what watching a printer actually looks like.
const VISIBLE_STEPS = 40;

const SIZE_LABELS = ["Chiều cao", "Chiều dài", "Kích thước", "Đường kính", "Tỉ lệ"];

/**
 * A plausible layer count for this part, from its real dimension at a 0.2mm
 * layer height — so the 60cm statue counts through thousands and the 38mm gear
 * through a couple of hundred, instead of every job sharing one invented number.
 */
function layerCount(size: string | undefined): number {
  if (!size) return 600;
  const match = size.match(/(\d+(?:[.,]\d+)?)\s*(cm|mm)/i);
  if (!match) return 600;
  const value = parseFloat(match[1].replace(",", "."));
  const mm = match[2].toLowerCase() === "cm" ? value * 10 : value;
  return Math.min(3200, Math.max(180, Math.round(mm / 0.2)));
}

export default function PrintReveal() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const progress = useMotionValue(reduceMotion ? 1 : 0);

  const study = SHOWCASE[index];

  /**
   * Warm the other three covers once the browser is idle.
   *
   * This is what a loading screen would have been for, without the loading
   * screen: a splash that holds the page back holds LCP back with it, and LCP
   * is a ranking signal. Fetching after first paint costs the visitor nothing,
   * and the images are decoded long before the carousel reaches them.
   */
  useEffect(() => {
    if (SHOWCASE.length < 2) return;
    const warm = () => {
      SHOWCASE.slice(1).forEach((item) => {
        const img = new window.Image();
        img.decoding = "async";
        img.src = asset(coverImage(item));
      });
    };
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(warm, { timeout: 3000 })
      : window.setTimeout(warm, 1200);
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle as number);
      else window.clearTimeout(idle as number);
    };
  }, []);

  // build -> hold -> clear -> next part
  useEffect(() => {
    if (reduceMotion) {
      progress.set(1);
      return;
    }

    let stopped = false;
    const timers: number[] = [];
    // Start from an empty plate. Arriving here from the clear phase this is
    // already 0, but jumping straight to a job from the dots is not — without
    // it, picking a job while one is on hold animates 1 -> 1 and nothing builds.
    progress.set(0);
    let controls = animate(progress, 1, {
      duration: BUILD_MS / 1000,
      ease: [0.3, 0, 0.25, 1],
    });

    timers.push(
      window.setTimeout(() => {
        if (stopped) return;
        // The nozzle runs back down and takes the part with it.
        controls = animate(progress, 0, {
          duration: CLEAR_MS / 1000,
          ease: [0.5, 0, 0.5, 1],
        });
        timers.push(
          window.setTimeout(() => {
            if (stopped) return;
            setIndex((i) => (i + 1) % SHOWCASE.length);
          }, CLEAR_MS)
        );
      }, BUILD_MS + HOLD_MS)
    );

    return () => {
      stopped = true;
      controls.stop();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [index, reduceMotion, progress]);

  const size = study?.specs.find((s) => SIZE_LABELS.includes(s.label))?.value;
  const total = layerCount(size);

  // Everything below is driven off the single progress value, so the mask, the
  // nozzle and the readout can never disagree with each other.
  const clipPath = useTransform(progress, (v) => {
    const stepped = Math.round(v * VISIBLE_STEPS) / VISIBLE_STEPS;
    return `inset(${(1 - stepped) * 100}% 0 0 0)`;
  });
  const nozzleBottom = useTransform(progress, (v) => `${v * 100}%`);
  // Lit whenever the head is moving; gone while the finished part is held.
  const nozzleOpacity = useTransform(progress, [0, 0.02, 0.97, 1], [0, 1, 1, 0]);
  const captionOpacity = useTransform(progress, [0.74, 0.97], [0, 1]);
  const layerLabel = useTransform(
    progress,
    (v) => `Lớp ${Math.round(v * total)} / ${total}`
  );

  if (!study) return null;

  const material =
    study.specs.find((s) => s.label === "Vật liệu")?.value ??
    study.specs.find((s) => s.label === "Công nghệ")?.value ??
    "";

  return (
    <div className="relative">
      {/* Build chamber */}
      <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 sm:aspect-[16/9]">
        {/* Empty build plate, seen before the part covers it */}
        <div aria-hidden className="absolute inset-0 grid-bg-orange opacity-40" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_100%,rgba(249,115,22,0.10)_0%,transparent_70%)]"
        />

        {/* The part that has not been laid down yet, ghosted.
            A slicer shows the unprinted portion greyed rather than absent, and
            it matters here for a plainer reason: clipping to nothing meant the
            product — the entire point of this panel — was invisible for more
            than half of every cycle. Now it is always legible, and the build
            reads as it coming up to full strength. */}
        <Image
          key={`${study.slug}-ghost`}
          src={coverImage(study)}
          alt=""
          aria-hidden
          fill
          className="object-cover opacity-35 grayscale-[0.85]"
          sizes="(max-width: 768px) 100vw, 768px"
        />

        <motion.div className="absolute inset-0 isolate" style={{ clipPath }}>
          <Image
            key={study.slug}
            src={coverImage(study)}
            alt={`${study.title} — sản phẩm in 3D hoàn thiện tại Tiệm 3D`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority={index === 0}
          />
          {/* Layer striping across the part, so the surface reads as printed
              rather than moulded. */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.13] mix-blend-overlay"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(0,0,0,0.9) 0px, rgba(0,0,0,0.9) 1px, transparent 1px, transparent 4px)",
            }}
          />
        </motion.div>

        {/* The nozzle: a hot line at the build front, with the heat it leaves. */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0"
          style={{ bottom: nozzleBottom, opacity: nozzleOpacity }}
        >
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-orange-500/20 to-transparent" />
          <div className="h-px w-full bg-orange-300 shadow-[0_0_22px_5px_rgba(249,115,22,0.6)]" />
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
          style={{ opacity: reduceMotion ? 1 : captionOpacity }}
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950 via-zinc-950/75 to-transparent p-4 pt-12 md:p-5 md:pt-14"
        >
          <Link href={`/portfolio/${study.slug}/`} className="group block">
            <p className="text-base font-semibold text-white transition-colors group-hover:text-orange-400 md:text-lg">
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
