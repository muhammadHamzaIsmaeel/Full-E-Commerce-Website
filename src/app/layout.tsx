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
import Script from "next/script"; // Import the Script component

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
  title: "Saud Solution | Your Ecommerce Store", // Be more specific about what you sell.
  description:
    "Shop the best e-commerce products at Saud Solution.  Find great deals and high-quality items. [Add a more specific description of your niche here!]",
  keywords: [
    "Saud Solution",
    "ecommerce",
    "products",
    // Add keywords specific to the *types* of products you sell.  For example:
    "electronics",
    "gadgets",
    "home goods",
    "fashion",
    "accessories",
    "deals",
    "best prices",
  ],
  openGraph: {
    title: "Saud Solution | Your Ecommerce Store",
    description:
      "Shop the best e-commerce products at Saud Solution.  Find great deals and high-quality items.  [Add a more specific description of your niche here!]",
    type: "website",
    url: "https://www.saudsolution.com", // VERY IMPORTANT: Replace with your actual website URL!
    siteName: "Saud Solution",
    images: [
      {
        url: "https://www.saudsolution.com/og-image.jpg", // VERY IMPORTANT:  Replace with YOUR Open Graph image URL!  Create a visually appealing image representing your brand.
        width: 1200,
        height: 630,
        alt: "Saud Solution | Your Ecommerce Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saud Solution | Your Ecommerce Store",
    description:
      "Shop the best e-commerce products at Saud Solution.  Find great deals and high-quality items. [Add a more specific description of your niche here!]",
    images: [
      {
        url: "https://www.saudsolution.com/twitter-image.jpg", // VERY IMPORTANT: Replace with YOUR Twitter image URL!
        width: 1200,
        height: 630,
        alt: "Saud Solution | Your Ecommerce Store",
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
        <head>
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
          {/* End Meta Pixel Code */}

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
