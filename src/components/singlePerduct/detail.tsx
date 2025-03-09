import React, { useState, useEffect } from "react";
import { useLocalStorage } from "@/app/context/CartContext";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Notification from "../Notification";
import Head from "next/head";
import ProductInfo from "./detail/ProductInfo";
import ProductReviews from "./detail/ProductReviews";
import ProductImages from "./detail/ProductImages";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableTextBlock } from "next-sanity";

export interface IProduct {
  title: string;
  price: string;
  oldPrice: string;
  description?: PortableTextBlock[];
  tags?: string[];
  SKU?: string;
  category?: string;
  rating?: number;
  customerReview?: number;
  productImage?: SanityImageSource;
  productImage1?: SanityImageSource;
  productImage2?: SanityImageSource;
  productImage3?: SanityImageSource;
  productImage4?: SanityImageSource;
  productImage5?: SanityImageSource;
  productImage6?: SanityImageSource;
  productImage7?: SanityImageSource;
  productImage8?: SanityImageSource;
  productImage9?: SanityImageSource;
  availableSizes?: string[];
  availableColors?: string[];
  defaultSize?: string;
  defaultColor?: string;
  reviews?: IReview[];
  productVideo?: {
    _type: "file";
    asset: {
      _ref: string;
      _type: "reference";
      url?: string;
    };
  };
  stockQuantity: number;
  _id: string;
}

interface IReview {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
  isVerifiedPurchase?: boolean;
}

interface Props {
  id: string;
}

const Detail: React.FC<Props> = ({ id }) => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useLocalStorage<IProduct[]>("cart", []);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const [, setSelectedImage] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    if (!id) {
      setError("Product ID is missing.");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const query = `*[_type == "product" && _id == $id][0]{
                    title,
                    price,
                    oldPrice,
                    description,
                    tags,
                    SKU,
                    category,
                    productImage,
                    productImage1,
                    productImage2,
                    productImage3,
                    productImage4,
                    productImage5,
                    productImage6,
                    productImage7,
                    productImage8,
                    productImage9,
                    availableSizes,
                    availableColors,
                    defaultSize,
                    defaultColor,
                    stockQuantity,
                    _id,
                    productVideo{
                         asset->{
                             url
                         }
                     },
                    "reviews": *[_type == "review" && references(^._id)]{
                      _id,
                      name,
                      rating,
                      comment,
                      createdAt,
                      isVerifiedPurchase,
                    }
                  }`;

        const data: IProduct = await client.fetch(query, { id });

        if (!data) {
          setError("Product not found.");
          setLoading(false);
          return;
        }

        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to fetch product data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const getDescriptionText = (
    description: PortableTextBlock[] | undefined
  ): string => {
    if (!description || description.length === 0) return "";

    return description
      .map((block) => {
        if (block._type !== "block" || !block.children) return "";
        return block.children
          .map((child) => {
            if (
              typeof child === "object" &&
              child !== null &&
              "text" in child
            ) {
              return (child as { text?: string }).text || "";
            }
            return "";
          })
          .join("");
      })
      .join("\n");
  };

  const handleAddToCart = () => {
    if (!product) return;

    if (!isLoaded) {
      console.log("Clerk is still loading...");
      return;
    }

    if (!isSignedIn) {
      const returnBackUrl = window.location.href;
      router.push(
        `/sign-in?returnBackUrl=${encodeURIComponent(returnBackUrl)}`
      );
      return;
    }

    const updatedCart = [
      ...cart,
      {
        ...product,
        quantity: 1,
        selectedColor: product.defaultColor,
        selectedSize: product.defaultSize,
      },
    ];

    setCart(updatedCart);
    setNotification({ message: "Product added to cart!", type: "success" });
  };

  const handleBuyNow = () => {
    if (!product) return;

    if (!isLoaded) {
      console.log("Clerk is still loading...");
      return;
    }

    if (!isSignedIn) {
      const returnBackUrl = window.location.href;
      router.push(
        `/sign-in?returnBackUrl=${encodeURIComponent(returnBackUrl)}`
      );
      return;
    }

    const productToAdd = {
      ...product,
      quantity: 1,
      selectedColor: product.defaultColor,
      selectedSize: product.defaultSize,
    };

    const updatedCart = [...cart, productToAdd];
    setCart(updatedCart);

    router.push("/checkout");
    setNotification({ message: "Redirecting to checkout...", type: "success" });
  };

  const handleShare = (platform: "facebook" | "twitter" | "instagram") => {
    if (!product) return;
    const productUrl = window.location.href;
    let url = "";
    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          productUrl
        )}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          productUrl
        )}&text=Check out this product!`;
        break;
      case "instagram":
        url = `https://www.instagram.com/?url=${encodeURIComponent(
          productUrl
        )}`;
        break;
    }
    window.open(url, "_blank");
  };

  const handleSubmitReview = async (review: {
    name: string;
    rating: number;
    comment: string;
  }) => {
    try {
      setLoading(true);
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
          name: review.name,
          rating: review.rating,
          comment: review.comment,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API route error:", errorData);
        setNotification({
          message: errorData.error || "Failed to submit review.",
          type: "error",
        });
        setLoading(false);
        return;
      }

      const data = await response.json();
      const newReview = data.review;

      setProduct((prevProduct) => {
        if (!prevProduct) return prevProduct;
        return {
          ...prevProduct,
          reviews: [...(prevProduct.reviews || []), newReview],
        };
      });

      setNotification({
        message: "Review submitted successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Error submitting review:", error);
      setNotification({ message: "Failed to submit review.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!product) return <p>Product not found.</p>;

  const {
    title,
    oldPrice,
    description,
    tags,
    SKU,
    category,
    productImage,
    productImage1,
    productImage2,
    productImage3,
    productImage4,
    productImage5,
    productImage6,
    productImage7,
    productImage8,
    productImage9,
    stockQuantity,
    reviews,
    productVideo,
  } = product;

  const thumbnailImages = [
    productImage,
    productImage1,
    productImage2,
    productImage3,
    productImage4,
    productImage5,
    productImage6,
    productImage7,
    productImage8,
    productImage9,
    productVideo ? "/play.png" : null, // Use the placeholder for video
  ]
    .filter((img): img is SanityImageSource | string => img !== null)
    .slice(0, 10)
    .map((img) => {
      if (typeof img === "string") {
        return img;
      }
      return urlFor(img).url();
    });

  const handleThumbnailClick = (src: string, isVideo: boolean) => {
    if (isVideo) {
      setVideoUrl(productVideo?.asset?.url || null); // Set video URL
      setSelectedImage(null); // Clear selected image
    } else {
      setSelectedImage(src); // Set selected image
      setVideoUrl(null); // Clear video URL
    }
  };

  const averageRating =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  const ratingCounts = {
    5: reviews?.filter((review) => review.rating === 5).length || 0,
    4: reviews?.filter((review) => review.rating === 4).length || 0,
    3: reviews?.filter((review) => review.rating === 3).length || 0,
    2: reviews?.filter((review) => review.rating === 2).length || 0,
    1: reviews?.filter((review) => review.rating === 1).length || 0,
  };

  return (
    <>
      <Head>
        <title>{title} - Buy online at Saud Solution</title>
        <meta name="description" content={getDescriptionText(description)} />
        <meta
          name="keywords"
          content={`${title}, ${category}, ${tags?.join(", ")}, product, buy online`}
        />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={getDescriptionText(description)}
        />
      </Head>
      <div className="max-w-7xl mx-auto grid md:mx-8 grid-cols-1 lg:grid-cols-12 gap-12">
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
        <ProductImages
          images={thumbnailImages}
          videoUrl={videoUrl}
          onThumbnailClick={handleThumbnailClick}
        />

        <ProductInfo
          title={title}
          price={product.price}
          oldPrice={oldPrice}
          description={description}
          SKU={SKU}
          category={category}
          tags={tags}
          stockQuantity={stockQuantity}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onShare={handleShare}
        />
      </div>
      <ProductReviews
        reviews={reviews || []}
        averageRating={averageRating}
        ratingCounts={ratingCounts}
        onSubmitReview={handleSubmitReview}
      />
    </>
  );
};

export default Detail;
