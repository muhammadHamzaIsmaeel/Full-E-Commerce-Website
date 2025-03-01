"use client";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { IProduct } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

export default function RamzanSale() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const query =
        '*[_type == "product" && "beauty" in category]{_id, title, dicountPercentage, price, oldPrice, isNew, productImage, freeDelivery, tags}';
      const products: IProduct[] = await client.fetch(query);
      setProducts(products);
    };

    fetchProducts();
  }, []);

  const plugin = Autoplay({ delay: 3000, stopOnInteraction: true });

  return (
    <div className="px-3 md:px-0 bg-gradient-to-r from-gray-50 to-gray-100 py-8 md:py-16">
      {/* Heading */}
      <h1 className="text-center text-3xl md:text-5xl font-extrabold mb-6 md:mb-12">
        <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
          🌙 Ramzan Sale - 40% Off 🎉
        </span>
        <span className="block text-sm md:text-lg text-gray-600 mt-1 md:mt-2">
          Celebrate the holy month with amazing discounts! 🛍
        </span>
      </h1>

      {/* Carousel */}
      <div className="container mx-auto px-2 md:px-4">
        <Carousel
          plugins={[plugin]}
          className="w-full relative"
          onMouseEnter={plugin.stop}
          onMouseLeave={plugin.reset}
        >
          {/* Gradient Overlay for Carousel */}
          <div className="absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

          <CarouselContent>
            {products.map((product) => (
              <CarouselItem key={product._id} className="basis-full sm:basis-1/2 md:basis-1/4">
                <Link href={`/product/${product._id}`}>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    {/* Product Image */}
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <img
                        src={urlFor(product.productImage)
                          .width(1000)
                          .height(1000)
                          .url()}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Discount Badge */}
                      {product.dicountPercentage && (
                        <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-red-600 text-white text-xs md:text-sm font-bold px-2 md:px-3 py-1 rounded-full">
                          {product.dicountPercentage}% Off
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="p-4 md:p-6">
                      <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 line-clamp-2 hover:text-red-600 transition-colors">
                        {product.title}
                      </h2>
                      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                        <span className="text-lg md:text-2xl font-bold text-gray-900">
                          Rs.{product.price}
                        </span>
                        {product.oldPrice && (
                          <span className="text-sm md:text-lg text-red-500 line-through">
                            Rs.{product.oldPrice}
                          </span>
                        )}
                      </div>
                      {/* Free Delivery Badge */}
                      {product.freeDelivery && (
                        <div className="inline-flex items-center gap-1 md:gap-2 bg-green-100 text-green-600 text-xs md:text-sm font-medium px-2 md:px-3 py-1 rounded-full">
                          <span>🚚</span>
                          <span>Free Delivery</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Custom Navigation Buttons */}
          <CarouselPrevious className="z-10 flex absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-orange-600/80 backdrop-blur-sm hover:bg-white/90 transition-colors rounded-full p-2 md:p-3 shadow-lg" />
          <CarouselNext className="z-10 flex absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-orange-600/80 backdrop-blur-sm hover:bg-white/90 transition-colors rounded-full p-2 md:p-3 shadow-lg" />
        </Carousel>
      </div>
    </div>
  );
}