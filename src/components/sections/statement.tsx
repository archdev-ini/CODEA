import ScrollFloat from '@/components/ui/ScrollFloat';

export default function Statement() {
  return (
    <section
      id="statement"
      className="py-20 md:py-28 bg-card border-y border-border"
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="mb-6 text-4xl md:text-5xl font-bold text-primary font-headline !leading-tight">
            <ScrollFloat>
              Architecture has no borders
            </ScrollFloat>
          </h2>
          <p className="text-lg text-muted-foreground">
            Across cities and climates — from Lagos to Nairobi, Accra to Addis —
            architects navigate the same intersection of culture, climate, and
            regulation. CODEA unites these dimensions into a single intelligent
            platform, turning fragmented knowledge into clarity. Not to replace
            human judgment, but to strengthen it.
          </p>
        </div>
      </div>
    </section>
  );
}
