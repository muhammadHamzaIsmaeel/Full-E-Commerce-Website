"use client";  // ✅ This tells Next.js this is a client component

import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useWishlist } from "../context/WishlistContext";
import { MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  // 🛠️ Handle Remove with Toast Notification
  const handleRemove = (productId: string, productTitle: string) => {
    removeFromWishlist(productId);  // ✅ Remove item from wishlist
    toast.success(`${productTitle} removed from wishlist!`);  // ✅ Show toast
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />  {/* ✅ Toast will appear in the top-right */}
      <div className="w-full">
        {/* Hero Section */}
        <div className="relative w-full lg:h-[50vh] md:h-[30vh] h-[30vh]">
          <Image
            src="/shop/banner11.png"
            alt="Shop Banner"
            fill
            style={{ objectFit: "cover" }}
            className=""
            loading="lazy"
            aria-label="Shop Banner"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-gray-950">
            <Link href="/" aria-label="Go to Home">
              <Image
                src="/logo.png"
                alt="Furniro Logo"
                width={32}
                height={20}
                className="w-12 h-8"
                loading="lazy"
              />
            </Link>
            <h1 className="text-4xl font-bold">WishList</h1> {/* Changed to h1 for better accessibility */}
            <h2 className="flex items-center text-sm md:text-xl mb-4 space-x-1">
              <Link className="font-bold text-xl" href="/" aria-label="Home">
                Home
              </Link>
              <MdKeyboardArrowRight className="mt-2 text-2xl" aria-hidden="true" />
              <a className="mt-2 md:mt-0" href="#" aria-label="Shop">
                WishList
              </a>
            </h2>
          </div>
        </div>
      </div>
      <div className="p-6">
        {wishlist.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div key={product._id} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
                <Image
                  src={urlFor(product.productImage).width(1000).height(1000).url()}
                  alt={`Image of ${product.title}`}
                  width={400}
                  height={400}
                  loading="lazy"
                />
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-sm text-gray-600">{product.shortDescription}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-red-500 font-bold">Rs.{product.price}</span>
                  <button
                    onClick={() => handleRemove(product._id, product.title)}  // ✅ Use handleRemove function
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