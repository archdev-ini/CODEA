
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { HelpCircle, FileText, Shield } from 'lucide-react';

export default function SupportPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary mb-4">
            Support & Documentation
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            This section is under active development. Soon, it will provide
            answers to common questions, legal information, and ways to get in
            touch.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-8 border border-dashed rounded-lg">
              <HelpCircle className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold text-primary mb-2">FAQ</h2>
              <p className="text-muted-foreground">
                Answers to questions about data submission, partnerships, and
                usage rights.
              </p>
            </div>
            <div className="p-8 border border-dashed rounded-lg">
              <FileText className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold text-primary mb-2">
                Documentation
              </h2>
              <p className="text-muted-foreground">
                Links to technical documentation and platform guides.
              </p>
            </div>
            <div className="p-8 border border-dashed rounded-lg">
              <Shield className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold text-primary mb-2">Legal</h2>
              <p className="text-muted-foreground">
                Information on terms, attribution, and our data use policy.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <Button asChild>
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
