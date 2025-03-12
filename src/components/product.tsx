"use client";

import React, { useCallback, useEffect, useState } from "react";
import { IoMdShare } from "react-icons/io";
import { MdCompareArrows } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import toast, { Toaster } from "react-hot-toast";
import { useWishlist } from "@/app/context/WishlistContext";
import { FaTruck } from "react-icons/fa";

interface IProduct {
  _id: string;
  title: string;
  shortDescription: string;
  price: string;
  oldPrice?: string;
  dicountPercentage?: string;
  isNew?: boolean;
  productImage: string;
  freeDelivery?: boolean;
}

interface ProductsProps {
  tags?: string[]; // Only tags are needed
  excludeId?: string; // Exclude the current product ID
}

export default function Products({ tags, excludeId }: ProductsProps) {
  const [data, setData] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [animated, setAnimated] = useState(false);

  const { addToWishlist } = useWishlist();

  // Handle share functionality
  const handleShare = useCallback(async (productId: string) => {
    const productLink = `${window.location.origin}/product/${productId}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Check out this product!",
          text: "I found this amazing product and thought you might like it.",
          url: productLink,
        });
        toast.success("Product shared successfully!", {
          position: "top-right",
          duration: 3000,
          style: {
            background: "#4ade80",
            color: "white",
          },
        });
      } else {
        await navigator.clipboard.writeText(productLink);
        toast.success("Link copied to clipboard!", {
          position: "top-right",
          duration: 3000,
          style: {
            background: "#4ade80",
            color: "white",
          },
        });
      }
    } catch (err) {
      console.error("Error sharing product:", err);
      toast.error("Failed to share product.", {
        position: "top-right",
        duration: 3000,
        style: {
          background: "#f87171",
          color: "white",
        },
      });
    }
  }, []);

  // Handle wishlist functionality
  const handleWishlist = useCallback(
    (product: IProduct) => {
      if (!product) {
        toast.error("Invalid product data.", {
          position: "top-right",
          duration: 3000,
          style: {
            background: "#f87171",
            color: "white",
          },
        });
        return;
      }

      try {
        addToWishlist(product);
        toast.success("Product added to wishlist!", {
          position: "top-right",
          duration: 3000,
          style: {
            background: "#B88E2F",
            color: "white",
          },
        });
      } catch (err) {
        console.error("Error handling wishlist:", err);
        toast.error("Failed to add product to wishlist.", {
          position: "top-right",
          duration: 3000,
          style: {
            background: "#f87171",
            color: "white",
          },
        });
      }
    },
    [addToWishlist]
  );

  // Fetch products from Sanity with filtering
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let query = '*[_type == "product"';
        if (tags && tags.length > 0) {
          query += ` && (${tags.map((tag) => `"${tag}" in tags`).join(" || ")})`;
        }
        if (excludeId) {
          query += ` && _id != "${excludeId}"`;
        }
        query += `]{_id, title, shortDescription, dicountPercentage, price, oldPrice, isNew, productImage, freeDelivery}[0...10]`;

        const products: IProduct[] = await client.fetch(query);
        setData(products);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [tags, excludeId]);

  // Trigger animation on component mount
  useEffect(() => {
    if (!isLoading && !error) {
      setAnimated(true);
    }
  }, [isLoading, error]);

  // Loading and error states
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="text-center py-12">
        <p>No related products found.</p>
      </div>
    );
  }

  return (
    <div className="py-12 px-8 lg:px-16">
      <Toaster />
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto ${
          animated ? "animate-fade-in-bottom" : ""
        }`}
        role="list"
      >
        {data.map((item) => (
          <div
            key={item._id}
            className="product-card relative bg-gray-100 rounded overflow-hidden group"
            role="listitem"
            aria-label={`Product: ${item.title}`}
          >
            {/* Product Image */}
            <Image
              src={urlFor(item.productImage).width(1000).height(1000).url()}
              alt={`Image of ${item.title}`}
              width={1000}
              height={1000}
              loading="lazy"
              priority={false}
              className=" object-cover"
            />

            {/* Discount, New, and Free Delivery Tags */}
            {item.dicountPercentage && (
              <span
                className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold flex items-center justify-center"
                style={{
                  width: "33px",
                  height: "33px",
                  borderRadius: "50%",
                }}
                aria-label={`Discount: ${item.dicountPercentage}%`}
              >
                {item.dicountPercentage}%
              </span>
            )}

            {item.isNew && (
              <span
                className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold flex items-center justify-center"
                style={{
                  width: "33px",
                  height: "33px",
                  borderRadius: "50%",
                }}
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
                {item.title}
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
              <Link href={`/product/${item._id}`} legacyBehavior>
                <a
                  className="bg-white hover:bg-yellow-500 text-yellow-600 hover:text-white px-6 py-2 mb-2 font-medium rounded shadow"
                  aria-label={`View details of ${item.title}`}
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
                <Link href={`/comparison/${item._id}`} legacyBehavior>
                  <a
                    className="flex items-center gap-1 hover:text-red-500 text-white"
                    aria-label={`Compare ${item.title}`}
                  >
                    <MdCompareArrows />
                    <span>Compare</span>
                  </a>
                </Link>
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
      <div className="mt-8 text-center">
        <Link href="/shop" legacyBehavior>
          <a
            className="px-10 py-2 text-yellow-600 border-2 border-yellow-600 hover:bg-yellow-500 hover:text-white font-medium rounded transition"
            aria-label="Show more products"
          >
            Show More
          </a>
        </Link>
      </div>
    </div>
  );
}