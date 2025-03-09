// F:\hamza\E-commerce\src/components/header.tsx
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
import { FaAlignRight } from "react-icons/fa6";
import Cart from "./adToCart/cart";
import { usePathname, useRouter } from "next/navigation"; // Import usePathname and useRouter
import WishlistIcon from "./wishlist/WishlistIcon";
import AuthSection from "./authSection";
import { useState, useRef} from "react";
import { cn } from "@/lib/utils"; // Assuming you have a utility function for classnames

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Performance Optimization: Preload critical resources
  const preloadResources = () => (
    <>
      <link rel="preload" href="/logo.png" as="image" />
      <link rel="preload" href="/wishlist" as="fetch" crossOrigin="anonymous" />
    </>
  );

  // Error Handling: Fallback for missing logo
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.src = "/fallback-logo.png";
  };

  const handleNavigation = (href: string) => {
    setIsSheetOpen(false);
    router.push(href);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      router.push(`/search?q=${searchTerm}`);
      setSearchTerm("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 border-b border-gray-200">
      {preloadResources()}
      <div className="container flex justify-between items-center mx-auto px-4 md:px-0 py-3">
        {/* Logo and Brand Name */}
        <div className="flex items-center gap-2">
          <Link href="/" aria-label="Saud Solution Home" passHref>
            <Image
              src="/logo.png"
              alt="Saud Solution - Premium Furniture Logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
              onError={handleImageError}
              priority
            />
          </Link>
          <Link href="/" aria-label="Saud Solution Home" passHref>
            <h1 className="hidden md:block text-xl font-semibold text-gray-800">
              Saud Solution
            </h1>
          </Link>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex px-8 md:px-0 items-center w-full max-w-md"
        >
          <div className="relative w-full">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="block w-full py-1.5 md:py-2 pl-4 pr-10 text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-shadow duration-200"
            />
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
              <CiSearch className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <button
            type="submit"
            className="ml-2 bg-yellow-600 hover:bg-yellow-800 text-white py-1.5 md:py-2 px-2 rounded-md text-sm font-medium transition-colors duration-200"
          >
            Search
          </button>
        </form>

        {/* Desktop Navigation and Actions */}
        <div className="hidden lg:flex items-center gap-6">
          <nav className="flex lg:mr-8 items-center gap-8" aria-label="Main Navigation">
            {["Home", "Shop", "Blog", "Contact"].map((item) => {
              const href = item === "Home" ? "/" : `/${item.toLowerCase()}`;
              const isActive = pathname === href;
              return (
                <Link
                  key={item}
                  href={href}
                  className={cn(
                    "text-gray-600 hover:text-gray-900 transition-colors duration-200",
                    isActive && "font-semibold text-gray-900"
                  )}
                  aria-label={`Navigate to ${item}`}
                >
                  {item}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-4">
            <WishlistIcon />
            <Cart />
            <AuthSection />
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger className="text-2xl" aria-label="Open Menu">
              <FaAlignRight className="text-[#B88E2F]" />
            </SheetTrigger>
            <SheetContent className="bg-white">
              <SheetHeader className="text-left">
                <SheetTitle>
                  <div className="flex items-center space-x-2">
                    <Link href="/" aria-label="Saud Solution Home">
                      <Image
                        src="/logo.png"
                        alt="Saud Solution Logo"
                        width={40}
                        height={25}
                        className="w-10 h-auto"
                        loading="lazy"
                        onError={handleImageError}
                      />
                    </Link>
                    <Link href="/" aria-label="Saud Solution Home">
                      <h1 className="text-xl font-bold">Saud Solution</h1>
                    </Link>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <SheetDescription className="mt-4">
                <nav aria-label="Mobile Navigation">
                  <ul className="space-y-3">
                    {["Home", "Shop", "Blog", "Contact"].map((item) => {
                      const href =
                        item === "Home" ? "/" : `/${item.toLowerCase()}`;
                      const isActive = pathname === href;

                      return (
                        <li key={item}>
                          <button
                            onClick={() => handleNavigation(href)}
                            className={cn(
                              "flex items-center space-x-2 w-full py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200",
                              isActive && "bg-gray-100 font-medium"
                            )}
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
                  <AuthSection />
                  <div className="flex items-center space-x-4 mt-4">
                    <WishlistIcon />
                    <Cart />
                  </div>
                </div>
              </SheetDescription>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}