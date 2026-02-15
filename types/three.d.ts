import { ReactThreeFiber } from "@react-three/fiber";
import { ImageFadeMaterialDisplacement } from "@/components/ImageFadeMaterialDisplacement";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      imageFadeMaterialDisplacement: ReactThreeFiber.Object3DNode<
        ImageFadeMaterialDisplacement,
        typeof ImageFadeMaterialDisplacement
      >;
    }
  }
}
