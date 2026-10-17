import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ValueProposition from '../components/ValueProposition';
import ProductPreview from '../components/ProductPreview';
import Features from '../components/Features';
import SocialProof from '../components/SocialProof';
import Pricing from '../components/Pricing';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>struqt - Lead Capture & Quiz Funnel Builder</title>
        <meta name="description" content="Platform to create interactive quizzes and funnels for capturing, qualifying, and converting leads with analytics dashboards and export features." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col selection:bg-primary-200 selection:text-primary-900 bg-transparent">
        <Navbar />

        <main className="flex-grow">
          <Hero />
          <ValueProposition />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-8 mb-20">
            <ProductPreview />
          </div>
          <Features />
          <SocialProof />
          <Pricing />
          <FinalCTA />
        </main>

        <Footer />
      </div>
    </>
  );
}
