'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import OverviewHeader from '@/components/sections/codes/overview-header';
import FooterCta from '@/components/sections/codes/footer-cta';
import CountryIndex from '@/components/sections/codes/country-index';

export default function CodesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <OverviewHeader />
        <CountryIndex />
        <FooterCta />
      </main>
      <Footer />
    </div>
  );
}
