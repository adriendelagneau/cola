"use client";

import { useMenuStore } from "@/lib/store/useZuStore";
import { useRouter } from "next/navigation";
import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href: string;
  children: React.ReactNode;
}

export default function MenuLink({
  href,
  children,
  className = "",
  onClick,
  ...rest
}: Props) {
  const router = useRouter();

  const closeMenu = useMenuStore((state) => state.closeMenu);
  const isAnimating = useMenuStore((state) => state.isAnimating);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isAnimating) return;

    // allow user custom onClick too
    onClick?.(e);

    router.push(href);

    requestAnimationFrame(() => {
      closeMenu();
    });
  };

  return (
    <button
      onClick={handleClick}
      className={`text-6xl -skew-1 font-bold text-left ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
