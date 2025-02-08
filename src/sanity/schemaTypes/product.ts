import { defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "id",
      title: "ID",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) => rule.required().min(10).warning("Description is too short."),
    },
    {
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      validation: (rule) => rule.max(2000).warning("Short description should not exceed 2000 characters."),
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (rule) => rule.required().min(0).warning("Price must be greater than or equal to 0."),
    },
    {
      name: "oldPrice",
      title: "Old Price",
      type: "number",
    },
    {
      name: "dicountPercentage",
      title: "Discount Percentage",
      type: "number",
      description: "Discount percentage (0-100)",
      validation: (rule) => rule.min(0).max(100).warning("Discount must be between 0 and 100."),
    },
    {
      name: "tag",
      title: "Tag",
      type: "string",
      description: "Add a tag to the product (iner peace, outer peace).",
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "productImage",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    },
    {
      name: "productImage1",
      title: "Product Image 1",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "productImage2",
      title: "Product Image 2",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "productImage3",
      title: "Product Image 3",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    
    {
      name: "rating",
      title: "Rating",
      type: "number",
    },
    {
      name: "customerReview",
      title: "Customer Reviews",
      type: "number",
    },
    {
      name: "availableSizes",
      title: "Available Sizes",
      type: "array",
      of: [{ type: "string" }],
      description: "Add available sizes for the product (e.g., Small, Medium, Large).",
    },
    {
      name: "availableColors",
      title: "Available Colors",
      type: "array",
      of: [{ type: "string" }],
      description: "Add available colors for the product (e.g., Red, Blue, Green).",
    },    
    {
      name: "defaultSize",
      title: "Default Size",
      type: "string",
      description: "Specify the default size for this product.",
      options: {
        list: [
          { title: "Small", value: "small" },
          { title: "Medium", value: "medium" },
          { title: "Large", value: "large" },
        ],
      },
      
    },
    {
      name: "defaultColor",
      title: "Default Color",
      type: "string",
      description: "Specify the default color for this product.",
      options: {
        list: [
          { title: "Red", value: "red" },
          { title: "Blue", value: "blue" },
          { title: "Green", value: "green" },
        ],
      },
      
    },
    {
      name: "SKU",
      title: "SKU",
      type: "string",
      // validation: (rule) => rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      // validation: (rule) => rule.required(),
    },
    {
      name: "isNew",
      title: "New Badge",
      type: "boolean",
      description: "Mark if the product is new.",
    },
    {
      name: "tranding",
      title: "Tranding",
      type: "boolean",
      description: "Mark if the product is tranding.",
    },
    // New field for features
    {
      name: "features",
      title: "Features",
      type: "object",
      fields: [
        // General Features
        {
          name: "salesPackage",
          title: "Sales Package",
          type: "string",
        },
        {
          name: "modelNumber",
          title: "Model Number",
          type: "string",
        },
        {
          name: "secondaryMaterial",
          title: "Secondary Material",
          type: "string",
        },
        {
          name: "configuration",
          title: "Configuration",
          type: "string",
        },
        {
          name: "upholsteryMaterial",
          title: "Upholstery Material",
          type: "string",
        },
        {
          name: "upholsteryColor",
          title: "Upholstery Color",
          type: "string",
        },
        // Product Features
        {
          name: "fillingMaterial",
          title: "Filling Material",
          type: "string",
        },
        {
          name: "finishType",
          title: "Finish Type",
          type: "string",
        },
        {
          name: "adjustableHeadrest",
          title: "Adjustable Headrest",
          type: "string",
        },
        {
          name: "maximumLoadCapacity",
          title: "Maximum Load Capacity",
          type: "string",
        },
        {
          name: "originOfManufacture",
          title: "Origin of Manufacture",
          type: "string",
        },
        // Dimensions
        {
          name: "width",
          title: "Width",
          type: "string",
        },
        {
          name: "height",
          title: "Height",
          type: "string",
        },
        {
          name: "depth",
          title: "Depth",
          type: "string",
        },
        {
          name: "weight",
          title: "Weight",
          type: "string",
        },
        {
          name: "seatHeight",
          title: "Seat Height",
          type: "string",
        },
        {
          name: "legHeight",
          title: "Leg Height",
          type: "string",
        },
        // Warranty
        {
          name: "warrantySummary",
          title: "Warranty Summary",
          type: "string",
        },
        {
          name: "warrantyServiceType",
          title: "Warranty Service Type",
          type: "string",
        },
        {
          name: "coveredInWarranty",
          title: "Covered in Warranty",
          type: "string",
        },
        {
          name: "notCoveredInWarranty",
          title: "Not Covered in Warranty",
          type: "string",
        },
        {
          name: "domesticWarranty",
          title: "Domestic Warranty",
          type: "string",
        },
      ],
    },
  ],
});
