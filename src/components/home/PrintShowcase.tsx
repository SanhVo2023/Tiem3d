"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "@/components/ui/Img";
import { MotionToggle, useHomeMotion } from "./HomeExperience";

export interface PrintSample {
  title: string;
  label: string;
  image: string;
  href: string;
}

export function PrintShowcase({ samples }: { samples: PrintSample[] }) {
  const [selected, setSelected] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const { enabled, ready } = useHomeMotion();
  const sample = samples[selected];

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !enabled || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = stage.getBoundingClientRect();
        const x = (event.clientX - box.left) / box.width - 0.5;
        const y = (event.clientY - box.top) / box.height - 0.5;
        stage.style.setProperty("--tilt-x", `${-y * 7}deg`);
        stage.style.setProperty("--tilt-y", `${x * 7}deg`);
      });
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      stage.style.removeProperty("--tilt-x");
      stage.style.removeProperty("--tilt-y");
    };
    stage.addEventListener("pointermove", move, { passive: true });
    stage.addEventListener("pointerleave", reset);
    return () => {
      reset();
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerleave", reset);
    };
  }, [enabled]);

  if (!sample) return null;

  return (
    <div className="print-showcase" data-loop data-in-view="false">
      <div className="print-chamber" ref={stageRef}>
        <div className="chamber-top"><span className="chamber-light" aria-hidden="true" />Từng lớp in. Một ý tưởng thành hình.</div>
        <div className="print-stage" key={sample.href}>
          <Image src={sample.image} alt={sample.title + " — mẫu in minh họa"} fill loading="eager" priority={selected === 0} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 620px, 600px" className="print-base object-cover" />
          <div className="print-build-layer" aria-hidden="true">
            <Image src={sample.image} alt="" fill loading="eager" sizes="(max-width: 639px) 100vw, 600px" className="object-cover" />
            <div className="print-layer-lines" />
          </div>
          <div className="print-nozzle" aria-hidden="true"><span /></div>
          <span className="print-stage-label">Mẫu in minh họa</span>
          <div className="print-corner print-corner-top" aria-hidden="true" />
          <div className="print-corner print-corner-bottom" aria-hidden="true" />
          <Link href={sample.href} className="print-caption">
            <span><span className="print-caption-kind">{sample.label}</span>{sample.title}</span>
            <span className="print-caption-arrow"><ArrowUpRight aria-hidden="true" /></span>
          </Link>
        </div>
        <div className="chamber-bottom"><span>Mô phỏng quá trình tạo lớp</span><span className="chamber-progress" aria-hidden="true"><span /></span></div>
      </div>
      <div className="print-options" role="group" aria-label="Chọn mẫu sản phẩm">
        {samples.map((item, index) => (
          <button key={item.href} type="button" onClick={() => setSelected(index)} disabled={!ready} aria-pressed={selected === index} className="print-option"><span aria-hidden="true" className="print-option-dot" />{item.label}</button>
        ))}
      </div>
      <div className="print-controls"><span>Chọn một mẫu để khám phá</span><MotionToggle /></div>
    </div>
  );
}
