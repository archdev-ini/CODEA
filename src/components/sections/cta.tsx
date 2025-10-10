import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CTA() {
  return (
    <section id="cta" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-headline">
          Join the architecture of knowledge.
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
          CODEA is built collaboratively by architects, researchers, and
          technologists. Whether you document codes, analyze climates, or build
          with local materials — your contribution strengthens the system.
        </p>
        <div className="flex justify-center items-center gap-4">
          <Button size="lg" asChild>
            <Link href="#">Contribute Data</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/community">Join the Network</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
