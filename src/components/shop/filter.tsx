import React, { useState, useCallback } from "react";
import { BsViewList } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { TbArrowsRightLeft } from "react-icons/tb";
import { BiGridSmall } from "react-icons/bi";
import { LiaGripLinesVerticalSolid } from "react-icons/lia";
import SearchBar from "../searchBar/searchBar";

interface FilterProps {
  setIsNew: (value: boolean | null) => void;
  discounted: boolean;
  setDiscounted: (value: boolean) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  show: number;
  setShow: (value: number) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Filter: React.FC<FilterProps> = ({
  setIsNew,
  discounted,
  setDiscounted,
  priceRange,
  setPriceRange,
  show,
  setShow,
  sortBy,
  setSortBy,
  searchQuery,
  setSearchQuery,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Memoized handler for toggling filter visibility
  const toggleFilter = useCallback(() => {
    setIsFilterOpen((prev) => !prev);
  }, []);

  // Handler for price range input changes with validation
  const handlePriceRangeChange = useCallback(
    (index: number, value: string) => {
      const parsedValue = parseInt(value, 10);
      if (isNaN(parsedValue) || parsedValue < 0) return; // Validate input

      const newRange = [...priceRange];
      newRange[index] = parsedValue;
      setPriceRange(newRange);
    },
    [priceRange, setPriceRange]
  );

  // Handler for "Is New" dropdown changes
  const handleIsNewChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      setIsNew(value === "all" ? null : value === "true");
    },
    [setIsNew]
  );

  // Handler for "Show" dropdown changes
  const handleShowChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = parseInt(e.target.value, 10);
      if (!isNaN(value) && value > 0) setShow(value); // Validate input
    },
    [setShow]
  );

  return (
    <>
      {/* Main Filter Section */}
      <div className="flex flex-col lg:flex-row justify-around items-center bg-[#F9F1E7] py-5 gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left Section */}
        <div className="flex flex-col sm:flex-row items-center text-center gap-4 lg:w-auto">
          <ul className="flex items-center text-xl sm:text-2xl gap-4">
            <li
              className="flex items-center gap-2 cursor-pointer"
              onClick={toggleFilter}
            >
              <TbArrowsRightLeft className="text-[#F9A13D]" />
              <span className="font-medium text-[#1F3A5E]">Filter</span>
            </li>
            <li className="flex items-center">
              <a href="#">
                <BiGridSmall className="text-[#F9A13D]" />
              </a>
            </li>
            <li className="flex items-center">
              <a href="#">
                <BsViewList className="text-[#F9A13D]" />
              </a>
            </li>
          </ul>

          <LiaGripLinesVerticalSolid className="hidden sm:block text-2xl mx-2 text-[#F9A13D]" />
          <p className="text-base sm:text-lg text-[#1F3A5E]">
            Showing 1–{show} results
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col sm:flex-row text-lg gap-4 lg:w-auto">
          {/* SearchBar Component */}
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          {/* Show Dropdown */}
          <div className="flex items-center gap-2 sm:gap-4">
            <label htmlFor="shop" className="font-medium text-[#1F3A5E]">
              Show
            </label>
            <select
              id="shop"
              className="p-2 text-gray-600 border rounded-lg focus:ring-[#F9A13D] focus:ring-2 w-full sm:w-auto"
              value={show}
              onChange={handleShowChange}
            >
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="32">32</option>
              <option value="64">64</option>
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 sm:gap-4">
            <label htmlFor="shortby" className="font-medium text-[#1F3A5E]">
              Sort by
            </label>
            <select
              id="shortby"
              className="p-2 text-gray-600 border rounded-lg focus:ring-[#F9A13D] focus:ring-2 w-full sm:w-auto"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter Section with Animation */}
      <div
        className={`transition-all lg:w-[750px] mt-4 mx-4 lg:mx-auto duration-500 ease-in-out bg-[#F9F1E7] px-4 py-3 shadow-lg rounded-lg ${
          isFilterOpen ? "opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-between">
          {/* Is New Filter */}
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <div className="relative">
              <select
                onChange={handleIsNewChange}
                className="appearance-none bg-[#F5E1A4] text-[#1F3A5E] border-2 border-[#F5E1A4] rounded-full px-6 py-2 w-36 transition duration-300 ease-in-out hover:border-[#F9A13D] focus:ring-2 focus:ring-[#F9A13D] cursor-pointer"
              >
                <option value="all">All</option>
                <option value="true">New Arrivals</option>
                <option value="false">Old Products</option>
              </select>
              <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#F9A13D] font-medium text-4xl">
                <RiArrowDropDownLine />
              </span>
            </div>

            {/* Discount Filter */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={discounted}
                onChange={(e) => setDiscounted(e.target.checked)}
                className="h-5 w-5 text-[#F9A13D] border-[#F9A13D] focus:ring-0"
              />
              <span className="text-[#1F3A5E] font-semibold">Discounted</span>
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <span className="text-[#1F3A5E] font-semibold">Price Range:</span>
            <div className="flex gap-2">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                className="bg-[#F5E1A4] text-[#1F3A5E] border-2 border-[#F5E1A4] rounded-full px-4 py-2 w-24 transition duration-300 ease-in-out focus:ring-2 focus:ring-[#F9A13D] hover:border-[#F9A13D]"
                placeholder="Min"
                min="0"
              />
              <span className="text-[#1F3A5E]">-</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                className="bg-[#F5E1A4] text-[#1F3A5E] border-2 border-[#F5E1A4] rounded-full px-4 py-2 w-24 transition duration-300 ease-in-out focus:ring-2 focus:ring-[#F9A13D] hover:border-[#F9A13D]"
                placeholder="Max"
                min="0"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;