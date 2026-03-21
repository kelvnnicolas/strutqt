import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

// Navbar component - handles navigation and user profile dropdown
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    setDropdownOpen(false);
    router.push('/login');
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    router.push('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600 tracking-tight">
          struqt
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="#features" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Features</Link>
          <Link href="#templates" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Templates</Link>
          <Link href="#pricing" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Pricing</Link>
          <Link href="#docs" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Docs</Link>
        </div>

        {/* Right Section: Profile & CTA */}
        <div className="flex items-center space-x-4">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white glass-card shadow-lg py-2 z-50 animate-fade-in origin-top-right flex flex-col">
                {user ? (
                  <>
                    <Link href="/profile" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition">My Profile</Link>
                    <Link href="/dashboard" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition">Dashboard</Link>
                    <Link href="/settings" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition">Settings</Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="text-left w-full block px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="text-left w-full block px-4 py-2 text-sm text-primary-600 hover:bg-gray-100 transition rounded-md"
                  >
                    Login
                  </button>
                )}
              </div>
            )}
          </div>

          <Link href="#signup" className="hidden sm:inline-flex bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-5 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
            Start Free
          </Link>
        </div>
      </div>
    </nav>
  );
}
