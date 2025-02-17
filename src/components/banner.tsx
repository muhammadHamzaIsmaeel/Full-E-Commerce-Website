"use client";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

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
    console.log("Fetched banner data:", data); // Check the ENTIRE fetched data
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


  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3, ease: "easeOut" } },
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
    <section className="relative w-full overflow-hidden" aria-label="Banner Carousel">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        aria-live="polite"
      >
        {banners.map((banner, index) => {
            console.log(`Rendering banner ${index}:`, banner); // Check EACH banner's data
            return (
          <div key={banner._id} className="relative min-w-full h-[600px] bg-cover bg-center" aria-hidden={index !== currentSlide}>
            {banner.buttonLink ? (
              <Link href={banner.buttonLink} aria-label={`Go to ${banner.buttonLink}`} className="block relative w-full h-full">
                {/* Image with Fixed Height and objectFit */}
                <Image
                  src={urlFor(banner.image).url()}
                  alt={banner.alt || `Banner ${index + 1}`}
                  width={1920}
                  height={1080}
                  priority={index === 0}
                  style={{ objectFit: 'cover', objectPosition: 'center' }} // Set objectFit and objectPosition
                  className="w-full h-full" // Image takes the full width and height
                />
                {(banner.topHeading || banner.centerHeading || banner.bottomHeading) && (
                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                 {banner.topHeading && (
                   <motion.h2
                     className="text-white text-xl font-semibold uppercase tracking-widest mb-2 drop-shadow-md"
                     variants={textVariants}
                     initial="hidden"
                     animate="visible"
                   >
                     {banner.topHeading}
                   </motion.h2>
                 )}
                 {banner.centerHeading && (
                   <motion.h1
                     className="text-5xl text-white font-extrabold leading-tight mb-4 drop-shadow-md"
                     variants={textVariants}
                     initial="hidden"
                     animate="visible"
                   >
                     {banner.centerHeading}
                   </motion.h1>
                 )}
                 {banner.bottomHeading && (
                   <motion.p
                     className="text-white text-lg font-semibold drop-shadow-md"
                     variants={textVariants}
                     initial="hidden"
                     animate="visible"
                   >
                     {banner.bottomHeading}
                   </motion.p>
                 )}
               </div>
                )}
              </Link>
            ) : (
              // Image only (no link)
              <Image
                src={urlFor(banner.image).url()}
                alt={banner.alt || `Banner ${index + 1}`}
                width={1920}
                height={1080}
                priority={index === 0}
                style={{ objectFit: 'cover', objectPosition: 'center' }} // Set objectFit and objectPosition
                className="w-full h-full" // Image takes the full width and height
              />
            )}
          </div>
            )
        })}
      </div>
      <nav className="absolute bottom-4 w-full flex justify-center space-x-2" aria-label="Carousel Navigation">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentSlide ? "bg-white" : "bg-gray-500"
            }`}
            aria-label={`Slide ${index + 1}`}
            aria-current={index === currentSlide ? "true" : "false"}
          ></button>
        ))}
      </nav>
    </section>
  );
}