
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ResearchNetworkContent from '@/components/sections/research-network/research-network-content';

export default function ResearchNetworkPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <ResearchNetworkContent />
      </main>
      <Footer />
    </div>
  );
}
