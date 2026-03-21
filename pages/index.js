import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import TemplatesCarousel from '../components/TemplatesCarousel';
import SocialProof from '../components/SocialProof';
import Pricing from '../components/Pricing';
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
          <SocialProof />
          <Features />
          <TemplatesCarousel />
          <Pricing />
        </main>

        <Footer />
      </div>
    </>
  );
}
