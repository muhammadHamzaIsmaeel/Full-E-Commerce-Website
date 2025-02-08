// import React, { useState } from "react";
// import { CiSearch } from "react-icons/ci"; // Importing search icon from react-icons

// interface SearchBarProps {
//   searchQuery: string;
//   setSearchQuery: (query: string) => void;
// }

// const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       className="relative flex items-center"
//       onMouseEnter={() => setIsHovered(true)} // On hover over the icon, open the search bar
//       onMouseLeave={() => setIsHovered(false)} // On hover out, close the search bar
//     >
//       {/* Search Icon */}
//       <CiSearch
//         className="cursor-pointer text-[#F9A13D]"
//         size={30}
//       />
      
//       {/* Search Bar */}
//       <input
//         type="text"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         placeholder="Search products..."
//         className="p-2 text-gray-600 border rounded-lg focus:ring-[#F9A13D] focus:ring-2 absolute right-0 transition-all duration-300"
//         style={{
//           width: isHovered ? "200px" : "0", // Controls the width of the search bar on hover
//           opacity: isHovered ? 1 : 0, // Controls the opacity for a smoother effect
//         }}
//       />
//     </div>
//   );
// };

// export default SearchBar;
