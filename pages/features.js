import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Features from '../components/Features';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col pt-16">
      <Head>
        <title>Features - struqt</title>
      </Head>
      <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-white to-gray-50 opacity-80 pointer-events-none"></div>
      <Navbar />
      
      <main className="flex-grow pt-12 pb-12">
        <Features />
      </main>
    </div>
  );
}
