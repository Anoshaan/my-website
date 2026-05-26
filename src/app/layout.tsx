import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { LenisProvider } from "@/components/animations/LenisProvider";
import { BackgroundGrid } from "@/components/animations/BackgroundGrid";
import { CustomCursor } from "@/components/animations/CustomCursor";
import { ScrollToTop } from "@/components/animations/ScrollToTop";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Anoshaan — Product Designer & UI/UX Designer",
    template: "%s | Anoshaan",
  },
  description:
    "Product designer focused on UI/UX, spatial interfaces, digital experiences, and interactive product design. Explore selected work, case studies, and creative experiments by Anoshaan.",
  metadataBase: new URL("https://anoshaan.design"),
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Anoshaan — Product Designer & UI/UX Designer",
    description:
      "Product designer focused on UI/UX, spatial interfaces, digital experiences, and interactive product design.",
    url: "https://anoshaan.design",
    siteName: "Anoshaan",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 1200,
        alt: "Anoshaan Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anoshaan — Product Designer & UI/UX Designer",
    description:
      "Product designer focused on UI/UX, spatial interfaces, digital experiences, and interactive product design.",
    images: ["/icon.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <BackgroundGrid />
        <CustomCursor />
        <LenisProvider>
          <ScrollToTop />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
