"use client";

import { useGSAP } from "@gsap/react";
import { Environment } from "@react-three/drei";
import gsap from "gsap";
import React, { useRef } from "react";
import { Group } from "three";

import FloatingCan from "@/components/FloatingCan";

type SceneProps = {
  flavor: "original" | "cherry" | "zero" | "lime" | "grape"; // Restrict flavor to these specific strings
};

const Scene = ({ flavor }: SceneProps) => {
  // Ensure flavor matches FlavorType
  const canRef = useRef<Group>(null);

  useGSAP(() => {
    if (canRef.current) {
      gsap.fromTo(
        canRef.current.scale,
        {
          x: 0,
          y: 0,
          z: 0,
        },
        {
          x: 0.85,
          y: 0.85,
          z: 0.85,
          ease: "back.out(1)",
        }
      );

      // Scroll animation
      const scrollTL = gsap.timeline({
        defaults: {
          duration: 2,
        },
        scrollTrigger: {
          trigger: ".hero-single",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      scrollTL.add("halfway", scrollTL.duration() / 2);

      scrollTL
        .to(canRef.current.rotation, { y: Math.PI * 2 }, 0)
        .to(canRef.current.position, { y: -0.25, x: 1.5 }, 2)
        .to(
          canRef.current.scale,
          {
            x: 0.95,
            y: 0.95,
            z: 0.95,
            ease: "back.out(1)",
          },
          2
        );
    }
  });

  return (
    <>
      <group rotation={[0, 0, 0.2]}>
        <FloatingCan
          ref={canRef}
          flavor={flavor}
          rotationIntensity={1}
          floatIntensity={1}
          floatSpeed={3}
        ></FloatingCan>
      </group>
      <directionalLight
        position={[0, 0, 5]}
        intensity={0.7}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <ambientLight intensity={10} />
      <pointLight position={[-0, 1, 3]} intensity={6} />
      <Environment files={"/hdr/studio.hdr"} environmentIntensity={0.5} />
    </>
  );
};

export default Scene;
