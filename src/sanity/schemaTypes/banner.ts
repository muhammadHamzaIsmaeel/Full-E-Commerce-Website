
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
            name: 'buttomlink',
            title: 'Buttom Link',
            type: 'url',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        
        {
            name: 'alt',
            title: 'Alt',
            type: 'string',
        },
    ],
};