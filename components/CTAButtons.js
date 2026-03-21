import React from 'react';
import Link from 'next/link';

export default function CTAButtons() {
  return (
    <div className="flex justify-end gap-3 mt-4 sm:mt-0">
      <Link href="/#templates" className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition hover:scale-105">
        Templates
      </Link>
      <Link href="/#templates" className="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition hover:scale-105">
        + New Quiz
      </Link>
    </div>
  );
}
