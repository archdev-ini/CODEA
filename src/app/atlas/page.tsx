
'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import OverviewHeader from '@/components/sections/codes/overview-header';
import CountryIndex from '@/components/sections/codes/country-index';
import FooterCta from '@/components/sections/codes/footer-cta';
import CodeCategories from '@/components/sections/codes/code-categories';
import DocumentLibrary from '@/components/sections/codes/document-library';

export default function AtlasPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <OverviewHeader />
        <CountryIndex />
        <CodeCategories />
        <DocumentLibrary />
        <FooterCta />
      </main>
      <Footer />
    </div>
  );
}
