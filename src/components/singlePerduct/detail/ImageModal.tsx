import React from "react";
import Image from "next/image";

interface ImageModalProps {
  src: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div className="relative max-w-[90%] max-h-[90%]">
        <Image
          src={src}
          alt="Full Screen Product Image"
          width={1000}
          height={1000}
          className="object-contain rounded-lg"
        />
      </div>
    </div>
  );
};

export default ImageModal;