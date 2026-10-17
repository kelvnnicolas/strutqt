import React from 'react';

export default function SocialProof() {
  const logos = ['Marketers', 'Agencies', 'Creators', 'Startups', 'Enterprises'];

  return (
    <section className="py-16 border-t border-gray-100 bg-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase text-gray-500 tracking-wider mb-8">
          Trusted by high-growth teams and individuals
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {logos.map((logo, index) => (
            <div key={index} className="text-2xl font-black text-gray-400">
              {logo.toUpperCase()}
            </div>
          ))}
        </div>

        {/* Testimonial snippet */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="glass relative rounded-2xl p-8 md:p-12 text-center shadow-sm">
            <svg className="absolute top-4 left-4 h-12 w-12 text-primary-200 opacity-50" fill="currentColor" viewBox="0 0 32 32">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            <p className="relative text-xl md:text-2xl font-medium text-gray-900 mb-6 italic">
              &ldquo;struqt completely transformed how we acquire customers. The interactive funnels convert at a rate we&apos;ve never seen before with standard landing pages.&rdquo;
            </p>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-500 to-indigo-500 flex items-center justify-center text-white font-bold">SM</div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Sarah Mitchell</div>
                <div className="text-sm text-gray-500">VP of Marketing, TechGrow</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
