"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

import { splitWords } from "@/lib/splitters";

gsap.registerPlugin(ScrollTrigger);

interface PinnedRevealProps {
  text: string;
  className?: string;
}

const PinnedReveal: React.FC<PinnedRevealProps> = ({ text, className }) => {
  const pinSectionRef = useRef<HTMLDivElement | null>(null);
  const letterRefs = useRef<HTMLSpanElement[]>([]);
  letterRefs.current = []; // clear to avoid duplicates in dev mode

  useGSAP(() => {
    gsap.set(letterRefs.current, { opacity: 0, y: 50 });

    gsap.to(letterRefs.current, {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      ease: "power2.out",
      scrollTrigger: {
        trigger: pinSectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
      },
    });
  }, []);

  return (
    <section
      ref={pinSectionRef}
      className="font-poppins capitalize flex h-screen w-full  justify-start pt-36 p-8  text-[28px] sm:text-4xl   xl:text-5xl 2xl:text-6xl"
    >
      <div className="max-w-2xl leading-snug text-secondary">
        {splitWords(text, letterRefs)}
      </div>
    </section>
  );
};

export default PinnedReveal;
