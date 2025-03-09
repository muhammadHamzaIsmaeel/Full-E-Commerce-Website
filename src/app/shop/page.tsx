"use client";
import React, { useState, useEffect} from "react";
import { client } from "@/sanity/lib/client";
import dynamic from "next/dynamic";
import { IProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import Head from "next/head";


const Filter = dynamic(() => import("@/components/shop/filter"));
const ProductGrid = dynamic(() => import("@/components/shop/products"));
const Pagination = dynamic(() => import("@/components/shop/pagination"));

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default function ShopProducts() {
  const [data, setData] = useState<IProduct[]>([]);
  const [filteredData, setFilteredData] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [isNew, setIsNew] = useState<boolean | null>(null);
  const [discounted, setDiscounted] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000]);
  const [show, setShow] = useState<number>(16);
  const [sortBy, setSortBy] = useState<string>("default");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Pagination States
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products: IProduct[] = await client.fetch(
          '*[_type == "product"]{_id, title, shortDescription, dicountPercentage, price, oldPrice, isNew, productImage, freeDelivery}'
        );
        setData(products);
        setFilteredData(products);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Failed to load products. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter Logic
  useEffect(() => {
    let filtered = [...data];

    if (isNew !== null) {
      filtered = filtered.filter((item) => item.isNew === isNew);
    }

    if (discounted) {
      filtered = filtered.filter((item) => item.dicountPercentage);
    }

    if (priceRange) {
      filtered = filtered.filter(
        (item) =>
          parseInt(item.price) >= priceRange[0] &&
          parseInt(item.price) <= priceRange[1]
      );
    }

    if (debouncedSearchQuery) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
    }

    if (sortBy === "price-asc") {
      filtered = filtered.sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
    } else if (sortBy === "price-desc") {
      filtered = filtered.sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price)
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [isNew, discounted, priceRange, sortBy, debouncedSearchQuery, data]);

  // Pagination Logic
  const indexOfLastProduct = currentPage * show;
  const indexOfFirstProduct = indexOfLastProduct - show;
  const currentProducts = filteredData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredData.length / show);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
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
            aria-label="Loading..."
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
  }

  if (error) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-red-600">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            aria-label="Retry"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Shop - Saud Solution</title>
        <meta
          name="description"
          content="Explore our wide range of products at Saud Solution. Find the best deals on high-quality items."
        />
        <meta
          name="keywords"
          content="shop, Saud Solution, products, deals, discounts"
        />
        <meta property="og:title" content="Shop - Saud Solution" />
        <meta
          property="og:description"
          content="Explore our wide range of products at Saud Solution. Find the best deals on high-quality items."
        />
        <meta property="og:image" content="/shop/banner11.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Shop - Saud Solution" />
        <meta
          name="twitter:description"
          content="Explore our wide range of products at Saud Solution. Find the best deals on high-quality items."
        />
        <meta name="twitter:image" content="/shop/banner11.png" />
      </Head>
      <div className="w-full">
        {/* Hero Section */}
        <div className="relative w-full lg:h-[50vh] md:h-[30vh] h-[30vh]">
          <Image
            src="/shop/banner11.png"
            alt="Shop Banner"
            layout="fill"
            style={{ objectFit: "cover", filter: "blur(3px)", opacity: 0.7 }}
            objectFit="cover"
            loading="lazy"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-gray-950">
            <Link href="/" aria-label="Go to Home">
              <Image
                src="/logo.png"
                alt="Saud Solution Logo"
                width="32"
                height="20"
                className="w-12 h-8"
                loading="lazy"
              />
            </Link>
            <h1 className="text-4xl font-bold">Shop</h1>
            <h2 className="flex items-center text-sm md:text-xl mb-4 space-x-1">
              <Link className="font-bold text-xl" href="/" aria-label="Home">
                Home
              </Link>
              <MdKeyboardArrowRight
                className="mt-2 text-2xl"
                aria-hidden="true"
              />
              <a className="mt-2 md:mt-0" href="#" aria-label="Shop">
                Shop
              </a>
            </h2>
          </div>
        </div>
      </div>

      <Filter
        setIsNew={setIsNew}
        discounted={discounted}
        setDiscounted={setDiscounted}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        show={show}
        setShow={setShow}
        sortBy={sortBy}
        setSortBy={setSortBy}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="py-12 md:px-5 px-7">
        {filteredData.length > 0 ? (
          <>
            <ProductGrid products={currentProducts} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center text-gray-700">
            No products match your filters.
          </div>
        )}
      </div>
    </div>
  );
}