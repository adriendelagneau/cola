"use client";

import { useGSAP } from "@gsap/react";
import { Environment } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Group } from "three";

import FloatingCan from "@/components/FloatingCan";
import { useMeshStore } from "@/lib/store/useZuStore";
import { useAnimationStore } from "@/lib/store/useZuStore";
import { BreakpointConfig, CONFIG, Transform } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

/* ================= HELPERS ================= */

const applyTransform = (target: Group, transform?: Transform) => {
  if (!transform) return;

  if (transform.position) gsap.set(target.position, transform.position);
  if (transform.rotation) gsap.set(target.rotation, transform.rotation);
  if (transform.scale) gsap.set(target.scale, transform.scale);
};

const animateTransform = (
  tl: gsap.core.Timeline,
  target: Group,
  transform?: Transform,
  position: number | string = 0
) => {
  if (!transform) return;

  if (transform.position) tl.to(target.position, transform.position, position);
  if (transform.rotation) tl.to(target.rotation, transform.rotation, position);
  if (transform.scale) tl.to(target.scale, transform.scale, position);
};

/* ================= COMPONENT ================= */

function Scene() {
  const markMeshReady = useMeshStore((state) => state.isReady);

  const startIntro = useAnimationStore((state) => state.startIntro);
  const completeIntro = useAnimationStore((state) => state.completeIntro);

  const groupRef = useRef<Group>(null);
  const can1Ref = useRef<Group>(null);
  const can3Ref = useRef<Group>(null);
  const can4Ref = useRef<Group>(null);
  const played = sessionStorage.getItem("introPlayed");
useGSAP(() => {
  if (
    !groupRef.current ||
    !can1Ref.current ||
    !can3Ref.current ||
    !can4Ref.current
  )
    return;

  markMeshReady();

  const ctx = gsap.context(() => {

    const mm = gsap.matchMedia();

    const setup = (config: BreakpointConfig) => {

      applyTransform(can1Ref.current!, config.initial.can1);

      const played = sessionStorage.getItem("introPlayed");

      if (!played) {
        applyTransform(can1Ref.current!, config.intro.can1.from);
      }

      applyTransform(can3Ref.current!, config.intro.can3.from);
      applyTransform(can4Ref.current!, config.intro.can4.from);

      const introTL = gsap.timeline({
        defaults: {
          duration: 1,
          delay: 1.5,
          ease: "back.out(1.4)",
        },
        onStart: startIntro,
        onComplete: completeIntro,
      });

      if (!played) {
        animateTransform(introTL, can1Ref.current!, config.intro.can1.to);
      }

      animateTransform(introTL, can3Ref.current!, config.intro.can3.to);
      animateTransform(introTL, can4Ref.current!, config.intro.can4.to);

      const scrollTL = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      scrollTL.to(groupRef.current!.rotation, config.scroll.groupRotation);

      animateTransform(scrollTL, can1Ref.current!, config.scroll.can1);
      animateTransform(scrollTL, can3Ref.current!, config.scroll.can3);
      animateTransform(scrollTL, can4Ref.current!, config.scroll.can4);

      scrollTL.to(groupRef.current!.position, config.scroll.groupPosition);
    };

    mm.add("(min-width: 1536px)", () => setup(CONFIG.XXXL));
    mm.add("(min-width: 1280px) and (max-width: 1536px)", () => setup(CONFIG.XXL));
    mm.add("(min-width: 1024px) and (max-width: 1280px)", () => setup(CONFIG.XL));
    mm.add("(min-width: 768px) and (max-width: 1024px)", () => setup(CONFIG.LG));
    mm.add("(min-width: 641px) and (max-width: 768px)", () => setup(CONFIG.MD));
    mm.add("(max-width: 640px)", () => setup(CONFIG.SM));

    return () => mm.revert();

  });

  return () => ctx.revert();

}, []);



  /* ================= JSX ================= */

  return (
    <group ref={groupRef}>
      {/* CANS */}
      <FloatingCan ref={can1Ref} flavor="original" floatSpeed={4} />
      <FloatingCan ref={can3Ref} flavor="zero" floatSpeed={4} />
      <FloatingCan ref={can4Ref} flavor="cherry" floatSpeed={4} />

      {/* LIGHTING */}
      <directionalLight position={[0, 0, 5]} intensity={0.7} />
      <ambientLight intensity={12} />
      <pointLight position={[0, 1, 3]} intensity={8} />

      {/* HDR ENVIRONMENT */}
      <Environment files={"/hdr/studio.hdr"} environmentIntensity={0.6} />
    </group>
  );
}

export default Scene;
