"use client";

import { FaShippingFast } from "react-icons/fa";
import { FaHeadset, FaStar } from "react-icons/fa6"; // Swapped trophy for star
import { RiSecurePaymentLine } from "react-icons/ri"; // Added secure payment icon

export default function Feature() {
  return (
    <div className="bg-gray-50 py-12"> {/* Less intense background */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"> {/* More structured layout */}

          {/* Feature 1: High Quality */}
          <div className="p-4 bg-white rounded shadow-md flex items-start space-x-3">
            <FaStar className="text-3xl text-yellow-500 flex-shrink-0" /> {/* Brand color */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Premium Quality</h3> {/* Darker text */}
              <p className="text-sm text-gray-600">Carefully selected materials and craftsmanship.</p>
            </div>
          </div>

          {/* Feature 2: Secure Payment */}
          <div className="p-4 bg-white rounded shadow-md flex items-start space-x-3">
            <RiSecurePaymentLine className="text-3xl text-green-500 flex-shrink-0" /> {/* Security color */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Secure Payments</h3>
              <p className="text-sm text-gray-600">Your transactions are encrypted and protected.</p>
            </div>
          </div>

          {/* Feature 3: Free Shipping */}
          <div className="p-4 bg-white rounded shadow-md flex items-start space-x-3">
            <FaShippingFast className="text-3xl text-indigo-500 flex-shrink-0" /> {/* Shipping color */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Fast & Free Shipping</h3>
              <p className="text-sm text-gray-600">Enjoy free shipping on orders over 599.</p> {/* Adjusted amount */}
            </div>
          </div>

          {/* Feature 4: Customer Support */}
          <div className="p-4 bg-white rounded shadow-md flex items-start space-x-3">
            <FaHeadset className="text-3xl text-blue-500 flex-shrink-0" /> {/* Support color */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Dedicated Support</h3>
              <p className="text-sm text-gray-600">24/7 assistance from our friendly team.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}