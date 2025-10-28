
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type CodesSubPageProps = {
  params: {
    jurisdictionId: string;
  };
};

export default function CodesSubPage({ params }: CodesSubPageProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary mb-4">
            Coming Soon
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            This section is under active development.
          </p>
          <Button asChild>
            <Link href="/codes">Back to Codes</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
