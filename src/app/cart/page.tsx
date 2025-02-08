"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { SanityImageSource } from "@sanity/image-url/lib/types/types"; // Import the correct type
import { useLocalStorage } from "../context/CartContext";

interface CartItem {
  _id: string;
  title: string;
  price: number | string;
  quantity: number;
  productImage: SanityImageSource; // Use the correct type here
}

export default function Cart() {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("cart", []);

  useEffect(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(storedCart);
    } catch (error) {
      console.error("Error parsing cart data:", error);
    }
  }, []);

  const handleQuantityChange = (
    index: number,
    type: "increase" | "decrease"
  ) => {
    const updatedCart = [...cartItems];
    if (type === "increase") {
      updatedCart[index].quantity += 1;
    } else if (type === "decrease" && updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    }
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getImageUrl = (image: SanityImageSource): string => {
    try {
      return urlFor(image).url();
    } catch (error) {
      console.error("Error generating image URL:", error);
      return "/placeholder-image.png"; // Fallback image
    }
  };

  return (
    <div className="">
      {/* Banner Section */}
      <div className="relative w-full lg:h-[50vh] md:h-[30vh] h-[30vh] ">
        <Image
          src="/shop/banner11.png"
          alt="Shop Map"
          layout="fill"
          objectFit="cover"
          className=""
          loading="lazy"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-gray-950">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Furniro Logo"
              width={32}
              height={20}
              className="w-12 h-8"
              loading="lazy"
            />
          </Link>
          <h4 className="text-4xl font-bold">Cart</h4>
          <h5 className="flex items-center text-sm md:text-xl mb-4 space-x-1">
            <Link className="font-bold text-2xl" href="/">
              Home
            </Link>
            <MdKeyboardArrowRight className="mt-2 text-2xl" />
            <a className="mt-1 md:mt-0" href="#">
              Cart
            </a>
          </h5>
        </div>
      </div>

      {/* Cart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:mx-14 lg:mt-20 gap-6 px-4">
        {cartItems.length === 0 ? (
          <div className="lg:col-span-12 text-center mb-20">
            <h2 className="text-2xl font-semibold">Your cart is empty</h2>
            <Link href="/">
              <button className="mt-6 px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700">
                Go Shopping
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="lg:col-span-8 overflow-x-auto">
              <table className="w-full border-collapse table-auto">
                <thead className="bg-[#fdf3e8] text-sm">
                  <tr className="text-left">
                    <th className="py-4 px-4 font-medium">Product</th>
                    <th className="py-4 px-4 font-medium">Price</th>
                    <th className="py-4 px-4 font-medium">Quantity</th>
                    <th className="py-4 px-4 font-medium">Subtotal</th>
                    <th className="py-4 px-4 font-medium">
                      <span className="hidden">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-6 px-4 whitespace-nowrap">
                        <Image
                          src={getImageUrl(item.productImage)}
                          alt={item.title}
                          width={80}
                          height={80}
                          className="rounded-md border border-gray-200"
                          loading="lazy"
                        />
                        <h2 className="font-semibold text-lg">{item.title}</h2>
                      </td>
                      <td className="py-6 px-4 text-gray-600">
                        Rs. {Number(item.price).toFixed(2)}
                      </td>
                      <td className="py-6 w-20">
                        <div className="flex items-center border rounded-md overflow-hidden">
                          <button
                            onClick={() =>
                              handleQuantityChange(index, "decrease")
                            }
                            className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="px-4 py-2 text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(index, "increase")
                            }
                            className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-6 px-4 text-gray-800 font-medium">
                        Rs. {(Number(item.price) * item.quantity).toFixed(2)}
                      </td>
                      <td className="py-6 px-4 text-center">
                        <AiFillDelete
                          className="text-[#B88E2F] text-2xl cursor-pointer hover:scale-110"
                          onClick={() => handleRemoveItem(index)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="lg:col-span-4 bg-[#fdf3e8] lg:h-[340px] rounded-md px-4 lg:px-16 py-8">
              <h2 className="text-2xl text-center font-bold mb-12">
                Cart Totals
              </h2>
              <div className="flex justify-between text-gray-600 mb-7">
                <p className="text-gray-950 font-semibold text-xl">Subtotal:</p>
                <p>
                  Rs.{" "}
                  {cartItems
                    .reduce(
                      (total, item) =>
                        total + Number(item.price) * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between font-semibold text-xl text-gray-800 mb-4">
                <p>Total:</p>
                <p className="text-[#B88E2F]">
                  Rs.{" "}
                  {cartItems
                    .reduce(
                      (total, item) =>
                        total + Number(item.price) * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>
              <Link href="/checkout">
                <button className="w-full border-black border py-3 rounded-md mt-6 hover:bg-[#B88E2F]">
                  Check Out
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
