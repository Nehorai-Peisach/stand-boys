import type { Metadata, ResolvingMetadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



// export const metadata: Metadata = {
//   title: "StandBoys",
//   description: "Discover, customize, and collect your own StandBoy! A world of unique characters, each with their own traits and style. Get yours today and join the StandBoy revolution!",
//   openGraph: {
//     title: "StandBoys",
//     description: "Discover, customize, and collect your own StandBoy! A world of unique characters, each with their own traits and style. Get yours today and join the StandBoy revolution!",
//     images: [
//       {
//         url: "/images/standboy-preview.png",
//         width: 1200,
//         height: 630,
//         alt: "StandBoy Preview",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "StandBoys",
//     description: "Discover, customize, and collect your own StandBoy! A world of unique characters, each with their own traits and style.",
//     images: ["/images/standboy-preview.png"],
//   },
// };


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
