import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import ProtectedRoute from '../components/ProtectedRoute';

export default function PaymentFailed() {
  return (
    <ProtectedRoute>
      <Head>
        <title>Payment Failed - struqt</title>
      </Head>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 max-w-md w-full text-center animate-fade-in-up">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h1>
            <p className="text-gray-500 mb-8">
              Unfortunately, we couldn&apos;t process your payment. Please check your payment details and try again, or use a different payment method.
            </p>
            
            <div className="space-y-3">
              <Link href="/checkout" className="w-full inline-flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 transition">
                Try again
              </Link>
              <Link href="/billing" className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition">
                Return to Billing
              </Link>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
