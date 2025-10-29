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
                The absence of structure creates fragmentation.
              </h3>
              <p className="text-lg text-muted-foreground">
                Across Africa, the practice of architecture is strong — but the
                systems supporting it are scattered. Building codes differ by
                region, climate data is inconsistently applied, and cultural
                precedents remain undocumented.
              </p>
              <p className="text-lg text-foreground font-medium">
                CODEA bridges these gaps through a single intelligence
                interface — a digital framework where regulations, materials,
                and ideas coexist.
              </p>
            </div>
            <Separator />
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-foreground">
                CODEA is not a database. It is an interpreter.
              </h3>
              <p className="text-lg text-muted-foreground">
                Each dataset, precedent, and cultural record is translated into
                usable insight. Because data is not knowledge —{' '}
                <span className="font-semibold text-foreground">
                  interpretation is.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
