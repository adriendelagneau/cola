"use client";

import { useGSAP } from "@gsap/react";
import { View } from "@react-three/drei";
import gsap from "gsap";
import React, { useRef } from "react";

import {
  useAnimationStore,
  useBubbleStore,
  useMeshStore,
} from "@/lib/store/useZuStore";

import PinnedReveal from "./pin-reveal";
import Scene from "./Scene";

const Hero = () => {
  const ready = useMeshStore((state) => state.ready);
  const completeIntro = useAnimationStore((s) => s.completeIntro);
  const titleRef = useRef(null);
  const title2Ref = useRef(null);
  const title3Ref = useRef(null);
  const title4Ref = useRef(null);
  const title5Ref = useRef(null);
  const title6Ref = useRef(null);
  const title7Ref = useRef(null);

  const landingRef = useRef(null);
  useGSAP(
    () => {
      if (!ready) return;

      gsap
        .timeline({
          onComplete: completeIntro,
        })
        .to(
          [
            titleRef.current,
            title2Ref.current,
            title3Ref.current,
            title4Ref.current,
            title5Ref.current,
            title6Ref.current,
            title7Ref.current,
          ],
          {
            y: 0,
            ease: "power4.out",
            delay: 0.4,
            stagger: {
              amount: 1,
            },
          },
          "one"
        );
    },
    { dependencies: [ready] }
  );

  return (
    <div className="w-full">
      <View className="hero-scene pointer-events-none sticky top-0 z-30 -mt-[100vh] h-screen w-full">
        <Scene />
      </View>

      <div className="hero tracking-wider">
        <div
          ref={landingRef}
          id="landing"
          className="font-poppins text-secondary relative z-20 flex h-screen w-full flex-col items-center overflow-hidden p-4 pt-40 uppercase lg:items-start lg:justify-center 2xl:pl-24"
        >
          <div className="flex -skew-y-3 overflow-hidden">
            <div
              ref={titleRef}
              className="inline translate-y-full pr-4 text-5xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-[170px]"
            >
              breizh
            </div>
            <div
              ref={title2Ref}
              className="flex translate-y-full text-5xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-[170px]"
            >
              cola
            </div>
          </div>
          <div className="flex -skew-y-3 overflow-hidden pt-12">
            <div
              ref={title3Ref}
              className="mr-4 flex translate-y-full items-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-[170px]"
            >
              le
            </div>
            <div
              ref={title4Ref}
              className="text-stroke-secondary text-primary inline translate-y-full text-5xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-[170px]"
            >
              cola
            </div>
            <div
              ref={title5Ref}
              className="flex translate-y-full items-center pl-4 text-5xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-[170px]"
            >
              du
            </div>
          </div>
          <div className="flex -skew-y-3 overflow-hidden pt-6">
            <div
              ref={title6Ref}
              className="inline translate-y-full pr-4 text-5xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-[170px]"
            >
              phare
            </div>
            <div
              ref={title7Ref}
              className="text-stroke-secondary text-primary inline translate-y-full text-5xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-[170px]"
            >
              ouest
            </div>
          </div>
        </div>
        {/* Replace Lorem Ipsum with PinnedReveal */}
        <PinnedReveal
          className="text-xl"
          text="Breizh Cola incarne un esprit libre et breton, une boisson de caractère née à l’Ouest, pour ceux qui recherchent authenticité, fraîcheur et goût."
        />
      </div>
    </div>
  );
};

export default Hero;
