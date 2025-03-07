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

const siteName = "Saud Solutions";  // Define once and reuse
const siteUrl = "https://saudsolutions.com"; //Define once and reuse
const description =
  "Discover the best beauty, skincare, fashion, and home products at Saud Solutions. Shop now for exclusive deals on high-quality items, with a focus on beauty and skincare.";


export const metadata: Metadata = {
  title: {
    default: siteName,  // Default title
    template: `%s | ${siteName}`, // Template for dynamic titles (e.g., product pages)
  },
  description: description,
  keywords: [
    "Saud Solutions",
    "beauty products",
    "skincare",
    "fashion",
    "home goods",
    "kitchen essentials",
    "deals",
    "best prices",
    "online store",
    "premium beauty",
    "lifestyle products",
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1, // Corrected casing
      "max-video-preview": -1, // Corrected casing
      "max-image-preview": "large", // Corrected casing
    },
  },
  icons: {
     icon: '/favicon.ico',  // Or your specific favicon path
     apple: '/favicon.ico',  // Optional:  Apple touch icon
   },
  openGraph: {
    title: siteName,
    description: description,
    type: "website",
    url: siteUrl,
    siteName: siteName,
    images: [
      {
        url: `${siteUrl}/shop/banner11.png`,  // Use absolute URL
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: description,
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
    creator: '@SaudSolutions',
    site: '@SaudSolutions',
  },
  // Optional:  Verification tags (Google Search Console, etc.)
  verification: {
    google: 'aSA3PnNDnphG5GUT8m-ae5q2FBrydx3VjE7H7uq24u0', // Replace with your code
    // other: {
    //   "msvalidate.01": "your_microsoft_verification_code"
    // }
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* Meta Tags for SEO */}
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="canonical" href={siteUrl} />

          {/* Structured Data */}
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

          {/* Organization Schema (Highly Recommended) */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteName,
              url: siteUrl,
              logo: `${siteUrl}/logo.png`,  // Replace with your logo URL
              description: description,
              //sameAs: [  // Links to social media profiles
              //  "https://www.facebook.com/yourpage",
              //  "https://twitter.com/yourhandle",
              //  "https://www.instagram.com/yourhandle"
              //],
            })}
          </script>

          {/* Meta Pixel Code */}
          <Script
            id="fb-pixel-script"
            strategy="afterInteractive"
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
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src="https://www.facebook.com/tr?id=830158322624136&ev=PageView&noscript=1"
              alt="Facebook Pixel"
            />
          </noscript>

          {/* TikTok Pixel Code */}
          <Script
            id="tiktok-pixel-script"
            strategy="afterInteractive"
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