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
    layer0: searchParams.layer0 || '0',
    layer1: searchParams.layer1 || '0',
    layer2: searchParams.layer2 || '0',
    layer3: searchParams.layer3 || '0',
    layer4: searchParams.layer4 || '0',
    layer5: searchParams.layer5 || '0',
    layer6: searchParams.layer6 || '0',
    layer7: searchParams.layer7 || '0',
  });

  return {
    openGraph: {
      title: "StandBoys", // Customize this
      description: "Check out this StandBoy image", // Customize this
      images: [`/api/og?${queryParams.toString()}`],
      type: "website", // Adjust if the page represents something different
    },
    twitter: {
      card: "summary_large_image",
      title: "StandBoys", // Customize this
      description: "Check out this StandBoy image", // Customize this
      images: [`/api/og?${queryParams.toString()}`],
    },
  };
}

export default function Home() {
  return (
    <Generate />
  );
}
