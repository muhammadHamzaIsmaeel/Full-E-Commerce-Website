// app/api/reviews/route.ts

import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client'; // Adjust the path if needed

export async function POST(request: Request) {
  try {
    const body = await request.json(); // Parse request body

    const { productId, name, rating, comment, imageAssetId } = body; // Destructure

    if (!productId || !name || !rating || !comment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Construct the review document
    const reviewDoc = {
      _type: 'review',
      product: {
        _type: 'reference',
        _ref: productId,
      },
      name: name,
      rating: rating,
      comment: comment,
      image: imageAssetId ? {  // Optional image
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAssetId,
        },
      } : null,
      createdAt: new Date().toISOString(),
    };

    const newReview = await client.create(reviewDoc);

    return NextResponse.json({ review: newReview }, { status: 201 }); // Success
  } catch (error) {
    console.error("Error creating review in API route:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}