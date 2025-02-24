"use client";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import Feature from "@/components/button/feature";
import { urlFor } from "@/sanity/lib/image";
import { MdKeyboardArrowRight } from "react-icons/md";

interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  discountPercentage?: number;
  productImage: string;
  features: {
    salesPackage: string;
    modelNumber: string;
    secondaryMaterial: string;
    configuration: string;
    upholsteryMaterial: string;
    upholsteryColor: string;
    fillingMaterial: string;
    finishType: string;
    adjustableHeadrest: string;
    maximumLoadCapacity: string;
    originOfManufacture: string;
    width: string;
    height: string;
    depth: string;
    weight: string;
    seatHeight: string;
    legHeight: string;
    warrantySummary: string;
    warrantyServiceType: string;
    coveredInWarranty: string;
    notCoveredInWarranty: string;
    domesticWarranty: string;
  };
}

const fetchProductById = async (id: string): Promise<IProduct | null> => {
  const query = `*[_type == "product" && _id == $id][0]{
    _id,
    title,
    description,
    price,
    oldPrice,
    discountPercentage,
    productImage,
    features
  }`;
  const product = await client.fetch(query, { id });
  return product;
};

export default function ComparisonPage() {
  const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const query = `*[_type == "product"][0...8]{
        _id,
        title,
        productImage
      }`;
      const products = await client.fetch(query);
      setAllProducts(products);
    };

    fetchAllProducts();
  }, []);

  const toggleProductInComparison = async (productId: string) => {
    if (selectedProducts.some((p) => p._id === productId)) {
      setSelectedProducts(selectedProducts.filter((p) => p._id !== productId));
    } else {
      const product = await fetchProductById(productId);
      if (product && selectedProducts.length < 2) {
        setSelectedProducts([...selectedProducts, product]);
      }
    }
  };

  type FeatureKey = keyof IProduct["features"];

  const featureSections = [
    {
      title: "General",
      features: [
        { label: "Sales Package", key: "salesPackage" as FeatureKey },
        { label: "Model Number", key: "modelNumber" as FeatureKey },
        { label: "Secondary Material", key: "secondaryMaterial" as FeatureKey },
        { label: "Configuration", key: "configuration" as FeatureKey },
        {
          label: "Upholstery Material",
          key: "upholsteryMaterial" as FeatureKey,
        },
        { label: "Upholstery Color", key: "upholsteryColor" as FeatureKey },
      ],
    },
    {
      title: "Product",
      features: [
        { label: "Filling Material", key: "fillingMaterial" as FeatureKey },
        { label: "Finish Type", key: "finishType" as FeatureKey },
        {
          label: "Adjustable Headrest",
          key: "adjustableHeadrest" as FeatureKey,
        },
        {
          label: "Maximum Load Capacity",
          key: "maximumLoadCapacity" as FeatureKey,
        },
        {
          label: "Origin of Manufacture",
          key: "originOfManufacture" as FeatureKey,
        },
      ],
    },
    {
      title: "Dimensions",
      features: [
        { label: "Width", key: "width" as FeatureKey },
        { label: "Height", key: "height" as FeatureKey },
        { label: "Depth", key: "depth" as FeatureKey },
        { label: "Weight", key: "weight" as FeatureKey },
        { label: "Seat Height", key: "seatHeight" as FeatureKey },
        { label: "Leg Height", key: "legHeight" as FeatureKey },
      ],
    },
    {
      title: "Warranty",
      features: [
        { label: "Warranty Summary", key: "warrantySummary" as FeatureKey },
        {
          label: "Warranty Service Type",
          key: "warrantyServiceType" as FeatureKey,
        },
        {
          label: "Covered in Warranty",
          key: "coveredInWarranty" as FeatureKey,
        },
        {
          label: "Not Covered in Warranty",
          key: "notCoveredInWarranty" as FeatureKey,
        },
        { label: "Domestic Warranty", key: "domesticWarranty" as FeatureKey },
      ],
    },
  ];

  const handleCart = (product: IProduct) => {
    if (!product) return;

    // Retrieve the cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Add the selected product to the cart
    const updatedCart = [
      ...cart,
      {
        ...product,
        quantity: 1, // Default quantity if not provided
      },
    ];

    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Notify the user
    alert("Product added to cart!");
  };

  return (
    <>
      {/* Banner Section */}
      <div className="relative w-full lg:h-[50vh] md:h-[30vh] h-[30vh] ">
        <Image
          src="/shop/banner11.png"
          alt="Comparison Banner"
          layout="fill"
          style={{ objectFit: "cover", filter: "blur(3px)", opacity: 0.7 }}
          objectFit="cover"
          loading="lazy"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-gray-950">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Saud Solution Logo"
              width={32}
              height={20}
              className="w-12 h-8"
              loading="lazy"
            />
          </Link>
          <h4 className="text-4xl font-bold">Product Comparison</h4>
          <h5 className="flex items-center text-sm md:text-xl mb-4 space-x-1">
            <Link className="font-bold text-2xl" href="/">
              Home
            </Link>
            <MdKeyboardArrowRight className="mt-2 text-2xl" />
            <a className="mt-1 md:mt-0" href="#">
              Comparison
            </a>
          </h5>
        </div>
      </div>

      <div className="container mx-auto p-4 md:space-y-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start space-y-4 md:space-y-0 md:space-x-4">
          {/* Left Section */}
          <div className="w-full md:w-1/3 space-y-3">
            <h2 className="text-gray-800 text-2xl md:text-3xl font-medium">
              Go to Product page for more Products
            </h2>
            <Link
              href="/shop"
              className="text-gray-500 text-sm underline hover:text-black transition"
            >
              View More
            </Link>
          </div>

          {/* Product Cards */}
          <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {allProducts.map((product) => {
              const isProductInComparison = selectedProducts.some(
                (p) => p._id === product._id
              );
              return (
                <div key={product._id} className="space-y-2 text-center">
                  <div className="w-full h-48 bg-[#F9F1E7] rounded-md flex items-center justify-center">
                    <Image
                      src={urlFor(product.productImage)
                        .width(1000)
                        .height(1000)
                        .url()}
                      alt={product.title}
                      width={200}
                      height={200}
                      className="w-auto h-auto max-h-full"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-800">
                    {product.title}
                  </h3>
                  <button
                    onClick={() => toggleProductInComparison(product._id)}
                    className={`px-4 py-2 ${
                      isProductInComparison ? "bg-red-500" : "bg-yellow-500"
                    } text-white rounded-lg shadow hover:${
                      isProductInComparison ? "bg-red-600" : "bg-yellow-600"
                    } transition`}
                  >
                    {isProductInComparison
                      ? "Remove From Comparison"
                      : "Add To Comparison"}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Add Product Section */}
          <div className="w-full md:w-1/3 flex flex-col items-end">
            <h2 className="text-gray-800 font-medium mb-2">Add A Product</h2>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition flex items-center"
              >
                Choose a Product ▼
              </button>
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                  <ul className="py-2">
                    {allProducts.map((product) => (
                      <li
                        key={product._id}
                        onClick={() => {
                          toggleProductInComparison(product._id);
                          setIsDropdownOpen(false);
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {product.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="flex flex-col md:flex-row justify-start pt-14 border-t border-gray-300">
          {/* Left Side - Feature Sections */}
          <div className="w-full md:w-1/4 p-4 border-r">
            {featureSections.map((section) => (
              <div key={section.title}>
                <h2 className="font-bold text-lg mb-6">{section.title}</h2>
                <ul className="space-y-6 mb-8">
                  {section.features.map((feature) => (
                    <li key={feature.key}>{feature.label}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right Side - Product Data */}
          {selectedProducts.map((product) => (
            <div key={product._id} className="w-full md:w-1/4 p-4 border-r">
              {featureSections.map((section) => (
                <div key={section.title}>
                  <h2 className="font-bold text-lg mb-6">{section.title}</h2>
                  <ul className="space-y-6 mb-8">
                    {section.features.map((feature) => (
                      <li key={feature.key}>{product.features[feature.key]}</li>
                    ))}
                  </ul>
                </div>
              ))}
              <button
                onClick={() => handleCart(product)}
                className="my-6 px-7 py-3 bg-red-500 text-white"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <Feature />
    </>
  );
}
