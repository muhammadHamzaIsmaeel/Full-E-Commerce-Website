"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const ImageGrid = () => {
  const images = [
    { src: "/fram/1.png", alt: "Beautiful living room setup with Funiro furniture" },
    { src: "/fram/2.png", alt: "Cozy bedroom design featuring Funiro bed" },
    { src: "/fram/3.png", alt: "Modern dining table with elegant Funiro chairs" },
    { src: "/fram/4.png", alt: "Compact workspace with stylish Funiro desk" },
    { src: "/fram/5.png", alt: "Well-lit room showcasing Funiro furniture collection" },
    { src: "/fram/6.png", alt: "Outdoor seating area with Funiro patio furniture" },
    { src: "/fram/7.png", alt: "Minimalist living room design with Funiro sofa" },
    { src: "/fram/8.png", alt: "Close-up of Funiro furniture details" },
    { src: "/fram/9.png", alt: "Funiro chairs in a modern kitchen setting" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide for carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Change image every 4 seconds
    return () => clearInterval(interval);
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
      <h1 id="gallery-heading" className="text-center text-sm text-gray-600 mb-6">
        Share your setup with
        <br />
        <span className="text-gray-950 font-bold text-3xl">#FuniroFurniture</span>
      </h1>

      {/* For larger screens (Grid Layout) */}
      <div className="hidden lg:flex justify-center space-x-6 items-center">
        <div className="space-y-6">
          <div className="flex items-end space-x-6">
            <Image
              src={images[0].src}
              alt={images[0].alt}
              width={992}
              height={1000}
              className="lg:w-[32.22px] lg:h-[382px]"
              loading="lazy"
            />
            <Image
              src={images[1].src}
              alt={images[1].alt}
              width={992}
              height={1000}
              className="lg:w-[405.22px] lg:h-[312px]"
              loading="lazy"
            />
          </div>
          <div className="flex space-x-6">
            <Image
              src={images[2].src}
              alt={images[2].alt}
              width={992}
              height={1000}
              className="lg:w-[139.22px] lg:h-[323px]"
              loading="lazy"
            />
            <Image
              src={images[3].src}
              alt={images[3].alt}
              width={992}
              height={1000}
              className="lg:w-[298.22px] lg:h-[242px]"
              loading="lazy"
            />
          </div>
        </div>
        <div>
          <Image
            src={images[4].src}
            alt={images[4].alt}
            width={992}
            height={1000}
            className="lg:w-[249.22px] lg:h-[392px]"
            loading="lazy"
          />
        </div>
        <div className="space-y-6">
          <div className="flex items-end space-x-6">
            <Image
              src={images[5].src}
              alt={images[5].alt}
              width={992}
              height={1000}
              className="lg:w-[244.22px] lg:h-[348px]"
              loading="lazy"
            />
            <Image
              src={images[6].src}
              alt={images[6].alt}
              width={992}
              height={1000}
              className="lg:w-[216.22px] lg:h-[433px]"
              loading="lazy"
            />
          </div>
          <div className="flex space-x-6">
            <Image
              src={images[7].src}
              alt={images[7].alt}
              width={992}
              height={1000}
              className="lg:w-[132.22px] lg:h-[242px]"
              loading="lazy"
            />
            <Image
              src={images[8].src}
              alt={images[8].alt}
              width={992}
              height={1000}
              className="lg:w-[212.22px] lg:h-[196px]"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* For mobile and tablet screens (Modern Carousel Slider) */}
      <div className="lg:hidden flex flex-col items-center justify-center">
        <div className="relative w-[280px] md:w-[600px] h-[350px]">
          {/* Images */}
          <Image
            src={images[currentIndex].src}
            alt={`Image ${currentIndex + 1}`}
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
      </div>
    </section>
  );
};

export default ImageGrid;
 