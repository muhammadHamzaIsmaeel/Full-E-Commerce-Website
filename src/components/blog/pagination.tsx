import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-4 py-2 text-black bg-gray-100 rounded"
        >
          Previous
        </button>
      )}

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-4 py-2 rounded ${
            number === currentPage
              ? "bg-yellow-700 text-white"
              : "bg-gray-100 text-black"
          }`}
        >
          {number}
        </button>
      ))}

      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-4 py-2 text-black bg-gray-100 rounded"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
