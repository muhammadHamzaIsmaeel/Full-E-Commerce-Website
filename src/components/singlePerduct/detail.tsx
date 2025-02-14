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

export interface IProduct {
  title: string;
  price: string;
  description?: string;
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
}

interface IReview {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  image?: SanityImageSource;
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
            image
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
    stockQuantity
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
                  className="w-16 h-16 rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => handleThumbnailClick(src, isVideoThumbnail)}
                >
                  {isVideoThumbnail ? (
                    <div className="flex items-center justify-center bg-gray-800 text-white">
                      <span>
                        <Image
                          src="/play.png"
                          alt="Play Video"
                          width={1000}
                          height={1000}
                          className="md:w-full md:h-full object-cover"
                          loading="lazy"
                        />
                      </span>
                    </div>
                  ) : (
                    <Image
                      src={src}
                      alt={`Thumbnail ${index + 1}`}
                      width={1000}
                      height={1000}
                      className="md:w-full md:h-full object-cover"
                      loading="lazy"
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
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">
            {title}
          </h1>
          <p className="text-xl text-gray-400 font-semibold">Rs. {price}</p>

          {/* Display Stock Quantity */}
          <p className="text-gray-500">
            {stockQuantity > 0
              ? `In Stock: ${stockQuantity} units`
              : "Out of Stock"}
          </p>

          <p className="text-gray-600 md:mr-48">{description}</p>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-800">Size</h3>
              <div className="flex space-x-4 mt-2">
                {availableSizes?.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-md ${
                      selectedSize === size
                        ? "border-[#B88E2F] bg-[#B88E2F] text-white"
                        : "bg-[#F9F1E7] text-gray-700"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-800">Color</h3>
              <div className="flex space-x-4 mt-2">
                {availableColors?.map((color: string) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color }}
                    className={`w-8 h-8 rounded-full border ${
                      selectedColor === color
                        ? "ring-2 ring-[#b9935a]"
                        : "border-gray-300"
                    }`}
                  ></button>
                ))}
              </div>
            </div>
          </div>

          <div className="md:flex items-center space-y-5 md:space-y-0 space-x-4">
            <div className="w-[120px] flex items-center border rounded-md overflow-hidden">
              <button
                onClick={() => handleQuantityChange("decrease")}
                className="px-3 py-2 text-gray-600"
              >
                <FaMinus />
              </button>
              <span className="px-4 py-2 text-gray-800">{quantity}</span>
              <button
                onClick={() => handleQuantityChange("increase")}
                className="px-3 py-2 text-gray-600"
              >
                <FaPlus />
              </button>
            </div>

            <button
              className={`flex place-items-center border-2 ${
                stockQuantity <= 0 ? 'text-gray-400 cursor-not-allowed border-gray-400' : 'text-gray-700 hover:border-black'
              } px-10 py-3 rounded-md font-medium transition`}
              onClick={handleCart}
              disabled={stockQuantity <= 0}
            >
              Add to Cart
            </button>

            <button className="flex place-items-center border-2 text-gray-700 px-10 py-3 rounded-md font-medium hover:border-black transition">
              <FaPlus className="mx-2" />
              <a href={`/comparison/${id}`}>Compare</a>
            </button>
          </div>

          <div className="md:mr-[350px] md:grid md:grid-cols-2 gap-y-3 text-gray-400 text-sm items-center">
            <p className="font-medium">SKU:</p>
            <p>{SKU}</p>
            <p className="font-medium">Category:</p>
            <p>{category}</p>
            <p className="font-medium">Tags:</p>
            <p>{tags?.join(", ")}</p>
            <div className="flex gap-7">
              <p className="font-medium">Share:</p>
              <div className="flex ml-11 space-x-3">
                <FaFacebook
                  className="text-gray-950 hover:text-[#3b5998] cursor-pointer text-xl"
                  onClick={() => handleShare("facebook")}
                />
                <FaTwitter
                  className="text-gray-950 hover:text-[#1DA1F2] cursor-pointer text-xl"
                  onClick={() => handleShare("twitter")}
                />
                <FaInstagram
                  className="text-gray-950 hover:text-[#E4405F] cursor-pointer text-xl"
                  onClick={() => handleShare("instagram")}
                />
              </div>
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

      {/* Customer rewiews */}
      <section className="mt-12 py-8 px-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">
              {averageRating.toFixed(1)}
              <span className="text-xl text-gray-500">/5</span>
            </h2>
            <div className="flex">
              {Array.from({ length: Math.floor(averageRating) }).map((_, i) => (
                <MdOutlineStar
                  key={i}
                  className="text-yellow-400 text-[25px]"
                />
              ))}
              {Array.from({ length: 5 - Math.floor(averageRating) }).map(
                (_, i) => (
                  <MdOutlineStar
                    key={i}
                    className="text-yellow-100 text-[25px]"
                  />
                )
              )}
            </div>
            <p className="text-gray-500">{reviews.length} Ratings</p>
          </div>

          <div>
            {Object.entries(ratingCounts)
              .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
              .map(([rating, count]) => (
                <div
                  key={rating}
                  className="flex items-center justify-end space-x-2"
                >
                  <span className="text-gray-700">{rating} Stars</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 rounded-full h-2"
                      style={{ width: `${(count / reviews.length) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-500">{count}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-gray-900">
            Product Reviews
          </h3>
        </div>

        <div className="mt-6">
          {reviews.length === 0 ? (
            <p className="text-gray-600 italic text-center">No reviews yet.</p>
          ) : (
            <div className="space-y-4">
              {reviews
                .slice(0, showAllReviews ? reviews.length : 1)
                .map((review) => (
                  <div key={review._id} className="py-2">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <h4 className="text-lg font-semibold text-gray-900 mr-2">
                          {review.name}
                        </h4>
                        {review.isVerifiedPurchase && (
                          <span className="text-green-500 text-sm ml-2">
                            Verified Purchase
                          </span>
                        )}
                        <div className="flex">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <span key={i}>
                              <MdOutlineStar className="text-yellow-400 text-[25px]" />
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-500 text-sm">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {review.comment}
                    </p>
                    {review.image && (
                      <div className="mt-2">
                        <Image
                          src={urlFor(review.image).url()}
                          alt="Review Image"
                          width={80}
                          height={80}
                          className="rounded-md object-cover"
                        />
                      </div>
                    )}
                    {reviews.indexOf(review) <
                      (showAllReviews ? reviews.length : 1) - 1 && (
                      <hr className="border-gray-200 my-2" />
                    )}
                  </div>
                ))}
            </div>
          )}
          {reviews.length > 1 && !showAllReviews && (
            <div className="text-center mt-4">
              <button
                className="text-[#B88E2F] hover:text-[#937329] font-semibold py-2 px-4 rounded"
                onClick={() => setShowAllReviews(true)}
              >
                Show More Reviews
              </button>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmitReview} className="space-y-6">
          <div>
            <label
              htmlFor="reviewName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              id="reviewName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="reviewRating"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Rating:
            </label>
            <div className="relative">
              <select
                id="reviewRating"
                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                value={reviewRating}
                onChange={(e) => setReviewRating(Number(e.target.value))}
              >
                <option value={1}>1 Star</option>
                <option value={2}>2 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={5}>5 Stars</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="reviewComment"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Comment:
            </label>
            <textarea
              id="reviewComment"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={4}
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-[#B88E2F] hover:bg-[#937329] text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline transition duration-200 block w-full text-center"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}