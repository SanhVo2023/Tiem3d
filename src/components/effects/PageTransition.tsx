"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {/* Page content */}
        <motion.div
          variants={{
            initial: { opacity: 0 },
            enter: { opacity: 1 },
            exit: { opacity: 0 },
          }}
          transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {children}
        </motion.div>

        {/* Shutter overlay - top */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1/2 bg-zinc-950 z-[9998] origin-top"
          variants={{
            initial: { scaleY: 1 },
            enter: { scaleY: 0 },
            exit: { scaleY: 1 },
          }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Shutter overlay - bottom */}
        <motion.div
          className="fixed bottom-0 left-0 right-0 h-1/2 bg-zinc-950 z-[9998] origin-bottom"
          variants={{
            initial: { scaleY: 1 },
            enter: { scaleY: 0 },
            exit: { scaleY: 1 },
          }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Loading text */}
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none"
          variants={{
            initial: { opacity: 1 },
            enter: { opacity: 0 },
            exit: { opacity: 1 },
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.span
            className="text-display text-2xl text-white"
            variants={{
              initial: { y: 0 },
              enter: { y: -20 },
              exit: { y: 0 },
            }}
            transition={{ duration: 0.3 }}
          >
            TIỆM 3D
          </motion.span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Simpler slide transition
export function SlideTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Fade transition
export function FadeTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
