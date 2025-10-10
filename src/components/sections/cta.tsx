import { Button } from '@/components/ui/button';

export default function CTA() {
  return (
    <section id="cta" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-headline">
          Ready to Build the Future?
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
          Start your next project with the collective intelligence of African
          architecture at your fingertips.
        </p>
        <a href="#library">
          <Button size="lg" variant="default">
            Begin Your Design Journey
          </Button>
        </a>
      </div>
    </section>
  );
}
