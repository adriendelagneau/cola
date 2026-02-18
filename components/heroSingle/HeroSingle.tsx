"use client";

import { View } from "@react-three/drei";
import React from "react";

import ProductTitle from "./ProductTittle";
import Scene from "./Scene";

const HeroSingle = ({
  variant,
}: {
  variant: "original" | "cherry" | "zero" | "lime" | "grape";
}) => {
  console.log(variant);
  return (
    <div className="hero-single relative">
      <View className="hero-single-scene pointer-events-none sticky top-0 z-30 hidden h-screen w-full md:block">
        <Scene flavor={variant} />
      </View>
      <ProductTitle name={variant} />
      <div className="h-screen w-full"></div>
    </div>
  );
};

export default HeroSingle;
