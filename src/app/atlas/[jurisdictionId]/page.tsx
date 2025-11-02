'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import JurisdictionHeader from '@/components/sections/codes/jurisdiction-header';
import CodeArticleList from '@/components/sections/codes/code-article-list';

type AtlasSubPageProps = {
  params: {
    jurisdictionId: string;
  };
};

export default function AtlasSubPage({ params }: AtlasSubPageProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <JurisdictionHeader jurisdictionId={params.jurisdictionId} />
        <CodeArticleList jurisdictionId={params.jurisdictionId} />
      </main>
      <Footer />
    </div>
  );
}
