// src/components/OrderSummary.tsx
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { urlFor } from "@/sanity/lib/image";

interface CartItem {
  _id?: string;
  title: string;
  price: number;
  quantity: number;
  productImage?: {
    asset: {
      _ref: string;
    };
  };
}

interface OrderSummaryProps {
  cartItems: CartItem[];
  calculateSubtotal: () => number;
  calculateGrandTotal: () => number;
}

const truncateTitle = (title: string): string => {
  const words = title.split(" ");
  return words.length > 5 ? words.slice(0, 5).join(" ") + "..." : title;
};

export default function OrderSummary({
  cartItems,
  calculateSubtotal,
  calculateGrandTotal,
}: OrderSummaryProps) {
  return (
    <div className="space-y-6 max-h-max border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800">Your Order</h2>
      <div className="space-y-4">
        {cartItems.map((item, index) => (
          <div key={index} className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-4">
              <Image
                src={
                  item.productImage ? urlFor(item.productImage).url() : "/placeholder.png"
                }
                alt={item.title}
                width={64}
                height={64}
                className="w-16 h-16 rounded-md object-cover"
                loading="lazy"
              />
              <div>
                <h4 className="text-base font-medium text-gray-700">
                  {truncateTitle(item.title)}
                </h4>
                <p className="text-sm text-gray-500">
                  {item.quantity} x Rs. {Number(item.price).toLocaleString()}
                </p>
              </div>
            </div>
            <p className="text-base font-bold text-gray-800">
              Rs. {(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      <Separator className="my-4" />

      {/* Calculations Summary */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-gray-700">
          <span>Subtotal</span>
          <span>Rs. {calculateSubtotal().toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-gray-700">
          <span>Shipping</span>
          <span className="text-green-600 font-semibold">Free</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between items-center text-lg font-bold text-gray-800">
          <span>Total</span>
          <span>Rs. {calculateGrandTotal().toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-green-600 font-semibold">Free Delivery!</p>
      </div>
    </div>
  );
}