import { ArrowRight } from 'lucide-react';

export default function VisionForward() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-headline">
            From Africa to the World
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            CODEA begins as a Pan-African resource — but its ambition is global.
            The platform will connect regional knowledge systems into a worldwide
            framework for{' '}
            <span className="text-foreground font-medium">
              contextual architecture.
            </span>{' '}
            Each African country becomes a node in a decentralized network of
            design intelligence.
          </p>
          <div className="flex items-center justify-center text-lg text-primary font-medium">
            <span>
              Because the world deserves to learn from{' '}
              <span className="font-semibold">Africa’s resilience,</span> not just
              its challenges.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
