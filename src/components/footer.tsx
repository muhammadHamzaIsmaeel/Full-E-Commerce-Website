'use client'
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission, e.g., send email to backend or newsletter service
    console.log("Subscribed with email:", email);
    setEmail(""); // Clear the input after submission
  };

  return (
    <footer className="text-gray-400 border-t-2 pt-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="md:flex justify-between mx-10 md:mx-0 lg:mx-28">
          {/* Address Section */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-xl text-gray-950 font-bold">Funiro</h2>
            <address className="not-italic mt-3 md:mt-12 text-gray-700">
              400 University Drive Suite 200
              <br />
              Coral Gables,
              <br /> FL 33134 USA
            </address>
          </div>

          {/* Links Section */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold">Links</h3>
            <ul className="md:mt-12 mt-3 font-semibold space-y-8">
              <li>
                <Link href="/" className="text-gray-950 hover:text-gray-600" aria-label="Home Page">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-950 hover:text-gray-600" aria-label="Shop Page">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-950 hover:text-gray-600" aria-label="About Us Page">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-950 hover:text-gray-600" aria-label="Contact Page">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold">Help</h3>
            <ul className="mt-3 md:mt-12 font-semibold space-y-8">
              <li>
                <Link href="/payment-options" className="text-gray-950 hover:text-gray-600" aria-label="Payment Options Page">
                  Payment Options
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-950 hover:text-gray-600" aria-label="Returns Page">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy-policies" className="text-gray-950 hover:text-gray-600" aria-label="Privacy Policies Page">
                  Privacy Policies
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
          &copy; {new Date().getFullYear()} Funiro. All rights reserved.
        </div>
      </div>
    </footer>
  );
}