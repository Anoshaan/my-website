import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { LenisProvider } from "@/components/animations/LenisProvider";
import { BackgroundGrid } from "@/components/animations/BackgroundGrid";
import { CustomCursor } from "@/components/animations/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anoshaan — Lead UX Engineer & Senior Product Experience Designer",
  description:
    "Lead UX Engineer and Senior Product Experience Designer — enterprise-grade digital experiences across web, mobile, and AI-driven platforms.",
  icons: {
    icon: "/favicon.png",
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
          <Navigation />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
