import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import AboutContent from '@/components/sections/about/about-content';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <AboutContent />
      </main>
      <Footer />
    </div>
  );
}
