import type { Metadata } from "next";
import { Cormorant, DM_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import EarlyBirdBanner from "@/components/EarlyBirdBanner";

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
  title: {
    default: "Boomerang Pilates | Classical Pilates in Durham, NC",
    template: "%s | Boomerang Pilates",
  },
  description:
    "Classical Pilates mat and apparatus instruction in Durham, NC. Founded by sisters Emilie and Annie Young. Opening soon — join the waitlist.",
  keywords: ["Pilates", "Classical Pilates", "Durham NC", "Pilates studio", "mat Pilates", "reformer", "Boomerang Pilates"],
  authors: [{ name: "Boomerang Pilates" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Boomerang Pilates",
    title: "Boomerang Pilates | Classical Pilates in Durham, NC",
    description: "Put in the work. Feel it come back. Classical Pilates opening soon in Durham, NC.",
    url: "https://www.boomerangpilatesnc.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boomerang Pilates | Classical Pilates in Durham, NC",
    description: "Put in the work. Feel it come back. Classical Pilates opening soon in Durham, NC.",
  },
  metadataBase: new URL("https://www.boomerangpilatesnc.com"),
  icons: { icon: "/favicon.svg" },
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
          <EarlyBirdBanner />
          <main className="flex-1">{children}</main>
          <Footer />
        </SplashScreen>
      </body>
    </html>
  );
}
