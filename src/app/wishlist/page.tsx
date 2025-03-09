"use client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useWishlist } from "../context/WishlistContext";
import { MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import Head from "next/head";
import { Product, WithContext } from "schema-dts";
import React, { memo } from "react";

const truncateTitle = (title: string, maxWords: number) => {
  const words = title.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + "...";
  }
  return title;
};

const WishlistPage = memo(() => {
  const { wishlist, removeFromWishlist } = useWishlist();

  const handleRemove = (productId: string, productTitle: string) => {
    removeFromWishlist(productId);
    toast.success(`${productTitle} removed from wishlist!`);
  };

  const productSchema: WithContext<Product>[] = wishlist.map((product) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.shortDescription,
    image: urlFor(product.productImage).url(),
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "PKR",
      availability: "https://schema.org/InStock",
    },
  }));

  return (
    <>
      <Head>
        <title>Wishlist - Saud Solution</title>
        <meta
          name="description"
          content="View your wishlist at Saud Solution. Save your favorite products for later."
        />
        <meta
          name="keywords"
          content="wishlist, Saud Solution, favorite products, save for later"
        />
        <meta property="og:title" content="Wishlist - Saud Solution" />
        <meta
          property="og:description"
          content="View your wishlist at Saud Solution. Save your favorite products for later."
        />
        <meta property="og:image" content="/shop/banner11.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Wishlist - Saud Solution" />
        <meta
          name="twitter:description"
          content="View your wishlist at Saud Solution. Save your favorite products for later."
        />
        <meta name="twitter:image" content="/shop/banner11.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      </Head>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full">
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
                alt="Saud Solution Logo"
                width={32}
                height={20}
                className="w-12 h-8"
                loading="lazy"
              />
            </Link>
            <h1 className="text-4xl font-bold">WishList</h1>
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
                <h2 className="text-lg font-semibold">
                  {truncateTitle(product.title, 3)}
                </h2>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-red-500 font-bold">Rs.{product.price}</span>
                  <button
                    onClick={() => handleRemove(product._id, product.title)}
                    className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
                {/* "View Details" Button */}
                <Link href={`/product/${product._id}`} legacyBehavior>
                  <a className="bg-white hover:bg-yellow-500 text-yellow-600 hover:text-white px-6 py-2 mt-4 font-medium rounded shadow block text-center">
                    View Details
                  </a>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
});

WishlistPage.displayName = "WishlistPage";
export default WishlistPage;