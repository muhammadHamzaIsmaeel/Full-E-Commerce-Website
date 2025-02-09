"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import { useAuth } from "@clerk/nextjs"; // Import Clerk's useAuth hook

// Define types for the product image
interface ProductImage {
  asset: {
    _ref: string;
  };
}

// Define types for the cart item
interface CartItem {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  productImage: ProductImage;
}

// Define types for the order
interface Order {
  orderId: number;
  status: string;
  products: CartItem[];
  date: string;
  formData: {
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
    addressType: "home" | "office";
  };
}

export default function MyOrders() {
  const { userId } = useAuth(); // Get the logged-in user's ID
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!userId) return; // Ensure the user is logged in

    // Fetch orders for the logged-in user
    const fetchOrders = async () => {
      try {
        const query = `*[_type == "order" && userId == "${userId}"] | order(date desc) {
          orderId,
          status,
          products[] {
            _id,
            title,
            price,
            quantity,
            productImage
          },
          date,
          formData {
            fullName,
            addressLine1,
            addressLine2,
            city,
            province,
            zipCode,
            courierService,
            phoneNumber1,
            phoneNumber2,
            emailAddress,
            additionalInformation,
            paymentMethod,
            landmark,
            addressType
          }
        }`;

        const sanityOrders = await client.fetch(query);
        setOrders(sanityOrders);
        setFilteredOrders(sanityOrders); // Initialize filtered orders with all orders
      } catch (error) {
        console.error("Error fetching orders from Sanity:", error);
      }
    };

    fetchOrders();
  }, [userId]); // Re-fetch orders when userId changes

  // Handle search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === "") {
      setFilteredOrders(orders); // Reset to all orders if search term is empty
    } else {
      const filtered = orders.filter((order) =>
        order.orderId.toString().includes(term)
      );
      setFilteredOrders(filtered);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by Order ID"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-gray-600 italic">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Order Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Order #{order.orderId}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                {/* Status Badge */}
                <span
                  className={`inline-flex items-center justify-center px-3 py-1 text-sm font-medium rounded-full mt-2 md:mt-0 ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.status === "processing"
                      ? "bg-blue-100 text-blue-800"
                      : order.status === "shipped"
                      ? "bg-purple-100 text-purple-800"
                      : order.status === "delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Shipping Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Shipping Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                  <div>
                    <p className="font-medium text-gray-700">Full Name:</p>
                    <p>{order.formData.fullName}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Phone:</p>
                    <p>{order.formData.phoneNumber1}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Address:</p>
                    <p>{order.formData.addressLine1}</p>
                    {order.formData.addressLine2 && (
                      <p>{order.formData.addressLine2}</p>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">City:</p>
                    <p>{order.formData.city}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Province:</p>
                    <p>{order.formData.province}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Zip Code:</p>
                    <p>{order.formData.zipCode}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Courier:</p>
                    <p>{order.formData.courierService}</p>
                  </div>
                  {order.formData.landmark && (
                    <div>
                      <p className="font-medium text-gray-700">Landmark:</p>
                      <p>{order.formData.landmark}</p>
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-700">Address Type:</p>
                    <p>{order.formData.addressType}</p>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Products
                </h3>
                <div className="space-y-4">
                  {order.products.map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                    >
                      {/* Product Image */}
                      {product.productImage && (
                        <Image
                          src={urlFor(product.productImage).url()}
                          alt={product.title}
                          width={80}
                          height={80}
                          className="w-20 h-20 object-cover rounded-md"
                          loading="lazy"
                          onError={(e) => {
                            console.error("Image load error:", e);
                          }}
                        />
                      )}

                      {/* Product Details */}
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">
                          {product.title}
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="text-gray-600 text-sm">
                            {product.quantity} x Rs.{" "}
                            {product.price.toLocaleString()}
                          </p>
                          <p className="text-gray-800 font-semibold">
                            Rs. {(product.price * product.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Total */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-lg font-semibold text-gray-800">
                  Order Total: Rs.{" "}
                  {order.products
                    .reduce((total, item) => total + item.price * item.quantity, 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}