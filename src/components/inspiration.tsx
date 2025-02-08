"use client";

import { useState, useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

interface IProduct {
  id: string;
  _id: string;
  title: string;
  shortDescription: string;
  price: string;
  oldPrice?: string;
  discountPercentage?: string;
  isNew?: boolean;
  productImage: string;
  tag: string;
  category: string;
}

export default function TrendyProductsSection() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts: IProduct[] = await client.fetch(
          `*[_type == "product" && tranding == true]{
            _id, id, title, tag, category, shortDescription, 
            discountPercentage, price, oldPrice, isNew, productImage
          }`
        );

        if (!fetchedProducts.length) {
          setError("No trending products found.");
        } else {
          setProducts(fetchedProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length); // Loop back to the first slide
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length); // Loop back to the last slide
  };

  if (isLoading) return <div className="text-center">Loading products...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!products.length) return <div className="text-center">No products found.</div>;

  return (
    <section
      className="relative bg-[#FCF8F3] h-[490px] md:h-[570px] w-full bg-cover bg-center flex flex-col md:flex-row items-center"
      aria-label="Trendy Products Section"
    >
      {/* Left Section */}
      <div className="md:pl-16 pl-4 py-5 w-full md:py-20 text-black space-y-4 md:space-y-6">
        <h1 className="md:text-4xl text-2xl font-bold text-gray-800 leading-tight">
          50+ Beautiful Rooms Inspiration
        </h1>
        <p className="md:text-lg lg:pr-16 text-gray-600">
          Our designers have created a wide variety of beautiful room prototypes to inspire you.
        </p>
        <a href="/explore" aria-label="Explore More">
          <button
            className="bg-[#B88E2F] text-white mt-5 px-4 py-2 md:px-8 md:py-3 text-lg font-medium 
            hover:bg-[#c89b32] transition duration-300"
          >
            Explore More
          </button>
        </a>
      </div>

      {/* Right Section: Product Image Slider */}
      <div className="relative flex items-center w-full md:w-2/3 justify-center mt-6 md:mt-0">
        {/* Image Slider */}
        <div className="relative w-full md:w-[440px] lg:w-[850px] overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 35}%)` }}
            role="list"
          >
            {products.map((product, index) => (
              <div
                key={product._id}
                className="relative w-44 h-52 md:w-[300px] md:h-[460px] lg:w-[370px] lg:h-[520px] mx-2 flex-shrink-0"
                role="listitem"
                aria-label={`Product: ${product.title}`}
              >
                <Image
                  src={urlFor(product.productImage).width(400).height(400).url()}
                  alt={`Product: ${product.title}`}
                  className="w-full h-full rounded-sm object-cover"
                  loading="lazy"
                  width={400} // Optimized for performance
                  height={400} // Optimized for performance
                />
                <div
                  className="absolute bottom-4 left-4 bg-white bg-opacity-70 text-black text-sm 
                  md:w-36 md:h-20 p-2 md:p-4 font-light"
                >
                  {String(index + 1).padStart(2, "0")} - {product.category} <br />
                  <span className="font-bold text-sm md:text-lg">{product.tag}</span>
                </div>
                <a href={`/product/${product._id}`} aria-label={`View ${product.title}`}>
                  <div
                    className="absolute cursor-pointer bottom-4 left-[110px] md:left-40 p-1 md:p-2 bg-[#B88E2F] 
                     shadow hover:bg-[#c89b32] transition"
                  >
                    <FaArrowRightLong aria-hidden="true" />
                  </div>
                </a>
              </div>
            ))}
          </div>

          {/* Left Arrow Button */}
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute text-xl left-5 top-1/2 transform -translate-y-1/2 bg-white text-[#B88E2F] 
            md:py-2 md:px-4 px-3 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
          >
            ❮
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute text-xl right-5 top-1/2 transform -translate-y-1/2 bg-white text-[#B88E2F] 
            md:py-2 md:px-4 px-3 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
          >
            ❯
          </button>
        </div>
      </div>
    </section>
  );
}