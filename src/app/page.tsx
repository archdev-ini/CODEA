import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import Statement from '@/components/sections/statement';
import WhatWeDo from '@/components/sections/what-we-do';
import WhyItMatters from '@/components/sections/why-it-matters';
import CoreTagline from '@/components/sections/core-tagline';
import CTA from '@/components/sections/cta';
import PrecedentLibrary from '@/components/sections/precedent-library';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Statement />
        <WhatWeDo />
        <WhyItMatters />
        <CoreTagline />
        <PrecedentLibrary />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}