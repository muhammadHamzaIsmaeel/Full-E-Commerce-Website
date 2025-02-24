"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocalStorage } from "../context/CartContext";
import { motion } from "framer-motion";
import { AiOutlineCheckCircle } from "react-icons/ai";

interface CartItem {
  title: string;
  price: number;
  quantity: number;
}

export default function SuccessPage() {
  const [, setCartItems] = useLocalStorage<CartItem[]>("cart", []); // Type the cart items
  const [orderId, setOrderId] = useState<number | null>(null); // Track the order ID

  useEffect(() => {
    // Clear the cart on success page load
    localStorage.removeItem("cart");
    setCartItems([]);

    // Retrieve the last order ID from localStorage
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      try {
        const parsedOrders = JSON.parse(storedOrders);
        if (Array.isArray(parsedOrders) && parsedOrders.length > 0) {
          // Get the last order's ID
          const lastOrderId = parsedOrders[parsedOrders.length - 1].id;
          setOrderId(lastOrderId);
        }
      } catch (error) {
        console.error("Error parsing orders:", error);
      }
    }
  }, []);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-lg shadow-xl overflow-hidden sm:max-w-md w-full">
        <div className="bg-green-100 border-b border-green-200 py-4 px-6 text-center">
          <AiOutlineCheckCircle className="inline-block h-8 w-8 text-green-500 mb-2" />
          <h1 className="text-2xl font-semibold text-gray-800">Order Confirmed!</h1>
        </div>
        <div className="p-6">
          <p className="text-md text-gray-700 mb-4">
            Thank you for your order. We will contact you shortly to arrange delivery.
          </p>
          {orderId && (
            <p className="text-sm text-gray-700 mb-4">
              Your Order ID is: <span className="font-semibold">{orderId}</span>. Please keep this for reference.
            </p>
          )}
          <p className="text-sm text-gray-700 mb-6">
            You can view your order details in your{" "}
            <Link href="/my-orders" className="text-blue-500 hover:underline">
              My Orders
            </Link>{" "}
            section.
          </p>
          <Link
            href="/"
            className="block w-full px-4 py-2 text-sm font-medium text-center text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </motion.div>
  );
}