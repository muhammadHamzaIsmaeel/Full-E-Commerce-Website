import { Metadata } from 'next';
import Banner from "@/components/banner";
import LatestSale from '@/components/Latest';
import BrowseRange from "@/components/category";
import Products from "@/components/product";
import BrandProductsSection from "@/components/brandproducts";
import Bannerfree from "@/components/FreeDeliveryScroll";
import FaceAndSkincareProducts from "@/components/FaceAndSkincareProducts";
import Feature from "@/components/button/feature";
import TrendyProductsSection from "@/components/inspiration";
import Feature1 from "@/components/button/feature1";
import ImageGrid from "@/components/frame";

const siteName = "Saud Solutions";
const siteUrl = "https://saudsolutions.com";
const description =
  "Shop premium beauty, skincare, fashion, electronics, and home essentials at Saud Solutions. Discover exclusive deals with fast delivery across Pakistan.";

export const metadata: Metadata = {
  title: `${siteName} | Online Shopping for Beauty, Fashion & Home in Pakistan`,
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
    "e-commerce Pakistan",
  ],
  openGraph: {
    title: `${siteName} - Your One-Stop Shop for Quality Products`,
    description: description,
    type: "website",
    url: siteUrl,
    siteName: siteName,
    images: [
      {
        url: `${siteUrl}/logo.png`, // Ensure this image exists and is optimized
        width: 1200,
        height: 630,
        alt: `${siteName} - Online Shopping`,
      },
    ],
    locale: "en_PK",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} - Shop Beauty, Fashion & More`,
    description: description,
    images: [
      {
        url: `${siteUrl}/logo.png`, // Ensure this image exists
        width: 1200,
        height: 630,
        alt: `${siteName} - Online Shopping`,
      },
    ],
    creator: "@SaudSolutions",
    site: "@SaudSolutions",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function Home() {
  return (
    <>
      <Banner />
      <LatestSale />
      <BrowseRange />
      <section aria-labelledby="products-heading">
        <h1 id="products-heading" className="text-center text-2xl font-bold mb-8">
          Our Products
        </h1>
        <Products />
      </section>
      <BrandProductsSection />
      <Bannerfree />
      <FaceAndSkincareProducts />
      <Feature />
      <TrendyProductsSection />
      <Feature1 />
      <ImageGrid />
    </>
  );
}