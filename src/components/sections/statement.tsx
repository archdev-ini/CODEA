import ScrollFloat from '@/components/ui/ScrollFloat';

export default function Statement() {
  return (
    <section
      id="statement"
      className="py-20 md:py-28 bg-card border-y border-border"
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="mb-6 text-3xl md:text-4xl font-bold text-primary font-headline !leading-tight">
            <ScrollFloat>
              Architecture has no borders — only contexts.
            </ScrollFloat>
          </h2>
          <p className="text-lg text-muted-foreground">
            From Lagos to Nairobi, Accra to Addis, architects face shared
            challenges shaped by climate, culture, and regulation. CODEA
            gathers these layers into one clear source: codes, precedents, and
            insights. Not to replace judgment — but to empower it.
          </p>
        </div>
      </div>
    </section>
  );
}
