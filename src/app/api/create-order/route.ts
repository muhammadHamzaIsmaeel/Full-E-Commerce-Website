import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client'; // Import your Sanity client
import { v4 as uuidv4 } from 'uuid';

// Define types for the product image
interface ProductImage {
  asset: {
    _ref: string;
  };
}

// Define types for the product
interface Product {
  title: string;
  price: number;
  quantity: number;
  productImage: ProductImage;
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
  formData: FormData;
  userId: string; // Add userId to the Order interface
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { order } = body as { order: Order }; // Cast the body to the correct type

    if (!order) {
      return new NextResponse("Order data is missing", { status: 400 });
    }

    // Calculate total amount
    const totalAmount = order.products.reduce(
      (total: number, product: Product) => total + product.price * product.quantity,
      0
    );

    // Create Sanity document
    const sanityOrder = {
      _type: 'order', // Must match your schema name
      orderId: order.id,
      status: order.status,
      products: order.products.map((product: Product) => ({
        _key: uuidv4(), // Add a unique _key for each product
        title: product.title,
        price: product.price,
        quantity: product.quantity,
        productImage: product.productImage,
      })),
      date: order.date,
      totalAmount: totalAmount, // Add total amount
      paymentStatus: 'pending', // Default payment status
      trackingNumber: '', // Default tracking number (can be updated later)
      formData: order.formData,
      userId: order.userId, // Include the userId
    };

    // Sanity document creation
    const result = await client.create(sanityOrder);

    console.log("Order created in Sanity:", result);

    return NextResponse.json(
      { message: "Order created", order: result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order in Sanity:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}