"use client";

import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

import SocialLinks from "./SocialLinks";

const Social = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const img1Ref = useRef<HTMLDivElement | null>(null);
  const img2Ref = useRef<HTMLDivElement | null>(null);
  const img3Ref = useRef<HTMLDivElement | null>(null);
  const img4Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;

      const { clientX, clientY } = event;
      const width = window.innerWidth;
      const height = window.innerHeight;

      const xPercent = (clientX / width - 0.5) * 2; // Range from -1 to 1
      const yPercent = (clientY / height - 0.5) * 2; // Range from -1 to 1

      const imageRefs = [img1Ref, img2Ref, img3Ref, img4Ref];

      // Use a constant multiplier for all images
      const multiplier = 30;

      imageRefs.forEach((ref) => {
        if (ref.current) {
          const offsetX = xPercent * multiplier; // Consistent offset
          const offsetY = yPercent * multiplier; // Consistent offset

          gsap.to(ref.current, {
            x: offsetX,
            y: offsetY,
            ease: "power3.out",
            duration: 1.6,
          });
        }
      });
    };

    const container = containerRef.current;
    container?.addEventListener("mousemove", handleMouseMove);

    return () => {
      container?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[35vh] w-full items-center justify-center overflow-hidden lg:h-[50vh]"
    >
      <p className="font-poppins text-secondary mb-36 -skew-y-3 text-3xl uppercase sm:text-5xl lg:text-7xl">
        restez connectez
      </p>

      <SocialLinks />
    </div>
  );
};

export default Social;
