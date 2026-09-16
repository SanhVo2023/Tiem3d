"use client";

import { createContext, useContext, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";

const MotionContext = createContext({ enabled: false, ready: false, reduced: true, toggle: () => {} });
const motionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToMotion(callback: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

const subscribeToHydration = () => () => {};

export function useHomeMotion() {
  return useContext(MotionContext);
}

/** Server-rendered children stay visible. Motion is a progressive enhancement. */
export function HomeExperience({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const reduced = useSyncExternalStore(subscribeToMotion, () => window.matchMedia(motionQuery).matches, () => true);
  const ready = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const enabled = ready && !reduced && !paused;

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !enabled) return;

    const animations = new Set<Animation>();
    const scrollSections = new Set<HTMLElement>();
    const watched = root.querySelectorAll<HTMLElement>("[data-reveal], [data-scroll], [data-loop]");
    let frame = 0;

    const updateScroll = () => {
      frame = 0;
      if (document.hidden) return;
      const height = window.innerHeight;
      scrollSections.forEach((section) => {
        const box = section.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (height - box.top) / (height + box.height)));
        const artwork = section.querySelector<HTMLElement>("[data-scroll-art]");
        if (!artwork) return;
        if (section.dataset.scroll === "ribbon") {
          artwork.style.transform = `translate3d(${(0.5 - progress) * 180}px, 0, 0)`;
        } else if (section.dataset.scroll === "layers") {
          artwork.style.transform = `rotate(${(progress - 0.5) * 32}deg)`;
        } else if (section.dataset.scroll === "process") {
          artwork.style.transform = `scaleX(${Math.max(0, Math.min(1, (height * 0.85 - box.top) / (box.height * 0.65)))})`;
        }
      });
    };

    const queueScroll = () => {
      if (!frame && !document.hidden) frame = requestAnimationFrame(updateScroll);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        if (target.hasAttribute("data-loop")) target.dataset.inView = String(entry.isIntersecting);
        if (target.hasAttribute("data-scroll")) {
          if (entry.isIntersecting) scrollSections.add(target);
          else scrollSections.delete(target);
        }
        if (entry.isIntersecting && target.hasAttribute("data-reveal") && target.dataset.revealed !== "true") {
          target.dataset.revealed = "true";
          // Only the artwork moves; headings, copy and links never wait for JS.
          const animation = target.animate([
            { clipPath: "inset(8% 0 0 0 round 20px)", transform: "translateY(28px) scale(0.97)" },
            { clipPath: "inset(0% 0 0 0 round 20px)", transform: "translateY(0) scale(1)" },
          ], { duration: 850, easing: "cubic-bezier(0.16, 1, 0.3, 1)" });
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        }
      });
      queueScroll();
    }, { threshold: 0.08 });

    const updateVisibility = () => {
      root.dataset.visible = String(!document.hidden);
      animations.forEach((animation) => document.hidden ? animation.pause() : animation.play());
      queueScroll();
    };

    watched.forEach((element) => observer.observe(element));
    window.addEventListener("scroll", queueScroll, { passive: true });
    window.addEventListener("resize", queueScroll);
    document.addEventListener("visibilitychange", updateVisibility);
    updateVisibility();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      animations.forEach((animation) => animation.cancel());
      window.removeEventListener("scroll", queueScroll);
      window.removeEventListener("resize", queueScroll);
      document.removeEventListener("visibilitychange", updateVisibility);
      root.querySelectorAll<HTMLElement>("[data-scroll-art]").forEach((element) => element.style.removeProperty("transform"));
    };
  }, [enabled]);

  return (
    <MotionContext.Provider value={{ enabled, ready, reduced, toggle: () => setPaused((value) => !value) }}>
      <div ref={rootRef} className="home-experience" data-motion={enabled ? "on" : "off"} data-ready={ready} data-visible="true">
        {children}
      </div>
    </MotionContext.Provider>
  );
}

export function MotionToggle() {
  const { enabled, ready, reduced, toggle } = useHomeMotion();
  return (
    <button type="button" className="motion-toggle" onClick={toggle} disabled={!ready || reduced} aria-pressed={enabled} aria-label={reduced ? "Hiệu ứng đã tắt theo cài đặt giảm chuyển động" : enabled ? "Tạm dừng hiệu ứng" : "Bật hiệu ứng"}>
      {enabled ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
      <span>{reduced ? "Giảm chuyển động" : enabled ? "Dừng hiệu ứng" : "Bật hiệu ứng"}</span>
    </button>
  );
}
