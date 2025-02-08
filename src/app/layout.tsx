import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ClerkProvider } from "@clerk/nextjs";
import SalesBanner from "@/components/salesBanner";
import { WishlistProvider } from "./context/WishlistContext";

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

export const metadata: Metadata = {
  title: "Furniro | Modern Furniture & Home Decor",
  description:
    "Discover high-quality, stylish, and affordable furniture and home decor at Furniro. Shop our curated collection of modern furniture and decor items to transform your home.",
  keywords: [
    "Furniro",
    "modern furniture",
    "home decor",
    "affordable furniture",
    "stylish furniture",
    "living room furniture",
    "bedroom furniture",
    "office furniture",
    "home decoration",
    "decorative items",
    "wall art",
    "lighting",
    "rugs",
    "curtains",
    "home accessories",
  ],
  openGraph: {
    title: "Furniro | Modern Furniture & Home Decor",
    description:
      "Discover high-quality, stylish, and affordable furniture and home decor at Furniro. Shop our curated collection of modern furniture and decor items to transform your home.",
    type: "website",
    url: "https://www.furniro.com", // Replace with your website URL
    siteName: "Furniro",
    images: [
      {
        url: "https://www.furniro.com/og-image.jpg", // Replace with your Open Graph image URL
        width: 1200,
        height: 630,
        alt: "Furniro | Modern Furniture & Home Decor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Furniro | Modern Furniture & Home Decor",
    description:
      "Discover high-quality, stylish, and affordable furniture and home decor at Furniro. Shop our curated collection of modern furniture and decor items to transform your home.",
    images: [
      {
        url: "https://www.furniro.com/twitter-image.jpg", // Replace with your Twitter image URL
        width: 1200,
        height: 630,
        alt: "Furniro | Modern Furniture & Home Decor",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
           className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
          <WishlistProvider>
            <SalesBanner />
            <Header />
            {children}
            <SpeedInsights />
            <Analytics />
            <Footer />
          </WishlistProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

