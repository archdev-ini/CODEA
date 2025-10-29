import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section id="cta" className="py-20 md:py-28 bg-card border-y">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-headline">
          Start Every Project with CODEA
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
          Begin with the codes, precedents, and principles that matter. CODEA is
          where research meets design intent — a starting point for every
          contextual project.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button size="lg" asChild>
            <Link href="/codes">
              Explore the Code Library <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
