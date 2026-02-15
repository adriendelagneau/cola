"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { BubblesIcon } from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";

import { useBubbleStore, useMenuStore } from "@/lib/store/useZuStore";

const Header = () => {

// const introComplete = useHeaderStore((state) => state.introComplete);

  const togglePlay = useBubbleStore((state) => state.togglePlay);
const isMenuOpen = useMenuStore((state) => state.isMenuOpen);
const isAnimating = useMenuStore((state) => state.isAnimating);
  const openMenu = useMenuStore((state) => state.openMenu);
    const setAnimating = useMenuStore((s) => s.setAnimating);
  

  console.log(isAnimating, "is Animating", isMenuOpen, "isMenuOpen")
  const navbarRef = useRef(null);
  const lastScrollTop = useRef(0);
  const introComplete = true;
  return (
    <nav
      ref={navbarRef}
    className={`bg-primary text-secondary font-poppins fixed top-0 left-0 z-50 flex h-20 w-full justify-between p-3 md:p-4
    ${introComplete ? "translate-y-0" : "-translate-y-full"} transition-transform duration-700`}
    >
      <div className="flex items-center font-bold uppercase sm:text-xl">
        {/* Mobile Hamburger */}
        <div
          className="relative flex h-6 w-6 flex-col items-center justify-center lg:hidden"
          onClick={() => {
            
             openMenu();
            
          }}
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
        <ul className="hidden gap-3 text-xl font-bold uppercase lg:flex">
          <li className="underline-effect"  onClick={() => {
            if (!isAnimating) {
              openMenu();
              setAnimating(false)
            }
          }}>produits</li>
        </ul>
      </div>

      {/* Title Centered */}
      <div className="font-cream-cake absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center text-5xl capitalize md:text-6xl">
        <Link href={"/"}>Breizh Cola</Link>
      </div>

      {/* Right Side: Bubble Toggle */}
      <div className="flex items-center justify-end">
        <div className="flex cursor-pointer items-center text-xl font-bold uppercase">
          <>
            <BubblesIcon
              size={28}
              onClick={togglePlay}
              className="text-secondary lg:hidden"
            />
            <div
              className="hidden transition-transform duration-150 active:scale-95 lg:inline-block"
              onClick={togglePlay}
            >
              bubbles
            </div>
          </>
        </div>
      </div>
    </nav>
  );
};

export default Header;
