"use client";

import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { MdKeyboardArrowRight, MdPerson3 } from "react-icons/md";
import { BsCalendar2DateFill, BsFillTagFill } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import Pagination from "@/components/blog/pagination";
import Feature from "@/components/button/feature";
import debounce from "lodash.debounce";
import DOMPurify from "dompurify";
import Head from "next/head";

interface IBlog {
  _id: string;
  title: string;
  shortDescription: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  image: string;
  category: { title: string; description: string };
}

interface ICategory {
  _id: string;
  title: string;
  blogCount: number;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3;

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const fetchedBlogs: IBlog[] = await client.fetch(
          `*[_type == "blog"]{
            _id, 
            title, 
            shortDescription, 
            content, 
            author, 
            date, 
            tags, 
            "image": image.asset._ref,
            category->{_id, title, description}
          }`
        );
        if (!fetchedBlogs.length) {
          throw new Error("No blogs found.");
        }
        setBlogs(fetchedBlogs);

        const fetchedCategories: ICategory[] = await client.fetch(
          `*[_type == "category"]{
            _id, 
            title,
            "blogCount": count(*[_type == "blog" && references(^._id)])
          }`
        );
        if (!fetchedCategories.length) {
          throw new Error("No categories found.");
        }
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch content:", error);
        setBlogs([]);
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleSearch = debounce((query: string) => {
    setSearchQuery(DOMPurify.sanitize(query));
    setCurrentPage(1);
  }, 300);

  const filteredBlogs = blogs.filter((blog) => {
    return (
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  // Structured Data for Blog Listing
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Saud Solutions Blog",
    "url": "https://saudsolutions.com/blog",
    "description": "Discover the latest trends, tips, and insights on skincare, beauty, and more at Saud Solutions Blog.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://saudsolutions.com/blog/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="text-center space-y-6">
          <Image
            src="/logo.png"
            alt="Loading Logo"
            width={120}
            height={80}
            className="mx-auto mb-4 animate-pulse"
            loading="lazy"
          />
          <div className="text-3xl font-bold text-black animate-pulse">
            Saud Solution...
          </div>
          <div className="flex justify-center space-x-2 text-yellow-700">
            <span className="dot text-5xl">.</span>
            <span className="dot text-5xl">.</span>
            <span className="dot text-5xl">.</span>
          </div>
        </div>
      </div>
    );
  }

  if (!filteredBlogs.length)
    return <div className="text-center">No blogs found.</div>;

  return (
    <div className="min-h-screen">
      <Head>
        <title>Saud Solutions Blog - Latest Trends & Insights</title>
        <meta name="description" content="Discover the latest trends, tips, and insights on skincare, beauty, and more at Saud Solutions Blog." />
        <meta name="keywords" content="skincare blog, beauty tips, latest trends, Saud Solutions" />
        <meta name="author" content="Saud Solutions" />
        <meta property="og:title" content="Saud Solutions Blog - Latest Trends & Insights" />
        <meta property="og:description" content="Discover the latest trends, tips, and insights on skincare, beauty, and more at Saud Solutions Blog." />
        <meta property="og:image" content="https://saudsolutions.com/logo.png" />
        <meta property="og:url" content="https://saudsolutions.com/blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Saud Solutions Blog - Latest Trends & Insights" />
        <meta name="twitter:description" content="Discover the latest trends, tips, and insights on skincare, beauty, and more at Saud Solutions Blog." />
        <meta name="twitter:image" content="https://saudsolutions.com/logo.png" />
        <link rel="canonical" href="https://saudsolutions.com/blog" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>

      <header className="relative w-full lg:h-[50vh] md:h-[30vh] h-[30vh]">
        <Image
          src="/shop/banner11.png"
          alt="Blog Banner"
          layout="fill"
          style={{ objectFit: "cover", filter: "blur(3px)", opacity: 0.7 }}
          objectFit="cover"
          priority // Eager load the banner
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-gray-950">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Saud Solution Logo"
              width="32"
              height="20"
              className="w-12 h-8"
              priority // Eager load the logo
            />
          </Link>
          <h4 className="text-4xl font-bold">Blog</h4>
          <h5 className="flex items-center text-sm md:text-xl mb-4 space-x-1">
            <Link className="font-bold text-xl" href="/">
              Home
            </Link>
            <MdKeyboardArrowRight className="mt-2 text-2xl" />
            <a className="mt-2 md:mt-0" href="#">
              Blog
            </a>
          </h5>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 grid lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-12">
          {currentBlogs.map((blog) => (
            <div key={blog._id} className="overflow-hidden">
              <Image
                src={urlFor(blog.image).url()}
                alt={blog.title}
                width={1200}
                height={600}
                className="w-full h-full object-cover"
                priority // Eager load blog images
              />
              <div className="p-6">
                <div className="text-sm text-gray-500 flex items-center gap-4 mb-4">
                  <span className="flex items-center gap-2">
                    <MdPerson3 /> {blog.author}
                  </span>
                  <span className="flex items-center gap-2">
                    <BsCalendar2DateFill />{" "}
                    {new Date(blog.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-2">
                    <BsFillTagFill />{" "}
                    {Array.isArray(blog.tags)
                      ? blog.tags.join(", ")
                      : "No tags"}
                  </span>
                </div>
                <h2 className="text-xl font-bold">{blog.title}</h2>
                <p className="text-gray-600 mt-4">{blog.shortDescription}</p>
                <Link
                  href={`/blog/${encodeURIComponent(blog._id)}`}
                  className="text-blue-600 hover:underline mt-4 inline-block"
                >
                  Read more
                </Link>
              </div>
            </div>
          ))}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </section>

        <aside className="space-y-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-[58px] border border-gray-300 rounded-md p-4 pr-12"
              onChange={(e) => handleSearch(e.target.value)}
            />
            <AiOutlineSearch
              className="absolute right-4 top-4 text-gray-500"
              size={20}
            />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-4">
              {categories.map((category) => (
                <li
                  key={category._id}
                  className="text-gray-600 flex justify-between items-center"
                >
                  <span>{category.title}</span>
                  <span className="text-sm text-gray-400">
                    {category.blogCount}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Recent Posts</h3>
            <ul className="space-y-4">
              {blogs.slice(0, 5).map((blog) => (
                <li key={blog._id} className="flex gap-4">
                  <Image
                    src={urlFor(blog.image).url()}
                    alt={blog.title}
                    width={1000}
                    height={1000}
                    className="w-[60px] h-[60px] rounded-md"
                    loading="lazy"
                  />
                  <div>
                    <Link
                      href={`/blog/${encodeURIComponent(blog._id)}`}
                      className="text-blue-600 hover:underline"
                    >
                      {blog.title}
                    </Link>
                    <p className="text-sm text-gray-500">
                      {new Date(blog.date).toLocaleDateString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </main>
      <Feature />
    </div>
  );
}