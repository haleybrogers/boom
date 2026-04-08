import type { Metadata } from "next";
import { Cormorant, DM_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Boomerang Pilates | Classical Pilates in Durham, NC",
  description:
    "Classical Pilates mat and apparatus classes in the Raleigh-Durham area. Founded by sisters Emilie and Annie Young.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-charcoal">
        <SplashScreen>
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </SplashScreen>
      </body>
    </html>
  );
}
