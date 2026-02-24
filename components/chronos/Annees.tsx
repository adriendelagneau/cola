"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { sections } from "@/lib/data";

interface YearsProps {
  currentIndex: number;
}

const Years: React.FC<YearsProps> = ({ currentIndex }) => {
  const liRefs = useRef<(HTMLLIElement | null)[]>([]);

  useGSAP(
    () => {
      liRefs.current.forEach((li, i) => {
        if (!li) return;
        gsap.to(li, {
          scale: i === currentIndex ? 1 : 0.4,
          opacity: i === currentIndex ? 1 : 0.15,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    },
    { dependencies: [currentIndex] }
  );

  return (
    <div className="pointer-events-none relative">
      <div className="h-27.5 overflow-hidden">
        <ul
          style={{ transform: `translateY(${-currentIndex * 110}px)` }}
          className="transition-transform duration-300"
        >
          {sections.map((s, i) => (
            <li
              key={s.id}
              ref={(el) => {
                liRefs.current[i] = el;
              }}
              className="font-poppins text-secondary flex h-27.5 items-center justify-center text-9xl font-bold -skew-x-12"
            >
              {s.year}
            </li>
          ))}
        </ul>
      </div>

      
    </div>
  );
};

export default Years;
