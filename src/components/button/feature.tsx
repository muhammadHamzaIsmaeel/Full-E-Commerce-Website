"use client";

import { FaShippingFast, FaTags, FaHeadset } from "react-icons/fa";

export default function Feature() {
  return (
    <div className="flex flex-col px-4 md:flex-row space-x-0 md:space-x-4 space-y-4 md:space-y-0 justify-center items-stretch py-4">
      {/* Feature 4: Free Delivery */}
      <div className="feature-card">
        <FaShippingFast className="text-4xl text-indigo-500 flex-shrink-0" />
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Free Delivery</h3>
          <p className="text-sm text-gray-600 mt-2">
            Enjoy free shipping on all orders. No minimum purchase required.
          </p>
        </div>
      </div>

      {/* Feature 5: 40% Discount */}
      <div className="feature-card">
        <FaTags className="text-4xl text-red-500 flex-shrink-0" />
        <div>
          <h3 className="text-xl font-semibold text-gray-800">40% Discount</h3>
          <p className="text-sm text-gray-600 mt-2">
            Get flat 40% off on selected items. Limited time offer!
          </p>
        </div>
      </div>

      {/* Feature 6: Dedicated Support */}
      <div className="feature-card">
        <FaHeadset className="text-4xl text-blue-500 flex-shrink-0" />
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            Dedicated Support
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            24/7 assistance from our friendly and expert team.
          </p>
        </div>
      </div>
    </div>
  );
}