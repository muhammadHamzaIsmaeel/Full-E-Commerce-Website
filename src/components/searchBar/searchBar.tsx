import React, { useState } from "react";
import { CiSearch } from "react-icons/ci"; // Importing search icon from react-icons

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  const [isOpen, setIsOpen] = useState(false); // Renamed to isOpen for clarity

  return (
    <div className="relative flex items-center">
      {/* Search Icon */}
      <CiSearch
        className="cursor-pointer text-[#F9A13D]"
        size={30}
        onClick={() => setIsOpen(!isOpen)} // Toggle search bar on click
      />
      
      {/* Search Bar */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search products..."
        className="p-2 text-gray-600 border rounded-lg focus:ring-[#F9A13D] focus:ring-2 absolute right-0 transition-all duration-300"
        style={{
          width: isOpen ? "200px" : "0", // Controls the width of the search bar on click
          opacity: isOpen ? 1 : 0, // Controls the opacity for a smoother effect
        }}
      />
    </div>
  );
};

export default SearchBar;