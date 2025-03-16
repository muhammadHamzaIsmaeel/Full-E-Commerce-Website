// src/app/brand/[brandName]/page.tsx
"use client";

import { useParams } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { client } from '@/sanity/lib/client';
import { urlFor } from "@/sanity/lib/image";
import Image from 'next/image';
import Link from 'next/link';
import { FaTruck, FaRegHeart } from 'react-icons/fa';
import { IoMdShare } from 'react-icons/io';


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
  freeDelivery?: boolean;
}

export default function BrandPage() {
  const { brandName } = useParams();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!brandName) return;

      try {
        const fetchedProducts: IProduct[] = await client.fetch(
          `*[_type == "product" && brandName == "${brandName}"]{
            _id, id, title, tag, category, shortDescription,
            dicountPercentage, price, oldPrice, isNew, productImage,
            brandName, freeDelivery
          }`
        );

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
        setAnimated(true);
      }
    };

    fetchProducts();
  }, [brandName]);

  const handleShare = (productId: string) => {
    // Implement your share logic here
    console.log(`Sharing product with ID: ${productId}`);
  };

  const handleWishlist = (product: IProduct) => {
    // Implement your wishlist logic here
    console.log(`Adding product to wishlist: ${product.title}`);
  };

  // Memoize products to prevent unnecessary re-renders
  const memoizedProducts = useMemo(() => products, [products]);

  if (isLoading) return <div className="text-center">Loading products...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!memoizedProducts.length) return <div className="text-center">No products found.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        {brandName}
      </h1>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto ${
          animated ? "animate-fade-in-bottom" : ""
        }`}
        role="list"
      >
        {memoizedProducts.map((item) => (
          <div
            key={item._id}
            className="product-card relative bg-gray-100 rounded overflow-hidden group"
            role="listitem"
            aria-label={`Product: ${item.title}`}
          >
            {/* Product Image */}
             <Link href={`/product/${item._id}`} aria-label={`View details for ${item.title}`}>
              <Image
                src={urlFor(item.productImage).width(500).height(500).quality(75).url()}  // Optimized image size and quality
                alt={item.title}
                width={500}
                height={500}
                loading="lazy"
                className="object-cover transition-transform duration-300 transform group-hover:scale-105"
              />
            </Link>

            {/* Discount, New, and Free Delivery Tags */}
            {item.dicountPercentage && (
              <span
                className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold flex items-center justify-center w-8 h-8 rounded-full"
                aria-label={`Discount: ${item.dicountPercentage}%`}
              >
                {item.dicountPercentage}%
              </span>
            )}

            {item.isNew && (
              <span
                className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold flex items-center justify-center w-8 h-8 rounded-full"
                aria-label="New Product"
              >
                NEW
              </span>
            )}

            {item.freeDelivery && (
              <div className="absolute top-4 left-4 bg-indigo-500 text-white text-xs font-bold py-1 px-2 rounded-md flex items-center space-x-1">
                <FaTruck />
                <span>Free Delivery</span>
              </div>
            )}

            {/* Product Details */}
            <div className="p-4">
              <h3 className="font-semibold text-lg line-clamp-2" title={item.title}>
              <Link href={`/product/${item._id}`} aria-label={`View details for ${item.title}`} className="hover:text-blue-600">
                {item.title}
                </Link>
              </h3>
              <p className="text-gray-500 text-sm line-clamp-1" title={item.shortDescription}>
                {item.shortDescription}
              </p>
              <div className="mt-2 flex items-center space-x-2">
                <span className="font-bold">Rs. {item.price}</span>
                {item.oldPrice && (
                  <span className="text-gray-400 line-through text-sm">
                    Rs. {item.oldPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Hover Overlay */}
            <div className="hover-overlay">
              <Link href={`/product/${item._id}`} legacyBehavior aria-label={`View details for ${item.title}`}>
                <a
                  className="bg-white hover:bg-yellow-500 text-yellow-600 hover:text-white px-6 py-2 mb-2 font-medium rounded shadow"
                  aria-label={`View details for ${item.title}`}
                >
                  View Details
                </a>
              </Link>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleShare(item._id)}
                  className="flex items-center gap-1 hover:text-red-500 text-white"
                  aria-label={`Share ${item.title}`}
                >
                  <IoMdShare />
                  <span>Share</span>
                </button>
        
                <button
                  onClick={() => handleWishlist(item)}
                  className="flex items-center gap-1 text-white hover:text-red-500"
                  aria-label={`Add ${item.title} to wishlist`}
                >
                  <FaRegHeart />
                  <span>Like</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}