// src/app/checkout/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { FaLock } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderSummary from "@/components/checkout/OrderSummary";
import BillingDetailsForm from "@/components/checkout/BillingDetailsForm";
import { FormSchemaType } from "@/types/checkoutSchema"; // Import schema type
import Head from "next/head";

interface CartItem {
  _id?: string;
  title: string;
  price: number;
  quantity: number;
  productImage?: {
    asset: {
      _ref: string;
    };
  };
}

export default function Checkout() {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("cart", []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { userId } = useAuth();

  useEffect(() => {
    const fetchCartItems = () => {
      try {
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        if (Array.isArray(storedCart)) {
          setCartItems(storedCart);
        }
      } catch (error) {
        console.error("Error parsing cart data:", error);
      }
    };

    fetchCartItems();
  }, []);

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const calculateGrandTotal = () => calculateSubtotal();

  const handlePaymentSuccess = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
    router.push("/success");
  };

  const onSubmit = async (data: FormSchemaType) => {
    setIsSubmitting(true);

    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Please add products before confirming the order.", {
        position: "top-right",
        autoClose: 3000,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const order = {
        id: Date.now(),
        status: "pending",
        products: cartItems,
        date: new Date().toISOString(),
        formData: data,
        userId: userId!,
        shippingCost: 0,
      };

      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order, grandTotal: calculateGrandTotal() }),
      });

      if (!response.ok) throw new Error("Failed to create order");

      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.emailAddress,
          orderId: order.id,
          products: cartItems,
          totalAmount: calculateGrandTotal(),
        }),
      });

      if (!emailResponse.ok) throw new Error("Failed to send invoice email");

      localStorage.setItem("orders", JSON.stringify([...JSON.parse(localStorage.getItem("orders") || "[]"), order]));
      toast.success("Order confirmed! Invoice email sent. Enjoy free delivery!", {
        position: "top-right",
        autoClose: 3000,
      });

      handlePaymentSuccess();
    } catch (error) {
      console.error("Error processing order:", error);
      toast.error("An error occurred while processing your order. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
          <title>Checkout - Saud Solutions</title>
      </Head>
      {/* Hero Section */}
      <div className="bg-white py-6 shadow-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-center items-center">
          <div className="flex items-center space-x-2 text-gray-600">
            <FaLock />
            <span className="text-lg font-semibold">Secure Checkout</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-12 px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Billing Details Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Billing Details</h2>
            <BillingDetailsForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
          </div>

          {/* Order Summary Section */}
          <OrderSummary
            cartItems={cartItems}
            calculateSubtotal={calculateSubtotal}
            calculateGrandTotal={calculateGrandTotal}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}