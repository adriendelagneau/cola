"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { ShaderBackground } from "./shader-background";

export default function BackgroundCanvas() {
  const [ready, setReady] = useState(false);

  return (
    <div
      className={`fixed inset-0 z-5 transition-opacity duration-700 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ fov: 30 }}
        style={{ pointerEvents: "none" }}
        gl={{ alpha: false }}
      >
        <color attach="background" args={["#000000"]} />
        <Suspense fallback={null}>
          <ShaderBackground onReady={() => setReady(true)} />
        </Suspense>
      </Canvas>
    </div>
  );
}
