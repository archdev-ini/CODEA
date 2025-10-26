import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ContributionForm from '@/components/sections/community/contribution-form';

export default function CommunityPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <ContributionForm />
      </main>
      <Footer />
    </div>
  );
}
