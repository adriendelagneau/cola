"use client";

import { View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
// import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense } from "react";
import { useEffect, useState } from "react";

import { useMeshStore } from "@/lib/store/useZuStore";

const ViewCanvas = () => {
  const ready = useMeshStore((state) => state.ready);

  const [zIndex, setZIndex] = useState(30);

  useEffect(() => {
    if (ready) {
      const timeout = setTimeout(() => {
        setZIndex(30); // bring canvas forward smoothly
      }, 300); // match your CSS animation delay
      return () => clearTimeout(timeout);
    }
  }, [ready]);

  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        pointerEvents: "none",
        zIndex,
      }}
      dpr={[1, 1.5]}
      // gl={{ antialias: true }}
      camera={{ fov: 30 }}
    >
      <Suspense fallback={null}>
        <View.Port />
        {/* Postprocessing Bloom */}
      </Suspense>
    </Canvas>
  );
};

export default ViewCanvas;
