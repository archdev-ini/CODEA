import { ArrowRight } from 'lucide-react';

export default function VisionForward() {
  return (
    <section className="py-20 md:py-28 bg-card border-y">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-headline">
            The Vision Forward
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Our goal is to create a public utility for the built environment in
            Africa — a foundational layer that supports architects, educates
            students, and informs policy. We envision a future where design is
            not just about what we build, but how it connects to the vast
            network of knowledge that came before it.
          </p>
          <div className="flex items-center justify-center text-lg text-primary font-medium">
            <span>A more connected practice is possible.</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </div>
        </div>
      </div>
    </section>
  );
}
