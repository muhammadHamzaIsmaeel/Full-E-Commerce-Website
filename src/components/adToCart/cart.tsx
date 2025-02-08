"use client";

import { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoCartOutline, IoClose } from "react-icons/io5";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useLocalStorage } from "@/app/context/CartContext";
import Link from "next/link";

interface CartItem {
  _id: string;
  productImage: string;
  title: string;
  price: number;
  quantity: number;
}

export default function AddToCart() {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("cart", []);

  // Function to fetch cart from localStorage
  const fetchCartFromStorage = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
  };

  useEffect(() => {
    fetchCartFromStorage();

    // Listen for `storage` events to update the cart when changed elsewhere
    const handleStorageChange = () => fetchCartFromStorage();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Remove item from cart using index
  const removeFromCart = (productIndex: number) => {
    setCartItems((prevCart) => {
      const updatedCart = prevCart.filter((_, index) => index !== productIndex);
      return updatedCart;
    });
  };

  // Get image URL from Sanity
  const getImageUrl = (image: string) => {
    try {
      return urlFor(image).url();
    } catch (error) {
      console.error("Error generating image URL:", error);
      return "/placeholder-image.png"; // Fallback image
    }
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <button className="relative mt-2">
            <IoCartOutline size={24} />
            {cartItems.length > 0 && (
              <span className="absolute bottom-3 left-4 opacity-90 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader className="flex">
            <SheetTitle className="text-lg font-semibold">
              Shopping Cart
            </SheetTitle>
          </SheetHeader>

          <div className="mt-6">
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <>
                {/* Scrollable Area for Cart Items */}
                <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-md"
                    >
                      <Image
                        src={getImageUrl(item.productImage)}
                        alt={item.title}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-md"
                        loading="lazy"
                      />
                      <div className="flex-1 mx-4">
                        <h4 className="text-base font-semibold">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {item.quantity} x Rs.{" "}
                          {Number(item.price).toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-gray-400 hover:text-gray-700"
                      >
                        <IoClose size={20} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Subtotal and Buttons */}
                <div className="mt-6 border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <p>Subtotal</p>
                    <p>
                      Rs.{" "}
                      {cartItems
                        .reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        )
                        .toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-between space-x-2">
                  <Link
                    href="/cart"
                    className="flex-1 bg-gray-200 py-2 text-center rounded-md text-sm font-medium"
                  >
                    Cart
                  </Link>
                  <Link
                    href="/checkout"
                    className="flex-1 bg-black text-center text-white py-2 rounded-md text-sm font-medium"
                  >
                    Checkout
                  </Link>
                  <Link
                    href="/comparison"
                    className="flex-1 text-center bg-gray-200 py-2 rounded-md text-sm font-medium"
                  >
                    Comparison
                  </Link>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}