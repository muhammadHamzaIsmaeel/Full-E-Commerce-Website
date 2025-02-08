import React from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { MdPerson3 } from "react-icons/md";
import { BsCalendar2DateFill, BsFillTagFill } from "react-icons/bs";
import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "@sanity/types";

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
  params:Promise<{ id: string }>;
}) {
  const { id } = await params; // Destructure the `id` from `params`

  // Fetch the blog data
  const blog = await getBlogData(id);

  // If blog is not found, return a 404 message
  if (!blog) {
    return <div>Blog not found</div>;
  }

  // Render the blog details
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-6 py-12">
        <div className="overflow-hidden">
          <Image
            src={urlFor(blog.image).url()}
            alt={blog.title}
            width={1200}
            height={600}
            className="w-full h-full object-cover"
            loading="lazy"
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
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <p className="text-gray-600 mt-4">{blog.shortDescription}</p>
            <div className="mt-4">
              <PortableText value={blog.content} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}