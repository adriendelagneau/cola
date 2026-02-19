"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface Sponsor {
  src: string;
  linkUrl: string;
}

interface Props {
  sponsors: Sponsor[];
  speed?: number;
  initialDirection?: number;
  bgColor?: string;
}

export default function ImageMarqueeSponsors({
  sponsors,
  speed = 1,
  initialDirection = 1,
  bgColor = "#591420",
}: Props) {
  const firstTrack = useRef<HTMLDivElement>(null);
  const secondTrack = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);

  let xPercent = 0;
  let direction = -1;
  let animationFrameId: number;

  const setSecondPosition = () => {
    if (!secondTrack.current) return;

    gsap.set(secondTrack.current, {
      left: secondTrack.current.getBoundingClientRect().width,
    });
  };

  const animate = () => {
    if (!firstTrack.current || !secondTrack.current) return;

    if (xPercent <= -100) xPercent = 0;
    if (xPercent > 0) xPercent = -100;

    gsap.set([firstTrack.current, secondTrack.current], {
      xPercent,
      force3D: true,
    });

    xPercent += 0.05 * speed * direction;

    animationFrameId = requestAnimationFrame(animate);
  };

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    setSecondPosition();

    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.5,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (e) => {
          direction = e.direction * initialDirection;
        },
      },
    });

    animate();

    const resize = () => setSecondPosition();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const Track = () => (
    <div className="flex items-center gap-12 pr-12">
      {sponsors.map((sponsor, i) => (
        <Link
          key={i}
          href={sponsor.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block shrink-0 transition-transform duration-300 hover:scale-110"
        >
          <Image
            src={sponsor.src}
            alt="Sponsor logo"
            width={80}
            height={80}
            className="h-20 w-auto object-contain"
          />
        </Link>
      ))}
    </div>
  );

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="overflow-hidden border-y-2 border-secondary"
    >
      <div className="relative h-30 w-full overflow-hidden">
        <div className="absolute top-1/2 -translate-y-1/2">
          <div ref={slider} className="relative flex whitespace-nowrap">
            
            <div ref={firstTrack}>
              <Track />
            </div>

            <div ref={secondTrack} className="absolute left-full top-0">
              <Track />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
