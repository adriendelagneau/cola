import React from "react";

interface Nutrition {
  energie: number;
  graisses: number;
  glucides: number;
  proteines: number;
  sel: number;
}

interface Product {
  name: string;
  ingredients: string;
  nutritionel: Nutrition;
}

const Nutriments = ({ product }: { product: Product }) => {
  const n = product.nutritionel;

  return (
    <section className="flex flex-col justify-center gap-18 p-12 max-w-4xl text-secondary h-screen">

      <h2 className="text-5xl font-bold capitalize">
        Valeurs nutritionnelles — {product.name}
      </h2>

      <div className="grid grid-cols-2 gap-4 text-3xl">

        <Nutrient label="Énergie" value={`${n.energie} kcal`} />
        <Nutrient label="Graisses" value={`${n.graisses} g`} />
        <Nutrient label="Glucides" value={`${n.glucides} g`} />
        <Nutrient label="Protéines" value={`${n.proteines} g`} />
        <Nutrient label="Sel" value={`${n.sel} g`} />

      </div>

      <div>
        <h3 className="font-semibold mb-2 text-3xl">Ingrédients</h3>
        <p className="text-xl opacity-80">{product.ingredients}</p>
      </div>

    </section>
  );
};

function Nutrient({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span>{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

export default Nutriments;
