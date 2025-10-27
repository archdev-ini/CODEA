
'use client';

import { collection, query, where } from 'firebase/firestore';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Terminal } from 'lucide-react';
import Link from 'next/link';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type CommunityInsight = {
  id: string;
  title: string;
  description: string;
  contributorName: string;
};

type CommunityInsightsProps = {
  jurisdictionId: string;
};

export default function CommunityInsights({
  jurisdictionId,
}: CommunityInsightsProps) {
  const firestore = useFirestore();

  const insightsQuery = useMemoFirebase(
    () =>
      query(
        collection(firestore, 'insights'),
        where('jurisdictionId', '==', jurisdictionId),
        where('status', '==', 'APPROVED')
      ),
    [firestore, jurisdictionId]
  );

  const {
    data: insights,
    isLoading,
    error,
  } = useCollection<CommunityInsight>(insightsQuery);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load community insights. Please check your connection and
            permissions.
          </AlertDescription>
        </Alert>
      );
    }

    if (!insights || insights.length === 0) {
      return (
        <div className="text-center text-muted-foreground border border-dashed rounded-lg p-12">
          <h3 className="text-lg font-medium text-foreground mb-2">
            No insights yet for this jurisdiction. Be the first to contribute.
          </h3>
          <p className="mb-6">
            Share your knowledge, field notes, or a relevant case study.
          </p>
          <Button asChild>
            <Link href="/community">
              <Plus className="mr-2 h-4 w-4" />
              Contribute Insight
            </Link>
          </Button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight) => (
          <SpotlightCard key={insight.id} className="bg-card">
            <CardContent className="p-6">
              <h4 className="font-semibold text-foreground mb-2">{insight.title}</h4>
              <blockquote className="text-muted-foreground italic mb-4">
                “{insight.description}”
              </blockquote>
              <p className="text-sm font-semibold text-primary">
                — {insight.contributorName || 'Anonymous Contributor'}
              </p>
            </CardContent>
          </SpotlightCard>
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-headline">
            Community Insights
          </h2>
          <p className="text-muted-foreground">
            Architect notes and field observations.
          </p>
        </div>
        {renderContent()}
      </div>
    </section>
  );
}
