// 'use client';

// import React, { useEffect, useState } from "react";
// import { IoMdShare } from "react-icons/io";
// import { MdCompareArrows } from "react-icons/md";
// import { FaRegHeart } from "react-icons/fa";
// import Image from "next/image";
// import Link from "next/link";
// import { client } from "@/sanity/lib/client";
// import { urlFor } from "@/sanity/lib/image";

// interface IProduct {
//   _id: string;
//   title: string;
//   shortDescription: string;
//   price: string;
//   oldPrice?: string;
//   dicountPercentage?: string;
//   isNew?: boolean; // Added isNew
//   productImage: string;
// }

// export default function Products() {
//   const [data, setData] = useState<IProduct[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const products: IProduct[] = await client.fetch(
//           '*[_type == "product"][0...8]{_id, title, shortDescription, dicountPercentage, price, oldPrice, isNew, productImage}'
//         );
//         setData(products);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Failed to fetch products:", error);
//         setIsLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (isLoading) {
//     return <div className="text-center">Loading products...</div>;
//   }

//   if (!data.length) {
//     return <div className="text-center">No products found.</div>;
//   }

//   return (
//     <div className="py-12 md:px-5 lg:mx-16">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:space-y-0 space-y-6 lg:grid-cols-4 md:gap-6  max-w-7xl mx-auto">
//         {data.map((item) => (
//           <div
//             key={item._id}
//             className="relative w-auto group bg-gray-100 overflow-hidden"
//           >
//             <img
//               src={urlFor(item.productImage).url()}
//               alt={`Image of ${item.title}`}
//               width={1000}
//               height={1000}
//               className="w-[285px] h-[301px] object-cover"
//             />
//             {item.dicountPercentage && (
//               <span
//                 className="absolute top-4 right-4 bg-[#E97171] text-white text-xs font-bold py-2 px-4 rounded-full flex items-center justify-center"
//                 style={{
//                   width: "40px",
//                   height: "40px",
//                   textAlign: "center",
//                   lineHeight: "40px",
//                 }}
//               >
//                 %
//                 {item.dicountPercentage}
//               </span>
//             )}
//             {item.isNew && (
//               <span
//                 className="absolute top-4 right-4 bg-[#2EC1AC] text-white text-xs font-bold py-2 px-4 rounded-full flex items-center justify-center"
//                 style={{
//                   width: "40px",
//                   height: "40px",
//                   textAlign: "center",
//                   lineHeight: "40px",
//                 }}
//               >
//                 NEW
//               </span>
//             )}
//             <div className="p-4">
//               <h3 className="font-semibold text-lg">{item.title}</h3>
//               <p className="text-gray-500 text-sm">{item.shortDescription}</p>
//               <div className="mt-2 flex items-center space-x-2">
//                 <span className="font-bold">Rp {item.price}</span>
//                 {item.oldPrice && (
//                   <span className="text-gray-400 line-through text-sm">
//                     Rp {item.oldPrice}
//                   </span>
//                 )}
//               </div>
//             </div>
//             <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//               <Link href={`/product/${item._id}`}>
//                 <button className="bg-white text-[#B88E2F] px-8 py-2 mb-2 font-medium shadow">
//                   View Details
//                 </button>
//               </Link>
//               <div className="flex space-x-2">
//                 <button className="flex items-center gap-1 text-white">
//                   <IoMdShare />
//                   <span>Share</span>
//                 </button>
//                 <button className="flex items-center gap-1 text-white">
//                   <MdCompareArrows />
//                   <span>Compare</span>
//                 </button>
//                 <button className="flex items-center gap-1 text-white">
//                   <FaRegHeart />
//                   <span>Like</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="mt-8 text-center">
//         <button className="px-14 py-2 text-[#B88E2F] hover:bg-[#b88f2f90] font-medium rounded border-[#B88E2F] border-2 transition">
//           Show More
//         </button>
//       </div>
//     </div>
//   );
// }
