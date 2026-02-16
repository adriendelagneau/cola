"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

import { splitWords } from "@/lib/splitters";

const ProductIntro = () => {
  const refs = useRef([]);
  const container = useRef(null);

  const infosText = [
    "Lorem ipsum deleniti consectetur itaque quas obcaecati! Beatae, assumenda. Corrupti minima nam soluta facilis corporis explicabo incidunt officiis unde maiores excepturi? Non nesciunt deserunt dolorem culpa",
    "tyfytfy uy yu gyugyu uy uy ",
  ];

  useGSAP(() => {
    gsap.to(refs.current, {
      scrollTrigger: {
        trigger: container.current,
        scrub: true,
        start: "top 85%",
        end: `+=${window.innerHeight * 0.7}`, // Custom end for desktop
        once: true,
        toggleActions: "play none none none",
      },
      opacity: 1,
      ease: "power3.out", // Slower easing for desktop
      stagger: 0.1, // Adjust stagger for smoother reveal on large screens
    });
  });

  return (
    <div className="font-poppins text-primary bg-gradient-custom relative z-50 min-h-screen w-full p-24 text-7xl leading-loose uppercase">
      <div
        ref={container}
        className="text-primary font-poppins mx-auto my-12 flex w-full max-w-screen-2xl flex-col items-center justify-center gap-12 p-10 text-6xl"
      >
        {infosText.map((phrase, index) => (
          <div key={index} className="my-6 flex flex-wrap gap-2 leading-tight">
            {splitWords(phrase, refs)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductIntro;
