"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductGrid from '@/components/shop/products';
import { IProduct } from '@/types';
import { FaSearch } from 'react-icons/fa';
import { BeatLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';

async function getSearchProducts(query: string) {
    try {
        const response = await fetch(`/api/search?q=${query}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching search results:", error);
        return [];
    }
}

export default function SearchResults() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get('q') || '';
    const [searchResults, setSearchResults] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const results = await getSearchProducts(query);
                setSearchResults(results);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchData();
        } else {
            setSearchResults([]);
            setLoading(false);
        }
    }, [query]);

    const handleBackToShop = () => {
        router.push('/shop');
    };

    return (
        <div className="container mx-auto py-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                    <FaSearch className="mr-2 text-gray-500" /> Search Results for: <span className="ml-1 font-bold text-indigo-600">&quot;{query}&quot;</span>
                </h2>
                <button
                    onClick={handleBackToShop}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Back to Shop
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-48">
                    <BeatLoader color="#36D7B7" loading={true} size={16} />
                    <p className="ml-3">Loading products...</p>
                </div>
            ) : !query ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                        <FaSearch className="inline-block mr-1" /> Enter a search term to find products.
                    </p>
                </div>
            ) : searchResults.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                        <FaSearch className="inline-block mr-1" /> No products found matching &quot;{query}&quot;.
                    </p>
                </div>
            ) : (
                <ProductGrid products={searchResults} />
            )}
        </div>
    );
}