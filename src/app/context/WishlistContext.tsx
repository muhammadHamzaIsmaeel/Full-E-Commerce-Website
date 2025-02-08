"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface Product {
  _id: string;
  title: string;
  shortDescription: string;
  price: string;
  oldPrice?: string;
  dicountPercentage?: string;
  isNew?: boolean;
  productImage: string;
}

interface WishlistContextType {
  wishlist: Product[];
  wishlistCount: number;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  wishlistCount: 0,
  addToWishlist: () => {},
  removeFromWishlist: () => {},
});

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(storedWishlist);
    setWishlistCount(storedWishlist.length);
  }, []);

  // Add product to wishlist
  const addToWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      const isAlreadyInWishlist = prevWishlist.some((item) => item._id === product._id);
      if (isAlreadyInWishlist) {
        return prevWishlist; // Do nothing if the product is already in the wishlist
      }
      const updatedWishlist = [...prevWishlist, product];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setWishlistCount(updatedWishlist.length);
      return updatedWishlist;
    });
  };

  // Remove product from wishlist
  const removeFromWishlist = (productId: string) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = prevWishlist.filter((item) => item._id !== productId);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setWishlistCount(updatedWishlist.length);
      return updatedWishlist;
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, wishlistCount, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};