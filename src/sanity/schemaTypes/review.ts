// schemas/review.js (or .ts if you're using TypeScript)

import { Rule } from "sanity";

export const review ={
    name: 'review',
    title: 'Review',
    type: 'document',
    fields: [
      {
        name: 'product',
        title: 'Product',
        type: 'reference',
        to: [{ type: 'product' }], // Link to your product sch
        validation: (Rule: Rule) => Rule.required(),
      },
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule: Rule) => Rule.required().max(50), // Enforce a name
      },
      {
        name: 'rating',
        title: 'Rating',
        type: 'number',
        validation: (Rule: Rule) => Rule.required().min(1).max(5),
        options: {
          list: [1, 2, 3, 4, 5],
        },
      },
      {
        name: 'comment',
        title: 'Comment',
        type: 'text',
        validation: (Rule: Rule) => Rule.required().min(5).max(500), // Min and Max Comment
      },
      {
        name: 'isVerifiedPurchase',
        title: 'Verified Purchase',
        type: 'boolean',
        description: 'Mark if the review is from a verified purchase.',
      },
    //   {
    //     name: 'image',
    //     title: 'Image',
    //     type: 'image',
    //     options: {
    //       hotspot: true, // Enable hotspot for image cropping
    //     },
    //   },
      {
        name: 'createdAt',
        title: 'Created At',
        type: 'datetime',
        initialValue: (new Date()).toISOString(),
        options: {
          dateFormat: 'YYYY-MM-DD',
          timeFormat: 'HH:mm',
          timeStep: 15,
        }
      },
    ],
    preview: {
      select: {
        title: 'name',
        subtitle: 'comment',
        media: 'image',
      },
    },
  };