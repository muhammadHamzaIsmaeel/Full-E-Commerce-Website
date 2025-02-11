import { defineType } from 'sanity';

export default defineType({
  name: 'order',
  title: 'Orders',
  type: 'document',
  fields: [
    {
      name: 'userId',
      title: 'User ID',
      type: 'string',
      description: 'The ID of the user who placed this order.',
      validation: (Rule) => Rule.required(), // Ensure userId is required
    },
    {
      name: 'orderId',
      title: 'Order ID',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Processing', value: 'processing' },
          { title: 'Shipped', value: 'shipped' },
          { title: 'Delivered', value: 'delivered' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
    },
    {
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'price', type: 'number', title: 'Price' },
            { name: 'quantity', type: 'number', title: 'Quantity' },
            {
              name: 'productImage',
              type: 'image',
              title: 'Product Image',
              options: { hotspot: true },
            },
            { name: 'selectedSize', type: 'string', title: 'Selected Size' }, // Add selected size
            { name: 'selectedColor', type: 'string', title: 'Selected Color' }, // Add selected color
          ],
        },
      ],
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'totalAmount',
      type: 'number',
      title: 'Total Amount',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'paymentStatus',
      type: 'string',
      title: 'Payment Status',
      options: {
        list: ['pending', 'completed'],
      },
    },
    {
      name: 'trackingNumber',
      type: 'string',
      title: 'Tracking Number',
    },
    {
      name: 'formData',
      title: 'Form Data',
      type: 'object',
      fields: [
        { name: 'fullName', type: 'string', title: 'Full Name' },
        { name: 'addressLine1', type: 'string', title: 'Address Line 1' },
        { name: 'addressLine2', type: 'string', title: 'Address Line 2' },
        { name: 'city', type: 'string', title: 'City' },
        { name: 'province', type: 'string', title: 'Province' },
        { name: 'zipCode', type: 'string', title: 'Zip Code' },
        { name: 'courierService', type: 'string', title: 'Courier Service' },
        {
          name: 'phoneNumber1',
          type: 'string',
          title: 'Phone Number 1',
          validation: (Rule) => Rule.regex(/^\d{11}$/).required(),
        },
        {
          name: 'phoneNumber2',
          type: 'string',
          title: 'Phone Number 2',
          validation: (Rule) => Rule.regex(/^\d{11}$/),
        },
        {
          name: 'emailAddress',
          type: 'string',
          title: 'Email Address',
          validation: (Rule) => Rule.email().required(),
        },
        { name: 'additionalInformation', type: 'text', title: 'Additional Information' },
        { name: 'paymentMethod', type: 'string', title: 'Payment Method' },
        { name: 'landmark', type: 'string', title: 'Landmark' },
        {
          name: 'addressType',
          type: 'string',
          title: 'Address Type',
          options: {
            list: ['home', 'office'],
          },
        },
      ],
    },
  ],
});