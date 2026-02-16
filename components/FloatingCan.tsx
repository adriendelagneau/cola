"use client";

import { Float } from "@react-three/drei";
import { forwardRef, ReactNode } from "react";
import { Group } from "three";

import { SodaCan, SodaCanProps } from "./SodaCan";

type FloatingCanProps = {
  flavor?: SodaCanProps["flavor"];
  floatSpeed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
  floatingRange?: [number, number];
  scale?: number | [number, number, number];
  children?: ReactNode;
};

const FloatingCan = forwardRef<Group, FloatingCanProps>(
  (
    {
      flavor = "original",
      floatSpeed = 1.5,
      rotationIntensity = 1,
      floatIntensity = 1,
      floatingRange = [-0.1, 0.1],
      scale = 1,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <group ref={ref} scale={scale} {...props}>
        <Float
          speed={floatSpeed}
          rotationIntensity={rotationIntensity}
          floatIntensity={floatIntensity}
          floatingRange={floatingRange}
        >
          {children}
          <SodaCan flavor={flavor} />
        </Float>
      </group>
    );
  }
);

FloatingCan.displayName = "FloatingCan";

export default FloatingCan;
