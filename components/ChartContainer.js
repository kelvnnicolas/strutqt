import React from 'react';

export default function ChartContainer({ title, type }) {
  return (
    <div className="bg-white/70 backdrop-blur rounded-xl shadow-md p-6 border border-gray-100 h-64 flex flex-col">
      <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wider">{title}</h3>
      <div className="flex-grow flex items-end justify-between space-x-2 pt-4 border-t border-gray-100 relative">
        {/* Mock Chart Visualization */}
        {type === 'bar' ? (
          <>
            {[40, 70, 45, 90, 65, 85, 110].map((h, i) => (
              <div key={i} className="w-full bg-primary-100 rounded-t-sm hover:bg-primary-300 transition-colors" style={{ height: `${h}%` }}></div>
            ))}
          </>
        ) : (
          <div className="w-full h-full relative overflow-hidden">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
              <path d="M0,100 L0,60 Q20,40 40,70 T80,30 L100,20 L100,100 Z" fill="url(#grad)" opacity="0.3" />
              <path d="M0,60 Q20,40 40,70 T80,30 L100,20" fill="none" stroke="#4f46e5" strokeWidth="2" />
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )}
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-400">
        <span>Mon</span>
        <span>Sun</span>
      </div>
    </div>
  );
}
