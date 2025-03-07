// src/app/checkout/page.tsx
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
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
import { FaLock } from "react-icons/fa"; // Import lock icon
import { Separator } from "@/components/ui/separator"; // Import the Separator component for visual separation
import { urlFor } from "@/sanity/lib/image";

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
  shippingCost: number;
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

  const calculateGrandTotal = () => {
    return calculateSubtotal(); // Shipping cost removed.
  };

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
      toast.error(
        "Your cart is empty. Please add products before confirming the order.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const pktDateTime = getPKTDateTime();
      const grandTotal = calculateGrandTotal();
      const order: Order = {
        id: Date.now(),
        status: "pending",
        products: cartItems,
        date: pktDateTime,
        formData: data,
        userId: userId!,
        shippingCost: 0, // Set shipping cost to 0 for free delivery
      };

      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order, grandTotal }), // Pass grandTotal here
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error sending order to Sanity:", errorData);
        throw new Error(`Failed to create order: ${response.statusText}`);
      }

      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.emailAddress, // User's email from the form
          orderId: order.id, // Order ID
          products: cartItems, // List of products
          totalAmount: grandTotal, // totalAmount should be grandTotal now
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

      toast.success("Order confirmed! Invoice email sent. Enjoy free delivery!", {
        position: "top-right",
        autoClose: 3000,
      });

      handlePaymentSuccess();
    } catch (error) {
      console.error("Error processing order:", error);
      toast.error(
        "An error occurred while processing your order. Please try again.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

   // Function to truncate the title to three words
   const truncateTitle = (title: string): string => {
    const words = title.split(" ");
    if (words.length > 5) {
      return words.slice(0, 5).join(" ") + "...";
    }
    return title;
  };

  return (
    <div className="bg-gray-100 min-h-screen">
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
                          className="w-full border border-gray-300 rounded-md p-3"
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
                          className="w-full border border-gray-300 rounded-md p-3"
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
                          className="w-full border border-gray-300 rounded-md p-3"
                          placeholder="Apartment, suite, unit, etc."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Town / City</FormLabel>
                        <FormControl>
                          <Input
                            className="w-full border border-gray-300 rounded-md p-3"
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
                            className="w-full border border-gray-300 rounded-md p-3"
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
                          className="w-full border border-gray-300 rounded-md p-3"
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
                         className="w-full border border-gray-300 rounded-md p-3"
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
                         className="w-full border border-gray-300 rounded-md p-3"
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
                          className="w-full border border-gray-300 rounded-md p-3"
                          {...field}
                        >
                          <option value="leopard">Leopard Courier</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phoneNumber1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            className="w-full border border-gray-300 rounded-md p-3"
                            placeholder="Enter phone number"
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
                        <FormLabel>Additional Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            className="w-full border border-gray-300 rounded-md p-3"
                            placeholder="Enter additional phone number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="emailAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full border border-gray-300 rounded-md p-3"
                          placeholder="Enter your email"
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
                      <FormLabel>Additional Information (Optional)</FormLabel>
                      <FormControl>
                        <textarea
                          className="w-full border border-gray-300 rounded-md p-3"
                          rows={4}
                          placeholder="Notes about your order, e.g. special notes for delivery"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-md mt-4 hover:bg-gray-800"
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
          <div className="space-y-6 border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800">Your Order</h2>
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3"
                >
                  <div className="flex items-center space-x-4">
                    <Image
                      src={item.productImage ? urlFor(item.productImage).url() : "/placeholder.png"}
                      alt={item.title}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div>
                      <h4 className="text-base font-medium text-gray-700">
                        {truncateTitle(item.title)}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {item.quantity} x Rs. {Number(item.price).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-base font-bold text-gray-800">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <Separator className="my-4" />

            {/* Calculations Summary */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-gray-700">
                <span>Subtotal</span>
                <span>Rs. {calculateSubtotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-gray-700">
                <span>Shipping</span>
                <span className="text-green-600 font-semibold">Free</span> {/* Indicate Free Shipping */}
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between items-center text-lg font-bold text-gray-800">
                <span>Total</span>
                <span>Rs. {calculateGrandTotal().toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-green-600 font-semibold">Free Delivery!</p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}