'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { availableCountries } from '@/lib/countries';

type JurisdictionHeaderProps = {
  jurisdictionId: string;
};

export default function JurisdictionHeader({
  jurisdictionId,
}: JurisdictionHeaderProps) {
  const country = availableCountries().find(c => c.value === jurisdictionId);
  const jurisdictionName = country ? country.label : 'Unknown Jurisdiction';

  return (
    <section className="py-20 md:py-32 bg-card border-b">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-medium text-primary mb-4">
          {jurisdictionName} Building Codes
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore the standards and regulations governing architecture and
          construction in {jurisdictionName}.
        </p>
      </div>
    </section>
  );
}
