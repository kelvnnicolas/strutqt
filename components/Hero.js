import React from 'react';
import Link from 'next/link';
import ProductPreview from './ProductPreview';

// Hero component - Primary ATF CTA and visual mockup
export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-1/2 -left-1/4 w-[1000px] h-[1000px] rounded-full bg-primary-100/40 blur-3xl opacity-50 mix-blend-multiply"></div>
        <div className="absolute top-0 -right-1/4 w-[800px] h-[800px] rounded-full bg-indigo-100/40 blur-3xl opacity-50 mix-blend-multiply"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-6">
            Build High-Converting <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Quiz Funnels</span>
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
            Capture, qualify and convert leads automatically with interactive experiences. Position your product as a marketing system.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="#signup" className="w-full sm:w-auto px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
              Start Free Trial
            </Link>
            <Link href="#demo" className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-gray-300 text-gray-800 text-lg font-semibold rounded-xl shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center">
              <svg className="w-5 h-5 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              View Demo
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500">No credit card required • 14-day free trial</p>
        </div>

        {/* Visual Product Mockup */}
        <div className="mt-16 sm:mt-24 relative" style={{ animationDelay: '0.2s' }}>
          <ProductPreview />
        </div>
      </div>
    </section>
  );
}
