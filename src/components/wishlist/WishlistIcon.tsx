"use client";

import React from "react";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { useWishlist } from "@/app/context/WishlistContext";

const WishlistIcon = () => {
  const { wishlistCount } = useWishlist();

  return (
    <Link href="/wishlist" passHref>
      <button className="text-gray-600 mt-2 hover:text-gray-800 relative" aria-label="Wishlist">
        <FaRegHeart size={24} />
        {/* Wishlist Count Badge */}
        {wishlistCount > 0 && (
          <span className="absolute bottom-3 left-4 opacity-90 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
            {wishlistCount}
          </span>
        )}
      </button>
    </Link>
  );
};

export default WishlistIcon;
