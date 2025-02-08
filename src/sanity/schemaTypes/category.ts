export const categories = {
    name: 'browseCategories',
    title: 'Browse Categories',
    type: 'document',
    fields: [
      // Heading Fields
      {
        name: 'mainHeading',
        title: 'Main Heading',
        type: 'string',
      },
      {
        name: 'subHeading',
        title: 'Subheading',
        type: 'string',
      },
      // Categories Fields
      {
        name: 'categories',
        title: 'Categories',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'title',
                title: 'Title',
                type: 'string',
              },
              {
                name: 'image',
                title: 'Image',
                type: 'image',
                options: {
                  hotspot: true,
                },
              },
            ],
          },
        ],
      },
    ],
  };
  