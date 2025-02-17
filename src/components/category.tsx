'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import { motion } from 'framer-motion'; // Animation library

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

  const categoryVariants = {  // framer-motion variants for animation
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
    <div className="py-16 bg-gray-50"> {/* Softer background */}
      <div className="container mx-auto px-4"> {/* Container for max-width */}
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.mainHeading}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">{data.subHeading}</p> {/* Centered subheading */}
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {data.categories.map((category, index) => (
            <motion.div // Wrap with motion.div for animation
              key={index}
              className="rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform transform hover:scale-105" // Added more visual appeal
              onClick={() => handleCategoryClick(category.title)}
              role="button"
              aria-label={`Explore category: ${category.title}`}
              variants={categoryVariants}
              initial="hidden"
              animate="visible"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }} // Added transparency
            >
              <div className="relative h-[400px]"> {/* Fixed height for images */}
                <Image
                  src={urlFor(category.image).url()}
                  alt={`Category: ${category.title}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-opacity duration-300 hover:opacity-90" // Added hover effect
                  priority={index < 3} // Prioritize loading first few images
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-700">{category.title}</h3> {/* Darker text */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseRange;