"use client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface IProduct {
  _id: string;
  title: string;
  shortDescription: string;
  price: string;
  oldPrice?: string;
  dicountPercentage?: string;
  isNew?: boolean;
  productImage: string;
}

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState<IProduct[]>([]);

  useEffect(() => {
    // Load wishlist from localStorage
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(storedWishlist);
  }, []);

  const handleRemoveFromWishlist = (productId: string) => {
    // Remove product from wishlist
    const updatedWishlist = wishlist.filter(
      (product) => product._id !== productId
    );
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    // Show toast notification
    toast.success("Product removed from wishlist!", {
      position: "top-right",
      duration: 3000,
      style: {
        background: "#f87171",
        color: "white",
      },
    });
  };

  return (
    <>
      {/* Toast Notification Container */}
      <Toaster />

      <div className="p-6">
        {wishlist.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div
                key={product._id}
                className="border rounded-lg p-4 shadow-md hover:shadow-lg transition"
              >
                <Image
                  src={urlFor(product.productImage)
                    .width(1000)
                    .height(1000)
                    .url()}
                  alt={`Image of ${product.title}`}
                  width={400}
                  height={400}
                  loading="lazy"
                />
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-sm text-gray-600">
                  {product.shortDescription}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-red-500 font-bold">
                    Rs.{product.price}
                  </span>
                  <button
                    onClick={() => handleRemoveFromWishlist(product._id)}
                    className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default WishlistPage;
