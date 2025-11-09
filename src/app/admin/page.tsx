import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center p-8 border border-dashed rounded-lg max-w-lg mx-auto">
          <ShieldAlert className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h1 className="text-4xl font-bold tracking-tight text-primary mb-4">
            Admin Portal Removed
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            This section has been removed as part of the site reset.
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
