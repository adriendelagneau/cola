"use client";

import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useRef, useEffect, useMemo } from "react";
import { createNoise3D } from "simplex-noise";
import * as THREE from "three";

import { useBubbleStore } from "@/lib/store/useZuStore";

// Initialize simplex noise
const noise3D = createNoise3D();
const o = new THREE.Object3D();

export const Bubbles = ({
  count = 400,
  speed = 5,
  bubbleSize = 0.01,
  opacity = 0.3,
  color = "#591420",
  repeat = true,
}) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const bubbleSpeed = useRef(new Float32Array(count));
  const isPlaying = useBubbleStore((state) => state.isPlaying);

  const minSpeed = speed * 0.0015;
  const maxSpeed = speed * 0.0075;

  const geometry = useMemo(
    () => new THREE.SphereGeometry(bubbleSize, 16, 16),
    [bubbleSize]
  );

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        transparent: true,
        opacity,
        depthWrite: false,
        depthTest: true,
        // blending: THREE.AdditiveBlending,
        color,
      }),
    [opacity, color]
  );

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    for (let i = 0; i < count; i++) {
      if (isPlaying) {
        o.position.set(gsap.utils.random(-4, 4), -2, gsap.utils.random(-4, 4));
        bubbleSpeed.current[i] = gsap.utils.random(minSpeed, maxSpeed);
      }
      o.updateMatrix();
      mesh.setMatrixAt(i, o.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  }, [isPlaying, count, minSpeed, maxSpeed]);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh || !isPlaying) return;

    const time = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      mesh.getMatrixAt(i, o.matrix);
      o.position.setFromMatrixPosition(o.matrix);

      o.position.y += bubbleSpeed.current[i];

      const driftX = noise3D(i * 0.1, o.position.y * 0.2, time * 0.2);
      const driftZ = noise3D(i * 0.2 + 100, o.position.y * 0.2, time * 0.2);

      o.position.x += driftX * 0.002;
      o.position.z += driftZ * 0.002;

      if (o.position.y > 4 && repeat) {
        o.position.y = -2;
        o.position.x = gsap.utils.random(-4, 4);
        o.position.z = gsap.utils.random(-4, 4);
      }

      o.updateMatrix();
      mesh.setMatrixAt(i, o.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      position={[0, 0, 0]}
      material={material}
      geometry={geometry}
      visible={isPlaying} // hide when paused
    />
  );
};
