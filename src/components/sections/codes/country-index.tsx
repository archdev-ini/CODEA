'use client';

import { useMemo } from 'react';
import { collection, query, where } from 'firebase/firestore';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

// Represents the structure of a Jurisdiction document from Firestore.
type Jurisdiction = {
  id: string;
  name: string;
  level: string;
  parent?: string;
  articleCount?: number; // Optional field for stats
};

export default function CountryIndex() {
  const firestore = useFirestore();

  // Memoize the Firestore query to prevent re-running on every render.
  const jurisdictionsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    // We are fetching only top-level jurisdictions (countries) for this index.
    return query(
      collection(firestore, 'jurisdictions'),
      where('level', '==', 'NATIONAL')
    );
  }, [firestore]);

  // Use the custom hook to get live data from the collection.
  const {
    data: countries,
    isLoading,
    error,
  } = useCollection<Jurisdiction>(jurisdictionsQuery);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-6 text-center border rounded-lg">
              <Skeleton className="h-12 w-12 mx-auto rounded-full mb-4" />
              <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
              <Skeleton className="h-4 w-1/2 mx-auto" />
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center text-destructive">
          <p>Error loading jurisdictions: {error.message}</p>
        </div>
      );
    }

    if (!countries || countries.length === 0) {
      return (
        <div className="text-center text-muted-foreground">
          <p>No countries have been added to the database yet.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {countries.map((country) => (
          <Link href={`/codes/${country.id}`} key={country.id}>
            <SpotlightCard className="h-full text-center hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-semibold text-lg text-foreground">
                {country.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {country.articleCount || 0} indexed articles
              </p>
            </SpotlightCard>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 md:py-28 bg-card border-y">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-headline">
            Country Index
          </h2>
          <p className="text-lg text-muted-foreground">
            Select a jurisdiction to explore its building codes.
          </p>
        </div>
        {renderContent()}
      </div>
    </section>
  );
}
