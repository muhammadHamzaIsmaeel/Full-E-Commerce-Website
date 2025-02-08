import { Rule } from "sanity"

export const product = {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      { name: 'id', type: 'string', title: 'ID' },
      { name: 'name', type: 'string', title: 'Product Name' },
      { name: 'description', type: 'text', title: 'Description' },
      { name: 'shortDescription', type: 'string', title: 'Short Description' },
      { name: 'price', type: 'number', title: 'Price' },
      { name: 'oldPrice', type: 'number', title: 'Old Price' },
      { name: 'discount', type: 'string', title: 'Discount' },
      { name: 'tag', type: 'string', title: 'Tag' },
      { name: 'tags', type: 'array', of: [{ type: 'string' }], title: 'Tags' },
      { name: 'image', type: 'image', title: 'Main Image', options: { hotspot: true } },
      { name: 'image1', type: 'image', title: 'Additional Image 1', options: { hotspot: true } },
      { name: 'image2', type: 'image', title: 'Additional Image 2', options: { hotspot: true } },
      { name: 'image3', type: 'image', title: 'Additional Image 3', options: { hotspot: true } },
      { name: 'availableSizes', type: 'array', of: [{ type: 'string' }], title: 'Available Sizes', description: 'Add available sizes for the product (e.g., Small, Medium, Large, etc.)', validation: (Rule: Rule) => Rule.required().min(1).warning('At least one size must be added.') },
      { name: 'availableColors', type: 'array', of: [{ type: 'string' }], title: 'Available Colors', description: 'Add available colors for the product (e.g., Red, Blue, Green, etc.)', validation: (Rule: Rule) => Rule.required().min(1).warning('At least one color must be added.') },
      { name: 'defaultSize', type: 'string', title: 'Default Size', description: 'Specify the default size for this product.', options: { list: [ { title: 'Small', value: 'small' }, { title: 'Medium', value: 'medium' }, { title: 'Large', value: 'large' } ] } },
      { name: 'defaultColor', type: 'string', title: 'Default Color', description: 'Specify the default color for this product.', options: { list: [ { title: 'Red', value: 'red' }, { title: 'Blue', value: 'blue' }, { title: 'Green', value: 'green' } ] } },
      { name: 'SKU', type: 'string', title: 'SKU' },
      { name: 'category', type: 'string', title: 'Category' },
      { name: 'stock', type: 'number', title: 'Stock Level' },
      { name: 'weight', type: 'number', title: 'Weight (kg)' },
      {
        name: 'dimensions',
        type: 'object',
        title: 'Dimensions (L x W x H)',
        fields: [
          { name: 'length', type: 'number', title: 'Length (cm)' },
          { name: 'width', type: 'number', title: 'Width (cm)' },
          { name: 'height', type: 'number', title: 'Height (cm)' }
        ]
      }
    ]
  };