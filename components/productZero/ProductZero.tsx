"use client";

import { View } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import React, { useRef } from "react";

import MagneticButtons from "@/components/MagneticButtons";

import Scene from "./Scene";

gsap.registerPlugin(ScrollTrigger);

const ProductZero = () => {
  const sectionZeroRef = useRef(null);
  const refZero1 = useRef(null);
  const refZero2 = useRef(null);
  const refZero3 = useRef(null);
  const refZero4 = useRef(null);
  const refZero5 = useRef(null);
  const refZero6 = useRef(null);
  const refZero7 = useRef(null);
  const buttonRef = useRef(null);

  return (
    <div
      ref={sectionZeroRef}
      className="product-zero relative top-0 left-0 z-20 flex min-h-screen w-full flex-col items-start px-6  overflow-hidden xl:items-start xl:pl-6"
    >
      <View className="pointer-events-none absolute top-0 z-30 h-screen w-full">
        <Scene flavor="zero" />
      </View>
      <div
        className="relative top-[77vh] left-30 h-31.25 w-62.5 sm:top-[57vh] sm:left-32 sm:h-25 sm:w-50 md:top-[64vh] md:left-44 md:h-31.25 md:w-62.5 xl:top-[50vh] xl:left-[56vw] xl:h-50 xl:w-75 2xl:h-45 2xl:w-90"
        ref={buttonRef}
      >
        <MagneticButtons>
          <Link href={"/product/zero"}>
            <button className="text-secondary hover:bg-secondary hover:text-primary bg-primary h-31.25 w-62.5 -rotate-12 cursor-pointer rounded-[50%] border-2 text-lg font-bold uppercase sm:text-xl md:h-31.25 md:w-62.5 md:text-2xl xl:h-37.5 xl:w-75 xl:text-4xl 2xl:h-45 2xl:w-90 2xl:-rotate-6">
              decouvrez-le
            </button>
          </Link>
        </MagneticButtons>
      </div>
      <div className="font-poppins flex flex-col gap-4 text-3xl uppercase sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
        <p className="flex gap-4 overflow-hidden">
          <span ref={refZero1} className="text-secondary">
            0%
          </span>
          <span
            ref={refZero2}
            className="text-stroke-secondary-1 text-primary overflow-hidden tracking-wider"
          >
            Sucres
          </span>
        </p>
        <p className="flex gap-4 overflow-hidden">
          <span
            ref={refZero3}
            className="text-stroke-secondary-1 text-primary tracking-wider"
          >
            Un gout
          </span>
          <span ref={refZero4} className="text-secondary">
            intense
          </span>
        </p>
        <p className="mt-6 flex gap-4 overflow-hidden text-3xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
          <span ref={refZero5} className="text-secondary">
            Zero
          </span>
          <span
            ref={refZero6}
            className="text-stroke-secondary-1 text-primary tracking-wider"
          >
            Calories
          </span>
        </p>
        <p className="mt-2 flex gap-8 overflow-hidden text-3xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
          <span ref={refZero7} className="text-secondary">
            100% plaisir
          </span>
        </p>
      </div>
    </div>
  );
};

export default ProductZero;
