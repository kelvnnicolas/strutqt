import React from 'react';

// ProductPreview component - interactive mockup with floating cards
export default function ProductPreview() {
  return (
    <div className="relative mx-auto max-w-5xl animate-fade-in-up shadow-2xl rounded-2xl glass-card overflow-hidden border border-white/40 ring-1 ring-black/5 bg-white/40">
      {/* Browser Chrome */}
      <div className="bg-white/60 border-b border-gray-200/50 px-4 py-3 flex items-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div className="mx-auto bg-white/50 w-1/3 h-6 rounded-md shadow-sm border border-gray-100 flex items-center px-3">
          <svg className="w-3 h-3 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          <span className="text-xs text-center flex-1 text-gray-500 font-medium">app.struqt.com/builder</span>
        </div>
      </div>

      {/* App Interface Mock */}
      <div className="p-6 md:p-8 bg-gradient-to-br from-gray-50/50 to-gray-100/50 min-h-[400px] flex gap-6 relative">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col w-48 space-y-3">
          <div className="h-8 w-full bg-white/80 rounded shadow-sm"></div>
          <div className="h-8 w-3/4 bg-white/60 rounded shadow-sm"></div>
          <div className="h-8 w-5/6 bg-white/60 rounded shadow-sm"></div>
          <div className="h-8 w-full bg-white/60 rounded shadow-sm"></div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="h-8 w-48 bg-gray-200/80 rounded-lg"></div>
            <div className="h-10 w-32 bg-primary-500/90 rounded-lg shadow"></div>
          </div>
          
          {/* Quiz Builder Mock */}
          <div className="glass-card bg-white p-6 shadow-sm min-h-[250px] relative transition-transform duration-300 hover:scale-[1.01]">
            <div className="w-full flex justify-center mb-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div className="h-4 w-32 bg-gray-200 rounded mx-auto"></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="w-full p-4 border border-gray-100 rounded-lg bg-gray-50/50 flex items-center justify-between group hover:border-primary-200 transition-colors">
                <div className="h-4 w-1/2 bg-gray-200/80 rounded"></div>
                <div className="w-6 h-6 rounded-full border-2 border-gray-200"></div>
              </div>
              <div className="w-full p-4 border-2 border-primary-500 rounded-lg bg-primary-50/30 flex items-center justify-between shadow-sm">
                <div className="h-4 w-2/3 bg-primary-600/80 rounded"></div>
                <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs">✓</div>
              </div>
              <div className="w-full p-4 border border-gray-100 rounded-lg bg-gray-50/50 flex items-center justify-between group hover:border-primary-200 transition-colors">
                <div className="h-4 w-1/3 bg-gray-200/80 rounded"></div>
                <div className="w-6 h-6 rounded-full border-2 border-gray-200"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating cards for added visual interest */}
        <div className="hidden lg:block absolute -right-12 top-10 glass-card p-4 shadow-xl z-10 w-56 transform rotate-3">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
            </div>
            <div className="text-sm font-semibold text-gray-800">Conversion Rate</div>
          </div>
          <div className="text-2xl font-bold text-gray-900">42.8%</div>
          <div className="text-xs text-green-600 font-medium mt-1">+14.2% this week</div>
        </div>

        <div className="hidden lg:block absolute -left-8 bottom-10 glass-card p-4 shadow-xl z-10 w-56 transform -rotate-2">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 rounded bg-primary-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
            <div className="text-sm font-semibold text-gray-800">New Leads</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Sarah M.</span>
              <span className="text-green-500 font-medium">Qualified</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">James T.</span>
              <span className="text-green-500 font-medium">Qualified</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Alex K.</span>
              <span className="text-yellow-500 font-medium">Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
