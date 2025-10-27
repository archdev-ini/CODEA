'use client';

import { useState } from 'react';
import { collection, query, where, doc, updateDoc } from 'firebase/firestore';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check, Loader2, Terminal, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

type CommunityInsight = {
  id: string;
  title: string;
  description: string;
  contributorName?: string;
  section: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
};

export default function InsightsReviewPanel() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const insightsQuery = useMemoFirebase(
    () =>
      query(
        collection(firestore, 'insights'),
        where('status', '==', 'PENDING')
      ),
    [firestore]
  );

  const { data: insights, isLoading, error } = useCollection<CommunityInsight>(insightsQuery);

  const handleAction = async (id: string, status: 'APPROVED' | 'REJECTED') => {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));
    try {
      const insightRef = doc(firestore, 'insights', id);
      await updateDoc(insightRef, { status });
      toast({
        title: `Insight ${status.toLowerCase()}`,
        description: `The submission has been updated.`,
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Action Failed',
        description: error.message || 'An unexpected error occurred.',
      });
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error Loading Insights</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      );
    }

    if (!insights || insights.length === 0) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          <p>No pending community insights to review.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight) => (
          <Card key={insight.id}>
            <CardHeader>
              <CardTitle>{insight.title}</CardTitle>
              <CardDescription>
                Submitted by: {insight.contributorName || 'Anonymous'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{insight.description}</p>
              <Badge variant="secondary">{insight.section}</Badge>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleAction(insight.id, 'REJECTED')}
                disabled={loadingStates[insight.id]}
              >
                {loadingStates[insight.id] ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <X className="h-4 w-4" />
                )}
                <span className="ml-2">Reject</span>
              </Button>
              <Button
                size="sm"
                onClick={() => handleAction(insight.id, 'APPROVED')}
                disabled={loadingStates[insight.id]}
              >
                {loadingStates[insight.id] ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
                <span className="ml-2">Approve</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight">Review Community Insights</h2>
        <p className="text-muted-foreground">
          Approve or reject pending submissions from the community.
        </p>
      </div>
      {renderContent()}
    </div>
  );
}
