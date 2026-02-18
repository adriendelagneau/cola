"use client";

import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import { Bubbles } from "./bubbles";

export const BubblesCanvas = () => {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        overflow: "hidden",
        pointerEvents: "none",
        width: "100%",
        height: "100vh",
        zIndex: 10,
      }}
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{
        fov: 30,
      }}
    >
      <Suspense fallback={null}>
        <directionalLight
          position={[0, 0, 5]}
          intensity={0.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <ambientLight intensity={8} />
        <pointLight position={[-0, 1, 3]} intensity={3.4} />
        <Environment files={"/hdr/studio.hdr"} environmentIntensity={0.3} />
        <Bubbles />
      </Suspense>
    </Canvas>
  );
};
