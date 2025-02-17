"use client";

import React, { useEffect, useState } from "react";
import { IoMdShare } from "react-icons/io";
import { MdCompareArrows } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import toast, { Toaster } from "react-hot-toast";
import { useWishlist } from "@/app/context/WishlistContext";
import { FaTruck } from "react-icons/fa"; // Import the truck icon

interface IProduct {
  _id: string;
  title: string;
  shortDescription: string;
  price: string;
  oldPrice?: string;
  dicountPercentage?: string;
  isNew?: boolean;
  productImage: string;
  freeDelivery?: boolean; // Add freeDelivery property
}

export default function Products() {
  const [data, setData] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use the useWishlist hook to access wishlist functions
  const { addToWishlist } = useWishlist();

  // Handle wishlist functionality
  const handleWishlist = (product: IProduct) => {
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
      addToWishlist(product); // Use the addToWishlist function from context
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
  };

  // Handle sharing functionality
  const handleShare = async (productId: string) => {
    const productLink = `${window.location.origin}/product/${productId}`;

    try {
      // Check if the Web Share API is supported
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
        // Fallback for browsers that don't support the Web Share API
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
  };

  // Fetch products from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products: IProduct[] = await client.fetch(
          '*[_type == "product"][0...8]{_id, title, shortDescription, dicountPercentage, price, oldPrice, isNew, productImage, freeDelivery}' // Fetch the freeDelivery property
        );
        setData(products);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
        <p>No products found.</p>
      </div>
    );
  }

  return (
    <div className="py-12 px-8 lg:px-16">
      <Toaster />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
        role="list"
      >
        {data.map((item) => (
          <div
            key={item._id}
            className="relative bg-gray-100 rounded overflow-hidden group"
            role="listitem"
            aria-label={`Product: ${item.title}`}
          >
            <Image
              src={urlFor(item.productImage).width(1000).height(1000).url()}
              alt={`Image of ${item.title}`}
              width={1000}
              height={1000}
              loading="lazy"
              priority={false} // Optimize performance by lazy loading images
            />

            {item.dicountPercentage && (
              <span
                className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold flex items-center justify-center"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                }}
                aria-label={`Discount: ${item.dicountPercentage}%`}
              >
                %{item.dicountPercentage}
              </span>
            )}

            {item.isNew && (
              <span
                className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold flex items-center justify-center"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                }}
                aria-label="New Product"
              >
                NEW
              </span>
            )}

            {/* Free Delivery Tag */}
            {item.freeDelivery && (
              <div className="absolute top-4 left-4 bg-indigo-500 text-white text-xs font-bold py-1 px-2 rounded-md flex items-center space-x-1">
                <FaTruck />
                <span>Free Delivery</span>
              </div>
            )}

            {/* Product Details */}
            <div className="p-4">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.shortDescription}</p>
              <div className="mt-2 flex items-center space-x-2">
                <span className="font-bold">Rs. {item.price}</span>
                {item.oldPrice && (
                  <span className="text-gray-400 line-through text-sm">
                    Rs. {item.oldPrice}
                  </span>
                )}
              </div>
            </div>

            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Link href={`/product/${item._id}`} legacyBehavior>
                <a
                  className="bg-white hover:bg-yellow-500 text-yellow-600 hover:text-white px-6 py-2 mb-2 font-medium rounded shadow"
                  aria-label={`View details of ${item.title}`}
                >
                  View Details
                </a>
              </Link>
              <div className="flex space-x-4">
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