"use client";

import { FaMoneyBillWave } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { RiSecurePaymentLine } from "react-icons/ri";

export default function Feature1() {
  return (
    <div className="flex flex-col px-4 md:flex-row space-x-0 md:space-x-4 space-y-4 md:space-y-0 justify-center items-stretch py-4">
      {/* Feature 1: Premium Quality */}
      <div className="p-3 bg-white rounded-lg shadow-md flex flex-col items-start space-y-2 hover:shadow-lg transition-shadow w-full max-w-md">
        <FaStar className="text-4xl text-yellow-500 flex-shrink-0" />
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Premium Quality</h3>
          <p className="text-sm text-gray-600 mt-2">
            Carefully selected materials and craftsmanship for the best
            products.
          </p>
        </div>
      </div>

      {/* Feature 2: Secure Payment */}
      <div className="p-3 bg-white rounded-lg shadow-md flex flex-col items-start space-y-2 hover:shadow-lg transition-shadow w-full max-w-md">
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
      <div className="p-3 bg-white rounded-lg shadow-md flex flex-col items-start space-y-2 hover:shadow-lg transition-shadow w-full max-w-md">
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