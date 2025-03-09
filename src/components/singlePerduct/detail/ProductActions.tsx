import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

interface ProductActionsProps {
  stockQuantity: number;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({ stockQuantity, onAddToCart, onBuyNow }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity(quantity + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="md:flex items-center md:space-y-0 space-y-3 md:space-x-4">
      <div className="flex w-[130px] items-center border border-gray-400 rounded-md overflow-hidden">
        <button
          onClick={() => handleQuantityChange("decrease")}
          className="px-3 py-2 text-gray-600 hover:bg-gray-100"
          disabled={quantity <= 1}
        >
          <FaMinus />
        </button>
        <span className="px-5 py-3 text-gray-800">{quantity}</span>
        <button
          onClick={() => handleQuantityChange("increase")}
          className="px-3 py-2 text-gray-600 hover:bg-gray-100"
        >
          <FaPlus />
        </button>
      </div>

      <button
        className={`bg-[#E53935] text-white px-8 py-3 rounded-md font-medium hover:bg-[#C62828] focus:outline-none focus:ring-2 focus:ring-[#b9935a]/50 transition-colors duration-200 ${
          stockQuantity <= 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={onAddToCart}
        disabled={stockQuantity <= 0}
      >
        {stockQuantity > 0 ? "Add to Cart" : "Out of Stock"}
      </button>

      <button
        className={`bg-[#2E7D32] ml-3 md:ml-0 text-white px-8 py-3 rounded-md font-medium transition-colors duration-200 
          ${stockQuantity > 0 ? "hover:bg-[#1B5E20] focus:ring-2 focus:ring-[#b9935a]/50" : "opacity-50 cursor-not-allowed"}`}
        onClick={onBuyNow}
        disabled={stockQuantity <= 0}
      >
        {stockQuantity > 0 ? "Buy Now" : "Out of Stock"}
      </button>
    </div>
  );
};

export default ProductActions;