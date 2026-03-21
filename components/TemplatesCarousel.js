import React, { useRef } from 'react';
import TemplateCard from './TemplateCard';

const templates = [
  {
    id: "real_estate_dark",
    theme: "dark",
    niche: "Real Estate",
    title: "Find Your Ideal Property",
    description: "Interactive quiz to qualify buyers based on budget, location and preferences",
    style: {
      background: "bg-gray-900 border border-gray-800",
      text: "text-white",
      card: "rounded-xl shadow-lg p-6 hover:shadow-2xl"
    },
    preview_elements: [
      "Question step",
      "Multiple choice answers",
      "Progress indicator"
    ]
  },
  {
    id: "dental_light",
    theme: "light",
    niche: "Dentistry",
    title: "Discover Your Perfect Smile Plan",
    description: "Lead qualification quiz for dental treatments and consultations",
    style: {
      background: "bg-white border border-gray-200",
      text: "text-gray-800",
      card: "rounded-xl shadow-md p-6 hover:shadow-xl"
    },
    preview_elements: [
      "Question step",
      "Form input",
      "Call-to-action button"
    ]
  },
  {
    id: "fitness_trainer",
    theme: "light",
    niche: "Fitness",
    title: "Personalized Workout Plan",
    description: "Assess user fitness level and goals to offer a tailored online coaching program.",
    style: {
      background: "bg-gradient-to-br from-primary-50 to-white border border-primary-100",
      text: "text-gray-900",
      card: "rounded-xl shadow-md p-6 hover:shadow-xl"
    },
    preview_elements: [
      "Interactive slider",
      "Image selection",
      "Lead capture form"
    ]
  }
];

export default function TemplatesCarousel() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 320 : 420;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="templates" className="py-24 bg-white/50 backdrop-blur-sm relative border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="text-primary-600 font-semibold tracking-wide uppercase text-sm mb-2">Templates</h2>
            <h3 className="text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Start converting in minutes
            </h3>
            <p className="mt-4 text-xl text-gray-500">
              Choose from our high-converting funnel templates designed for specific industries and goals.
            </p>
          </div>
          <div className="hidden md:flex space-x-3 mt-6 md:mt-0">
            <button 
              onClick={() => scroll('left')} 
              className="p-3 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-primary-600 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => scroll('right')} 
              className="p-3 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-primary-600 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-10 pt-4 scroll-smooth snap-x snap-mandatory hide-scrollbar relative"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none' 
            }}
          >
            {templates.map((template, idx) => (
              <TemplateCard key={idx} template={template} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
