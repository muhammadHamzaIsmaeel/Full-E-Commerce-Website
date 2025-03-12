"use client";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IBanner {
  _id: string;
  image: string;
  alt: string;
  topHeading?: string;
  centerHeading?: string;
  bottomHeading?: string;
  buttonLink?: string;
}

const fetchBannerData = async () => {
  try {
    const data = await client.fetch(
      '*[_type == "banner"]{_id, topHeading, centerHeading, bottomHeading, buttonLink, image, "alt": altText}'
    );
    return data;
  } catch (error) {
    console.error("Error fetching banner data:", error);
    return [];
  }
};

export default function Banner() {
  const [banners, setBanners] = useState<IBanner[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBanners = async () => {
      const data = await fetchBannerData();
      setBanners(data);
      setLoading(false);
    };
    getBanners();
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [banners.length]);

  const handleSlideChange = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Animation Variants
  const slideVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.3, ease: "easeOut" },
    },
  };

  if (loading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="text-center space-y-6">
          <Image
            src="/logo.png"
            alt="Loading Logo"
            width={120}
            height={80}
            className="mx-auto mb-4 animate-pulse"
            loading="lazy"
          />
          <div className="text-3xl font-bold text-black animate-pulse">
            Saud Solution...
          </div>
          <div className="flex justify-center space-x-2 text-yellow-700">
            <span className="dot text-5xl">.</span>
            <span className="dot text-5xl">.</span>
            <span className="dot text-5xl">.</span>
          </div>
        </div>
      </div>
    );

  return (
    <section
      className="relative w-full overflow-hidden"
      aria-label="Banner Carousel"
    >
      <AnimatePresence mode="wait">
        {banners.map((banner, index) => {
          if (index === currentSlide) {
            return (
              <motion.div
                key={banner._id}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative min-w-full h-[230px] sm:h-[300px] md:h-[400px] lg:h-[600px]"
                aria-hidden={index !== currentSlide}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/20 z-10"></div>

                {/* Banner Image */}
                <Image
                  src={urlFor(banner.image).url()}
                  alt={banner.alt || `Banner ${index + 1}`}
                  width={1920}
                  height={1080}
                  priority={index === 0} // Only prioritize the first banner
                  loading={index === 0 ? "eager" : "lazy"} // Lazy load offscreen banners
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  className="w-full h-full"
                />

                {/* Banner Text */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-4 z-20">
                  {banner.topHeading && (
                    <motion.h2
                      className="text-white text-lg sm:text-xl md:text-2xl font-semibold uppercase tracking-widest mb-2 drop-shadow-md"
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {banner.topHeading}
                    </motion.h2>
                  )}
                  {banner.centerHeading && (
                    <motion.h1
                      className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-extrabold leading-tight mb-4 drop-shadow-md"
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {banner.centerHeading}
                    </motion.h1>
                  )}
                  {banner.bottomHeading && (
                    <motion.p
                      className="text-white text-sm sm:text-base md:text-lg font-semibold drop-shadow-md"
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {banner.bottomHeading}
                    </motion.p>
                  )}
                </div>

                {/* Button Link */}
                {banner.buttonLink && (
                  <Link
                    href={banner.buttonLink}
                    aria-label={`Go to ${banner.buttonLink}`}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
                  >
                    <motion.button
                      className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      Explore More
                    </motion.button>
                  </Link>
                )}
              </motion.div>
            );
          }
          return null;
        })}
      </AnimatePresence>

      {/* Navigation Dots */}
      <nav
        className="absolute bottom-4 w-full flex justify-center space-x-2 z-20"
        aria-label="Carousel Navigation"
      >
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentSlide ? "bg-yellow-500" : "bg-white/50"
            }`}
            aria-label={`Slide ${index + 1}`}
            aria-current={index === currentSlide ? "true" : "false"}
          ></button>
        ))}
      </nav>
    </section>
  );
}
