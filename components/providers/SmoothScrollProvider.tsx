"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, ReactNode } from "react";

import { useMenuStore } from "@/lib/store/useZuStore";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenis = useLenis();
  const isMenuOpen = useMenuStore((state) => state.isMenuOpen);

  useEffect(() => {
    if (!lenis) return;



    if (isMenuOpen) {
      lenis.stop(); // Disable scroll
    } else {
      lenis.start(); // Enable scroll
    }
  }, [lenis, isMenuOpen]);

  return (
    <ReactLenis root options={{ lerp: 0.2, duration: 0.9 }}>
      {children}
    </ReactLenis>
  );
}
