"use client";

import { Billboard, Center, Environment, View } from "@react-three/drei";
import clsx from "clsx";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { ArrowBigLeftDashIcon } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Group, Object3DEventMap } from "three";

import FloatingCan from "@/components/FloatingCan";
import { SodaCanProps } from "@/components/SodaCan";

gsap.registerPlugin(Observer);

const FLAVORS: {
  flavor: SodaCanProps["flavor"];
  color: string;
  name: string;
}[] = [
  { flavor: "original", color: "#591420", name: "The Original" },
  { flavor: "zero", color: "#000000", name: "Zero Sucres" },
  { flavor: "cherry", color: "#2e0823", name: "Cherry" },
  { flavor: "lime", color: "#254e00", name: "Lime Twist" },
  { flavor: "grape", color: "#3b0a45", name: "Grape Blast" },
];

const Carousel = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentIndex, setCurrentIndex] = useState(0);
  const [angleOffset, setAngleOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<Observer | null>(null);
  const canRefs = useRef<(Group<Object3DEventMap> | null)[]>([]);

  const total = FLAVORS.length;
  const anglePerCan = (2 * Math.PI) / total;

  const rotateBy = (direction: number) => {
    if (isAnimating) return;

    const deltaAngle = direction * anglePerCan;

    setIsAnimating(true);
    gsap.to(
      { val: angleOffset },
      {
        val: angleOffset + deltaAngle,
        duration: 1,
        ease: "power2.inOut",
        onUpdate: function () {
          setAngleOffset(this.targets()[0].val);
        },
        onComplete: () => {
          setCurrentIndex((prev) => prev + direction);
          setIsAnimating(false);
        },
      }
    );
  };

  // Setup GSAP Observer for mobile drag
  useEffect(() => {
    if (!containerRef.current) return;

    observerRef.current = Observer.create({
      target: containerRef.current,
      type: "touch,pointer",
      dragMinimum: 10,
      preventDefault: true,
      onLeft: () => rotateBy(-1),
      onRight: () => rotateBy(1),
    });

    return () => observerRef.current?.kill();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [angleOffset, isAnimating]);

  // const activeIndex = ((currentIndex % total) + total) % total;

  return (
    <div
      ref={containerRef}
      className="carousel relative z-40 flex w-full touch-pan-y items-center justify-center overflow-hidden"
    >
      {/* Arrow Buttons (Desktop only) */}
      <div className="hidden lg:block">
        <ArrowButton
          onClick={() => rotateBy(-1)}
          direction="left"
          label="Previous Flavor"
          disabled={isAnimating}
        />
        <ArrowButton
          onClick={() => rotateBy(1)}
          direction="right"
          label="Next Flavor"
          disabled={isAnimating}
        />
      </div>

      {/* 3D Carousel */}
      <div className="relative z-30 flex w-full items-center justify-center px-2">
        <View className="h-[29vh] w-full sm:h-[40vh] md:h-[48vh] lg:h-[60vh] xl:h-[75vh]">
          {FLAVORS.map((flavor, index) => {
            const angle = index * anglePerCan + angleOffset;
            const radiusX = 1.6;
            const radiusZ = 0.9;
            const x = Math.sin(angle) * radiusX;
            const z = Math.cos(angle) * radiusZ;

            return (
              <Center key={`${flavor.flavor}-${index}`} position={[x, -0.1, z]}>
                <Billboard lockX lockZ>
                  <FloatingCan
                    ref={(el) => {
                      canRefs.current[index] = el;
                    }}
                    flavor={flavor.flavor}
                    scale={0.8}
                    floatIntensity={0.1}
                    rotationIntensity={0}
                  />
                </Billboard>
              </Center>
            );
          })}

          {/* Lighting & Environment */}
          <Environment
            files="/hdr/lobby.hdr"
            environmentIntensity={0.6}
            environmentRotation={[0, 3, 0]}
          />
          <Environment files="/hdr/studio.hdr" environmentIntensity={0.5} />
          <directionalLight
            position={[0, 0, 5]}
            intensity={0.7}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <ambientLight intensity={10} />
          <pointLight position={[-0, 1, 3]} intensity={6} />
        </View>
      </div>
    </div>
  );
};

export default Carousel;

type ArrowButtonProps = {
  direction?: "right" | "left";
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

function ArrowButton({
  direction = "right",
  label,
  onClick,
  disabled = false,
}: ArrowButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "absolute z-40 p-3 transition focus:outline-none focus-visible:ring-4 md:size-16 lg:size-20",
        direction === "left" ? "left-38" : "right-38",
        disabled && "opacity-50"
      )}
    >
      <ArrowBigLeftDashIcon
        strokeWidth={1}
        size={82}
        className={clsx(
          "text-secondary -rotate-3",
          direction === "right" && "-scale-x-100"
        )}
      />
      <span className="sr-only">{label}</span>
    </button>
  );
}
