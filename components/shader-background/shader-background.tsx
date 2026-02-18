"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import fragmentShader from "@/shaders/fragment/fragmentBackground.glsl";
import vertexShader from "@/shaders/vertex/vertexBackground.glsl";

type Props = {
  onReady?: () => void;
};

export const ShaderBackground = ({ onReady }: Props) => {
  const { size, viewport } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);
  const hasRendered = useRef(false);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    [size.width, size.height]
  );

  useFrame(({ clock, size }) => {
    uniforms.uTime.value = clock.getElapsedTime();
    uniforms.uResolution.value.set(size.width, size.height);

    // Trigger only once — AFTER first frame render
    if (!hasRendered.current) {
      hasRendered.current = true;
      onReady?.();
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
};
