'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ICategory {
  title: string;
  image: string;
}

const fetchBrowseCategories = async () => {
  try {
    return await client.fetch(
      `*[_type == "browseCategories"][0]{mainHeading, subHeading, categories}`
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
};

const BrowseRange = () => {
  const [data, setData] = useState<{ mainHeading: string; subHeading: string; categories: ICategory[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchBrowseCategories();
      setData(fetchedData);
      setLoading(false);
    };
    getData();
  }, []);

  const handleCategoryClick = useCallback((title: string) => {
    window.location.href = `/category/${encodeURIComponent(title)}`;
  }, []);

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Failed to load categories. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{data.mainHeading}</h2>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">{data.subHeading}</p>
        </div>

        {/* Swiper Container with Relative Positioning */}
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
          >
            {data.categories.map((category, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  className="rounded-2xl overflow-hidden shadow-xl cursor-pointer transition-transform transform hover:scale-105"
                  onClick={() => handleCategoryClick(category.title)}
                  role="button"
                  aria-label={`Explore category: ${category.title}`}
                  variants={categoryVariants}
                  initial="hidden"
                  animate="visible"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                >
                  <div className="relative h-[350px]">
                    <Image
                      src={urlFor(category.image).url()}
                      alt={`Category: ${category.title}`}
                      fill
                      style={{ objectFit: 'cover', transition: 'opacity 0.3s ease-in-out' }}
                      className="hover:opacity-90"
                      priority={index < 4}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.title}</h3>
                    {/* You can add a short description here if available */}
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons - Positioned Relative to Swiper */}
          <div className="absolute z-20 top-1/2 transform -translate-y-1/2 w-full flex justify-between items-center px-4">
            <button
              className="swiper-button-prev bg-white/70 backdrop-blur-md p-7 rounded-full shadow-md hover:bg-white/90 transition-colors"
              aria-label="Previous"
            >
              <FaChevronLeft  className="text-gray-700" size={20} />
            </button>
            <button
              className="swiper-button-next bg-white/70 backdrop-blur-md p-7 rounded-full shadow-md hover:bg-white/90 transition-colors"
              aria-label="Next"
            >
              <FaChevronRight className="text-gray-700" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseRange;