// src/app/api/status-change/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Define types for the product
interface Product {
  title: string;
  price: number;
  quantity: number;
}

// Define types for the request body
interface RequestBody {
  orderId: number;
  status: string;
  email: string;
  products: Product[];
  totalAmount: number;
}

export async function POST(req: Request) {
  try {
    // Parse and validate the request body
    const { orderId, status, email, products, totalAmount } = (await req.json()) as RequestBody;

    // Check if the status has changed to "shipped" or "delivered"
    if (status === "shipped" || status === "delivered") {
      // Create a Nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER, // Your Gmail email
          pass: process.env.EMAIL_PASS, // Your Gmail app password
        },
      });

      // Email content
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Invoice for Order #${orderId} (Status: ${status})`,
        html: `
          <h1>Invoice for Order #${orderId}</h1>
          <p>Your order status has been updated to <strong>${status}</strong>.</p>
          <h2>Order Summary</h2>
          <ul>
            ${products
              .map(
                (product) => `
              <li>
                ${product.title} - ${product.quantity} x Rs. ${product.price.toLocaleString()}
              </li>
            `
              )
              .join("")}
          </ul>
          <h3>Total Amount: Rs. ${totalAmount.toLocaleString()}</h3>
          <p>If you have any questions, please contact us.</p>
        `,
      };

      // Send the email
      await transporter.sendMail(mailOptions);
    }

    return NextResponse.json(
      { message: "Webhook processed successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { message: "Failed to process webhook." },
      { status: 500 }
    );
  }
}