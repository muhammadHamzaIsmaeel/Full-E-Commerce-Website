"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface IProduct {
  id: string;
  _id: string;
  title: string;
  shortDescription: string;
  price: string;
  oldPrice?: string;
  dicountPercentage?: string;
  isNew?: true;
  productImage: string;
  tag: string;
  category: string;
  brandName: string;
}

export default function BrandProductsSection() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hardcoded brand name and logo
  const brandName = "CeraVe";
  const brandLogo = "/cerave.png"; // Replace with the actual path to the logo

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts: IProduct[] = await client.fetch(
          `*[_type == "product" && brandName == "Cerave"]{
            _id, id, title, tag, category, shortDescription, 
            dicountPercentage, price, oldPrice, isNew, productImage,
            brandName
          }`
        );

        console.log("Fetched Products:", fetchedProducts); // Debugging ke liye

        if (!fetchedProducts.length) {
          setError("No products found for this brand.");
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
  }, [brandName]);

  if (isLoading) return <div className="text-center">Loading products...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!products.length)
    return <div className="text-center">No products found.</div>;

  return (
    <section
      className="relative bg-[#219ebc] bg-opacity-75 pb-1 mt-6 pt-"
      aria-label="Trendy Products Section"
    >
      <h2 className="text-3xl font-bold py-7 text-center text-blue-950 mt-4">{brandName}</h2>
      <div className="container mx-auto px-0">
        {/* Brand Section */}
        <div className="flex flex-col md:flex-row items-center mb-12">
          <div className="md:w-1/4 flex flex-col items-center  md:items-start mb-4 md:mb-0">
            <Image
              src={brandLogo}
              alt={`${brandName} Logo`}
              width={150}
              height={150}
              className="rounded-full bg-white p-1 shadow-md"
              style={{ objectFit: "cover" }}
            />
            <h2 className="text-2xl font-bold text-white mt-4">{brandName}</h2>
          </div>

          {/* Products Section (Carousel) */}
          <div className="md:w-3/4 relative">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent className="p-0">
                {products.map((product) => (
                  <CarouselItem
                    key={product._id}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-0">
                      <Card className="m-0 h-full">
                        <CardContent className="p-0 h-full  bg-[#caf0f8] rounded-lg flex flex-col">
                          {/* Wrap the entire card content in a Link */}
                          <Link
                            href={`/product/${product._id}`}
                            key={product._id}
                            legacyBehavior
                          >
                            <a className="relative rounded-lg pt-6 overflow-hidden flex-grow block">
                              {/* Discount Badge (Top Right) */}
                              {product.dicountPercentage && (
                                <div className="absolute z-20 top-8 right-3 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                                  -{product.dicountPercentage}%
                                </div>
                              )}
                              {product.isNew && (
                                <div className="absolute z-20 top-8 right-3 bg-green-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                                  {product.isNew}
                                </div>
                              )}

                              {/* Product Image */}
                              <div className="relative h-48">
                                <Image
                                  src={urlFor(product.productImage).url()}
                                  alt={product.title}
                                  fill
                                  style={{ objectFit: "cover" }}
                                  className="absolute  rounded-lg top-0 left-0 w-full h-full object-cover"
                                />
                              </div>

                              {/* Product Details */}
                              <div className="p-4 flex flex-col justify-between h-full">
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                                    {product.title}
                                  </h3>
                                  <p className="text-gray-600 text-sm line-clamp-2">
                                    {product.shortDescription}
                                  </p>
                                </div>
                                <div className="mt-2 flex items-center justify-between">
                                  {product.oldPrice && (
                                    <span className="text-red-500 line-through text-sm">
                                      Rs. {product.oldPrice}
                                    </span>
                                  )}
                                  <span className="font-bold text-gray-900">
                                    Rs. {product.price}
                                  </span>
                                </div>
                              </div>
                            </a>
                          </Link>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors" />
              <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
