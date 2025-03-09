import Head from 'next/head';
import dynamic from 'next/dynamic';
import Banner from "@/components/banner";
import RamzanSale from "@/components/ramzan";

// Lazy load other components
const BrowseRange = dynamic(() => import("@/components/category"));
const Products = dynamic(() => import("@/components/product"));
const BrandProductsSection = dynamic(() => import("@/components/brandproducts"));
const Bannerfree = dynamic(() => import("@/components/FreeDeliveryScroll"));
const FaceAndSkincareProducts = dynamic(() => import("@/components/FaceAndSkincareProducts"));
const Feature = dynamic(() => import("@/components/button/feature"));
const TrendyProductsSection = dynamic(() => import("@/components/inspiration"));
const Feature1 = dynamic(() => import("@/components/button/feature1"));
const ImageGrid = dynamic(() => import("@/components/frame"));

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Saud Solutions",
    "url": "https://saudsolutions.com",
    "description": "Discover the best products at Your Brand Name. Shop our exclusive collection of trendy, high-quality items with free delivery and great discounts.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://saudsolutions.com/search?q=cerave",
      "query-input": "required name=cerave"
    }
  };

  return (
    <>
      <Head>
        <title>Saud Solutions - Shop the Best Products Online</title>
        <meta name="description" content="Discover the best products at Saud solutions. Shop our exclusive collection of trendy, high-quality items with free delivery and great discounts." />
        <meta name="keywords" content="online shopping, trendy products, skincare, face care, brand products, ramzan sale, free delivery" />
        <meta name="author" content="Saud solutions" />
        <meta property="og:title" content="Saud solutions - Shop the Best Products Online" />
        <meta property="og:description" content="Discover the best products at Saud solutions. Shop our exclusive collection of trendy, high-quality items with free delivery and great discounts." />
        <meta property="og:image" content="https://saudsolutions.com/logo.png" />
        <meta property="og:url" content="https://saudsolutions.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Saud solutions - Shop the Best Products Online" />
        <meta name="twitter:description" content="Discover the best products at Saud solutions. Shop our exclusive collection of trendy, high-quality items with free delivery and great discounts." />
        <meta name="twitter:image" content="https://saudsolutions.com/logo.png" />
        <link rel="canonical" href="https://saudsolutions.com" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>

      {/* Priority Components (Loaded First) */}
      <Banner />
      <RamzanSale />

      {/* Lazy Loaded Components */}
      <BrowseRange />
      <div>
        <h1 className="text-center text-2xl font-bold mb-8">Our Products</h1>
        <Products />
      </div>
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