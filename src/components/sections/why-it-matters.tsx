import { CheckCircle } from 'lucide-react';

const miniFeatures = [
  'Cross-country code comparison',
  'Climate + material mapping',
  'Open learning modules (coming soon)',
];

export default function WhyItMatters() {
  return (
    <section
      id="why-it-matters"
      className="py-20 md:py-28 bg-card border-y border-border"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-headline">
              The problem is not lack of creativity — it’s lack of structure.
            </h2>
            <p className="text-muted-foreground text-lg">
              Architects across Africa navigate fragmented codes, missing
              archives, and non-contextual standards. CODEA rebuilds that
              structure — an intelligence layer for all who design, teach, or
              study in Africa.
            </p>
          </div>
          <div className="space-y-4">
            {miniFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-primary" />
                <span className="text-lg text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}