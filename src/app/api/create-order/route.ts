// src/app/api/create-order/route.ts
import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import { v4 as uuidv4 } from 'uuid';

// Define types for the product
interface Product {
  title: string;
  price: number;
  quantity: number;
  productImage: { asset: { _ref: string } };
  selectedSize?: string; // Add selected size
  selectedColor?: string; // Add selected color
}

// Define types for the form data
interface FormData {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  province: string;
  zipCode: string;
  courierService: string;
  phoneNumber1: string;
  phoneNumber2?: string;
  emailAddress: string;
  additionalInformation?: string;
  paymentMethod: string;
  landmark?: string;
  addressType: 'home' | 'office';
}

// Define types for the order
interface Order {
  id: number;
  status: string;
  products: Product[];
  date: string;
  formData: FormData; // Use the FormData interface
  userId: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { order } = body as { order: Order };

    if (!order) {
      return new NextResponse("Order data is missing", { status: 400 });
    }

    const sanityOrder = {
      _type: 'order',
      orderId: order.id,
      status: order.status,
      products: order.products.map((product) => ({
        _key: uuidv4(),
        title: product.title,
        price: product.price,
        quantity: product.quantity,
        productImage: product.productImage,
        selectedSize: product.selectedSize, // Include selected size
        selectedColor: product.selectedColor, // Include selected color
      })),
      date: order.date,
      formData: order.formData,
      userId: order.userId,
    };

    const result = await client.create(sanityOrder);

    return NextResponse.json(
      { message: "Order created", order: result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order in Sanity:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}