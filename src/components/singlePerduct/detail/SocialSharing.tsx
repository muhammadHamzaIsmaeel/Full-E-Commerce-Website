import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa6";

interface SocialSharingProps {
  onShare: (platform: "facebook" | "twitter" | "instagram") => void;
}

const SocialSharing: React.FC<SocialSharingProps> = ({ onShare }) => {
  return (
    <div className="border-t border-gray-300 pt-4">
      <p className="font-semibold text-gray-700 mb-2">Share:</p>
      <div className="flex space-x-4">
        <FaFacebook
          className="text-gray-600 hover:text-[#3b5998] cursor-pointer text-2xl transition"
          onClick={() => onShare("facebook")}
        />
        <FaTwitter
          className="text-gray-600 hover:text-[#1DA1F2] cursor-pointer text-2xl transition"
          onClick={() => onShare("twitter")}
        />
        <FaInstagram
          className="text-gray-600 hover:text-[#E4405F] cursor-pointer text-2xl transition"
          onClick={() => onShare("instagram")}
        />
      </div>
    </div>
  );
};

export default SocialSharing;