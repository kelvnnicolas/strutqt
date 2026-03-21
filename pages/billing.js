import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import ProtectedRoute from '../components/ProtectedRoute';
import BillingSection from '../components/BillingSection';

export default function BillingPage() {
  return (
    <ProtectedRoute>
      <Head>
        <title>Billing - struqt</title>
      </Head>
      <div className="min-h-screen bg-transparent flex flex-col">
        <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-white to-gray-50 opacity-80 pointer-events-none"></div>
        <Navbar />
        
        <main className="flex-grow pt-24 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Billing & Subscription</h1>
            <div className="animate-fade-in-up">
              <BillingSection />
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
