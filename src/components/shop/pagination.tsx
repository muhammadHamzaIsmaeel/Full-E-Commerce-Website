import React, { useCallback, useMemo } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Generate an array of page numbers
  const pages = useMemo(() => {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }, [totalPages]);

  // Handle page change with validation
  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages) return; // Validate page range
      onPageChange(page);
    },
    [onPageChange, totalPages]
  );

  // Handle "Previous" button click
  const handlePrevious = useCallback(() => {
    handlePageChange(currentPage - 1);
  }, [currentPage, handlePageChange]);

  // Handle "Next" button click
  const handleNext = useCallback(() => {
    handlePageChange(currentPage + 1);
  }, [currentPage, handlePageChange]);

  // Handle individual page button click
  const handlePageClick = useCallback(
    (page: number) => {
      handlePageChange(page);
    },
    [handlePageChange]
  );

  // Disable "Previous" and "Next" buttons if out of range
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div className="flex items-center space-x-2 justify-center my-4">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={isPreviousDisabled}
        aria-label="Previous Page"
        className={`px-4 py-2 rounded-md text-sm font-medium ${
          isPreviousDisabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-100"
        }`}
      >
        Previous
      </button>

      {/* Page Buttons */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          aria-label={`Go to Page ${page}`}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            currentPage === page
              ? "bg-yellow-600 text-white shadow-lg"
              : "bg-amber-100 text-gray-700 hover:bg-amber-200"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={isNextDisabled}
        aria-label="Next Page"
        className={`px-4 py-2 rounded-md text-sm font-medium ${
          isNextDisabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-100"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;