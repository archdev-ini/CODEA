'use client';

import { doc } from 'firebase/firestore';
import { useDoc, useFirestore } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';

type Jurisdiction = {
  id: string;
  name: string;
  level: string;
};

type JurisdictionHeaderProps = {
  jurisdictionId: string;
};

export default function JurisdictionHeader({
  jurisdictionId,
}: JurisdictionHeaderProps) {
  const firestore = useFirestore();
  const jurisdictionRef = doc(firestore, 'jurisdictions', jurisdictionId);
  const { data: jurisdiction, isLoading } = useDoc<Jurisdiction>(jurisdictionRef);

  return (
    <section className="py-20 md:py-32 bg-card border-b">
      <div className="container mx-auto px-4 text-center">
        {isLoading ? (
          <>
            <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
          </>
        ) : jurisdiction ? (
          <>
            <h1 className="text-3xl md:text-4xl font-medium text-primary mb-4">
              {jurisdiction.name} Building Codes
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore the standards and regulations governing architecture and
              construction in {jurisdiction.name}.
            </p>
          </>
        ) : (
          <h1 className="text-3xl md:text-4xl font-medium text-destructive mb-4">
            Jurisdiction not found.
          </h1>
        )}
      </div>
    </section>
  );
}
