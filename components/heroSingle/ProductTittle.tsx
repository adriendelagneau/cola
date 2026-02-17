"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const ProductTitle = ({ name = "original" }) => {
  const container = useRef(null);
  const refs = useRef([]);

  refs.current = [];

  const addToRefs = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  useGSAP(
    () => {
      // Kill old triggers (CRITICAL in Next.js routing)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      const translateYValues = ["100%", "200%", "300%", "400%", "500%"];

      refs.current.forEach((el, index) => {
        gsap.to(el, {
          y: translateYValues[index],
          duration: 0.5,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: container.current,
            start: "top 19%",
            end: "bottom 99%",
            toggleActions: "play none none reverse",
          },
        });
      });

      ScrollTrigger.refresh();
    },
    {
      scope: container,
      dependencies: [name], // CRITICAL
      revertOnUpdate: true, // CRITICAL
    }
  );

  return (
    <div ref={container} className="absolute top-24 left-0 h-screen w-full">
      <div className="relative text-8xl tracking-wider">

        <div className="absolute left-1/2 -translate-x-1/2 uppercase">
          {name}
        </div>

        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={addToRefs}
            className="absolute left-1/2 -translate-x-1/2 uppercase opacity-50"
          >
            {name}
          </div>
        ))}

      </div>
    </div>
  );
};

export default ProductTitle;
