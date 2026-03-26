import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AvatarUpload() {
  const { user, updateAvatar } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState('');

  const handleFile = (e) => {
    setError('');
    const file = e.target.files[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setError('Only JPEG or PNG allowed');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('File must be less than 2MB');
      return;
    }

    const img = new Image();
    img.onload = () => {
      if (img.width > 500 || img.height > 500) {
        setError('Image must be max 500x500');
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      if (updateAvatar) updateAvatar(imageUrl);
    };
    img.src = URL.createObjectURL(file);
  };

  return (
    <>
      <div className="rounded-xl backdrop-blur bg-white/70 shadow-md p-6 border border-gray-100 h-full flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-6 w-full text-left">Profile Photo</h2>
        <div
          className="relative w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden mb-4 cursor-pointer transform transition duration-300 hover:scale-110"
          onClick={() => { if(user?.avatar) setExpanded(true); }}
        >
          {user?.avatar ? (
            <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-tr from-primary-400 to-indigo-500 flex items-center justify-center text-white text-4xl font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          )}
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Allowed formats: JPG, PNG. Max size: 2MB.
        </p>
        <div className="flex space-x-3 w-full justify-center">
          {user?.avatar && (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition"
            >
              View Photo
            </button>
          )}
          <label className="cursor-pointer px-4 py-2 border border-primary-600 shadow-sm text-sm font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition">
            Edit Photo
            <input type="file" className="hidden" accept="image/png, image/jpeg" onChange={handleFile} />
          </label>
        </div>
      </div>

      {expanded && user?.avatar && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 animate-fade-in backdrop-blur-sm cursor-pointer"
          onClick={() => setExpanded(false)}
        >
          <img 
            src={user.avatar} 
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl shadow-2xl transform transition-transform duration-500 hover:scale-105" 
            alt="Expanded Profile" 
          />
        </div>
      )}
    </>
  );
}
