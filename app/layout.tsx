import type { Metadata, Viewport } from "next";
import { Chakra_Petch, Inter, JetBrains_Mono, Orbitron } from "next/font/google";
import { MotionProvider } from "@/components/motion";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const chakra = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hack the Fashion 2026 | 24-Hour AI × Fashion Hackathon at KIET",
  description:
    "Hack the Fashion 2026 is a 24-hour in-person AI × fashion hackathon at the AI Skills Lab, KIET, on 2–3 November 2026. 250 builders, 6 challenge tracks and ₹50,000+ in prizes. Title sponsor Clothsy AI, powered by FabricVTON.",
  keywords: ["hackathon", "Hack the Fashion", "KIET", "AI", "fashion", "virtual try-on", "Clothsy AI"],
};

export const viewport: Viewport = {
  themeColor: "#0a0603",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${orbitron.variable} ${chakra.variable} ${inter.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="min-h-svh overflow-x-clip">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
