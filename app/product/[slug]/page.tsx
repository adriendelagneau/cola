;

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
    <div className="relative min-h-screen z-5 pt-24">
     {slug}
    </div>
  );
};

export default Page;
