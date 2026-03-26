import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import ProtectedRoute from '../components/ProtectedRoute';

export default function PaymentSuccess() {
  return (
    <ProtectedRoute>
      <Head>
        <title>Payment Successful - struqt</title>
      </Head>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 max-w-md w-full text-center animate-fade-in-up">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-gray-500 mb-8">
              Thank you for upgrading! Your account has been updated, and you can now access all your premium features. A receipt has been sent to your email.
            </p>
            
            <Link href="/dashboard" className="w-full inline-flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 transition">
              Go to my Dashboard
            </Link>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
