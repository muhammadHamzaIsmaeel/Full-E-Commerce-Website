"use client";

import { FaMoneyBillWave, FaStar } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";

export default function Feature1() {
  return (
    <div className="flex flex-col px-4 md:flex-row space-x-0 md:space-x-4 space-y-4 md:space-y-0 justify-center items-stretch py-4">
      {/* Feature 1: Premium Quality */}
      <div className="feature-card">
        <FaStar className="text-4xl text-yellow-500 flex-shrink-0" />
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Premium Quality</h3>
          <p className="text-sm text-gray-600 mt-2">
            Carefully selected materials and craftsmanship for the best products.
          </p>
        </div>
      </div>

      {/* Feature 2: Secure Payment */}
      <div className="feature-card">
        <RiSecurePaymentLine className="text-4xl text-green-500 flex-shrink-0" />
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            Secure Payments
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            Your transactions are encrypted and 100% secure.
          </p>
        </div>
      </div>

      {/* Feature 3: Cash on Delivery */}
      <div className="feature-card">
        <FaMoneyBillWave className="text-4xl text-purple-500 flex-shrink-0" />
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            Cash on Delivery
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            Pay when your order is delivered. No upfront payment required.
          </p>
        </div>
      </div>
    </div>
  );
}