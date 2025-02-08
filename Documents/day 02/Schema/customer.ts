import { Rule } from "sanity";

export default {
    name: 'customer',
    type: 'document',
    title: 'Customer',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Customer Name',
        validation: (Rule: Rule) => Rule.required().min(2).error('Name is required and should have at least 2 characters'),
      },
      {
        name: 'email',
        type: 'string',
        title: 'Email Address',
        validation: (Rule: Rule) => Rule.required().regex(
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          { name: 'email', invert: false }
        ).error('Enter a valid email address'),
      },
      {
        name: 'phone',
        type: 'string',
        title: 'Phone Number',
        validation: (Rule: Rule) => Rule.regex(/^\+?[1-9]\d{1,14}$/, {
          name: 'phone',
          invert: false,
        }).error('Enter a valid phone number'),
      },
      {
        name: 'address',
        type: 'object',
        title: 'Address',
        fields: [
          { name: 'street', type: 'string', title: 'Street' },
          { name: 'city', type: 'string', title: 'City' },
          { name: 'state', type: 'string', title: 'State/Province' },
          { name: 'zip', type: 'string', title: 'ZIP/Postal Code' },
          { name: 'country', type: 'string', title: 'Country' },
        ],
      },
      {
        name: 'orders',
        type: 'array',
        title: 'Orders',
        of: [{ type: 'reference', to: [{ type: 'order' }] }],
      },
      {
        name: 'createdAt',
        type: 'datetime',
        title: 'Account Created At',
        initialValue: () => new Date().toISOString(),
      },
    ],
  };
  