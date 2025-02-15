'use client'

import Image from 'next/image';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Oops! Something Went Wrong.
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            We encountered an unexpected issue. Please try again.
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-center">
            <Image
              src="/error.png" // Replace with your error image path
              alt="Error Illustration"
              width={200}
              height={200}
              className="mb-4"
            />
          </div>
          <p className="text-gray-700 mb-4 text-center">
            {error.message || "An unexpected error occurred."}
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => reset()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}