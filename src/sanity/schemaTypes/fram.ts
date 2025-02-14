import {defineType, defineField} from 'sanity'

export const imageGridItem = defineType({
  name: 'imageGridItem',
  title: 'Image Grid Item',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, // Enable hotspot for precise cropping
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Descriptive alt text for accessibility and SEO',
    }),
  ],
})