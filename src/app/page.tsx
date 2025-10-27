import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import WhatWeDo from '@/components/sections/what-we-do';
import Statement from '@/components/sections/statement';
import CTA from '@/components/sections/cta';
import CoreTagline from '@/components/sections/core-tagline';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <WhatWeDo />
        <Statement />
        <CoreTagline />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}