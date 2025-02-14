"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { client } from "@/sanity/lib/client"; // Import Sanity client
import { urlFor } from "@/sanity/lib/image"; // Import urlFor function
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface ImageGridItem {
  _id: string;
  image: SanityImageSource;
  altText: string;
}

const ImageGrid = () => {
  const [images, setImages] = useState<ImageGridItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const query = `*[_type == "imageGridItem"]{
          _id,
          image,
          altText
        }`;
        const data: ImageGridItem[] = await client.fetch(query);

        if (data) {
          setImages(data);
        } else {
          console.warn("No image grid items found in Sanity.");
          setImages([]); // Ensure empty array if no data
        }
      } catch (error) {
        console.error("Error fetching image grid items from Sanity:", error);
        setImages([]); // Ensure empty array on error
      }
    };

    fetchImages();
  }, []);

  // Auto-slide for carousel
  useEffect(() => {
    if (images.length > 0) {
      // Only start the timer if there are images
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 2000); // Change image every 2 seconds
      return () => clearInterval(interval);
    }
  }, [images.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <section className="w-full mt-10 mb-14" aria-labelledby="gallery-heading">
      <h1
        id="gallery-heading"
        className="text-center text-md text-gray-600 mb-6"
      >
        Show off your latest finds!
        <br />
        <span className="text-gray-950 font-bold text-4xl">
          #SoudSolution
        </span>
      </h1>

      {/* For larger screens (Grid Layout) */}
      <div className="hidden lg:flex justify-center space-x-6 items-center">
        {images.length >= 9 ? ( // Make sure images has at least 9 elements
          <>
            <div className="space-y-6">
              <div className="flex items-end space-x-6">
                {images[0] && images[0].image && (
                  <Image
                    src={urlFor(images[0].image).url()}
                    alt={images[0].altText}
                    width={992}
                    height={1000}
                    className="lg:w-[52.22px] lg:h-[382px]"
                    loading="lazy"
                  />
                )}
                {images[1] && images[1].image && (
                  <Image
                    src={urlFor(images[1].image).url()}
                    alt={images[1].altText}
                    width={992}
                    height={1000}
                    className="lg:w-[435.22px] lg:h-[312px]"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="flex space-x-6">
                {images[2] && images[2].image && (
                  <Image
                    src={urlFor(images[2].image).url()}
                    alt={images[2].altText}
                    width={992}
                    height={1000}
                    className="lg:w-[159.22px] lg:h-[323px]"
                    loading="lazy"
                  />
                )}
                {images[3] && images[3].image && (
                  <Image
                    src={urlFor(images[3].image).url()}
                    alt={images[3].altText}
                    width={992}
                    height={1000}
                    className="lg:w-[328.22px] lg:h-[242px]"
                    loading="lazy"
                  />
                )}
              </div>
            </div>
            {images[4] && images[4].image && (
              <div>
                <Image
                  src={urlFor(images[4].image).url()}
                  alt={images[4].altText}
                  width={992}
                  height={1000}
                  className="lg:w-[255.22px] lg:h-[392px]"
                  loading="lazy"
                />
              </div>
            )}
            <div className="space-y-6">
              <div className="flex items-end space-x-6">
                {images[5] && images[5].image && (
                  <Image
                    src={urlFor(images[5].image).url()}
                    alt={images[5].altText}
                    width={992}
                    height={1000}
                    className="lg:w-[274.22px] lg:h-[348px]"
                    loading="lazy"
                  />
                )}
                {images[6] && images[6].image && (
                  <Image
                    src={urlFor(images[6].image).url()}
                    alt={images[6].altText}
                    width={992}
                    height={1000}
                    className="lg:w-[236.22px] lg:h-[433px]"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="flex space-x-6">
                {images[7] && images[7].image && (
                  <Image
                    src={urlFor(images[7].image).url()}
                    alt={images[7].altText}
                    width={992}
                    height={1000}
                    className="lg:w-[162.22px] lg:h-[242px]"
                    loading="lazy"
                  />
                )}
                {images[8] && images[8].image && (
                  <Image
                    src={urlFor(images[8].image).url()}
                    alt={images[8].altText}
                    width={992}
                    height={1000}
                    className="lg:w-[232.22px] lg:h-[196px]"
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          </>
        ) : (
          <p>Loading images...</p>
        )}
      </div>

      {/* For mobile and tablet screens (Modern Carousel Slider) */}
      <div className="lg:hidden flex flex-col items-center justify-center">
        {images.length > 0 &&
        images[currentIndex] &&
        images[currentIndex].image ? (
          <>
            <div className="relative w-[280px] md:w-[600px] h-[350px]">
              {/* Images */}
              <Image
                src={urlFor(images[currentIndex].image).url()}
                alt={images[currentIndex].altText}
                width={992}
                height={1000}
                className="w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-500"
                loading="lazy"
              />

              {/* Previous Button */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition duration-300"
              >
                <FaChevronLeft size={20} />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition duration-300"
              >
                <FaChevronRight size={20} />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex mt-6 space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentIndex ? "bg-gray-800" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </>
        ) : (
          <p>Loading images...</p>
        )}
      </div>
    </section>
  );
};

export default ImageGrid;
