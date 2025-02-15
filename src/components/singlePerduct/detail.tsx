"use client";
import { useLocalStorage } from "@/app/context/CartContext";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaMinus,
  FaPlus,
  FaTwitter,
} from "react-icons/fa6";
import { MdOutlineStar } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Notification from "../Notification";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import VideoPlayer from "./VideoPlayer";
import { PortableText } from "@portabletext/react"; // Import PortableText
import { PortableTextBlock } from "@portabletext/types";


export interface IProduct {
  title: string;
  price: string;
  oldPrice: string;
  description?: PortableTextBlock[]; // Use PortableTextBlock array for description
  tags?: string[];
  SKU?: string;
  category?: string;
  rating?: number;
  customerReview?: number;
  productImage?: SanityImageSource;
  productImage1?: SanityImageSource;
  productImage2?: SanityImageSource;
  productImage3?: SanityImageSource;
  availableSizes?: string[];
  availableColors?: string[];
  defaultSize?: string;
  defaultColor?: string;
  reviews?: IReview[];
  productVideo?: {
    // Changed to file type
    _type: "file";
    asset: {
      _ref: string;
      _type: "reference";
      url?: string;
    };
  };
  stockQuantity: number; // Add the stock quantity here
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

export default function Detail({ id }: { id: string }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useLocalStorage<IProduct[]>("cart", []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();

  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCounts, setRatingCounts] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const closeNotification = () => {
    setNotification(null);
  };

  const [videoUrl, setVideoUrl] = useState<string | null>(null); // Video URL state

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
          availableSizes,
          availableColors,
          defaultSize,
          defaultColor,
          stockQuantity, // Add this line to fetch the stock
          _id,
          productVideo{
               asset->{
                   url
               }
           }, // Fetch video URL and its URL
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
        setReviews(data.reviews || []);

        if (data.productImage) {
          setSelectedImage(urlFor(data.productImage).url());
        }
        if (data.defaultSize) {
          setSelectedSize(data.defaultSize);
        }
        if (data.defaultColor) {
          setSelectedColor(data.defaultColor);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to fetch product data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const totalRating = reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      const avgRating = totalRating / reviews.length;
      setAverageRating(avgRating);

      type RatingCounts = {
        5: number;
        4: number;
        3: number;
        2: number;
        1: number;
      };
      const counts: RatingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      reviews.forEach((review) => {
        const ratingString = review.rating.toString();
        if (ratingString in counts) {
          counts[ratingString as unknown as keyof RatingCounts] += 1;
        } else {
          console.warn(`Invalid review rating: ${review.rating}`);
        }
      });
      setRatingCounts(counts);
    } else {
      setAverageRating(0);
      setRatingCounts({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
    }
  }, [reviews]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSignedIn) {
      const returnBackUrl = window.location.href;
      router.push(
        `/sign-in?returnBackUrl=${encodeURIComponent(returnBackUrl)}`
      );
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
          name: reviewName,
          rating: reviewRating,
          comment: reviewComment,
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

      setReviews((prevReviews) => [
        ...prevReviews,
        {
          _id: newReview._id,
          name: reviewName,
          rating: reviewRating,
          comment: reviewComment,
          createdAt: new Date().toISOString(),
        },
      ]);

      setReviewName("");
      setReviewRating(5);
      setReviewComment("");

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

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity(quantity + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
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

  const handleCart = () => {
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
        quantity,
        selectedColor,
        selectedSize,
      },
    ];

    setCart(updatedCart);
    setNotification({ message: "Product added to cart!", type: "success" });
  };

  const handlebuy = async () => {
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
      quantity,
      selectedColor,
      selectedSize,
    };

    // Add product to cart
    const updatedCart = [...cart, productToAdd];
    setCart(updatedCart);

    // Redirect to checkout
    router.push("/checkout");
    setNotification({ message: "Redirecting to checkout...", type: "success" });
  };

  const handleThumbnailClick = (src: string, isVideo: boolean) => {
    if (isVideo && product?.productVideo?.asset?.url) {
      console.log("Video thumbnail clicked!");
      console.log("Video URL:", product.productVideo.asset.url); // Log URL
      setSelectedImage(null);
      setVideoUrl(product?.productVideo?.asset?.url || null); // Set the video URL
      setIsModalOpen(false);
    } else {
      setSelectedImage(src);
      setVideoUrl(null);
      setIsModalOpen(false);
    }
  };

  const ImageModal = ({
    src,
    onClose,
  }: {
    src: string;
    onClose: () => void;
  }) => {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}
        onClick={onClose}
      >
        <Image
          src={src}
          alt="Full Screen"
          height={1000}
          width={1000}
          style={{ maxWidth: "90%", maxHeight: "90%", borderRadius: "8px" }}
        />
      </div>
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!product) return <p>Product not found.</p>;

  const {
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
    availableSizes,
    availableColors,
    stockQuantity,
  } = product;

  const thumbnailImages = [
    productImage,
    productImage1,
    productImage2,
    productImage3,
    product.productVideo ? "/video-placeholder.png" : null,
  ]
    .filter((img): img is SanityImageSource | string => img !== null)
    .map((img) => {
      if (typeof img === "string") {
        return img; // Serve the placeholder image directly
      }
      return urlFor(img).url(); // Get the URL from Sanity for image assets
    });

  return (
    <>
      <div className="max-w-7xl mx-auto grid md:mx-8 grid-cols-1 lg:grid-cols-12 gap-12">
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={closeNotification}
          />
        )}
        <div className="lg:col-span-6 lg:flex gap-3 md:gap-7 space-y-6">
          <div className="lg:space-y-10 md:space-x-0 space-x-5 flex justify-center lg:block mt-6">
            {thumbnailImages.map((src, index) => {
              const isVideoThumbnail = src === "/video-placeholder.png";
              return (
                <div
                key={index}
                className="w-16 h-16 rounded-lg overflow-hidden cursor-pointer relative" // Added 'relative'
                onClick={() => handleThumbnailClick(src, isVideoThumbnail)}
              >
                {isVideoThumbnail ? (
                  <div className="flex items-center justify-center bg-gray-800 text-white absolute inset-0"> {/* Added 'absolute inset-0' */}
                    <span>
                      <Image
                        src="/play.png"
                        alt="Play Video"
                        width={1000}
                        height={1000}
                        className="object-contain w-full h-full" // Changed 'object-cover' to 'object-contain'
                        loading="lazy"
                        style={{ objectFit: 'contain' }} // Added inline style as fallback
                      />
                    </span>
                  </div>
                ) : (
                  <Image
                    src={src}
                    alt={`Thumbnail ${index + 1}`}
                    width={1000}
                    height={1000}
                    className="object-contain w-full h-full" // Changed 'object-cover' to 'object-contain'
                    loading="lazy"
                    style={{ objectFit: 'contain' }} // Added inline style as fallback
                  />
                )}
              </div>
              );
            })}
          </div>

          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
            {videoUrl ? (
              <VideoPlayer src={videoUrl} />
            ) : (
              selectedImage && (
                <div onClick={() => setIsModalOpen(true)}>
                  <Image
                    src={selectedImage}
                    alt="Product Image"
                    width={1000}
                    height={1000}
                    className="h-[240px] lg:h-[500px] lg:w-[423px] object-cover cursor-pointer"
                    loading="lazy"
                  />
                </div>
              )
            )}
          </div>
        </div>

        <div className="lg:col-span-6 mx-3 md:mx-0 mt-8 space-y-6">
          {/* Product Title and Price */}
          <div className="items-start flex-col space-y-3">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
              {title}
            </h1>
            <div className="flex items-center space-x-3">
              <p className="text-xl font-semibold text-gray-700">Rs. {price}</p>
              {oldPrice && (
                <span className="text-red-600 pb-2 font-serif line-through text-lg">
                  Rs. {oldPrice}
                </span>
              )}
            </div>
          </div>

          {/* Stock Status */}
          <p
            className={`text-sm ${stockQuantity > 0 ? "text-green-600" : "text-red-600"} font-semibold`}
          >
            {stockQuantity > 0
              ? `In Stock: ${stockQuantity} units`
              : "Out of Stock"}
          </p>

          {/* Product Description - Shorten and add "Read More" if necessary */}
          <div className="text-gray-700 leading-relaxed">
            <PortableText value={description || []} />
          </div>

          {/* Size Selection */}
          {availableSizes && availableSizes.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Size:</h3>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 rounded-md border border-gray-400 text-gray-700 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#b9935a] ${
                      selectedSize === size
                        ? "bg-[#b9935a] text-white border-[#b9935a]"
                        : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {availableColors && availableColors.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Color:</h3>
              <div className="flex flex-wrap gap-2">
                {availableColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color }}
                    className={`w-8 h-8 rounded-full border border-gray-300 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b9935a] ${
                      selectedColor === color
                        ? "ring-2 ring-[#b9935a] border-none"
                        : ""
                    }`}
                    aria-label={`Select color ${color}`} // Accessibility
                  ></button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Adjustment and Add to Cart */}
          <div className="md:flex items-center md:space-y-0 space-y-3 md:space-x-4">
            {/* Quantity Control */}
            <div className="flex w-[130px]  items-center border border-gray-400 rounded-md overflow-hidden">
              <button
                onClick={() => handleQuantityChange("decrease")}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                disabled={quantity <= 1} // Disable decrease button when quantity is 1
              >
                <FaMinus />
              </button>
              <span className="px-5 py-3 text-gray-800">{quantity}</span>
              <button
                onClick={() => handleQuantityChange("increase")}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
              >
                <FaPlus />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              className={`bg-[#E53935] text-white px-8 py-3 rounded-md font-medium hover:bg-[#C62828] focus:outline-none focus:ring-2 focus:ring-[#b9935a]/50 transition-colors duration-200 ${
                stockQuantity <= 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleCart}
              disabled={stockQuantity <= 0}
            >
              {stockQuantity > 0 ? "Add to Cart" : "Out of Stock"}
            </button>

              <button
                className={`bg-[#2E7D32] ml-3 md:ml-0 text-white px-8 py-3 rounded-md font-medium transition-colors duration-200 
                ${stockQuantity > 0 ? "hover:bg-[#1B5E20] focus:ring-2 focus:ring-[#b9935a]/50" : "opacity-50 cursor-not-allowed"}`}
                onClick={handlebuy}
                disabled={stockQuantity <= 0}
              >
                {stockQuantity > 0 ? "Buy Now" : "Out of Stock"}
              </button>

          </div>

          {/* Product Meta Information (SKU, Category, Tags) */}
          <div className="border-t border-gray-300 pt-4">
            <div className="grid grid-cols-2 gap-y-2 text-gray-600 text-sm">
              <div>
                <span className="font-semibold">SKU:</span> {SKU}
              </div>
              <div>
                <span className="font-semibold">Category:</span> {category}
              </div>
              <div>
                <span className="font-semibold">Tags:</span>{" "}
                {tags?.join(", ") || "N/A"} {/* Handle empty tags */}
              </div>
            </div>
          </div>

          {/* Social Sharing Icons */}
          <div className="border-t border-gray-300 pt-4">
            <p className="font-semibold text-gray-700 mb-2">Share:</p>
            <div className="flex space-x-4">
              <FaFacebook
                className="text-gray-600 hover:text-[#3b5998] cursor-pointer text-2xl transition"
                onClick={() => handleShare("facebook")}
              />
              <FaTwitter
                className="text-gray-600 hover:text-[#1DA1F2] cursor-pointer text-2xl transition"
                onClick={() => handleShare("twitter")}
              />
              <FaInstagram
                className="text-gray-600 hover:text-[#E4405F] cursor-pointer text-2xl transition"
                onClick={() => handleShare("instagram")}
              />
            </div>
          </div>
        </div>

        {isModalOpen && selectedImage && (
          <ImageModal
            src={selectedImage}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>

      {/* Customer Reviews */}
      <section className="mt-12 py-8 px-6 ">
        {/* Average Rating Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-5xl font-bold text-gray-900">
              {averageRating.toFixed(1)}
              <span className="text-xl text-gray-500">/5</span>
            </h2>
            <div className="flex justify-center md:justify-start mt-2">
              {Array.from({ length: Math.floor(averageRating) }).map((_, i) => (
                <MdOutlineStar
                  key={i}
                  className="text-yellow-400 text-[28px]"
                />
              ))}
              {Array.from({ length: 5 - Math.floor(averageRating) }).map(
                (_, i) => (
                  <MdOutlineStar
                    key={i}
                    className="text-yellow-100 text-[28px]"
                  />
                )
              )}
            </div>
            <p className="text-gray-500 mt-2">{reviews.length} Ratings</p>
          </div>

          {/* Rating Breakdown */}
          <div className="w-full md:w-1/2">
            {Object.entries(ratingCounts)
              .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
              .map(([rating, count]) => (
                <div key={rating} className="flex items-center space-x-4 mb-3">
                  <span className="text-gray-700 w-16">{rating} Stars</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-yellow-400 rounded-full h-2.5"
                      style={{ width: `${(count / reviews.length) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-500 w-10 text-right">{count}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Reviews Heading */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-900">
            Product Reviews
          </h3>
        </div>

        {/* Reviews List */}
        <div className="mt-8">
          {reviews.length === 0 ? (
            <p className="text-gray-600 italic text-center py-6">
              No reviews yet.
            </p>
          ) : (
            <div className="space-y-6">
              {reviews
                .slice(0, showAllReviews ? reviews.length : 1)
                .map((review) => (
                  <div
                    key={review._id}
                    className="p-6 bg-yellow-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    {/* Review Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {/* User Avatar */}
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-lg font-semibold text-gray-700">
                            {review.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        {/* User Name and Rating */}
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="text-lg font-semibold text-gray-900">
                              {review.name}
                            </h4>
                            {/* Verified Tick */}
                            {review.isVerifiedPurchase && (
                              <span className="text-green-500">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-1">
                            {Array.from({ length: review.rating }).map(
                              (_, i) => (
                                <span key={i}>
                                  <MdOutlineStar className="text-yellow-400 text-[20px]" />
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Verified Purchase and Date */}
                      <div className="text-right">
                        {review.isVerifiedPurchase && (
                          <span className="text-green-500 text-sm font-medium">
                            Verified Purchase
                          </span>
                        )}
                        <p className="text-gray-500 text-sm mt-1">
                          {new Date(review.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Review Comment */}
                    <p className="text-gray-700 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))}
            </div>
          )}

          {/* Show More Button */}
          {reviews.length > 1 && !showAllReviews && (
            <div className="text-center mt-8">
              <button
                className="bg-[#B88E2F] hover:bg-[#937329] text-white font-semibold py-2 px-6 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:ring-offset-2"
                onClick={() => setShowAllReviews(true)}
              >
                Show More Reviews
              </button>
            </div>
          )}
        </div>

        {/* Review Form */}
        <form onSubmit={handleSubmitReview} className="mt-8 space-y-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="reviewName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your Name
            </label>
            <input
              type="text"
              id="reviewName"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent transition duration-200"
              placeholder="Enter your name"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              required
            />
          </div>

          {/* Rating Field */}
          <div>
            <label
              htmlFor="reviewRating"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Rating
            </label>
            <div className="relative">
              <select
                id="reviewRating"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent appearance-none transition duration-200"
                value={reviewRating}
                onChange={(e) => setReviewRating(Number(e.target.value))}
              >
                <option value={1}>1 Star</option>
                <option value={2}>2 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={5}>5 Stars</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                <svg
                  className="fill-current h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Comment Field */}
          <div>
            <label
              htmlFor="reviewComment"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your Review
            </label>
            <textarea
              id="reviewComment"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent transition duration-200"
              rows={5}
              placeholder="Write your review here..."
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-[#B88E2F] hover:bg-[#937329] text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:ring-offset-2 transition duration-200"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </div>
              ) : (
                "Submit Review"
              )}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
