// src/app/context/WishlistContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

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

export const WishlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Memoize wishlistCount using useMemo, so it only updates when the wishlist changes.
  const wishlistCount = useMemo(() => wishlist.length, [wishlist]);

  // Load wishlist from localStorage on initial render using useCallback
  const initializeWishlist = useCallback(() => {
    try {
      const storedWishlist = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      ) as Product[];
      setWishlist(storedWishlist);
    } catch (error) {
      console.error("Error parsing wishlist from localStorage:", error);
      // Consider setting wishlist to an empty array in case of parsing failure.
      setWishlist([]);
    }
  }, []);

  useEffect(() => {
    initializeWishlist();
  }, [initializeWishlist]);

  // Use useCallback for addToWishlist and removeFromWishlist to prevent unnecessary re-renders of components that use them.
  const addToWishlist = useCallback((product: Product) => {
    setWishlist((prevWishlist) => {
      const isAlreadyInWishlist = prevWishlist.some(
        (item) => item._id === product._id
      );
      if (isAlreadyInWishlist) {
        return prevWishlist; // Do nothing if the product is already in the wishlist
      }
      const updatedWishlist = [...prevWishlist, product];
      try {
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      } catch (error) {
        console.error("Error saving wishlist to localStorage:", error);
        // Implement fallback mechanism if saving to localStorage fails
      }
      return updatedWishlist;
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = prevWishlist.filter(
        (item) => item._id !== productId
      );
      try {
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      } catch (error) {
        console.error("Error saving wishlist to localStorage:", error);
        // Implement fallback mechanism if saving to localStorage fails
      }
      return updatedWishlist;
    });
  }, []);

  const value = useMemo(
    () => ({
      wishlist,
      wishlistCount,
      addToWishlist,
      removeFromWishlist,
    }),
    [wishlist, wishlistCount, addToWishlist, removeFromWishlist]
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
};