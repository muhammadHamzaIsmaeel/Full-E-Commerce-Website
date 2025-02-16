"use client";

import React, { useEffect, useState } from "react";
import { IoMdShare } from "react-icons/io";
import { MdCompareArrows, MdKeyboardArrowRight } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";
import { useWishlist } from "@/app/context/WishlistContext";

interface IProduct {
  _id: string;
  title: string;
  shortDescription: string;
  price: string;
  oldPrice?: string;
  dicountPercentage?: string;
  isNew?: boolean; // Added isNew
  productImage: string;
}

export default function BedroomPage() {
  const [data, setData] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  // Function to handle sharing
  const handleShare = (productId: string) => {
    const productLink = `${window.location.origin}/product/${productId}`;

    // Check if the Web Share API is supported
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this product!",
          text: "I found this amazing product and thought you might like it.",
          url: productLink,
        })
        .then(() => {
          toast.success("Product shared successfully!", {
            position: "top-right",
            duration: 3000,
            style: {
              background: "#4ade80",
              color: "white",
            },
          });
        })
        .catch((error) => {
          console.error("Error sharing:", error);
          toast.error("Failed to share product.", {
            position: "top-right",
            duration: 3000,
            style: {
              background: "#f87171",
              color: "white",
            },
          });
        });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard
        .writeText(productLink)
        .then(() => {
          toast.success("Link copied to clipboard!", {
            position: "top-right",
            duration: 3000,
            style: {
              background: "#4ade80",
              color: "white",
            },
          });
        })
        .catch((error) => {
          console.error("Error copying to clipboard:", error);
          toast.error("Failed to copy link.", {
            position: "top-right",
            duration: 3000,
            style: {
              background: "#f87171",
              color: "white",
            },
          });
        });
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products: IProduct[] = await client.fetch(
          '*[_type == "product" && lower(category) == "Beauty"]{_id, title, shortDescription, dicountPercentage, price, oldPrice, isNew, productImage}'
        );
        setData(products);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <div className="text-center">Loading products...</div>;
  }

  if (!data.length) {
    return <div className="text-center">No products found.</div>;
  }

  return (
    <>
      <Toaster />

      <Head>
        <title>Beauty product - Saud Solution</title>
        <meta
          name="description"
          content="Discover our exclusive collection of bedroom furniture. High-quality products at affordable prices!"
        />
        <meta
          name="keywords"
          content="bedroom furniture, affordable furniture, high-quality bedroom products, modern bedroom decor"
        />
        <meta name="author" content="Saud Solution" />
      </Head>

      <div>
        {/* Hero Section */}
        <div className="relative w-full h-[50vh]">
        <Image
            src="/beauty.jpg"
            alt="Beauty Shop Banner"
            layout="fill"
            style={{ objectFit: 'cover', filter: 'blur(3px)', opacity: 0.7 }} 
            objectFit="cover"
            loading="lazy"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-gray-950">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Saud Solution Logo"
                width={3200}
                height={2000}
                className="w-12 h-9"
                loading="lazy"
              />
            </Link>
            <h4 className="text-4xl font-bold">Beauty</h4>
            <h5 className="flex items-center text-sm md:text-xl mb-4 space-x-1">
              <Link className="font-bold text-xl" href="/">
                Home
              </Link>
              <MdKeyboardArrowRight className="mt-2 text-2xl" />
              <span>Beauty</span>
            </h5>
          </div>
        </div>

        {/* Product Section */}
        <div className="py-12 px-8 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
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
            <a href="/shop">
              <button className="px-14 py-2 text-[#B88E2F] hover:bg-[#b88f2f90] font-medium rounded border-[#B88E2F] border-2 transition">
                Show More
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
