import { FaShippingFast } from "react-icons/fa";
import { FaHeadset, FaTrophy } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";

export default function Feature() {
  return (
    <div className="bg-[#FAF3EA] py-14">
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center max-w-6xl mx-auto gap-8 text-center px-4">
        {/* Feature 1 */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <FaTrophy className="text-4xl text-black" />
          <div>
            <h3 className="text-lg font-semibold">High Quality</h3>
            <p className="text-sm text-gray-600">Crafted from top materials</p>
          </div>
        </div>
        {/* Feature 2 */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <MdVerified className="text-4xl text-black" />
          <div>
            <h3 className="text-lg font-semibold">Warranty Protection</h3>
            <p className="text-sm text-gray-600">Over 2 years</p>
          </div>
        </div>
        {/* Feature 3 */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <FaShippingFast className="text-4xl text-black" />
          <div>
            <h3 className="text-lg font-semibold">Free Shipping</h3>
            <p className="text-sm text-gray-600">Order over 150 $</p>
          </div>
        </div>
        {/* Feature 4 */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <FaHeadset className="text-4xl text-black" />
          <div>
            <h3 className="text-lg font-semibold">24/7 Support</h3>
            <p className="text-sm text-gray-600">Dedicated support</p>
          </div>
        </div>
      </div>
    </div>
  );
}
