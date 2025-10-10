import { Separator } from '@/components/ui/separator';

export default function WhyCodeaExists() {
  return (
    <section className="py-20 md:py-28 bg-card border-y">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-semibold text-primary tracking-tight">
              Why CODEA Exists
            </h2>
          </div>
          <div className="md:col-span-2 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-foreground">
                The Problem of Fragmentation
              </h3>
              <p className="text-lg text-muted-foreground">
                Architects, planners, and builders across Africa navigate a
                complex web of fragmented regulations, inaccessible archives,
                and standards that often lack local context. This structural gap
                hinders innovation and makes it difficult to design for resilience
                and cultural continuity.
              </p>
            </div>
            <Separator />
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-foreground">
                A Need for Structure
              </h3>
              <p className="text-lg text-muted-foreground">
                Creativity is abundant, but the tools to apply it are not. CODEA
                was born from a simple idea: what if every design decision could
                be informed by a clear, accessible, and continent-wide knowledge
                base? We provide the structure so that architects can do their
                best work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
