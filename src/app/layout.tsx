import type { Metadata } from "next";
import Script from "next/script";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { LenisProvider } from "@/components/animations/LenisProvider";
import { ScrollToTop } from "@/components/animations/ScrollToTop";
import { GalaxyBackground } from "@/components/animations/GalaxyBackground";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Anoshaan · Product Designer & UI/UX Designer",
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
    title: "Anoshaan · Product Designer & UI/UX Designer",
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
    title: "Anoshaan · Product Designer & UI/UX Designer",
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
      <head>
        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "x6zzkjjdae");`}
        </Script>

        {/* Google Analytics 4 (gtag.js) */}
        <Script
          id="ga4-src"
          src="https://www.googletagmanager.com/gtag/js?id=G-9TMK4HT6GP"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9TMK4HT6GP');`}
        </Script>
      </head>
      <body>
        <GalaxyBackground />
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
