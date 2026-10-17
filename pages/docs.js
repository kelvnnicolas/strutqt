import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col pt-16">
      <Head>
        <title>Documentation - struqt</title>
      </Head>
      <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-white to-gray-50 opacity-80 pointer-events-none"></div>
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow border border-gray-100 p-8 max-w-2xl w-full text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Documentation Coming Soon</h1>
          <p className="text-gray-500">
            We&apos;re currently writing comprehensive guides and API documentation to help you build the best quiz funnels.
          </p>
        </div>
      </main>
    </div>
  );
}
