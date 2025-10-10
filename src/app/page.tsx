import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import Vision from '@/components/sections/vision';
import PrecedentLibrary from '@/components/sections/precedent-library';
import DesignIntelligenceHub from '@/components/sections/design-intelligence-hub';
import CTA from '@/components/sections/cta';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Vision />
        <PrecedentLibrary />
        <DesignIntelligenceHub />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
