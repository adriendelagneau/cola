"use client";

import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

import { sections } from "@/lib/data";
import Years from "./Annees";
import CapsIndicator from "./CapsIndicator";

gsap.registerPlugin(ScrollTrigger);

const Chronos: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  useGSAP(() => {
    if (!containerRef.current) return;

    const total = sections.length;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: () => `+=${window.innerHeight/1.3 * total}`,
      pin: true,
      scrub: 0.6,
      anticipatePin: 1,
      onUpdate: (self) => {
        const index = Math.min(total - 1, Math.floor(self.progress * total));
        setCurrentIndex(index);
      },
    });
  }, []);

  // Animate image + text on index change
  useGSAP(
    () => {
      if (!imageRef.current || !textRef.current) return;
      if (currentIndex === 0) return; // 👈 IMPORTANT

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.1 }
      );
    },
    { dependencies: [currentIndex] }
  );

  const section = sections[currentIndex];

  return (
    <section
      ref={containerRef}
      className="relative mt-24 flex h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* YEARS */}
      <div className="pointer-events-none absolute inset-0 top-20 z-30 my-24 flex items-start justify-center">
        <Years currentIndex={currentIndex} />
      </div>
      {/* INDICATOR */}
      <div className="absolute bottom-16 z-40 flex w-full justify-center">
        <CapsIndicator currentIndex={currentIndex} />
      </div>

      <div className="relative z-10 mt-18 grid w-full max-w-6xl grid-cols-2 gap-24 px-24">
        {/* IMAGE ZONE */}
        <div ref={imageRef} className="relative">
          <div className="bg-secondary border-secondary rotate-2 rounded-sm border p-2 pb-6 shadow-lg">
            <Image
              key={section.image}
              src={section.image}
              alt={`Image for ${section.year}`}
              width={520}
              height={420}
              className="h-auto w-full object-cover sepia"
              priority
            />
          </div>
        </div>

        {/* TEXT ZONE */}
        <div
          ref={textRef}
          className="font-poppins text-secondary flex items-center text-5xl uppercase"
        >
          {section.text}
        </div>
      </div>
    </section>
  );
};

export default Chronos;
