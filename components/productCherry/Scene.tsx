"use client";

import { useGSAP } from "@gsap/react";
import { Environment } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import { Group } from "three";

import FloatingCan from "@/components/FloatingCan";

gsap.registerPlugin(ScrollTrigger);

type SceneProps = {
  flavor: "original" | "cherry" | "zero" | "lime" | "grape";
};

type ResponsiveConfig = {
  position: { x: number; y: number; z: number };
  scaleFrom: { x: number; y: number; z: number };
  scaleTo: { x: number; y: number; z: number };
};

/* ================= RESPONSIVE CONFIG ================= */

const CHERRY_CONFIG: Record<string, ResponsiveConfig> = {
 XL: {
    position: { x: 1.4, y: 0, z: 0 },
    scaleFrom: { x: 0, y: 0, z: 0 },
    scaleTo: { x: 0.95, y: 0.95, z: 0.95 },
  },
  LG: {
    position: { x: 1.2, y: -0.1, z: 0 },
    scaleFrom: { x: 0, y: 0, z: 0 },
    scaleTo: { x: 0.85, y: 0.85, z: 0.85 },
  },
  MD: {
    position: { x: 0.9, y: -0.2, z: 0 },
    scaleFrom: { x: 0, y: 0, z: 0 },
    scaleTo: { x: 0.75, y: 0.75, z: 0.75 },
  },
  SM: {
    position: { x: 0, y: -0.4, z: 0 },
    scaleFrom: { x: 0, y: 0, z: 0 },
    scaleTo: { x: 0.65, y: 0.65, z: 0.65 },
  },
};

/* ================= COMPONENT ================= */

const Scene = ({ flavor }: SceneProps) => {
  const canRef = useRef<Group>(null);

  useGSAP(() => {
    if (!canRef.current) return;

    const mm = gsap.matchMedia();

    const setup = (config: ResponsiveConfig) => {
      // Initial position
      gsap.set(canRef.current!.position, config.position);

      // Scroll animation
      const scrollTL = gsap.timeline({
        scrollTrigger: {
          trigger: ".product-cherry",
          start: "top 10%",
        },
      });

      scrollTL.fromTo(
        canRef.current!.scale,
        config.scaleFrom,
        {
          ...config.scaleTo,
          duration: 0.4,
          ease: "back.out(1.7)",
        }
      );
    };

    /* ================= BREAKPOINTS ================= */

    mm.add("(min-width: 1280px)", () => setup(CHERRY_CONFIG.XL));
    mm.add("(min-width: 1024px) and (max-width: 1279px)", () =>
      setup(CHERRY_CONFIG.LG)
    );
    mm.add("(min-width: 768px) and (max-width: 1023px)", () =>
      setup(CHERRY_CONFIG.MD)
    );
    mm.add("(max-width: 767px)", () => setup(CHERRY_CONFIG.SM));

    return () => mm.revert();
  }, []);

  return (
    <group rotation={[0, 0, -0.1]} position={[0, 0, 0]}>
      <FloatingCan
        ref={canRef}
        flavor={flavor}
        rotationIntensity={1}
        floatIntensity={0.5}
        floatSpeed={2}
      />

      <directionalLight
        position={[0, 0, 5]}
        intensity={0.7}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <ambientLight intensity={10} />
      <pointLight position={[0, 1, 3]} intensity={6} />

      <Environment files={"/hdr/studio.hdr"} environmentIntensity={0.5} />
    </group>
  );
};

export default Scene;
