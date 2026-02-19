"use client";

import { View } from "@react-three/drei";
import React from "react";

import ProductTitle from "./ProductTittle";
import Scene from "./Scene";
import Nutriments from "./Nutriments";
import { getProductByVariant } from "@/lib/hepler";


const HeroSingle = ({
  variant,
}: {
  variant: "original" | "cherry" | "zero" | "lime" | "coffe";
}) => {
  const product = getProductByVariant(variant);

  return (
    <div className="hero-single relative">
      <View className="hero-single-scene pointer-events-none sticky top-0 z-30 hidden h-screen w-full md:block">
        <Scene flavor={variant} />
      </View>

      <ProductTitle name={variant} />

      <div className="h-screen w-full">
        {product && <Nutriments product={product} />}
      </div>
    </div>
  );
};

export default HeroSingle;
