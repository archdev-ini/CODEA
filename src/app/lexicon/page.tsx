
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Search } from 'lucide-react';
import Link from 'next/link';

const categories = [
  'Cultural',
  'Environmental',
  'Spatial',
  'Material',
  'Vernacular',
  'Technical',
];

export default function LexiconPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="py-20 md:py-28 text-center bg-card border-b">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
              The Lexicon
            </h1>
            <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
              A multilingual glossary connecting architectural terms to their
              cultural, environmental, and technical roots.
            </p>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="relative mb-12">
                <Input
                  type="search"
                  placeholder="Search for a term (e.g., Compound House, Bricolage)..."
                  className="h-12 pl-10 text-base"
                  disabled
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>

              <div className="text-center p-8 border border-dashed rounded-lg">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold text-primary mb-2">
                  Feature In Development
                </h2>
                <p className="text-muted-foreground mb-6">
                  The interactive A-Z index and search functionality are
                  currently being built. Soon, you will be able to explore the
                  rich vocabulary of African architecture here.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {categories.map((category) => (
                    <Button key={category} variant="outline" disabled>
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
