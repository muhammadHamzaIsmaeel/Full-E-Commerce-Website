'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';

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
    <div className="text-center py-12">
      {/* Heading */}
      <h2 className="md:text-2xl text-xl font-bold mb-2">{data.mainHeading}</h2>
      <p className="text-gray-600 text-sm mx-8 md:text-base mb-8">{data.subHeading}</p>

      {/* Categories */}
      <div className="grid grid-cols-1 px-8 md:px-10 lg:px-0 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {data.categories.map((category, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => handleCategoryClick(category.title)}
            role="button"
            aria-label={`Explore category: ${category.title}`}
          >
            <Image
              src={urlFor(category.image).url()}
              alt={`Category: ${category.title}`}
              width={500}
              height={500}
              className="w-full h-[400px] md:h-auto object-cover"
              priority={index === 0} // Prioritize the first image for better performance
            />
            <div className="p-4">
              <h3 className="text-lg font-medium">{category.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseRange;