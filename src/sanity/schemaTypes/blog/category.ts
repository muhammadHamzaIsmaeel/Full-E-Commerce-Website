import { Rule } from "sanity";

const categorySchema = {
  name: "category",
  type: "document",
  title: "Category",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Category Title",
      validation: (Rule: Rule) => Rule.required().min(3).max(50),
    },
    {
      name: "description",
      type: "text",
      title: "Description",
      validation: (Rule: Rule) => Rule.max(200),
    },
  ],
};

export default categorySchema;
