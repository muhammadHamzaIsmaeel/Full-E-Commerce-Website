import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { yourname, email, subject, message } = await request.json();

    // Validate required fields
    if (!yourname || !email || !subject || !message) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // Create a new document in Sanity
    await client.create({
      _type: "contactForm",
      yourname,
      email,
      subject,
      message,
    });

    return NextResponse.json(
      { message: "Form submitted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Sanity Error:", error);

    // Handle specific Sanity errors
    let errorMessage = "Failed to submit form.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
}