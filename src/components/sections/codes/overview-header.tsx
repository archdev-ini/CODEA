'use client';

export default function OverviewHeader() {
  return (
    <section className="py-20 md:py-32 bg-card border-b">
      <div className="container mx-auto px-4 text-center">
        <blockquote className="text-3xl md:text-4xl font-medium text-primary mb-4">
          “Pan-African Code Library”
        </blockquote>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
          A unified repository of building regulations and standards, powered by
          AI. Explore by country to get started.
        </p>
      </div>
    </section>
  );
}
