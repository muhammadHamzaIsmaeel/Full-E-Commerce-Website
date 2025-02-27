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
  price: string;
  oldPrice?: string;
  dicountPercentage?: string;
  isNew?: boolean;
  productImage: string;
  tag: string;
  category: string;
  brandName: string;
  tags?: string[];
}

export default function FaceAndSkincareProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const query = `*[_type == "product" && ("Skin Care" in tags || "face" in tags || "Face" in tags || "Men's Care" in tags || "Personal Care" in tags)]{
            _id, id, title, tag, category, 
            dicountPercentage, price, oldPrice, isNew, productImage,
            brandName, tags
          }`;
      const fetchedProducts: IProduct[] = await client.fetch(query);

      if (!fetchedProducts.length) {
        setError("No products found with 'skincare' or 'face' tags.");
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

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isLoading) return <div className="text-center">Loading products...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!products.length)
    return (
      <div className="text-center">No products found with specified tags.</div>
    );

  return (
    <section
      className="relative bg-[#f4acb7] py-9"
      aria-label="Skincare and Face Products"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold py-7 text-center text-blue-950 mt-4">
          Face and Skincare Products
        </h2>
        <div className="flex flex-col md:flex-row md:space-x-4 items-center mb-12">
          {/* Informative Text (Left Side) */}
          <div className="md:w-1/4 flex flex-col items-center md:items-start mb-4 md:mb-0 text-center md:text-left">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              About Skincare
            </h3>
            <p className="text-gray-600 text-md">
              Discover our curated selection of face and skincare products. Find
              the perfect solutions for a healthy and radiant complexion.
            </p>
            <p className="text-gray-600 text-md mt-2">
              Explore our range and transform your skincare routine today!
            </p>
          </div>

          {/* Products Section (Carousel - Right Side) */}
          <div className="w-[310px] md:w-3/4 relative">
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
                        <CardContent className="p-0 bg-[#ffe5d9] rounded-lg h-full flex flex-col">
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
      </div>
    </section>
  );
}