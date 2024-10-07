import Generate from "@/components/Genetare/Generate";
import { Metadata } from "next";

export async function generateMetadata({ searchParams }: {
  searchParams: {
    layer0: string
    layer1: string
    layer2: string
    layer3: string
    layer4: string
    layer5: string
    layer6: string
    layer7: string
  }
}): Promise<Metadata> {
  const queryParams = new URLSearchParams({
    layer0: searchParams.layer0,
    layer1: searchParams.layer1,
    layer2: searchParams.layer2,
    layer3: searchParams.layer3,
    layer4: searchParams.layer4,
    layer5: searchParams.layer5,
    layer6: searchParams.layer6,
    layer7: searchParams.layer7,
  });

  return {
    openGraph: {
      images: [`/api/og?${queryParams.toString()}`],
    },
  };
}


export default function Home() {

  return (
    <div>
      <Generate />
    </div>
  );
}
