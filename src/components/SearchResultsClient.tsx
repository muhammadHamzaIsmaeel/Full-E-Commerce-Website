// src/components/SearchResultsClient.tsx
"use client";

import dynamic from 'next/dynamic';

const SearchResults = dynamic(() => import('@/components/searchResults'), {
  ssr: false,
  loading: () => <div>Loading...</div>, // Simplified loading indicator
});

export default function SearchResultsClient() {
  return <SearchResults />;
}