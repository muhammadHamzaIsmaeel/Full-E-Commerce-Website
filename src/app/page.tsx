import Banner from "@/components/banner";
import BrandProductsSection from "@/components/brandproducts";
import Feature from "@/components/button/feature";
import Feature1 from "@/components/button/feature1";
import BrowseRange from "@/components/category";
import FaceAndSkincareProducts from "@/components/FaceAndSkincareProducts";
import ImageGrid from "@/components/frame";
import Bannerfree from "@/components/FreeDeliveryScroll";
import TrendyProductsSection from "@/components/inspiration";
import Products from "@/components/product";
import RamzanSale from "@/components/ramzan";

export default function Home() {
  return (
    <>
      <Banner />
      <RamzanSale/>
      <BrowseRange />
      <div>
        <h1 className="text-center text-2xl font-bold mb-8">Our Products</h1>
        <Products />
      </div>
      <BrandProductsSection/>
      <Bannerfree/>
      <FaceAndSkincareProducts/>
      < Feature/>
      <TrendyProductsSection />
      < Feature1/>
      <ImageGrid />
    </>
  );
}
