import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-primary mb-6 font-headline">
          The Architectural Intelligence of Africa
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-10">
          CODEA is a Pan-African platform dedicated to decoding and
          disseminating the continent's rich architectural heritage, empowering a
          new generation of design.
        </p>
        <a href="#library">
          <Button size="lg">
            Explore the Library
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </a>
      </div>
    </section>
  );
}
