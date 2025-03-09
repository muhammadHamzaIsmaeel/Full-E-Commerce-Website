"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { useLocalStorage } from "../context/CartContext";
import Head from "next/head";

interface CartItem {
  _id: string;
  title: string;
  price: number | string;
  quantity: number;
  productImage: SanityImageSource;
}

export default function Cart() {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("cart", []);
  const [loading, setLoading] = useState(true);

  // Fetch cart items from local storage
  useEffect(() => {
    const fetchCartItems = () => {
      try {
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartItems(storedCart);
      } catch (error) {
        console.error("Error parsing cart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []); // Remove setCartItems from dependency array

  const handleQuantityChange = (
    index: number,
    type: "increase" | "decrease"
  ) => {
    setCartItems((prevCartItems) => {
      // Use functional update
      const updatedCart = [...prevCartItems];
      if (type === "increase") {
        updatedCart[index].quantity += 1;
      } else if (type === "decrease" && updatedCart[index].quantity > 1) {
        updatedCart[index].quantity -= 1;
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prevCartItems) => {
      // Use functional update
      const updatedCart = prevCartItems.filter((_, i) => i !== index);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const getImageUrl = (image: SanityImageSource): string => {
    try {
      return urlFor(image).url();
    } catch (error) {
      console.error("Error generating image URL:", error);
      return "/placeholder-image.png"; // Fallback image
    }
  };

  const truncateTitle = (title: string): string => {
    const words = title.split(" ");
    if (words.length > 3) {
      return words.slice(0, 3).join(" ") + "...";
    }
    return title;
  };

  // Calculate total price
  const totalPrice = cartItems
    .reduce((total, item) => total + Number(item.price) * item.quantity, 0)
    .toFixed(2);

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Cart - Saud Solutions",
    description:
      "View your shopping cart at Saud Solutions. Manage your items and proceed to checkout.",
    url: "https://saudsolutions.com/cart",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://saudsolutions.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Cart",
          item: "https://saudsolutions.com/cart",
        },
      ],
    },
  };

  return (
    <div className="">
      {/* SEO Meta Tags */}
      <Head>
        <title>Cart - Saud Solutions</title>
        <meta
          name="description"
          content="View your shopping cart at Saud Solutions. Manage your items and proceed to checkout."
        />
        <meta
          name="keywords"
          content="shopping cart, Saud Solutions, checkout, online shopping"
        />
        <meta property="og:title" content="Cart - Saud Solutions" />
        <meta
          property="og:description"
          content="View your shopping cart at Saud Solutions. Manage your items and proceed to checkout."
        />
        <meta
          property="og:image"
          content="https://saudsolutions.com/logo.png"
        />
        <meta property="og:url" content="https://saudsolutions.com/cart" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cart - Saud Solutions" />
        <meta
          name="twitter:description"
          content="View your shopping cart at Saud Solutions. Manage your items and proceed to checkout."
        />
        <meta
          name="twitter:image"
          content="https://saudsolutions.com/logo.png"
        />
        <link rel="canonical" href="https://saudsolutions.com/cart" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>

      {/* Banner Section */}
      <header className="relative w-full lg:h-[50vh] md:h-[30vh] h-[30vh]">
        <Image
          src="/shop/banner11.png"
          alt="Cart Banner"
          fill // Replaces `layout="fill"`
          style={{ objectFit: "cover" }} // Replaces `objectFit="cover"`
          className="filter blur-sm opacity-70"
          priority // Eager load the banner
          sizes="(max-width: 768px) 100vw, 50vw" // Optional but recommended
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-gray-950">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Saud Solution Logo"
              width={32}
              height={20}
              className="w-12 h-8"
              priority // Eager load the logo
            />
          </Link>
          <h1 className="text-4xl font-bold">Cart</h1>
          <div className="flex items-center text-sm md:text-xl mb-4 space-x-1">
            <Link className="font-bold text-2xl" href="/">
              Home
            </Link>
            <MdKeyboardArrowRight className="mt-2 text-2xl" />
            <span className="mt-1 md:mt-0">Cart</span>
          </div>
        </div>
      </header>

      {/* Cart Section */}
      <main className="grid grid-cols-1 lg:grid-cols-12 lg:mx-14 lg:mt-20 gap-6 px-4">
        {loading ? (
          <div className="lg:col-span-12 text-center mb-20">
            <h2 className="text-2xl font-semibold">Loading your cart...</h2>
          </div>
        ) : cartItems.length === 0 ? (
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
            <section className="lg:col-span-8 overflow-x-auto">
              <table className="w-full border-collapse table-auto">
                <thead className="bg-[#fdf3e8] text-sm">
                  <tr className="text-left">
                    <th className="py-4 px-4 font-medium">Product</th>
                    <th className="py-4 px-4 font-medium">Price</th>
                    <th className="py-4 px-4 font-medium">Quantity</th>
                    <th className="py-4 px-4 font-medium">Subtotal</th>
                    <th className="py-4 px-4 font-medium">Actions</th>
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
                        <h2 className="font-semibold text-lg">
                          {truncateTitle(item.title)}
                        </h2>
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
            </section>

            <aside className="lg:col-span-4 bg-[#fdf3e8] lg:h-[340px] rounded-md px-4 lg:px-16 py-8">
              <h2 className="text-2xl text-center font-bold mb-12">
                Cart Totals
              </h2>
              <div className="flex justify-between text-gray-600 mb-7">
                <p className="text-gray-950 font-semibold text-xl">Subtotal:</p>
                <p>Rs. {totalPrice}</p>
              </div>
              <div className="flex justify-between font-semibold text-xl text-gray-800 mb-4">
                <p>Total:</p>
                <p className="text-[#B88E2F]">Rs. {totalPrice}</p>
              </div>
              <Link href="/checkout">
                <button className="w-full border-black border py-3 rounded-md mt-6 hover:bg-[#B88E2F]">
                  Check Out
                </button>
              </Link>
            </aside>
          </>
        )}
      </main>
    </div>
  );
}
