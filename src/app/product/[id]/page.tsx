"use client";
import { useParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { FaAngleRight } from "react-icons/fa";
import Head from "next/head";
import Products from "@/components/product";
import Detail from "@/components/singlePerduct/detail";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  tag?: string;
  productImage: string;
  image1?: string;
  image2?: string;
  image3?: string;
  rating?: number;
  customerReview?: number;
  shortDescription?: string;
  size: string;
  color: string;
  SKU?: string;
  category?: string;
  tags?: string;
}

const getProductDataById = async (id: string) => {
  try {
    const query = `*[_type == "product" && _id == $id]{
      _id, 
      title, 
      description, 
      price, 
      oldPrice, 
      discount, 
      tag, 
      productImage,
      image1,
      image2,
      image3,
      rating,
      customerReview,
      shortDescription,
      size,
      color,
      SKU,
      category,
      tags
    }`;
    const data = await client.fetch(query, { id });
    return data.length ? data[0] : null;
  } catch (error) {
    console.error("Failed to fetch product data:", error);
    return null;
  }
};

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductDataById(productId);
        if (!data) {
          setError("Product not found.");
          return;
        }
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
        setError("Failed to fetch product data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!product) return <div className="text-center">Product not found.</div>;

  const tagsArray = product.tags
  ? typeof product.tags === 'string'
    ? [product.tags] // Convert string to array
    : product.tags // Use as is if already an array
  : undefined;

  return (
    <>
      <Head>
        <title>{product.title} | Your Shop Name</title>
        <meta
          name="description"
          content={product.shortDescription || product.description}
        />
        <meta
          name="keywords"
          content={`Shop, ${product.category}, ${product.tags}, ${product.title}`}
        />
        <meta property="og:title" content={product.title} />
        <meta
          property="og:description"
          content={product.shortDescription || product.description}
        />
        <meta property="og:image" content={product.productImage} />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.title} />
        <meta
          name="twitter:description"
          content={product.shortDescription || product.description}
        />
        <meta name="twitter:image" content={product.productImage} />
      </Head>

      <div>
        {/* Breadcrumb */}
        <div className="bg-[#F9F1E7] py-3 md:py-7">
          <nav aria-label="breadcrumb">
            <ol className="flex gap-3 text-sm md:ml-14 ml-3 text-gray-500 items-center">
              <li>
                <Link href="/" className="hover:text-black">
                  Home
                </Link>
              </li>
              <FaAngleRight className="text-black" />
              <li>
                <a href="/shop" className="hover:text-black">
                  Shop
                </a>
              </li>
              <FaAngleRight className="text-black" />
              <li aria-current="page" className="font-m text-gray-950">
                {product.title}
              </li>
            </ol>
          </nav>
        </div>

        {/* Product Details */}
        <Detail id={productId} />

        {/* Related Products Section */}
        <div className="py-16">
          <h2 className="text-center text-3xl font-medium mb-8">
            Related Products
          </h2>
          <Products tags={tagsArray} excludeId={product._id} />
        </div>
      </div>
    </>
  );
}
