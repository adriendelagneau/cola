import { ProductDetail } from "@/types";

/* ================= TYPES ================= */

type Vec3 = { x?: number; y?: number; z?: number };

export type Transform = {
  position?: Vec3;
  rotation?: Vec3;
  scale?: Vec3;
};

export type BreakpointConfig = {
  initial: {
    can1: Transform;
    can3: Transform;
    can4: Transform;
  };
  intro: {
    can1: { from: Transform; to: Transform };
    can3: { from: Transform; to: Transform };
    can4: { from: Transform; to: Transform };
  };
  scroll: {
    groupRotation: Vec3;
    can1: Transform;
    can3: Transform;
    can4: Transform;
    groupPosition: {
      x?: number;
      y?: number;
      z?: number;
      duration?: number;
      ease?: string;
    };
  };
};

/* ================= CONFIG ================= */

export const CONFIG: Record<"SM" | "MD" | "LG" | "XL" | "XXL" | "XXXL", BreakpointConfig> = {

  SM: {
    initial: {
      can1: {
        position: { x: 0, y: -0.5 },
        scale: { x: 0.55, y: 0.55, z: 0.55 },
      },
      can3: {
        position: { y: 3, z: -1 },
        scale: { x: 0.5, y: 0.5, z: 0.5 },
      },
      can4: {
        position: { x: 0, y: -3, z: 1 },
        scale: { x: 0.5, y: 0.5, z: 0.5 },
      },
    },
    intro: {
      can1: {
        from: { position: { x: 5 }, rotation: { z: 1 } }, // comes from right
        to: { position: { x: 0 }, rotation: { z: 0 } },
      },
      can3: {
        from: { position: { x: -5 } },
        to: { position: { x: 0 } },
      },
      can4: {
        from: { position: { x: 5 } },
        to: { position: { x: 0 } },
      },
    },
    scroll: {
      groupRotation: { y: Math.PI * 2 },
      can1: { position: { x: 0 }, rotation: { z: 0 } },
      can3: { position: { x: 0.25, y: -0.4, z: -0.5 }, rotation: { z: -0.3 } },
      can4: { position: { x: -0.25, y: -0.38, z: -0.4 }, rotation: { z: 0.3 } },
      groupPosition: {
        x: 0,
        y: -0.2,
        duration: 2,
        ease: "sine.inOut",
      },
    },
  },

  MD: {
    initial: {
      can1: {
        position: { x: 0, y: -0.7 },
        scale: { x: 0.65, y: 0.65, z: 0.65 },
      },
      can3: {
        position: { y: 3, z: -1 },
        scale: { x: 0.6, y: 0.6, z: 0.6 },
      },
      can4: {
        position: { x: 0, y: -3, z: 1 },
        scale: { x: 0.6, y: 0.6, z: 0.6 },
      },
    },
    intro: {
      can1: {
        from: { position: { x: 5 }, rotation: { z: 1 } }, // comes from right
        to: { position: { x: 0 }, rotation: { z: 0 } },
      },
      can3: {
        from: { position: { x: -5 } },
        to: { position: { x: 0 } },
      },
      can4: {
        from: { position: { x: 5 } },
        to: { position: { x: 0 } },
      },
    },
    scroll: {
      groupRotation: { y: Math.PI * 2 },
      can1: { position: { x: 0, y: -0.3 }, rotation: { z: 0 } },
      can3: { position: { x: 0.25, y: -0.4, z: -0.5 }, rotation: { z: -0.3 } },
      can4: { position: { x: -0.25, y: -0.38, z: -0.4 }, rotation: { z: 0.3 } },
      groupPosition: {
        x: 0,
        y: -0.3,
        duration: 2,
        ease: "sine.inOut",
      },
    },
  },

  LG: {
    initial: {
      can1: {
        position: { x: 0, y: -0.65 },
        scale: { x: 0.68, y: 0.68, z: 0.68 },
      },
      can3: {
        position: { y: 3, z: -1 },
        scale: { x: 0.6, y: 0.6, z: 0.6 },
      },
      can4: {
        position: { x: 0, y: -3, z: 1 },
        scale: { x: 0.6, y: 0.6, z: 0.6 },
      },
    },
    intro: {
      can1: {
        from: { position: { x: 5 }, rotation: { z: 1 } }, // comes from right
        to: { position: { x: 0 }, rotation: { z: 0 } },
      },
      can3: {
        from: { position: { x: -5 } },
        to: { position: { x: 0 } },
      },
      can4: {
        from: { position: { x: 5 } },
        to: { position: { x: 0 } },
      },
    },
    scroll: {
      groupRotation: { y: Math.PI * 2 },
      can1: { position: { x: 0, y: -0.3 }, rotation: { z: 0 } },
      can3: { position: { x: 0.25, y: -0.4, z: -0.5 }, rotation: { z: -0.3 } },
      can4: { position: { x: -0.25, y: -0.38, z: -0.4 }, rotation: { z: 0.3 } },
      groupPosition: {
        x: 0,
        y: -0.35,
        duration: 2,
        ease: "sine.inOut",
      },
    },
  },

  XL: {
    initial: {
      can1: {
        position: { x: 1.7, y: -0.1 },
        rotation: { z: -0.1 },
        scale: { x: 0.82, y: 0.82, z: 0.82 },
      },
      can3: {
        position: { y: 5, z: -1 },
        scale: { x: 0.78, y: 0.78, z: 0.78 },
      },
      can4: {
        position: { x: 2, y: -4.5, z: 2 },
        scale: { x: 0.78, y: 0.78, z: 0.78 },
      },
    },
    intro: {
      can1: {
        from: { position: { y: 5, x: 1 }, rotation: { z: 3 } },
        to: { position: { y: -0.1, x: 1 }, rotation: { z: -0.1 } },
      },
      can3: {
        from: { position: { y: 8 }, scale: { x: 0.5, y: 0.5, z: 0.5 } },
        to: { position: { y: 5 }, scale: { x: 0.78, y: 0.78, z: 0.78 } },
      },
      can4: {
        from: { position: { y: -8 }, scale: { x: 0.5, y: 0.5, z: 0.5 } },
        to: { position: { y: -4.5 }, scale: { x: 0.78, y: 0.78, z: 0.78 } },
      },
    },
    scroll: {
      groupRotation: { y: Math.PI * 2 },
      can1: {
        position: { x: 0.1 },
        rotation: { z: 0 },
      },
      can3: {
        position: { x: 0.8, y: 0, z: -0.8 },
        rotation: { z: -0.3 },
      },
      can4: {
        position: { x: -0.5, y: 0, z: -0.5 },
        rotation: { z: 0.3 },
      },
      groupPosition: {
        x: 0,
        y: -0.4,
        duration: 3,
        ease: "sine.inOut",
      },
    },
  },

  XXL: {
    initial: {
      can1: {
        position: { y: -0.2, x: 1.2 }, rotation: { z: -0.1 },
        scale: { x: 0.9, y: 0.9, z: 0.9 },
      },
      can3: {
        position: { y: 5, z: -1 },
        scale: { x: 0.85, y: 0.85, z: 0.85 },
      },
      can4: {
        position: { x: 2, y: -4.5, z: 2 },
        scale: { x: 0.85, y: 0.85, z: 0.85 },
      },
    },
    intro: {
      can1: {
        from: { position: { y: 5, x: 1 }, rotation: { z: 3 } },
        to: { position: { y: -0.2, x: 1.2 }, rotation: { z: -0.1 } },
      },
      can3: {
        from: { position: { y: 8 }, scale: { x: 0.85, y: 0.85, z: 0.85 }, },
        to: { position: { y: 5 }, scale: { x: 0.85, y: 0.85, z: 0.85 }, },
      },
      can4: {
        from: { position: { y: -8 }, scale: { x: 0.85, y: 0.85, z: 0.85 }, },
        to: { position: { y: -4.5 }, scale: { x: 0.85, y: 0.85, z: 0.85 }, },
      },
    },
    scroll: {
      groupRotation: { y: Math.PI * 2 },
      can1: {
        position: { x: 0.1 },
        rotation: { z: 0 },
      },
      can3: {
        position: { x: 0.8, y: 0, z: -0.8 },
        rotation: { z: -0.3 },
      },
      can4: {
        position: { x: -0.5, y: 0, z: -0.5 },
        rotation: { z: 0.3 },
      },
      groupPosition: {
        x: 1,
        duration: 3,
        ease: "sine.inOut",
      },
    },
  },

  XXXL: {
    initial: {
      can1: {
        position: { y: -0.1, x: 1.7 }, rotation: { z: -0.1 },
        scale: { x: 1, y: 1, z: 1 },
      },
      can3: {
        position: { y: 5, z: -1 },
        scale: { x: 1, y: 1, z: 1 },
      },
      can4: {
        position: { x: 2, y: -4.5, z: 2 },
        scale: { x: 1, y: 1, z: 1 },
      },
    },
    intro: {
      can1: {
        from: { position: { y: 0, x: 3.2 }, rotation: { z: 3 } },
        to: { position: { y: -0.1, x: 1.7 }, rotation: { z: -0.1 } },
      },
      can3: {
        from: { position: { y: 8 }, scale: { x: 0.5, y: 0.5, z: 0.5 } },
        to: { position: { y: 5 }, scale: { x: 1, y: 1, z: 1 } },
      },
      can4: {
        from: { position: { y: -8 }, scale: { x: 0.5, y: 0.5, z: 0.5 } },
        to: { position: { y: -4.5 }, scale: { x: 1, y: 1, z: 1 } },
      },
    },
    scroll: {
      groupRotation: { y: Math.PI * 2 },
      can1: {
        position: { x: 0.1 },
        rotation: { z: 0 },
      },
      can3: {
        position: { x: 0.8, y: 0, z: -0.8 },
        rotation: { z: -0.3 },
      },
      can4: {
        position: { x: -0.5, y: 0, z: -0.5 },
        rotation: { z: 0.3 },
      },
      groupPosition: {
        x: 1,
        duration: 3,
        ease: "sine.inOut",
      },
    },
  },



};



export const productsDetails: ProductDetail[] = [
  {
    slug: "breizh-cola-original",
    name: "original",
    description: [
      "Breizh Cola Original, lancé en 2002, offre un mélange parfait d’ingrédients, avec des bulles fines et un goût rafraîchissant. Apprécié pour son caractère authentique et breton, il reste un favori indétrônable après plus de 20 ans.",
      "Que ce soit pour un moment de détente ou pour accompagner vos repas, Breizh Cola Original est l’emblème d'une boisson pétillante au goût unique. C'est une expérience qui capture l'essence même de la Bretagne."
    ],
    ingredients:
      "Eau, gaz carbonique, colorant : E150d, acidifiants : acide citrique, acide phosphorique et citrate de sodium, caféine, arôme naturel de cola et autres arômes naturels, édulcorants : aspartame et acésulfame K.",
    nutritionel: {
      energie: 11,
      graisses: 0.1,
      glucides: 0.3,
      proteines: 0.1,
      sel: 0,
    },
  },
  {
    slug: "breizh-cola-zero",
    name: "zero",
    description: [
      "Avec Breizh Cola Zéro, savourez l’authenticité d’un cola breton sans aucune calorie. Conçu pour ceux qui veulent profiter d’un goût riche sans le sucre, il allie plaisir et bien-être sans compromis.",
      "Son goût fidèle à l'original, tout en étant léger et sans sucre, en fait un compagnon idéal pour tous les moments de détente. Breizh Cola Zéro vous accompagne dans chaque instant, avec la même effervescence."
    ],
    ingredients:
      "Eau, gaz carbonique, colorant : E150d, acidifiants : acide citrique, acide phosphorique et citrate de sodium, caféine, arôme naturel de cola et autres arômes naturels, édulcorants : aspartame, acésulfame K et sucralose.",
    nutritionel: {
      energie: 0,
      graisses: 0.1,
      glucides: 0.3,
      proteines: 0.1,
      sel: 0,
    },
  },
  {
    slug: "breizh-cola-cherry",
    name: "cherry",
    description: [
      "Breizh Cola Cherry apporte une touche fruitée à la gamme avec son goût de cerise. Ce cola breton audacieux associe la saveur classique avec un zeste de cerise, créant une expérience gourmande et rafraîchissante.",
      "Laissez-vous surprendre par cette combinaison unique, parfaite pour une pause rafraîchissante à tout moment de la journée. Breizh Cola Cherry est la boisson idéale pour ceux qui recherchent une alternative fruitée."
    ],
    ingredients:
      "Eau, gaz carbonique, colorant : E150d, acidifiants : acide citrique, acide phosphorique et citrate de sodium, caféine, arôme naturel de cola et autres arômes naturels, édulcorants : aspartame et acésulfame K.",
    nutritionel: {
      energie: 42,
      graisses: 0.1,
      glucides: 9.8,
      proteines: 0.3,
      sel: 0,
    },
  },
];

export const sections = [
  {
    id: "year-2003",
    year: 2003,
    image: "https://res.cloudinary.com/dos8mey8r/image/upload/v1754068115/breizhCola/bz11_nliwm2.jpg",
    text: "Naissance de Breizh Cola, le cola breton."
  },
  {
    id: "year-2007",
    year: 2007,
    image: "https://res.cloudinary.com/dos8mey8r/image/upload/v1754065320/breizhCola/bz3_euoqwg.jpg",
    text: "Succès en Bretagne, ancrage local fort."
  },
  {
    id: "year-2011",
    year: 2011,
    image: "https://res.cloudinary.com/dos8mey8r/image/upload/v1754065641/breizhCola/bz5_cqeiz1.jpg",
    text: "Déploiement national, expansion du cola breton."
  },
  // {
  //   id: "year-2015",
  //   year: 2015,
  //   image: "https://res.cloudinary.com/dos8mey8r/image/upload/v1754065844/breizhCola/bz6_fqdo4y.jpg",
  //   text: "Nouvelles recettes et ingrédients naturels."
  // },
  // {
  //   id: "year-2018",
  //   year: 2018,
  //   image: "https://res.cloudinary.com/dos8mey8r/image/upload/v1754066577/breizhCola/bz7_yblvex.jpg",
  //   text: "Réduction des plastiques et actions écologiques."
  // },
  // {
  //   id: "year-2020",
  //   year: 2020,
  //   image: "https://res.cloudinary.com/dos8mey8r/image/upload/v1754067080/breizhCola/bz8_hxhy7f.jpg",
  //   text: "Campagne sur la culture bretonne."
  // },
  {
    id: "year-2023",
    year: 2023,
    image: "https://res.cloudinary.com/dos8mey8r/image/upload/v1754067654/breizhCola/bz9_yegs0b.jpg",
    text: "Collaboration avec des artistes bretons pour un design unique."
  },
  {
    id: "year-2031",
    year: 2031,
    image: "https://res.cloudinary.com/dos8mey8r/image/upload/v1754067853/breizhCola/bz10_quqd5y.jpg",
    text: "Lancement de versions bio et sans sucre."
  },
  {
    id: "year-2035",
    year: 2035,
    image: "https://res.cloudinary.com/dos8mey8r/image/upload/v1754068115/breizhCola/bz11_nliwm2.jpg",
    text: "Breizh Cola vers le futur"
  },
];


export const SponsortMusic = [
  {
    src: "https://res.cloudinary.com/dos8mey8r/image/upload/v1729089913/breizhCola/sponsorts/download_3__150x150_oyzedo.jpg",
    linkUrl: "https://bobital.com",
  },
  {
    src: "https://res.cloudinary.com/dos8mey8r/image/upload/v1729089911/breizhCola/sponsorts/download_1__150x150_ltnc6n.jpg",
    linkUrl: "https://aupontdurock.com",
  },
  {
    src: "https://res.cloudinary.com/dos8mey8r/image/upload/v1729089912/breizhCola/sponsorts/download_2__150x150_kxyrwn.jpg",
    linkUrl: "https://belleileonair.com",
  },
  {
    src: "https://res.cloudinary.com/dos8mey8r/image/upload/v1729089925/breizhCola/sponsorts/download_150x150_oou17c.jpg",
    linkUrl: "https://aubdm.com",
  },
  {
    src: "https://res.cloudinary.com/dos8mey8r/image/upload/v1729089914/breizhCola/sponsorts/download_4__150x150_fjgy0l.jpg",
    linkUrl: "https://festivalchantmarin.com",
  },
  {
    src: "https://res.cloudinary.com/dos8mey8r/image/upload/v1729089915/breizhCola/sponsorts/download_5__150x150_lbwbh5.jpg",
    linkUrl: "https://festival-interceltique.bzh",
  },
  {
    src: "https://res.cloudinary.com/dos8mey8r/image/upload/v1729089916/breizhCola/sponsorts/download_6__150x150_zds1us.jpg",
    linkUrl: "https://jazzenville.com",
  },
  {
    src: "https://res.cloudinary.com/dos8mey8r/image/upload/v1729089917/breizhCola/sponsorts/download_7__156x150_m0naer.jpg",
    linkUrl: "https://mlogo.com",
  },
  {
    src: "https://res.cloudinary.com/dos8mey8r/image/upload/v1729089918/breizhCola/sponsorts/download_8__150x150_dhnode.jpg",
    linkUrl: "https://motszik.com",
  },
  {
    src: "https://res.cloudinary.com/dos8mey8r/image/upload/v1729089920/breizhCola/sponsorts/download_9__150x150_lprow8.jpg",
    linkUrl: "https://roiarthur.com",
  },
  {
    src: "https://res.cloudinary.com/dos8mey8r/image/upload/v1729089921/breizhCola/sponsorts/download_10__150x150_ed5ven.jpg",
    linkUrl: "https://roue-waroch.com",
  },
  {
    src: "https://res.cloudinary.com/dos8mey8r/image/upload/v1729089922/breizhCola/sponsorts/download_11__150x150_qq8fks.jpg",
    linkUrl: "https://tombeesdelanuit.com",
  },
  {
    src: "https://res.cloudinary.com/dos8mey8r/image/upload/v1729089924/breizhCola/sponsorts/download_12__150x150_ydhtuc.jpg",
    linkUrl: "https://vieillescharrues.com",
  },
];