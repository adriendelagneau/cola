"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { BubblesIcon } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";

import {
  useBubbleStore,
  useMenuStore,
  useAnimationStore,
} from "@/lib/store/useZuStore";

const Header = () => {
  const togglePlay = useBubbleStore((state) => state.togglePlay);
  const isMenuOpen = useMenuStore((state) => state.isMenuOpen);
  const openMenu = useMenuStore((state) => state.openMenu);
  const setAnimating = useMenuStore((s) => s.setAnimating);

  const introCompleted = useAnimationStore((s) => s.introCompleted);

  const navbarRef = useRef<HTMLElement>(null);
  const lastScrollTop = useRef(0);
  const [visible, setVisible] = useState(false);
  const startBubbles = useBubbleStore((state) => state.setPlaying); // optional to directly start
  // Header appear after intro
  useEffect(() => {
    if (!introCompleted) return;
    gsap.set(navbarRef.current, { y: -100, opacity: 0 });
    setVisible(true);
    if (navbarRef.current) {
      gsap.fromTo(
        navbarRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }
    // start bubble animation
  gsap.delayedCall(0.6, () => {
    startBubbles(true);
  });
  }, [introCompleted]);

  // Scroll hide/show logic
  useEffect(() => {
    const handleScroll = () => {
      const st = window.scrollY;
      if (!navbarRef.current) return;

      if (st > lastScrollTop.current && st > 100) {
        // scroll down → hide
        gsap.to(navbarRef.current, {
          y: -100,
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        // scroll up → show
        gsap.to(navbarRef.current, {
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }
      lastScrollTop.current = st <= 0 ? 0 : st;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navbarRef}
      className={`bg-primary text-secondary font-poppins fixed top-0 left-0 z-50 flex h-20 w-full -translate-y-full justify-between p-3 md:p-4`}
    >
      {/* LEFT: Menu */}
      <div className="flex items-center font-bold uppercase sm:text-xl">
        {/* Mobile Hamburger */}
        <div
          className="relative flex h-6 w-6 cursor-pointer flex-col items-center justify-center lg:hidden"
          onClick={() => openMenu()}
        >
          <span
            className={`bg-secondary absolute h-0.5 w-6 transition-all duration-300 ${
              isMenuOpen ? "rotate-45" : "-translate-y-2"
            }`}
          />
          <span
            className={`bg-secondary absolute h-0.5 w-6 transition-opacity duration-300 ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`bg-secondary absolute h-0.5 w-6 transition-all duration-300 ${
              isMenuOpen ? "-rotate-45" : "translate-y-2"
            }`}
          />
        </div>

        {/* Desktop Nav */}
        <ul className="ml-6 hidden gap-3 text-xl font-bold uppercase lg:flex">
          <li
            className="underline-effect cursor-pointer"
            onClick={() => {
              if (!isMenuOpen) {
                openMenu();
                setAnimating(false);
              }
            }}
          >
            produits
          </li>
        </ul>
      </div>

      {/* CENTER: Title */}
      <div className="font-cream-cake absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center text-5xl capitalize md:text-6xl">
        <Link href={"/"}>Breizh Cola</Link>
      </div>

      {/* RIGHT: Bubble Toggle */}
      <div className="flex items-center justify-end">
        <div className="flex cursor-pointer items-center text-xl font-bold uppercase">
          <BubblesIcon
            size={28}
            onClick={togglePlay}
            className="text-secondary lg:hidden"
          />
          <div
            className="ml-2 hidden cursor-pointer transition-transform duration-150 active:scale-95 lg:inline-block"
            onClick={togglePlay}
          >
            bulles
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
