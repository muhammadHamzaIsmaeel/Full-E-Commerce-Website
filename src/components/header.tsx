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
import { usePathname } from "next/navigation"; // Import usePathname
import WishlistIcon from "./wishlist/WishlistIcon";
import AuthSection from "./authSection";

export default function Header() {
  const pathname = usePathname(); // Get the current pathname

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


  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      {preloadResources()} {/* Preload critical resources */}
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
              onError={handleImageError} // Error handling for image
              priority // Prioritize loading the logo
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
            const isActive = pathname === href; // Check if the current route matches the link

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
            className="text-gray-600 font-semibold hover:text-gray-800"
            aria-label="Search"
            onClick={() => console.log("Search clicked")} // Placeholder for search action
          >
            <IoMdSearch size={24} />
          </button>
          <WishlistIcon />
          <Cart />
          <AuthSection />
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger className="lg:hidden text-2xl" aria-label="Open Menu">
            <FaBars className="text-[#B88E2F]" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                <div className="flex items-center gap-1">
                  <Link href="/" aria-label="Saud Solution Home" passHref>
                    <Image
                      src="/logo.png"
                      alt="Saud Solution Logo"
                      width={32}
                      height={20}
                      className="w-8 h-5"
                      loading="lazy"
                      onError={handleImageError} // Error handling for image
                    />
                  </Link>
                  <Link href="/" aria-label="Saud Solution Home" passHref>
                    <h1 className="text-2xl font-bold">Saud Solution</h1>
                  </Link>
                </div>
              </SheetTitle>
              <SheetDescription>
                <div className="grid gap-5 mt-1" aria-label="Mobile Navigation">
                  {["Home", "Shop", "Blog", "Contact"].map((item) => {
                    const href =
                      item === "Home" ? "/" : `/${item.toLowerCase()}`;
                    const isActive = pathname === href; // Check if the current route matches the link

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
                </div>

                <div
                  className="flex justify-center items-center gap-4 mt-5"
                  aria-label="Mobile User Actions"
                >
                  <AuthSection />
                  <button
                    className="text-gray-600 hover:text-gray-800"
                    aria-label="Search"
                    onClick={() => console.log("Search clicked")} // Placeholder for search action
                  >
                    <CiSearch size={24} />
                  </button>
                  <WishlistIcon />
                  <Cart />
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
