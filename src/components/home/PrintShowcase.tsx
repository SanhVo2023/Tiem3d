"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "@/components/ui/Img";

export interface PrintSample {
  title: string;
  label: string;
  image: string;
  href: string;
}

export function PrintShowcase({ samples }: { samples: PrintSample[] }) {
  const [selected, setSelected] = useState(0);
  const sample = samples[selected];
  if (!sample) return null;

  return (
    <div className="print-showcase">
      <div className="print-stage">
        <Image src={sample.image} alt={sample.title + " — mẫu in minh họa"} fill priority={selected === 0} sizes="(max-width: 1023px) 100vw, 600px" className="object-cover" />
        <span className="print-stage-label">Mẫu in minh họa</span>
        <Link href={sample.href} className="print-caption">
          <span>{sample.title}</span><ArrowUpRight className="h-5 w-5 shrink-0" aria-hidden="true" />
        </Link>
      </div>
      <div className="print-options" role="group" aria-label="Chọn mẫu sản phẩm">
        {samples.map((item, index) => (
          <button key={item.href} type="button" onClick={() => setSelected(index)} aria-pressed={selected === index} className="print-option">{item.label}</button>
        ))}
      </div>
    </div>
  );
}
