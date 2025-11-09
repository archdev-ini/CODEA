import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Users } from 'lucide-react';

export default function CommunityPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center p-8 border border-dashed rounded-lg max-w-lg mx-auto">
          <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h1 className="text-4xl font-bold tracking-tight text-primary mb-4">
            Community Hub
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            The community and contribution features have been temporarily
            removed. This section will be rebuilt.
          </p>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
