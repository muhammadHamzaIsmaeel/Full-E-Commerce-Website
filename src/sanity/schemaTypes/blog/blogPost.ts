import { Rule } from "sanity";

const blogSchema = {
  name: "blog",
  type: "document",
  title: "Blog",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule: Rule) => Rule.required().min(5).max(100),
    },
    {
      name: "shortDescription",
      type: "text",
      title: "Short Description",
      validation: (Rule: Rule) => Rule.required().max(500),
    },
    {
      name: "content",
      type: "blockContent",
      title: "Content",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "author",
      type: "string",
      title: "Author",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "date",
      type: "datetime",
      title: "Date",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "tags",
      type: "array",
      title: "Tags",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: "image",
      type: "image",
      title: "Image",
      options: {
        hotspot: true,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "category",
      type: "reference",
      title: "Category",
      to: [{ type: "category" }],
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
};

export default blogSchema;
