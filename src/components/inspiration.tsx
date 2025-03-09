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
import { Button } from "@/components/ui/button";

interface IProduct {
  id: string;
  _id: string;
  title: string;
  price: string;
  oldPrice?: string;
  dicountPercentage?: string;
  isNew?: boolean;
  productImage: string;
  tag: string;
  category: string;
}

export default function TrendyProductsSection() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts: IProduct[] = await client.fetch(
          `*[_type == "product" && tranding == true]{
            _id, id, title, tag, category,
            dicountPercentage, price, oldPrice, isNew, productImage
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

  if (isLoading) return <div className="text-center">Loading products...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!products.length)
    return <div className="text-center">No products found.</div>;

  return (
    <section
      className="relative  h-[650px] md:h-[500px] w-full bg-cover bg-center flex flex-col md:flex-row items-center"
      aria-label="Trendy Products Section"
    >
      {/* Left Section */}
      <div className="md:pl-16 pl-4 py-5 w-full md:py-20 text-black space-y-4 md:space-y-6">
        <h1 className="md:text-4xl text-2xl font-bold text-gray-800 leading-tight">
          Trending Now: Must-Have Products
        </h1>
        <p className="md:text-lg lg:pr-16 text-gray-600">
          Discover the hottest products everyone&apos;s talking about. Shop the
          latest trends in fashion, electronics, beauty, and more!
        </p>
        <Link href="/shop" aria-label="Explore More">
          <Button
            className="bg-[#B88E2F] text-white mt-5 px-4 py-2 md:px-8 md:py-3 text-lg font-medium 
            hover:bg-[#c89b32] transition duration-300"
          >
            Explore More
          </Button>
        </Link>
      </div>

      {/* Right Section: Product Image Carousel */}
      <div className="relative flex items-center w-full md:w-2/3 justify-center mt-6 md:mt-0">
        <div className="w-[310px] md:w-[440px] lg:w-[870px] relative">
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
                      <CardContent className="p-0 bg-white rounded-lg h-full flex flex-col">
                        <Link
                          href={`/product/${product._id}`}
                          key={product._id}
                          legacyBehavior
                        >
                          <a className="relative rounded-lg pt-6 overflow-hidden flex-grow block">
                            {product.dicountPercentage && (
                              <div className="absolute z-20 top-8 right-3 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                                -{product.dicountPercentage}%
                              </div>
                            )}
                            {product.isNew && (
                              <div className="absolute z-20 top-8 right-3 bg-green-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                                NEW
                              </div>
                            )}

                            <div className="relative h-48">
                              <Image
                                src={urlFor(product.productImage).url()}
                                alt={product.title}
                                fill
                                style={{ objectFit: "cover" }}
                                className="absolute rounded-lg top-0 left-0 w-full h-full object-cover"
                              />
                            </div>

                            <div className="p-4 flex flex-col justify-between h-full">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                                  {product.title}
                                </h3>
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
    </section>
  );
}