import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import ProtectedRoute from '../components/ProtectedRoute';
import ProfileForm from '../components/ProfileForm';
import AvatarUpload from '../components/AvatarUpload';
import BillingSection from '../components/BillingSection';

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <Head>
        <title>My Profile - struqt</title>
      </Head>
      <div className="min-h-screen bg-transparent flex flex-col">
        {/* Background matching design system */}
        <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-white to-gray-50 opacity-80 pointer-events-none"></div>
        <Navbar />
        
        <main className="flex-grow pt-24 pb-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Account Settings</h1>
            
            <div className="space-y-8 animate-fade-in-up">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <AvatarUpload />
                </div>
                <div className="lg:col-span-2">
                  <ProfileForm />
                </div>
              </div>
              <BillingSection />
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
