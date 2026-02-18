"use client";

import { useRef, useEffect } from "react";
import { Group } from "three";
import gsap from "gsap";

import FloatingCan from "@/components/FloatingCan";
import { useSidebarCanStore } from "@/lib/store/useZuStore";
import { Environment } from "@react-three/drei";

const SPACING = 4; // distance between cans in world units

export default function SidebarScene() {
  const containerRef = useRef<Group>(null);

  const activeCan = useSidebarCanStore((s) => s.activeCan);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.to(containerRef.current.position, {
      y: -activeCan * SPACING,
      duration: 1.2,
      ease: "power4.out",
    });
  }, [activeCan]);

  return (
    <>
      <group ref={containerRef}>
        <FloatingCan scale={1.5} flavor="original" position={[0, 0, 0]} />

        <FloatingCan scale={1.5} flavor="zero" position={[0, SPACING, 0]} />

        <FloatingCan
          scale={1.5}
          flavor="cherry"
          position={[0, SPACING * 2, 0]}
        />

        <FloatingCan scale={1.5} flavor="lime" position={[0, SPACING * 3, 0]} />
        <FloatingCan scale={1.5} flavor="grape" position={[0, SPACING * 4, 0]} />

      </group>

      <directionalLight position={[0, 0, 5]} intensity={0.7} />
      <ambientLight intensity={12} />
      <pointLight position={[0, 1, 3]} intensity={8} />

      {/* HDR ENVIRONMENT */}
      <Environment files={"/hdr/studio.hdr"} environmentIntensity={0.6} />
    </>
  );
}
