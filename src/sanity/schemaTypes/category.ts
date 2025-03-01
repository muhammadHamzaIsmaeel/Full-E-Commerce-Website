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
                options: {
                  list: [
                    { title: 'Kitchen', value: 'Kitchen' },
                    { title: 'Jewelry', value: 'Jewelry' },
                    { title: 'Sports', value: 'Sports' },
                    { title: 'Books', value: 'Books' },
                    { title: 'Automobiles', value: 'Automobiles' },
                    { title: 'Baby', value: 'Baby' },
                    { title: 'Grocery', value: 'Grocery' },
                    { title: 'Health', value: 'Health' },
                    { title: 'Home', value: 'Home' },
                    { title: 'Deal', value: 'Deal' },
                    { title: 'Electronics', value: 'Electronics' },
                    { title: 'Fashion', value: 'Fashion' },
                    { title: 'Beauty', value: 'Beauty' },
                  ],
                },
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
  