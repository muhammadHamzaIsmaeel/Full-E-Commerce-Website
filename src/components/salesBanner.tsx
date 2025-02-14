"use client";
import React, { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";

interface SalesBannerData {
  megaSaleAlert: string;
  megaSaleAlertEmoji: string;
  discountText: string;
  discountPercentage: number;
  limitedTimeOnlyText: string;
  isActive: boolean;
}

const SalesBanner = () => {
  const [bannerData, setBannerData] = useState<SalesBannerData | null>(null);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const query = `*[_type == "salesBanner" && isActive == true][0]{
          megaSaleAlert,
          megaSaleAlertEmoji,
          discountText,
          discountPercentage,
          limitedTimeOnlyText,
          isActive
        }`;
        const data = await client.fetch<SalesBannerData>(query);
        setBannerData(data);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };

    fetchBannerData();
  }, []);

  if (!bannerData) {
    return null; // Or a loading indicator
  }

  if (!bannerData.isActive) {
    return null; // Don't render the banner if it's not active
  }

  return (
    <div className="bg-gradient-to-r from-yellow-700 to-yellow-900 text-white text-center lg:p-2 p-1  flex items-center overflow-hidden whitespace-nowrap">
      <div className="animate-marquee flex space-x-28">
        <h1 className="text-xl font-bold flex items-center">
          <span className="animate-blink">{bannerData.megaSaleAlertEmoji}</span>
          <span className="mx-2">{bannerData.megaSaleAlert}</span>
          <span className="animate-blink">{bannerData.megaSaleAlertEmoji}</span>
        </h1>
        <p className="text-lg flex items-center ">
          {bannerData.discountText}
          <span className="font-bold mx-1">{bannerData.discountPercentage}% OFF</span>
          {bannerData.limitedTimeOnlyText}
        </p>
      </div>
    </div>
  );
};

export default SalesBanner;