import React from "react";
import { PortableText } from "@portabletext/react";
import ProductActions from "./ProductActions";
import SocialSharing from "./SocialSharing";
import { PortableTextBlock } from "@portabletext/types";

interface ProductInfoProps {
  title: string;
  price: string;
  oldPrice?: string;
  description?: PortableTextBlock[]; // Correct type for PortableText
  SKU?: string;
  category?: string;
  tags?: string[];
  stockQuantity: number;
  onAddToCart: () => void;
  onBuyNow: () => void;
  onShare: (platform: "facebook" | "twitter" | "instagram") => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  title,
  price,
  oldPrice,
  description,
  SKU,
  category,
  tags,
  stockQuantity,
  onAddToCart,
  onBuyNow,
  onShare,
}) => {
  return (
    <div className="lg:col-span-6 mx-3 md:mx-0 mt-8 space-y-6">
      {/* Product Title and Price */}
      <div className="items-start flex-col space-y-3">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
          {title}
        </h1>
        <div className="flex items-center space-x-3">
          <p className="text-xl font-semibold text-gray-700">Rs. {price}</p>
          {oldPrice && (
            <span className="text-red-600 pb-2 font-serif line-through text-lg">
              Rs. {oldPrice}
            </span>
          )}
        </div>
      </div>

      {/* Stock Status */}
      <p
        className={`text-sm ${
          stockQuantity > 0 ? "text-green-600" : "text-red-600"
        } font-semibold`}
      >
        {stockQuantity > 0
          ? `In Stock: ${stockQuantity} units`
          : "Out of Stock"}
      </p>

      {/* Product Description */}
      <div className="text-gray-700 leading-relaxed">
        <PortableText value={description || []} />
      </div>

      {/* Product Meta Information (SKU, Category, Tags) */}
      <div className="border-t border-gray-300 pt-4">
        <div className="grid grid-cols-2 gap-y-2 text-gray-600 text-sm">
          <div>
            <span className="font-semibold">SKU:</span> {SKU}
          </div>
          <div>
            <span className="font-semibold">Category:</span> {category}
          </div>
          <div>
            <span className="font-semibold">Tags:</span>{" "}
            {tags?.join(", ") || "N/A"}
          </div>
        </div>
      </div>

      {/* Product Actions (Add to Cart, Buy Now) */}
      <ProductActions
        stockQuantity={stockQuantity}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* Social Sharing Icons */}
      <SocialSharing onShare={onShare} />
    </div>
  );
};

export default ProductInfo;