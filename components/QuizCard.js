import React from 'react';
import Link from 'next/link';

export default function QuizCard({ quiz }) {
  return (
    <div className="bg-white/70 backdrop-blur rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-900 truncate pr-4">{quiz.name}</h3>
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 py-4 border-y border-gray-50 mb-4">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Views</p>
            <p className="font-semibold text-gray-800">{quiz.views.toLocaleString()}</p>
          </div>
          <div className="text-center border-x border-gray-100">
            <p className="text-xs text-gray-500 mb-1">Leads</p>
            <p className="font-semibold text-primary-600">{quiz.leads.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Conv.</p>
            <p className="font-semibold text-gray-800">{quiz.conversion_rate}%</p>
          </div>
        </div>
      </div>

      <div className="flex space-x-2 mt-auto">
        <button className="flex-1 px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-lg transition border border-gray-200">
          Edit
        </button>
        <button className="flex-1 px-3 py-2 bg-white hover:bg-primary-50 text-primary-600 text-sm font-medium rounded-lg transition border border-primary-200">
          Analytics
        </button>
      </div>
    </div>
  );
}
