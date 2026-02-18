"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import SidebarScene from "./SidebarScene";


export default function SidebarCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 25 }}
      gl={{ alpha: true, antialias: true }}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    >
      <Suspense fallback={null}>
        <SidebarScene />
      </Suspense>
    </Canvas>
  );
}
