'use client';

import Navbar from '@/components/landing/navbar';
import Hero from '@/components/landing/hero';
import Problem from '@/components/landing/problem';
import Features from '@/components/landing/features';
import HowItWorks from '@/components/landing/how-it-works';
import Benefits from '@/components/landing/benefits';
import DemoPreview from '@/components/landing/demo-preview';
import Statistics from '@/components/landing/statistics';
import CTA from '@/components/landing/cta';
import Footer from '@/components/common/footer';

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Problem />
      <section id="features">
        <Features />
      </section>
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <section id="benefits">
        <Benefits />
      </section>
      <DemoPreview />
      <Statistics />
      <CTA />
      <Footer />
    </main>
  );
}
