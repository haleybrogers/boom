import type { Metadata, Viewport } from "next";
import { Cormorant, DM_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import PromoBanner from "@/components/PromoBanner";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { isOpeningWeekPromoActive } from "@/lib/flags";

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
    "Classical Pilates mat and apparatus instruction in Durham, NC. Founded by sisters Emilie and Annie Young. Now open in downtown Durham.",
  keywords: ["Pilates", "Classical Pilates", "Durham NC", "Pilates studio", "mat Pilates", "reformer", "Boomerang Pilates"],
  authors: [{ name: "Boomerang Pilates" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Boomerang Pilates",
    title: "Boomerang Pilates | Classical Pilates in Durham, NC",
    description: "Put in the work. Feel it come back. Classical Pilates studio now open in Durham, NC.",
    url: "https://www.boomerangpilatesnc.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boomerang Pilates | Classical Pilates in Durham, NC",
    description: "Put in the work. Feel it come back. Classical Pilates studio now open in Durham, NC.",
  },
  metadataBase: new URL("https://www.boomerangpilatesnc.com"),
  // Favicon comes from src/app/icon.{svg,png} + apple-icon.png via the
  // Next.js file convention — gives modern browsers the SVG and Safari
  // a real PNG (Safari doesn't render SVG favicons reliably).
};

// Without this, mobile browsers default to a ~980px virtual viewport and
// render the page zoomed out. Sets the standard mobile-first viewport so
// the layout renders at the device's actual pixel width on load.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
        <PromoBanner />
        {/* Spacer for the fixed PromoBanner above — same flag, so it
            collapses back to 0 the moment the banner hides itself. */}
        {isOpeningWeekPromoActive() && <div className="h-9" />}
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyCTA />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
