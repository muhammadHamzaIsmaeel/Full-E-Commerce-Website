import React from "react";
import Link from "next/link";

const Bannerfree: React.FC = () => {
  const messages = [
    "Exclusive Deals on Beauty & Skincare",
    "Free Delivery on All Orders Across Pakistan",
    "Shop Premium Products at Saud Solutions",
  ];

  return (
    <div className="md:py-6 py-4 overflow-hidden bg-gradient-to-r from-yellow-700 to-yellow-900" aria-label="Promotional Banner">
      <div className="scrolling-wrapper">
        {messages.map((message, index) => (
          <Link href="/shop" key={index}>
            <p className="inline-block text-2xl md:text-3xl text-white mx-12 hover:underline" aria-label={message}>
              {message}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Bannerfree;