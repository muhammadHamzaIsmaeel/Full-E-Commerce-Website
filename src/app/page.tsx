import Banner from "@/components/banner";
import BrowseRange from "@/components/category";
import ImageGrid from "@/components/frame";
import TrendyProductsSection from "@/components/inspiration";
import Products from "@/components/product";

export default function Home() {
  return (
    <>
      <Banner />
      <BrowseRange />
      <div>
        <h1 className="text-center text-2xl font-bold mb-8">Our Products</h1>
        <Products />
      </div>
      <TrendyProductsSection />
      <ImageGrid />
    </>
  );
}
