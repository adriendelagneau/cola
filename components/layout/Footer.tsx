import { Copyright } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div
      className="bg-secondary text-primary relative h-25 z-20"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 flex h-25 w-full items-center justify-between px-3">
        <div className="flex  items-center">
          <Copyright strokeWidth={1.5} />
          <div className="text-md pl-1 font-semibold capitalize xl:text-xl">
            copyright 2025
          </div>
        </div>

        <div className="font-cream-cake text-right text-3xl capitalize sm:text-4xl 2xl:text-5xl">
          breizh cola
        </div>
      </div>
    </div>
  );
};

export default Footer;
