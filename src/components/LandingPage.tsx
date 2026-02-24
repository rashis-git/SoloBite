import Navbar from './landing/Navbar';
import Hero from './landing/Hero';
import Features from './landing/Features';
import HowItWorks from './landing/HowItWorks';
import Stats from './landing/Stats';
import CTASection from './landing/CTASection';
import Footer from './landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface-cream">
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <HowItWorks />
      <CTASection />
      <Footer />
    </div>
  );
}
