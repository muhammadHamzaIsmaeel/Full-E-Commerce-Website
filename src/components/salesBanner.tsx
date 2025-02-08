import React from "react";

const SalesBanner = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-700 to-yellow-900 text-white text-center lg:p-2 p-1  flex items-center overflow-hidden whitespace-nowrap">
      <div className="animate-marquee flex space-x-28">
        <h1 className="text-xl font-bold flex items-center">
          <span className="animate-blink">🎉</span>
          <span className="mx-2">Mega Sale Alert!</span>
          <span className="animate-blink">🎉</span>
        </h1>
        <p className="text-lg flex items-center ">
          Get up to <span className="font-bold mx-1">50% OFF</span> on all products. Limited time only!
        </p>
      </div>
    </div>
  );
};

export default SalesBanner;
