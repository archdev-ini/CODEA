'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import OverviewHeader from '@/components/sections/codes/overview-header';
import CountryIndex from '@/components/sections/codes/country-index';
import CommunityInsights from '@/components/sections/codes/community-insights';
import FooterCta from '@/components/sections/codes/footer-cta';
import SearchResults from '@/components/sections/codes/search-results';
import nigeriaData from '@/lib/data/nigeria.json';

type Article = {
  code_id: string;
  title: string;
  description: string;
  requirements: string[];
  references: string[];
  keywords: string[];
  notes?: string;
  examples?: { context: string; application: string }[];
  related_codes?: string[];
};

export default function CodesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const allArticles: Article[] = nigeriaData.sections.flatMap(
    (section) => section.articles
  );

  const filteredArticles = allArticles.filter((article) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      article.title.toLowerCase().includes(searchTermLower) ||
      article.description.toLowerCase().includes(searchTermLower) ||
      article.keywords.some((kw) => kw.toLowerCase().includes(searchTermLower))
    );
  });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <OverviewHeader searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
        {searchTerm ? (
          <SearchResults articles={filteredArticles} />
        ) : (
          <>
            <CountryIndex />
            <CommunityInsights />
          </>
        )}
        <FooterCta />
      </main>
      <Footer />
    </div>
  );
}
