import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Pricing from '../components/Pricing';
import ProtectedRoute from '../components/ProtectedRoute';

export default function PlansPage() {
  return (
    <ProtectedRoute>
      <Head>
        <title>Upgrade Plan - struqt</title>
      </Head>
      <div className="min-h-screen bg-transparent flex flex-col">
        <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-white to-gray-50 opacity-80 pointer-events-none"></div>
        <Navbar />
        
        <main className="flex-grow pt-24 pb-12">
          <Pricing />
        </main>
      </div>
    </ProtectedRoute>
  );
}
