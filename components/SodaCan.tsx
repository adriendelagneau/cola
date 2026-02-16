"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/Soda-can.gltf");

const flavorTextures = {
  original: "/labels/bco.png",
  cherry: "/labels/bccherry.png",
  zero: "/labels/bczero.png",
  lime: "/labels/bcgreen.png",
  grape: "/labels/bccherry.png",
};

const metalMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.3,
  metalness: 1,
  color: "#bbbbbb",
});

export type SodaCanProps = {
  flavor?: keyof typeof flavorTextures;
  scale?: number;
};

export function SodaCan({
  flavor = "original",
  scale = 2,
  ...props
}: SodaCanProps) {
  const { nodes } = useGLTF("/Soda-can.gltf");

const label = useTexture(flavorTextures[flavor]);
label.flipY = false;


  return (
    <group
      {...props}
      dispose={null}
      scale={scale}
      rotation={[0, -Math.PI * 1.25, 0]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.cylinder as THREE.Mesh).geometry}
        material={metalMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.cylinder_1 as THREE.Mesh).geometry}
      >
        <meshStandardMaterial
          roughness={0.55}
          metalness={0.8}
          map={label}

        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Tab as THREE.Mesh).geometry}
        material={metalMaterial}
      />
    </group>
  );
}
