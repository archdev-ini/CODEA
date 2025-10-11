'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import OverviewHeader from '@/components/sections/codes/overview-header';
import CommunityInsights from '@/components/sections/codes/community-insights';
import FooterCta from '@/components/sections/codes/footer-cta';
import SmartSearchResults from '@/components/sections/codes/smart-search-results';
import { askCodeQuestion } from '@/app/actions';
import { Loader2 } from 'lucide-react';
import { availableCountries, type Country } from '@/lib/countries';
import CountryIndex from '@/components/sections/codes/country-index';

// Kept for type reference, but AI is disabled.
type AnswerCodeQuestionOutput = {
  answer: string;
  relevant_articles: any[];
};


export default function CodesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] =
    useState<AnswerCodeQuestionOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  useEffect(() => {
    const countries = availableCountries();
    setCountries(countries);
    if (countries.length > 0) {
      setSelectedCountry(countries[0].value);
    }
  }, []);

  const handleSearch = async (question: string) => {
    if (!question || !selectedCountry) return;

    setIsSearching(true);
    setError(null);
    setSearchResults(null);

    const result = await askCodeQuestion({
      question,
      country: selectedCountry as any,
    });

    if (result.success && result.data) {
      setSearchResults(result.data);
    } else {
      setError(result.error || 'An unexpected error occurred.');
    }

    setIsSearching(false);
    setSearchTerm(question);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <OverviewHeader
          onSearch={handleSearch}
          isSearching={isSearching}
          selectedCountry={selectedCountry}
          onCountryChange={setSelectedCountry}
          countries={countries}
        />
        {isSearching && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        {error && (
          <div className="container mx-auto px-4 py-10 text-center">
            <p className="text-destructive">{error}</p>
          </div>
        )}
        {searchResults ? (
          <SmartSearchResults question={searchTerm} results={searchResults} />
        ) : (
          !isSearching && (
            <>
              <CountryIndex />
              <CommunityInsights />
            </>
          )
        )}
        <FooterCta />
      </main>
      <Footer />
    </div>
  );
}
