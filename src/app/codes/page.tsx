import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import OverviewHeader from '@/components/sections/codes/overview-header';
import CodeCategories from '@/components/sections/codes/code-categories';
import CountryIndex from '@/components/sections/codes/country-index';
import VisualSummaries from '@/components/sections/codes/visual-summaries';
import CompareCodes from '@/components/sections/codes/compare-codes';
import CommunityInsights from '@/components/sections/codes/community-insights';
import FooterCta from '@/components/sections/codes/footer-cta';

export default function CodesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <OverviewHeader />
        <CodeCategories />
        <CountryIndex />
        <VisualSummaries />
        <CompareCodes />
        <CommunityInsights />
        <FooterCta />
      </main>
      <Footer />
    </div>
  );
}
