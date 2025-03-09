import React, { useState } from "react";
import { MdOutlineStar } from "react-icons/md";

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
  isVerifiedPurchase?: boolean;
}

interface ProductReviewsProps {
  reviews: Review[];
  averageRating: number;
  ratingCounts: { [key: number]: number };
  onSubmitReview: (review: { name: string; rating: number; comment: string }) => void;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ reviews, averageRating, ratingCounts, onSubmitReview }) => {
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [showAllReviews, setShowAllReviews] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitReview({ name: reviewName, rating: reviewRating, comment: reviewComment });
  };

  return (
    <section className="mt-12 py-8 px-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-5xl font-bold text-gray-900">
            {averageRating.toFixed(1)}
            <span className="text-xl text-gray-500">/5</span>
          </h2>
          <div className="flex justify-center md:justify-start mt-2">
            {Array.from({ length: Math.floor(averageRating) }).map((_, i) => (
              <MdOutlineStar key={i} className="text-yellow-400 text-[28px]" />
            ))}
            {Array.from({ length: 5 - Math.floor(averageRating) }).map((_, i) => (
              <MdOutlineStar key={i} className="text-yellow-100 text-[28px]" />
            ))}
          </div>
          <p className="text-gray-500 mt-2">{reviews.length} Ratings</p>
        </div>

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

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-900">Product Reviews</h3>
      </div>

      <div className="mt-8">
        {reviews.length === 0 ? (
          <p className="text-gray-600 italic text-center py-6">No reviews yet.</p>
        ) : (
          <div className="space-y-6">
            {reviews
              .slice(0, showAllReviews ? reviews.length : 1)
              .map((review) => (
                <div
                  key={review._id}
                  className="p-6 bg-yellow-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-lg font-semibold text-gray-700">
                          {review.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {review.name}
                          </h4>
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
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <span key={i}>
                              <MdOutlineStar className="text-yellow-400 text-[20px]" />
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {review.isVerifiedPurchase && (
                        <span className="text-green-500 text-sm font-medium">
                          Verified Purchase
                        </span>
                      )}
                      <p className="text-gray-500 text-sm mt-1">
                        {new Date(review.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                </div>
              ))}
          </div>
        )}

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

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="reviewName" className="block text-sm font-medium text-gray-700 mb-2">
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

        <div>
          <label htmlFor="reviewRating" className="block text-sm font-medium text-gray-700 mb-2">
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

        <div>
          <label htmlFor="reviewComment" className="block text-sm font-medium text-gray-700 mb-2">
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

        <div>
          <button
            type="submit"
            className="w-full bg-[#B88E2F] hover:bg-[#937329] text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:ring-offset-2 transition duration-200"
          >
            Submit Review
          </button>
        </div>
      </form>
    </section>
  );
};

export default ProductReviews;