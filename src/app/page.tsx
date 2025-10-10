import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import Statement from '@/components/sections/statement';
import WhatWeDo from '@/components/sections/what-we-do';
import WhyItMatters from '@/components/sections/why-it-matters';
import CTA from '@/components/sections/cta';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Statement />
        <WhatWeDo />
        <WhyItMatters />
        <section id="tagline" className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <Separator className="w-1/4 mx-auto" />
            <p className="text-xl md:text-2xl font-medium text-muted-foreground mt-8">
              &ldquo;Architecture, Data, and Culture — finally in one
              place.&rdquo;
            </p>
            <Separator className="w-1/4 mx-auto mt-8" />
          </div>
        </section>
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
