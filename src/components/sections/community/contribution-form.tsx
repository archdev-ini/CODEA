'use client';

import {
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SpotlightCard from '@/components/ui/SpotlightCard';

export default function ContributionForm() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <SpotlightCard className="max-w-3xl mx-auto bg-card">
          <CardHeader className="text-center">
            <CardTitle>Submit a Contribution</CardTitle>
            <CardDescription>
              This feature is currently under maintenance. Please check back later.
            </CardDescription>
          </CardHeader>
        </SpotlightCard>
      </div>
    </section>
  );
}
