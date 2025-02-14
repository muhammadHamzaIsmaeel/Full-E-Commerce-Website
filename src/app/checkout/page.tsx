// // src/app/checkout/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useLocalStorage } from "../context/CartContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation"; // Import useRouter
import { useAuth } from "@clerk/nextjs"; // Import Clerk's useAuth hook


// Define types for the product image
interface ProductImage {
  asset: {
    _ref: string;
  };
  userId: string; // Add userId property to the Order interface
}

// Define types for the cart item
// src/app/checkout/page.tsx
interface CartItem {
  _id?: string;
  title: string;
  price: number;
  quantity: number;
  productImage?: ProductImage;
  selectedSize?: string; // Add selected size
  selectedColor?: string; // Add selected color
}

// Define the form schema using Zod
const formSchema = z.object({
  fullName: z.string().min(2, "Full Name is too short").max(100),
  addressLine1: z.string().min(5, "Address Line 1 is too short"),
  addressLine2: z.string().optional(), // Optional address line
  city: z.string().min(2, "City is required"),
  province: z.string().min(2, "Province is required"),
  zipCode: z.string().regex(/^\d{5}(?:-\d{4})?$/, "Invalid Zip Code"),
  courierService: z.literal("leopard"), // Only Leopard
  phoneNumber1: z.string().regex(/^\d{11}$/, "Invalid Phone Number"),
  phoneNumber2: z
    .string()
    .regex(/^\d{11}$/, "Invalid Phone Number")
    .optional(), // Optional phone number
  emailAddress: z.string().email("Invalid email address"),
  additionalInformation: z.string().max(1000).optional(),
  paymentMethod: z.literal("cod"), // Only Cash on Delivery
  landmark: z.string().optional(), // Optional Landmark
  addressType: z.enum(["home", "office"]), // Address Category (Home/Office)
});

// Define the Order interface
interface Order {
  id: number;
  status: string;
  products: CartItem[];
  date: string;
  formData: z.infer<typeof formSchema>; // Use the inferred type from formSchema
  userId: string; // Add userId property
}

export default function Checkout() {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("cart", []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter(); // Initialize useRouter
  const { userId } = useAuth(); // Get the logged-in user's ID

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      province: "Sindh",
      zipCode: "",
      courierService: "leopard",
      phoneNumber1: "",
      phoneNumber2: "",
      emailAddress: "",
      additionalInformation: "",
      paymentMethod: "cod",
      landmark: "", // Default value for Landmark
      addressType: "home", // Default value for Address Type
    },
  });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (Array.isArray(storedCart)) {
      setCartItems(storedCart as CartItem[]);
    }
  }, []);

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePaymentSuccess = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
    form.reset();
    router.push("/success"); // Use router.push for client-side navigation
  };

  const getPKTDateTime = () => {
    const now = new Date();
    const pakistanTimezoneOffset = 5 * 60 * 60 * 1000; // Pakistan is UTC+5
    const pakistanTime = new Date(now.getTime() + pakistanTimezoneOffset);

    // Convert to ISO 8601 format
    return pakistanTime.toISOString();
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
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
      const pktDateTime = getPKTDateTime();
      const order: Order = {
        id: Date.now(),
        status: "pending",
        products: cartItems,
        date: pktDateTime,
        formData: data,
        userId: userId!, // Add the logged-in user's ID to the order
      };
  
      // Save order to Sanity
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error sending order to Sanity:", errorData);
        throw new Error(`Failed to create order: ${response.statusText}`);
      }
  
      // Send Invoice Email
      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.emailAddress, // User's email from the form
          orderId: order.id, // Order ID
          products: cartItems, // List of products
          totalAmount: calculateSubtotal(), // Total amount
        }),
      });
  
      if (!emailResponse.ok) {
        const errorData = await emailResponse.json();
        console.error("Error sending invoice email:", errorData);
        throw new Error(
          `Failed to send invoice email: ${emailResponse.statusText}`
        );
      }
  
      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      const updatedOrders = [...existingOrders, order];
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      console.log("Order added to localStorage:", order);
  
      toast.success("Order confirmed! Invoice email sent.", {
        position: "top-right",
        autoClose: 3000,
      });
  
      // Clear cart and redirect
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
    <div>
      {/* Hero Section */}
      <div className="relative w-full lg:h-[50vh] md:h-[30vh] h-[30vh] ">
        <Image
          src="/shop/banner11.png"
          alt="Bedroom Shop Banner"
          layout="fill"
          objectFit="cover"
          loading="lazy"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-gray-950">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Saud Solution Logo"
              width={32}
              height={20}
              className="w-12 h-8"
            />
          </Link>
          <h4 className="text-4xl font-bold">CheckOut</h4>
          <h5 className="flex items-center text-sm md:text-xl mb-4 space-x-1">
            <Link className="font-bold text-xl" href="/">
              Home
            </Link>
            <MdKeyboardArrowRight className="mt-2 text-2xl" />
            <span>CheckOut</span>
          </h5>
        </div>
      </div>
      <div className="w-full bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 lg:px-0">
          {/* Billing Details Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Billing details
            </h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                noValidate
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full border border-gray-300 rounded-md p-2"
                          placeholder="Enter your full name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="addressLine1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 1</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full border border-gray-300 rounded-md p-2"
                          placeholder="Street address, house number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="addressLine2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 2 (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full border border-gray-300 rounded-md p-2"
                          placeholder="Apartment, suite, unit, etc."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Town / City</FormLabel>
                        <FormControl>
                          <Input
                            className="w-full border border-gray-300 rounded-md p-2"
                            placeholder="Enter your city"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="province"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Province</FormLabel>
                        <FormControl>
                          <select
                            className="w-full border border-gray-300 rounded-md p-2"
                            {...field}
                          >
                            <option value="Sindh">Sindh</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Gilgit-Baltistan">
                              Gilgit-Baltistan
                            </option>
                            <option value="Khyber Pakhtunkhwa">
                              Khyber Pakhtunkhwa
                            </option>
                            <option value="Balochistan">Balochistan</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full border border-gray-300 rounded-md p-2"
                          placeholder="e.g. 12345"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Landmark (Optional) */}
                <FormField
                  control={form.control}
                  name="landmark"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Landmark (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full border border-gray-300 rounded-md p-2"
                          placeholder="Nearby famous place"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Address Type (Home/Office) */}
                <FormField
                  control={form.control}
                  name="addressType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Type</FormLabel>
                      <FormControl>
                        <select
                          className="w-full border border-gray-300 rounded-md p-2"
                          {...field}
                        >
                          <option value="home">Home</option>
                          <option value="office">Office</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="courierService"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Courier Service</FormLabel>
                      <FormControl>
                        <select
                          className="w-full border border-gray-300 rounded-md p-2"
                          {...field}
                        >
                          <option value="leopard">Leopard Courier</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full border border-gray-300 rounded-md p-2"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full border border-gray-300 rounded-md p-2"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emailAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full border border-gray-300 rounded-md p-2"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalInformation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Information</FormLabel>
                      <FormControl>
                        <textarea
                          className="w-full border border-gray-300 rounded-md p-2"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-md mt-4 hover:bg-gray-800"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Confirming Order..."
                    : "Confirm Order (Cash on Delivery)"}
                </Button>
              </form>
            </Form>
          </div>

          {/* Order Summary Section */}
          <div className="space-y-6 border max-h-max border-gray-300 rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800">Your Order</h2>
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div>
                    <h4 className="text-base font-medium text-gray-700">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {item.quantity} x Rs.{" "}
                      {Number(item.price).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-base font-bold text-gray-800">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center text-lg font-bold text-gray-800">
              <span>Total</span>
              <span>Rs. {calculateSubtotal().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
