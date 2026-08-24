"use client";

import { ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

interface LenisProviderProps {
  children: ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Initialize Lenis with optimized settings
    const lenis = new Lenis({
      duration: 1.0, // Slightly faster for snappier feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8, // Reduced for smoother feel
      touchMultiplier: 1.5,
      infinite: false,
      autoResize: true,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    const initGSAPSync = async () => {
      try {
        const gsapModule = await import("gsap");
        const ScrollTriggerModule = await import("gsap/ScrollTrigger");
        const gsap = gsapModule.default;
        const ScrollTrigger = ScrollTriggerModule.default;

        gsap.registerPlugin(ScrollTrigger);

        // Connect Lenis scroll to ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        // Use GSAP ticker for Lenis - better performance
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });

        // Disable GSAP's default lag smoothing for instant response
        gsap.ticker.lagSmoothing(0);
      } catch {
        // Fallback to requestAnimationFrame if GSAP fails
        function raf(time: number) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }
    };

    initGSAPSync();

    return () => {
      lenis.destroy();
    };
  }, []);

  // Reset scroll position on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    // Also reset native scroll as fallback
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
}
