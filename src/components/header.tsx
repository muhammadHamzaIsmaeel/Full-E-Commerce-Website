// F:\hamza\E-commerce\src\components\header.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaBars } from "react-icons/fa6";
import Cart from "./adToCart/cart";
import { IoMdSearch } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation"; // Import usePathname and useRouter
import WishlistIcon from "./wishlist/WishlistIcon";
import AuthSection from "./authSection";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null); // Ref for the input

  // Performance Optimization: Preload critical resources
  const preloadResources = () => {
    return (
      <>
        <link rel="preload" href="/logo.png" as="image" />
        <link
          rel="preload"
          href="/wishlist"
          as="fetch"
          crossOrigin="anonymous"
        />
      </>
    );
  };

  // Error Handling: Fallback for missing logo
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.src = "/fallback-logo.png"; // Provide a fallback image
  };

  // Function to handle navigation and close the sheet
  const handleNavigation = (href: string) => {
    setIsSheetOpen(false); // Close the sheet
    router.push(href); // Navigate to the new page
  };

  const handleSearchClick = () => {
    setIsSearchVisible(true);
    // Focus the input when it becomes visible (after the transition)
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      router.push(`/search?q=${searchTerm}`);
      setSearchTerm("");
      setIsSearchVisible(false);
    }
  };

  // Close search on outside click (desktop)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSearchVisible &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setIsSearchVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchVisible]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/50  border-gray-200">
      {preloadResources()}
      <div className="flex justify-between items-center mx-2 md:mx-10 py-4">
        {/* Logo and Brand Name */}
        <div className="flex items-center gap-1">
          <Link href="/" aria-label="Saud Solution Home" passHref>
            <Image
              src="/logo.png"
              alt="Saud Solution - Premium Furniture Logo"
              width={3200}
              height={2000}
              className="w-9 h-7"
              onError={handleImageError}
              priority
            />
          </Link>
          <Link href="/" aria-label="Saud Solution Home" passHref>
            <h1 className="text-2xl font-bold">Saud Solution</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-12" aria-label="Main Navigation">
          {["Home", "Shop", "Blog", "Contact"].map((item) => {
            const href = item === "Home" ? "/" : `/${item.toLowerCase()}`;
            const isActive = pathname === href;

            return (
              <Link
                key={item}
                href={href}
                className={`relative text-black after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-gray-500 after:transition-all after:duration-300 hover:after:w-full ${
                  isActive ? "after:w-full" : ""
                }`}
                aria-label={`Navigate to ${item}`}
                passHref
              >
                {item}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Icons */}
        <div
          className="hidden lg:flex items-center gap-4"
          aria-label="User Actions"
        >
          <button
            className={`text-gray-600 -mr-4 font-semibold hover:text-gray-800 transition-colors duration-200 ${
              isSearchVisible ? "text-indigo-500" : ""
            }`}
            aria-label="Search"
            onClick={handleSearchClick}
          >
            <IoMdSearch size={26} />
          </button>
          <form
            onSubmit={handleSearchSubmit}
            className={`relative flex items-center ${
              isSearchVisible
                ? "w-64 opacity-100 translate-x-0"
                : "w-0 opacity-0 -translate-x-8"
            } transition-all duration-300 overflow-hidden`}
          >
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full py-2 px-3 bg-gray-100 text-gray-700 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow duration-200 shadow-sm"
            />
            <button
              type="submit"
              className="absolute right-2 bg-indigo-500 hover:bg-indigo-600 text-white py-1 px-3 rounded-md transition-colors duration-200"
              aria-label="Submit Search"
            >
              <CiSearch size={20} />
            </button>
          </form>
          <WishlistIcon />
          <Cart />
          <AuthSection />
        </div>

        {/* Mobile Menu */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger className="lg:hidden text-2xl" aria-label="Open Menu">
            <FaBars className="text-[#B88E2F]" />
          </SheetTrigger>
          <SheetContent className="bg-white">
            {" "}
            {/* Added background color */}
            <SheetHeader className="text-left">
              {" "}
              {/* Aligned header content to the left */}
              <SheetTitle>
                <div className="flex items-center space-x-2">
                  <Link href="/" aria-label="Saud Solution Home">
                    <Image
                      src="/logo.png"
                      alt="Saud Solution Logo"
                      width={40} // Adjusted logo size
                      height={25}
                      className="w-10 h-auto" // Adjusted logo size
                      loading="lazy"
                      onError={handleImageError}
                    />
                  </Link>
                  <Link href="/" aria-label="Saud Solution Home">
                    <h1 className="text-xl font-bold">Saud Solution</h1>{" "}
                    {/* Reduced H1 size for mobile */}
                  </Link>
                </div>
              </SheetTitle>
            </SheetHeader>
            <SheetDescription className="mt-4">
              {" "}
              {/* Added margin-top */}
              <nav aria-label="Mobile Navigation">
                {" "}
                {/* Using nav element for semantic structure */}
                <ul className="space-y-3">
                  {" "}
                  {/* Using a list for navigation items */}
                  {["Home", "Shop", "Blog", "Contact"].map((item) => {
                    const href =
                      item === "Home" ? "/" : `/${item.toLowerCase()}`;
                    const isActive = pathname === href;

                    return (
                      <li key={item}>
                        <button
                          onClick={() => handleNavigation(href)}
                          className={`flex items-center space-x-2 w-full py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${
                            isActive ? "bg-gray-100 font-medium" : ""
                          }`}
                          aria-label={`Navigate to ${item}`}
                        >
                          <span>{item}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <div className="mt-6 pt-6 border-t border-gray-200">
                {" "}
                {/* Added a divider for better separation */}
                <AuthSection />
                <form
                  onSubmit={handleSearchSubmit}
                  className="relative mt-3 w-full" // Adjusted width and added margin-top
                >
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full py-2 px-3 bg-gray-100 text-gray-700 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow duration-200 shadow-sm"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-500 hover:bg-indigo-600 text-white py-1 px-3 rounded-md transition-colors duration-200"
                    aria-label="Submit Search"
                  >
                    <CiSearch size={20} />
                  </button>
                </form>
                <div className="flex items-center space-x-4 mt-4">
                  <WishlistIcon />
                  <Cart />
                </div>
              </div>
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
