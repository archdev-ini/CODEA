
'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CodesPage() {
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
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
