import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../context/AuthContext';
import MetricsCard from '../components/MetricsCard';
import ChartContainer from '../components/ChartContainer';
import QuizGallery from '../components/QuizGallery';
import CTAButtons from '../components/CTAButtons';

export default function DashboardPage() {
  const { user } = useAuth();
  
  // Mock data for the dashboard (replaced by real queries in F-002)
  const [quizzes] = useState([
    { id: 1, name: 'SaaS Onboarding Flow', views: 1250, leads: 450, conversion_rate: 36 },
    { id: 2, name: 'Real Estate Buyer Quiz', views: 3400, leads: 820, conversion_rate: 24 },
    { id: 3, name: 'Fitness Assessment', views: 890, leads: 120, conversion_rate: 13.5 },
  ]);

  return (
    <ProtectedRoute>
      <Head>
        <title>Dashboard - struqt</title>
      </Head>
      <div className="min-h-screen bg-transparent flex flex-col">
        <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-gray-50 to-indigo-50/30 opacity-80 pointer-events-none"></div>
        <Navbar />
        
        <main className="flex-grow pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in-up">
            
            {/* Header & Metrics */}
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">
                    Performance Overview
                  </h1>
                  <p className="text-gray-500 text-sm">Welcome back{user?.name ? `, ${user.name}` : ''}! Here&apos;s how your funnels are performing.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricsCard 
                  title="Total Leads" 
                  value="1,390" 
                  trend={12} 
                  icon={
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  } 
                />
                <MetricsCard 
                  title="Conversion Rate" 
                  value="24.5%" 
                  trend={2.4} 
                  icon={
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  } 
                />
                <MetricsCard 
                  title="Qualified Leads" 
                  value="842" 
                  trend={8} 
                  icon={
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  } 
                />
                <MetricsCard 
                  title="Completion Rate" 
                  value="68%" 
                  trend={-1.2} 
                  icon={
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  } 
                />
              </div>
            </div>

            {/* Charts Section */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Analytics Charts</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartContainer title="Leads Over Time" type="line" />
                <ChartContainer title="Conversion Funnel" type="bar" />
              </div>
            </div>

            {/* Quizzes Section */}
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">My Quizzes</h2>
                <CTAButtons />
              </div>
              <QuizGallery quizzes={quizzes} />
            </div>

          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
