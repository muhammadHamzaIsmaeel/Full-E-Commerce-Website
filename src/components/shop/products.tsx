import React, { useCallback } from "react";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { IProduct } from "@/types";
import { IoMdShare } from "react-icons/io";
import { MdCompareArrows } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import { useWishlist } from "@/app/context/WishlistContext";
import { FaTruck } from "react-icons/fa"; // Import the truck icon

interface ProductGridProps {
  products: IProduct[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
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

  return (
    <div className="grid px-4 lg:px-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <Toaster />
      {products.map((item) => (
        <div
          key={item._id}
          className="relative group bg-gray-100 overflow-hidden"
        >
          {/* Product Image */}
          <Image
            src={urlFor(item.productImage).width(1000).height(1000).url()}
            alt={`Image of ${item.title}`}
            width={1000}
            height={1000}
            className="object-cover"
            loading="lazy"
            priority={false} // Only load above-the-fold images eagerly
          />

          {/* Discount Badge */}
          {item.dicountPercentage && (
            <span
              className="absolute top-4 right-4 bg-[#E97171] text-white text-xs font-bold py-2 px-4 rounded-full flex items-center justify-center"
              style={{
                width: "40px",
                height: "40px",
                textAlign: "center",
                lineHeight: "40px",
              }}
            >
              {item.dicountPercentage}%
            </span>
          )}

          {/* New Badge */}
          {item.isNew && (
            <span
              className="absolute top-4 right-4 bg-[#2EC1AC] text-white text-xs font-bold py-2 px-4 rounded-full flex items-center justify-center"
              style={{
                width: "40px",
                height: "40px",
                textAlign: "center",
                lineHeight: "40px",
              }}
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

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Link href={`/product/${item._id}`} legacyBehavior>
              <a className="bg-white hover:bg-yellow-500 text-yellow-600 hover:text-white px-6 py-2 mb-2 font-medium rounded shadow">
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
                <a>
                  <button
                    className="flex items-center gap-1 hover:text-red-500 text-white"
                    aria-label={`Compare ${item.title}`}
                  >
                    <MdCompareArrows />
                    <span>Compare</span>
                  </button>
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
  );
};

export default ProductGrid;