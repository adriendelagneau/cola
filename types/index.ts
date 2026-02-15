export interface Nutritionel {
  energie: number;
  graisses: number;
  glucides: number;
  proteines: number;
  sel: number;
}

export interface ProductDetail {
  slug: string;
  name: string;
  description: string[];
  ingredients: string;
  nutritionel: Nutritionel;
}
