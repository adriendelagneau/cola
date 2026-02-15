"use client";

import gsap from "gsap";
import React, { useEffect, useRef } from "react";

interface MagneticButtonsProps {
  children: React.ReactNode;
}

export default function MagneticButtons({ children }: MagneticButtonsProps) {
  const magneticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = magneticRef.current;
    if (!node) return;

    const xTo = gsap.quickTo(node, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    const yTo = gsap.quickTo(node, "y", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      xTo(x);
      yTo(y);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    node.addEventListener("mousemove", handleMouseMove);
    node.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      node.removeEventListener("mousemove", handleMouseMove);
      node.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={magneticRef} className="inline-block">
      {children}
    </div>
  );
}
