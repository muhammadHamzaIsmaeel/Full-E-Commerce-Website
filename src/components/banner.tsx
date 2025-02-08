"use client";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

interface IBanner {
  _id: string;
  image: string;
  alt: string;
  topHeading: string;
  centerHeading: string;
  bottomHeading: string;
  buttonLink: string;
}

const fetchBannerData = async () => {
  try {
    return await client.fetch(
      '*[_type == "banner"]{_id, topHeading, centerHeading, bottomHeading, buttonLink, image, "alt": altText}'
    );
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
    }, 3000);
    return () => clearInterval(slideInterval);
  }, [banners.length]);

  const handleSlideChange = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

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
            Furniro...
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
    <section className="relative w-full h-full overflow-hidden" aria-label="Banner Carousel">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        aria-live="polite"
      >
        {banners.map((banner, index) => (
          <figure key={banner._id} className="relative min-w-full h-full bg-cover bg-center" aria-hidden={index !== currentSlide}>
            <Image
              src={urlFor(banner.image).url()}
              alt={banner.alt || `Banner ${index + 1}`}
              width={1920}
              height={1080}
              priority={index === 0}
              className="w-full md:h-[400px] h-[250px] lg:h-[650px] object-cover"
            />
            <figcaption className="absolute top-1/2 py-3 px-2 md:pl-8 md:pr-5 md:pt-9 w-[190px] h-[140px] md:w-[360px] md:h-[280px] right-6 md:right-12 lg:w-[623px] lg:h-[423px] rounded-xl bg-[#FFF3E3] transform -translate-y-1/2">
              <h2 className="lg:text-xl md:text-xl text-[13px] font-semibold">{banner.topHeading}</h2>
              <h1 className="lg:text-5xl text-[12px] lg:my-4 md:text-2xl py-1 text-[#B88E2F] font-extrabold">
                {banner.centerHeading}
              </h1>
              <p className="lg:font-semibold text-[8px] text-gray-600 md:text-sm">{banner.bottomHeading}</p>
              <a
                href={banner.buttonLink}
                className="bg-[#B88E2F] cursor-pointer hover:bg-[rgba(184,143,47,0.77)] md:mt-7 py-1 px-1 lg:mt-12 md:px-5 md:py-2 lg:px-12 lg:py-6 text-[10px] lg:text-[20px] text-white font-bold inline-block"
                aria-label={`Learn more about ${banner.centerHeading}`}
              >
                BUY NOW
              </a>
            </figcaption>
          </figure>
        ))}
      </div>
      <nav className="absolute bottom-4 w-full flex justify-center space-x-2" aria-label="Carousel Navigation">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-gray-500"}`}
            aria-label={`Slide ${index + 1}`}
            aria-current={index === currentSlide ? "true" : "false"}
          ></button>
        ))}
      </nav>
    </section>
  );
}