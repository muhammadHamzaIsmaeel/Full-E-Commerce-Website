"use client";
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { useState } from "react";
import { FaTiktok } from "react-icons/fa6";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/subscribe", {
        // Your API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log("Subscription successful, email sent!");
        // Optionally show a success message
      } else {
        console.error("Subscription failed:", response.status);
        // Optionally show an error message
      }
    } catch (error) {
      console.error("Error submitting subscription:", error);
      // Optionally show an error message
    }
    setEmail(""); // Clear the input
  };

  return (
    <footer className="text-gray-400 border-t-2 pt-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="md:flex justify-between mx-10 md:mx-0 lg:mx-28">
          {/* About Us Section */}
          <div className="w-full md:w-1/4 lg:mr-3 mb-6 md:mb-0">
            <h2 className="text-xl text-gray-950 font-bold">Saud Solution</h2>
            <p className="mt-3 md:mt-12 text-gray-700 text-sm">
              Your one-stop shop for the latest fashion, cutting-edge
              electronics, and beauty essentials.
            </p>
            <div className="mt-4 flex space-x-4">
              <Link href="https://web.facebook.com/saudsolution" aria-label="Facebook">
                <FaFacebook
                  className="text-[#1877F2] hover:text-[#3b5998]"
                  size={20}
                />
              </Link>
              <Link href="https://www.instagram.com/saudsolution" aria-label="Instagram">
                <FaInstagram
                  className="text-[#E4405F] hover:text-[#C21E56]"
                  size={20}
                />
              </Link>
              <Link href="https://www.tiktok.com/@saudsolution" aria-label="TikTok">
                <FaTiktok
                  className="text-[#000000] hover:text-[#444444]"
                  size={20}
                />{" "}
                {/* Or any other color scheme you like */}
              </Link>
            </div>
          </div>

          {/* Important Links Section */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="md:mt-12 mt-3 font-semibold space-y-8">
              <li>
                <Link
                  href="/"
                  className="text-gray-950 hover:text-gray-600"
                  aria-label="Home Page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="text-gray-950 hover:text-gray-600"
                  aria-label="Shop Page"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-950 hover:text-gray-600"
                  aria-label="Contact Page"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <form onSubmit={handleSubmit} className="md:flex mt-12 gap-2">
              <input
                type="email"
                placeholder="Enter Your Email Address"
                className="w-full text-sm border-b-2 border-gray-700"
                aria-label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="border-b-2 border-gray-700 text-gray-950 font-bold"
                aria-label="Subscribe to Newsletter"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 text-start font-medium border-t-2 mx-5 md:mx-24 py-6 text-gray-950">
          &copy; {new Date().getFullYear()} Saud Solution. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
