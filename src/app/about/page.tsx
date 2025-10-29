import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import MissionStatement from '@/components/sections/about/mission-statement';
import WhyCodeaExists from '@/components/sections/about/why-codea-exists';
import TheLayers from '@/components/sections/about/the-layers';
import AidaSection from '@/components/sections/about/aida';
import VisionForward from '@/components/sections/about/vision-forward';
import CTA from '@/components/sections/cta';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <MissionStatement />
        <WhyCodeaExists />
        <TheLayers />
        <AidaSection />
        <VisionForward />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
