import Hero from "@/components/hero/Hero";
import Marquee from "@/components/Marquee";
import MatterMarquee from "@/components/MatterMarquee";
import ProductCherry from "@/components/productCherry/ProductCherry";
import ProductZero from "@/components/productZero/ProductZero";
import { SponsortMusic } from "@/lib/data";

const sponsors = [
  { id: "nike", name: "Nike", logo: "/sponsors/nike.png" },
  { id: "adidas", name: "Adidas", logo: "/sponsors/adidas.png" },
  { id: "spotify", name: "Spotify", logo: "/sponsors/spotify.png" },
  { id: "redbull", name: "Red Bull", logo: "/sponsors/redbull.png" },
  { id: "puma", name: "Puma", logo: "/sponsors/puma.png" },
];

export default function Home() {
  return (
    <div className="relative z-5 min-h-screen w-full">
      <Hero />
      <Marquee
        initialDirection={1}
        speed={1}
        sentence="Une brise iodée venue de l’océan traverse la Bretagne, apportant fraîcheur, caractère et authenticité."
      />
      <Marquee
        initialDirection={-1}
        speed={0.7}
        sentence="Breizh Cola incarne l’esprit breton : une terre de caractère, des saveurs authentiques et une fraîcheur qui se partage, face à l’océan et sous un ciel ouvert."
      />
      <Marquee
        initialDirection={1}
        speed={0.9}
        sentence="Des bulles pleines de caractère, une fraîcheur venue de l’Ouest et l’esprit breton qui ne fait aucun compromis."
      />
      <ProductZero />
      <Marquee
        initialDirection={1}
        speed={1.1}
        sentence="Breizh Cola Zéro affirme l’esprit breton sans compromis : tout le caractère, toute la fraîcheur, et zéro sucre, face à l’océan et au vent du large."
      />
      <ProductCherry />
      <Marquee
        initialDirection={-1}
        speed={1.1}
        sentence="Breizh Cola Cherry revisite l’esprit breton avec une touche fruitée : des bulles de caractère, une cerise intense et une fraîcheur venue de l’Ouest."
      />
      <div className="p-24 h-screen w-full">
        <MatterMarquee />
      </div>
    </div>
  );
}
