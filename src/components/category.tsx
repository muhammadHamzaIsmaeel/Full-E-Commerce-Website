'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'; // Shadcn Carousel

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

  // Animation Variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const imageVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
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
          <motion.h2
            className="text-4xl font-extrabold text-gray-900 mb-4"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            {data.mainHeading}
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-3xl mx-auto leading-relaxed"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            {data.subHeading}
          </motion.p>
        </div>

        {/* Shadcn Carousel */}
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {data.categories.map((category, index) => (
                <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div
                    className="flex flex-col items-center cursor-pointer group"
                    onClick={() => handleCategoryClick(category.title)}
                    role="button"
                    aria-label={`Explore category: ${category.title}`}
                  >
                    {/* Circular Frame with Border and Shadow */}
                    <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg border-4 border-white/20 group-hover:border-white/50 transition-all duration-300">
                      {/* Image with Zoom Effect */}
                      <motion.div
                        className="w-full h-full"
                        whileHover="hover"
                        variants={imageVariants}
                      >
                        <Image
                          src={urlFor(category.image).url()}
                          alt={`Category: ${category.title}`}
                          fill
                          style={{ objectFit: 'cover' }}
                          className="hover:scale-110"
                          priority={index < 4}
                        />
                      </motion.div>
                    </div>
                    {/* Category Title */}
                    <h3 className="text-xl font-semibold text-gray-800 mt-4 group-hover:text-gray-900 transition-colors duration-300">
                      {category.title}
                    </h3>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Buttons */}
            <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-md p-4 rounded-full shadow-lg hover:bg-white transition-colors border border-gray-200 hover:border-gray-300" />
            <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-md p-4 rounded-full shadow-lg hover:bg-white transition-colors border border-gray-200 hover:border-gray-300" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default BrowseRange;