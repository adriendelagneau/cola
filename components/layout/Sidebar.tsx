"use client";

import { useRef, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";

import MenuLink from "./MenuLink";
import { useMenuStore } from "@/lib/store/useZuStore";
import { XIcon } from "lucide-react";

export default function Sidebar() {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<GSAPTimeline | null>(null);

  const isMenuOpen = useMenuStore((state) => state.isMenuOpen);
  const closeMenu = useMenuStore((state) => state.closeMenu);
  const setAnimating = useMenuStore((state) => state.setAnimating);

 useLayoutEffect(() => {
  if (!sidebarRef.current) return;

  const ctx = gsap.context(() => {
    const links = gsap.utils.toArray(".menu-link");

    const tl = gsap.timeline({
      paused: true,

      onStart: () => setAnimating(true),

      onComplete: () => setAnimating(false),

      onReverseComplete: () => {
        setAnimating(false);

        // reset links so animation works again next open
        gsap.set(links, { y: "100%" });
      },
    });

    // sidebar slide
    tl.fromTo(
      sidebarRef.current,
      { x: "-100%" },
      {
        x: "0%",
        duration: 0.9,
        ease: "power3.inOut",
      }
    );

    // links reveal
    tl.to(
      links,
      {
        y: "0%",
        duration: 1,
        ease: "power4.out",
        stagger: 0.15,
      },
     // overlap with sidebar animation
    );

    timelineRef.current = tl;
  });

  return () => ctx.revert();
}, []);


  useEffect(() => {
    const tl = timelineRef.current;

    if (!tl) return;

    if (isMenuOpen) {
      tl.play();
    } else {
      tl.reverse();
    }
  }, [isMenuOpen]);

  return (
    <div
      ref={sidebarRef}
      className="bg-secondary text-primary fixed inset-0 z-999 flex -translate-x-full flex-col pt-7 pl-3"
    >
      <button onClick={closeMenu} className="mb-12 text-2xl">
        <XIcon size={32} />
      </button>
      {/* Title Centered */}
      <div className="font-cream-cake absolute top-4 left-1/2 flex -translate-x-1/2 items-center justify-center capitalize">
        <MenuLink href={"/"} className="skew-0 text-6xl">
          Breizh Cola
        </MenuLink>
      </div>
      <div className="flex p-32">
        <div className="flex-1"></div>
        <nav className="flex flex-1 flex-col gap-6">
          <div className="overflow-hidden">
            <MenuLink
              href="/product/original"
              className="menu-link block translate-y-full"
            >
              Breizh <span className="font-extrabold uppercase">original</span>
            </MenuLink>
          </div>

          <div className="overflow-hidden">
            <MenuLink
              href="/product/zero"
              className="menu-link block translate-y-full"
            >
              Breizh{" "}
              <span className="font-extrabold text-black uppercase">zero</span>
            </MenuLink>
          </div>

          <div className="overflow-hidden">
            <MenuLink
              href="/product/cherry"
              className="menu-link block translate-y-full"
            >
              Breizh{" "}
              <span className="text-cherry font-extrabold uppercase">
                cherry
              </span>
            </MenuLink>
          </div>

          <div className="overflow-hidden">
            <MenuLink
              href="/product/lime"
              className="menu-link block translate-y-full"
            >
              Breizh{" "}
              <span className="text-lime font-extrabold uppercase">lime</span>
            </MenuLink>
          </div>

          <div className="overflow-hidden">
            <MenuLink
              href="/product/grappe"
              className="menu-link block translate-y-full"
            >
              Breizh{" "}
              <span className="font-extrabold text-green-700 uppercase">
                grappe
              </span>
            </MenuLink>
          </div>
        </nav>
      </div>
    </div>
  );
}
