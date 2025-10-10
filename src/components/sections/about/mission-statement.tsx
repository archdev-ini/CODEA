import { Separator } from '@/components/ui/separator';

export default function MissionStatement() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
            Our Mission
          </p>
          <h1 className="text-4xl md:text-5xl font-medium text-primary tracking-tight leading-tight mb-6">
            A system for architectural clarity in Africa.
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
            CODEA exists to unify, interpret, and amplify the knowledge that
            drives architecture across the African continent. From national
            codes to vernacular principles, it creates a structured, searchable
            layer of intelligence — so architects can design with precision,

            relevance, and responsibility.
          </p>
          <Separator className="w-1/4 mx-auto" />
          <blockquote className="mt-12 text-xl italic text-foreground">
            “Architecture evolves when its intelligence is shared.”
          </blockquote>
        </div>
      </div>
    </section>
  );
}
