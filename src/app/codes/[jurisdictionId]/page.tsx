import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import JurisdictionHeader from '@/components/sections/codes/jurisdiction-header';
import CodeArticleList from '@/components/sections/codes/code-article-list';
import CommunityInsights from '@/components/sections/codes/community-insights';
import CodeCategories from '@/components/sections/codes/code-categories';

type CodesSubPageProps = {
  params: {
    jurisdictionId: string;
  };
};

export default function CodesSubPage({ params }: CodesSubPageProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <JurisdictionHeader jurisdictionId={params.jurisdictionId} />
        <CodeCategories />
        <CodeArticleList jurisdictionId={params.jurisdictionId} />
        <CommunityInsights />
      </main>
      <Footer />
    </div>
  );
}
