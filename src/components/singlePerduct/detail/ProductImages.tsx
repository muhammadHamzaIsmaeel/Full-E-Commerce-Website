import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ImageModal from "./ImageModal";
import VideoPlayer from "./VideoPlayer"; // Import VideoPlayer component

interface ProductImagesProps {
  images: string[];
  videoUrl?: string | null;
  onThumbnailClick: (src: string, isVideo: boolean) => void;
}

const ProductImages: React.FC<ProductImagesProps> = ({ images, videoUrl, onThumbnailClick }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(images[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="lg:col-span-6 p-3 md:p-0 mt-10">
      {/* Big Image Frame */}
      <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
        {videoUrl ? (
          <VideoPlayer src={videoUrl} /> // Display video if videoUrl is set
        ) : selectedImage ? (
          <div onClick={() => setIsModalOpen(true)}>
            <Image
              src={selectedImage}
              alt="Product Image"
              width={1000}
              height={1000}
              className="h-[240px] lg:h-[500px] lg:w-full object-cover cursor-pointer"
              loading="lazy"
            />
          </div>
        ) : null}
      </div>

      {/* Thumbnail Slider */}
      <div className="mt-4">
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={5}
          navigation
        >
          {images.map((src, index) => {
            const isVideoThumbnail = src === "/play.png";
            return (
              <SwiperSlide key={index}>
                <div
                  className="w-full h-20 rounded-lg overflow-hidden cursor-pointer relative"
                  onClick={() => {
                    if (isVideoThumbnail) {
                      onThumbnailClick(src, true); // Handle video click
                      setSelectedImage(null); // Clear selected image for video
                    } else {
                      setSelectedImage(src); // Set selected image for normal images
                      onThumbnailClick(src, false); // Handle image click
                    }
                  }}
                >
                  {isVideoThumbnail ? (
                    <div className="flex items-center justify-center bg-gray-800 text-white absolute inset-0">
                      <span>
                        <Image
                          src="/play.png" // Ensure this path is correct
                          alt="Play Video"
                          width={1000}
                          height={1000}
                          className="object-contain w-full h-full"
                          loading="lazy"
                          style={{ objectFit: "contain" }}
                        />
                      </span>
                    </div>
                  ) : (
                    <Image
                      src={src}
                      alt={`Thumbnail ${index + 1}`}
                      width={1000}
                      height={1000}
                      className="object-cover w-full h-full"
                      loading="lazy"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Full-Screen Image Modal */}
      {isModalOpen && selectedImage && (
        <ImageModal src={selectedImage} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default ProductImages;