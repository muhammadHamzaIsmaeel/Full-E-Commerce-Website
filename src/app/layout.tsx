import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ClerkProvider } from "@clerk/nextjs";
import SalesBanner from "@/components/salesBanner";
import { WishlistProvider } from "./context/WishlistContext";
import WhatsAppButton from "../components/WhatsAppButton";
import Script from "next/script";
import Image from "next/image";

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

const siteName = "Saud Solutions";
const siteUrl = "https://saudsolutions.com";
const description =
  "Shop premium beauty, skincare, fashion, electronics, and home essentials at Saud Solutions. Discover exclusive deals on high-quality products with fast delivery across Pakistan.";

export const metadata: Metadata = {
  title: {
    default: `${siteName} | Online Shopping for Beauty, Fashion & Home Essentials`,
    template: `%s | ${siteName} - Shop Online in Pakistan`,
  },
  description: description,
  keywords: [
    "Saud Solutions",
    "online shopping Pakistan",
    "beauty products Pakistan",
    "skincare products",
    "fashion accessories",
    "home essentials",
    "electronics Pakistan",
    "kitchen appliances",
    "best deals online",
    "premium skincare",
    "lifestyle products",
    "e-commerce Pakistan",
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-video-preview": -1,
      "max-image-preview": "large",
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
  openGraph: {
    title: `${siteName} - Your One-Stop Shop for Quality Products`,
    description: description,
    type: "website",
    url: siteUrl,
    siteName: siteName,
    images: [
      {
        url: `${siteUrl}/logo.png`, // Optimized OG image
        width: 1200,
        height: 630,
        alt: `${siteName} - Online Shopping`,
      },
    ],
    locale: "en_PK", // Added for regional targeting
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} - Shop Beauty, Fashion & More`,
    description: description,
    images: [
      {
        url: `${siteUrl}/logo.png`, // Optimized Twitter image
        width: 1200,
        height: 630,
        alt: `${siteName} - Online Shopping`,
      },
    ],
    creator: "@SaudSolutions",
    site: "@SaudSolutions",
  },
  verification: {
    google: "aSA3PnNDnphG5GUT8m-ae5q2FBrydx3VjE7H7uq24u0",
    yandex: "d6ab867a8431f329",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <link rel="canonical" href={siteUrl} />

          {/* Preconnect to Google Fonts and Analytics for Performance */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://analytics.tiktok.com" />
          <link rel="preconnect" href="https://connect.facebook.net" />

          {/* Structured Data: Website */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteName,
              url: siteUrl,
              description: description,
              potentialAction: {
                "@type": "SearchAction",
                target: `${siteUrl}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            })}
          </script>

          {/* Structured Data: Organization */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteName,
              url: siteUrl,
              logo: `${siteUrl}/logo.png`,
              description: description,
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+92-315-2121984",
                contactType: "Customer Service",
                areaServed: "PK",
                availableLanguage: ["English", "Urdu"],
              },
              sameAs: [
                "https://www.facebook.com/profile.php?id=100095090834625",
                "https://x.com/SaudSolutions",
                "https://www.tiktok.com/@saudsolution",
                "https://www.instagram.com/saud_solutions/",
              ],
            })}
          </script>

          {/* Structured Data: Local Business (for Pakistan targeting) */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: siteName,
              url: siteUrl,
              telephone: "+92-315-2121984",
              address: {
                "@type": "PostalAddress",
                addressCountry: "PK",
                addressLocality: "Karachi", // Replace with your actual city
                addressRegion: "Sindh", // Replace with your actual region
              },
              openingHours: "Mo-Su 09:00-21:00", // Adjust as needed
            })}
          </script>

          {/* Meta Pixel Code */}
          <Script
            id="fb-pixel-script"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '830158322624136');
                fbq('track', 'PageView');
              `,
            }}
          />
          <noscript>
            <Image
              height={1}
              width={1}
              style={{ display: "none" }}
              src="https://www.facebook.com/tr?id=830158322624136&ev=PageView&noscript=1"
              alt="Facebook Pixel"
            />
          </noscript>

          {/* TikTok Pixel Code */}
          <Script
            id="tiktok-pixel-script"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                !function (w, d, t) {
                  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
                  var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
                  ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
                  ttq.load('CV2M67BC77U54LNIFR00');
                  ttq.page();
                }(window, document, 'ttq');
              `,
            }}
          />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <WishlistProvider>
            <SalesBanner />
            <Header />
            {children}
            <WhatsAppButton phoneNumber="923152121984" />
            <SpeedInsights />
            <Analytics />
            <Footer />
          </WishlistProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}