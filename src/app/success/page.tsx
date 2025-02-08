"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocalStorage } from "../context/CartContext";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Order Confirmed!</h1>
      <p className="text-lg text-gray-700 mb-4">Thank you for your order.  We will contact you to arrange delivery.</p>
      {orderId && (
        <p className="text-md text-gray-700 mb-4">
          Your Order ID is: <span className="font-semibold">{orderId}</span>.  Please keep this for reference.
        </p>
      )}
      <p className="text-lg text-gray-700 mb-8">
        You can view your order details in your <Link href="/my-orders" className="text-blue-500 hover:underline">My Orders</Link> section.
      </p>
      <Link href="/" className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800">
        Continue Shopping
      </Link>
    </div>
  );
}