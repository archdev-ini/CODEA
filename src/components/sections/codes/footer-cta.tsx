import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function FooterCta() {
  return (
    <section className="py-20 md:py-28 bg-card border-y">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-headline">
          Explore the Library
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
          Help us fill the gaps and visualize Africa’s codes together.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button size="lg" asChild>
            <Link href="/atlas">Go to Code Library</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#" target="_blank" rel="noopener noreferrer">
              Join Discord
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
