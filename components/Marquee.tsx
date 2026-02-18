"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";

interface MarqueeProps {
  initialDirection?: number;
  speed?: number;
  sentence: string;
  bgColor?: string;
}

const Marquee = ({
  initialDirection = 1,
  speed = 1,
  sentence,
  bgColor = "#591420",
}: MarqueeProps) => {
  const firstText = useRef<HTMLParagraphElement>(null);
  const secondText = useRef<HTMLParagraphElement>(null);
  const slider = useRef<HTMLDivElement>(null);

  let xPercent = 0;
  let direction = -1;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let animationFrameId: number | null = null;

  const setSecondTextPosition = () => {
    if (secondText.current) {
      gsap.set(secondText.current, {
        left: secondText.current.getBoundingClientRect().width, // Recalculate text position
      });
    }
  };

  const animate = () => {
    if (firstText.current && secondText.current) {
      if (xPercent < -100) {
        xPercent = 0;
      } else if (xPercent > 0) {
        xPercent = -100;
      }

      gsap.set([firstText.current, secondText.current], { xPercent: xPercent });
      xPercent += 0.05 * speed * direction; // Adjust scrolling speed based on direction
    }

    animationFrameId = requestAnimationFrame(animate);
  };

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Set the position of the second text initially
    setSecondTextPosition();

    // ScrollTrigger controlling the marquee direction based on scroll
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement, // Trigger on full document scroll
        scrub: 0.5,
        start: "top bottom",
        end: "bottom top",
        // pinSpacer: false,
        onUpdate: (e) => (direction = e.direction * initialDirection), // Update direction
      },
    });

    // Start the marquee animation
    animate();

    // Listen for window resize and update text position
    const handleResize = () => {
      setSecondTextPosition();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
  }, []);

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="text-secondary border-secondary border-y-2"
    >
      <div
        className={
          "relative flex h-[8vh] w-full overflow-hidden sm:h-[10vh] lg:h-25 xl:h-32.5"
        }
      >
        <div className="absolute top-1/2 z-10 -translate-x-3 -translate-y-1/2">
          <div
            ref={slider}
            className="font-poppins relative text-3xl whitespace-nowrap capitalize sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            <p className="relative m-0 pr-5" ref={firstText}>
              {sentence}
            </p>
            <p className="absolute top-0 left-full m-0 pr-5" ref={secondText}>
              {sentence}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
