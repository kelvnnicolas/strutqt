import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AvatarUpload() {
  const { user } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="rounded-xl backdrop-blur bg-white/70 shadow-md p-6 border border-gray-100 h-full flex flex-col items-center justify-center text-center">
      <h2 className="text-xl font-bold text-gray-900 mb-6 w-full text-left">Profile Photo</h2>
      <div 
        className="relative w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden mb-4 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-full h-full bg-gradient-to-tr from-primary-400 to-indigo-500 flex items-center justify-center text-white text-4xl font-bold">
          {user?.name?.charAt(0).toUpperCase() || 'U'}
        </div>
        
        {isHovered && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center animate-fade-in transition-all">
            <span className="text-white text-sm font-medium">Upload</span>
          </div>
        )}
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Allowed formats: JPG, PNG. Max size: 2MB.
      </p>
      <button className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition">
        Change Photo
      </button>
    </div>
  );
}
