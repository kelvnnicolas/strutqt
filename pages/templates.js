import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import TemplatesCarousel from '../components/TemplatesCarousel';

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col pt-16">
      <Head>
        <title>Templates - struqt</title>
      </Head>
      <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-white to-gray-50 opacity-80 pointer-events-none"></div>
      <Navbar />
      
      <main className="flex-grow pt-12 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-4">Quiz Templates</h1>
          <p className="text-xl text-gray-500">Kickstart your lead generation with our optimized, high-converting templates.</p>
        </div>
        <TemplatesCarousel />
      </main>
    </div>
  );
}
