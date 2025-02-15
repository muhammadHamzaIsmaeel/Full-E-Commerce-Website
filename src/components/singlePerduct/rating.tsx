import { MdOutlineStar } from "react-icons/md";

interface RatingProps {
  rating: number;
  customerReview: number;
}

const Rating: React.FC<RatingProps> = ({ rating, customerReview }) => {
  return (
    <div className="flex items-center">
      <div className="flex">
        {Array.from({ length: rating || 0 }).map((_, i) => (
          <span key={i}>
            <MdOutlineStar className="text-yellow-400 text-[25px]" />
          </span>
        ))}
        {Array.from({ length: 5 - (rating || 0) }).map((_, i) => (
          <span key={i}>
            <MdOutlineStar className="text-yellow-100 text-[25px]" />
          </span>
        ))}
      </div>
      <span className="border-l-2 b h-6 mx-5"></span>
      <p className="text-gray-500">{customerReview} Customer Reviews</p>
    </div>
  );
};

export default Rating;