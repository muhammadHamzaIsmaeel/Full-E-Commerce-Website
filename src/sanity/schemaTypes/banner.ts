export const banner = {
    name: 'banner',
    title: 'Banner',
    type: 'document',
    fields: [
      {
        name: 'topHeading',
        title: 'Top Heading',
        type: 'string',
      },
      {
        name: 'centerHeading',
        title: 'Center Heading',
        type: 'string',
      },
      {
        name: 'bottomHeading',
        title: 'Bottom Heading',
        type: 'text',
      },
      {
        name: 'buttonLink',
        title: 'Button Link',
        type: 'url',
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true,
        },
        fields: [
          {
            name: 'altText',
            title: 'Alt Text',
            type: 'string',
            description: 'Alternative text for the image (important for SEO and accessibility)',
          },
        ],
      },
    ],
  };