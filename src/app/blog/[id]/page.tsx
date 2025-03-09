import React from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { MdPerson3 } from "react-icons/md";
import { BsCalendar2DateFill, BsFillTagFill } from "react-icons/bs";
import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "@sanity/types";
import Head from "next/head";

// Define the blog data interface
interface IBlog {
  _id: string;
  title: string;
  shortDescription: string;
  content: PortableTextBlock[];
  author: string;
  date: string;
  tags: string[];
  image: string;
  category: { title: string; description: string };
}

// Fetch blog data from Sanity
async function getBlogData(id: string): Promise<IBlog | null> {
  try {
    const blog: IBlog = await client.fetch(
      `*[_type == "blog" && _id == $id][0]{
        _id, 
        title, 
        shortDescription, 
        content, 
        author, 
        date, 
        tags, 
        "image": image.asset._ref,
        category->{_id, title, description}
      }`,
      { id }
    );
    return blog;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return null;
  }
}

// BlogDetailPage component
export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await the params to get the id
  const { id } = await params;

  // Fetch the blog data
  const blog = await getBlogData(id);

  // If blog is not found, return a 404 message
  if (!blog) {
    return <div>Blog not found</div>;
  }

  // Structured Data for Blog Post
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.shortDescription,
    "image": urlFor(blog.image).url(),
    "author": {
      "@type": "Person",
      "name": blog.author,
    },
    "datePublished": blog.date,
    "publisher": {
      "@type": "Organization",
      "name": "Saud Solutions",
      "logo": {
        "@type": "ImageObject",
        "url": "https://saudsolutions.com/logo.png",
      },
    },
  };

  return (
    <div className="min-h-screen">
      <Head>
        <title>{blog.title} - Saud Solutions Blog</title>
        <meta name="description" content={blog.shortDescription} />
        <meta name="keywords" content={blog.tags.join(", ")} />
        <meta name="author" content={blog.author} />
        <meta property="og:title" content={`${blog.title} - Saud Solutions Blog`} />
        <meta property="og:description" content={blog.shortDescription} />
        <meta property="og:image" content={urlFor(blog.image).url()} />
        <meta property="og:url" content={`https://saudsolutions.com/blog/${id}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${blog.title} - Saud Solutions Blog`} />
        <meta name="twitter:description" content={blog.shortDescription} />
        <meta name="twitter:image" content={urlFor(blog.image).url()} />
        <link rel="canonical" href={`https://saudsolutions.com/blog/${id}`} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>

      <main className="container mx-auto px-6 py-12">
        <article className="overflow-hidden">
          <Image
            src={urlFor(blog.image).url()}
            alt={blog.title}
            width={1200}
            height={600}
            className="w-full h-full object-cover"
            priority // Eager load the blog image
          />
          <div className="p-6">
            <div className="text-sm text-gray-500 flex items-center gap-4 mb-4">
              <span className="flex items-center gap-2">
                <MdPerson3 /> {blog.author}
              </span>
              <span className="flex items-center gap-2">
                <BsCalendar2DateFill /> {new Date(blog.date).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-2">
                <BsFillTagFill /> {Array.isArray(blog.tags) ? blog.tags.join(", ") : "No tags"}
              </span>
            </div>
            <h1 className="text-3xl font-bold">{blog.title}</h1>
            <p className="text-gray-600 mt-4">{blog.shortDescription}</p>
            <div className="mt-4">
              <PortableText value={blog.content} />
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}