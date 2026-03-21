import React from 'react';

export default function BillingSection() {
  return (
    <div id="billing" className="rounded-xl backdrop-blur bg-white/70 shadow-md p-6 border border-gray-100">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Current Plan</h2>
        <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-sm">
          <div>
            <h3 className="flex items-center text-lg font-semibold text-gray-900">
              Growth Plan <span className="ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>
            </h3>
            <p className="text-sm text-gray-500 mt-1">Unlimited Quizzes • Up to 10k Responses/mo</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button className="px-4 py-2 border border-primary-600 shadow-sm text-sm font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 transition hover:scale-105">
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Payment Methods</h2>
          <button className="text-sm font-medium text-primary-600 hover:text-primary-700 transition">
            + Add New Card
          </button>
        </div>
        <div className="bg-white rounded-lg p-5 border border-gray-200 flex items-center justify-between shadow-sm hover:border-gray-300 transition-colors">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-12 bg-gray-100 border border-gray-200 rounded flex items-center justify-center">
              <span className="font-bold text-gray-600 text-[10px] italic">VISA</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Visa ending in 4242</p>
              <p className="text-xs text-gray-500">Expires 12/2026</p>
            </div>
          </div>
          <button className="text-xs font-medium text-gray-500 hover:text-red-600 transition">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
