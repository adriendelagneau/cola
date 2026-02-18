"use client";

import { useRef, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";

import MenuLink from "./MenuLink";
import SidebarCanvas from "./SidebarCanvas";

import { useMenuStore, useSidebarCanStore } from "@/lib/store/useZuStore";

import { XIcon } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {

  const sidebarRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<GSAPTimeline | null>(null);

  const imageAreaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  const isMenuOpen = useMenuStore((state) => state.isMenuOpen);
  const closeMenu = useMenuStore((state) => state.closeMenu);
  const setAnimating = useMenuStore((state) => state.setAnimating);

  const setActiveCan = useSidebarCanStore((s) => s.setActiveCan);
// inside your Sidebar component
const resetActiveCan = useSidebarCanStore((state) => state.resetActiveCan);
  const items = [
    { href: "/product/original", label: "original", color: "" },
    { href: "/product/zero", label: "zero", color: "text-black" },
    { href: "/product/cherry", label: "cherry", color: "text-cherry" },
    { href: "/product/lime", label: "lime", color: "text-lime" },
    { href: "/product/grappe", label: "grappe", color: "text-green-700" },
  ];

  // GSAP SIDEBAR ANIMATION
  useLayoutEffect(() => {

    if (!sidebarRef.current) return;

    const ctx = gsap.context(() => {

      const links = gsap.utils.toArray(".menu-link");

      gsap.set(links, { y: "100%" });
      gsap.set(imageAreaRef.current, { y: "100%", opacity: 0 });
      gsap.set(socialRef.current, { y: "100%", opacity: 0 });

      const tl = gsap.timeline({

        paused: true,

        onStart: () => setAnimating(true),

        onComplete: () => setAnimating(false),

        onReverseComplete: () => {

          setAnimating(false);

          gsap.set(links, { y: "100%" });
          gsap.set(imageAreaRef.current, { y: "100%", opacity: 0 });
          gsap.set(socialRef.current, { y: "100%", opacity: 0 });
   
          resetActiveCan();
        },

      });

      tl.fromTo(
        sidebarRef.current,
        { x: "-100%" },
        {
          x: "0%",
          duration: 0.9,
          ease: "power3.inOut",
        }
      );

      tl.to(
        imageAreaRef.current,
        {
          y: "0%",
          opacity: 1,
          duration: 1,
          ease: "power4.out",
        },
        "-=0.6"
      );

      tl.to(
        links,
        {
          y: "0%",
          duration: 1,
          ease: "power4.out",
          stagger: 0.15,
        },
        "-=0.8"
      );

      tl.to(
        socialRef.current,
        {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          ease: "power4.out",
        },
        "-=0.6"
      );

      timelineRef.current = tl;

    }, sidebarRef);

    return () => ctx.revert();

  }, [setAnimating]);

  useEffect(() => {

    const tl = timelineRef.current;
    if (!tl) return;

    if (isMenuOpen) tl.play();
    else tl.reverse();

  }, [isMenuOpen]);

  return (
    <div
      ref={sidebarRef}
      className="bg-secondary text-primary fixed inset-0 z-[999] flex -translate-x-full flex-col"
    >

      {/* HEADER */}
      <div className="relative flex items-center justify-center pt-7">

        <button
          onClick={closeMenu}
          className="absolute left-6 top-7 text-2xl"
        >
          <XIcon size={32} />
        </button>

        <MenuLink
          href="/"
          className="font-cream-cake text-6xl capitalize"
        >
          Breizh Cola
        </MenuLink>

      </div>


      {/* MAIN */}
      <div className="flex flex-1 p-12">

        {/* IMAGE AREA (3D CANVAS) */}
        <div
          ref={imageAreaRef}
          className="m-22 relative hidden flex-1 items-center justify-center overflow-hidden lg:flex"
        >
          <SidebarCanvas />
        </div>


        {/* LINKS */}
        <nav className="flex flex-1 flex-col justify-center gap-6">

          {items.map((item, index) => (

            <div key={item.href} className="overflow-hidden">

              <MenuLink
                href={item.href}
                onMouseEnter={() => setActiveCan(index)}
                className="menu-link font-cream-cake group block translate-y-full text-6xl"
              >
                Breizh{" "}
                <span
                  className={`uppercase font-poppins font-extrabold text-6xl transition group-hover:text-primary ${item.color}`}
                >
                  {item.label}
                </span>

              </MenuLink>

            </div>

          ))}

        </nav>

      </div>


      {/* SOCIAL */}
      <div className="overflow-hidden p-8">

        <div
          ref={socialRef}
          className="flex translate-y-full justify-center gap-8 opacity-0 lg:gap-10"
        >

          {/* icons unchanged */}

          <Link href="https://facebook.com/breizh-cola">...</Link>
          <Link href="https://twitter.com/breizh-cola">...</Link>
          <Link href="https://youtube.com/breizh-cola">...</Link>
          <Link href="https://tic-toc.com/breizh-cola">...</Link>

        </div>

      </div>

    </div>
  );
}
