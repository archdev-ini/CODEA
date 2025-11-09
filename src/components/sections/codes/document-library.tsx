
import { BookText } from 'lucide-react';

export default function DocumentLibrary() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-headline">
            Document Library
          </h2>
          <p className="text-lg text-muted-foreground">
            Browse source documents and AI-generated summaries.
          </p>
        </div>
        <div className="text-center py-12 text-muted-foreground border border-dashed rounded-lg flex flex-col items-center">
          <BookText className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            The Document Library is Coming Soon
          </h3>
          <p>
            This section has been reset and will be rebuilt.
          </p>
        </div>
      </div>
    </section>
  );
}
