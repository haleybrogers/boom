import type { Metadata } from "next";
import { Cormorant, DM_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import Image from "next/image";

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
          {/* Persistent logo bar */}
          <div className="bg-white py-5 flex justify-center">
            <Image
              src="/logo-new.svg"
              alt="Boomerang Pilates"
              width={200}
              height={150}
              className="w-36 md:w-44 h-auto"
              priority
            />
          </div>
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </SplashScreen>
      </body>
    </html>
  );
}
