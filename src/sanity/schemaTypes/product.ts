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
      title: "Product Description",
      type: "array",
      of: [
        {
          type: "block",
          // Enable all formatting options
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 1", value: "h1" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          // Enable text formatting options
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
              { title: "Strike-through", value: "strike-through" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "URL",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "Link URL",
                  },
                ],
              },
            ],
          },
          // Enable lists
          lists: [
            { title: "Bullet List", value: "bullet" },
            { title: "Numbered List", value: "number" },
          ],
        },
      ],
      validation: (rule) =>
        rule
          .required()
          .min(1) // At least one block is required
          .warning("Description cannot be empty. Please add some content."),
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
      name: "productImage4",
      title: "Product Image 4",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "productImage5",
      title: "Product Image 5",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "productImage6",
      title: "Product Image 6",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "productImage7",
      title: "Product Image 7",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "productImage8",
      title: "Product Image 8",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "productImage9",
      title: "Product Image 9",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: 'productVideo',
      title: 'Product Video',
      type: 'file',
      options: {
        accept: 'video/*',  // Allow all video types
      },
    },
    {
      name: 'stockQuantity',
      title: 'Stock Quantity',
      type: 'number',
      description: 'The number of units currently in stock.',
      validation: Rule => Rule.integer().min(0).required(), // Ensure it's a non-negative integer.
    },
    {
      name: 'freeDelivery',
      title: 'Free Delivery',
      type: 'boolean',
      description: 'Check this box if the product has free delivery.',
      initialValue: false // Default to false
    },
    {
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'review' }] }],
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
      type: "array", // Change to array type
      of: [{ type: "string" }], // Array of strings
      options: {
        list: [
          { title: "Beauty", value: "beauty" },
          { title: "Fashion", value: "fashion" },
          { title: "Electronics", value: "electronics" },
          { title: "Deal", value: "deal" },
          { title: "Home", value: "home" },
          { title: "Health", value: "health" },
          { title: "Grocery", value: "grocery" },
          { title: "Baby", value: "baby" },
          { title: "Automobiles", value: "automobiles" },
          { title: "Books", value: "books" },
          { title: "Sports", value: "sports" },
          { title: "Jewelry", value: "jewelry" },
        ],
      },
      validation: (rule) => rule.required().min(1), // Ensure at least one category is selected
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
