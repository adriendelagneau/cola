import Carousel from "@/components/carousel/Carousel";
import HeroSingle from "@/components/heroSingle/HeroSingle";
import Social from "@/components/social/Social";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const Page = async ({ params }: PageProps) => {
  const slug = (await params).slug as
    | "original"
    | "cherry"
    | "zero"
    | "lime"
    | "grape";

  return (
    <div className="relative pt-24">
      <HeroSingle variant={slug} />
      <h3 className="text-secondary font-poppins w-full text-center text-4xl uppercase">
        choose your favorite one
      </h3>
      <Carousel />
      <Social />
    </div>
  );
};

export default Page;
