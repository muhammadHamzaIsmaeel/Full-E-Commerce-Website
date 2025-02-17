// app/api/search/route.ts
import { client } from '@/sanity/lib/client';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';

    if (!query) {
      return NextResponse.json([], { status: 200, statusText: 'No query provided. Returning empty array.' }); // Return empty array if no query
    }

    // Sanity Query (Adjust to your specific schema and needs)
    const products = await client.fetch(
      `
      *[_type == "product" && (title match "*${query}*" || shortDescription match "*${query}*")] {
        _id,
        title,
        shortDescription,
        price,
        productImage,
        oldPrice,
        dicountPercentage,
        isNew,
        "slug": slug.current  // Assuming you have a slug field
      }
      `
    );

    return NextResponse.json(products, { status: 200, statusText: 'Successfully retrieved search results.' });

  } catch (error) {
    console.error("Error fetching search results:", error);
    return NextResponse.json({ error: "Failed to fetch search results" }, { status: 500, statusText: 'Internal Server Error' });
  }
}