"use client";

import { FaShippingFast, FaTags, FaHeadset } from "react-icons/fa";
import Link from "next/link";

export default function Feature() {
  return (
    <div className="flex flex-col px-4 md:flex-row space-x-0 md:space-x-4 space-y-4 md:space-y-0 justify-center items-stretch py-4">
      <div className="feature-card">
        <FaShippingFast className="text-4xl text-indigo-500 flex-shrink-0" />
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Free Delivery</h3>
          <p className="text-sm text-gray-600 mt-2">
            Enjoy free shipping on all orders across Pakistan. <Link href="/shop" className="text-yellow-600 hover:underline">Shop now!</Link>
          </p>
        </div>
      </div>
      <div className="feature-card">
        <FaTags className="text-4xl text-red-500 flex-shrink-0" />
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Exclusive Discounts</h3>
          <p className="text-sm text-gray-600 mt-2">
            Up to 40% off on beauty, skincare, and more. <Link href="/shop" className="text-yellow-600 hover:underline">Explore deals!</Link>
          </p>
        </div>
      </div>
      <div className="feature-card">
        <FaHeadset className="text-4xl text-blue-500 flex-shrink-0" />
        <div>
          <h3 className="text-xl font-semibold text-gray-800">24/7 Support</h3>
          <p className="text-sm text-gray-600 mt-2">
            Get assistance anytime from our expert team. <Link href="/contact" className="text-yellow-600 hover:underline">Contact us!</Link>
          </p>
        </div>
      </div>
    </div>
  );
}