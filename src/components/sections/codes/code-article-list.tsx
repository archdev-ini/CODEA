'use client';

import { collection, query, where } from 'firebase/firestore';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

type CodeArticle = {
  id: string;
  title: string;
  description: string;
  codeName: string;
  version: string;
  requirements: string[];
};

type CodeArticleListProps = {
  jurisdictionId: string;
};

export default function CodeArticleList({
  jurisdictionId,
}: CodeArticleListProps) {
  const firestore = useFirestore();

  const articlesQuery = useMemoFirebase(
    () =>
      query(
        collection(firestore, 'articles'),
        where('jurisdictionId', '==', jurisdictionId)
      ),
    [firestore, jurisdictionId]
  );

  const {
    data: articles,
    isLoading,
    error,
  } = useCollection<CodeArticle>(articlesQuery);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load code articles. Please ensure you have the correct
            permissions.
          </AlertDescription>
        </Alert>
      );
    }

    if (!articles || articles.length === 0) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          <p>No code articles have been indexed for this jurisdiction yet.</p>
        </div>
      );
    }

    return (
      <Accordion type="single" collapsible className="w-full">
        {articles.map((article) => (
          <AccordionItem key={article.id} value={article.id}>
            <AccordionTrigger className="text-left">
              {article.title}
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <p className="text-muted-foreground">{article.description}</p>
              {article.requirements && article.requirements.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Key Requirements:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {article.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="text-xs text-muted-foreground/80 pt-4">
                <p>
                  Source: {article.codeName} ({article.version})
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  };

  return (
    <section className="py-20 md:py-28 bg-card border-y">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-headline">
              Code Articles
            </h2>
            <p className="text-lg text-muted-foreground">
              Detailed regulations and standards.
            </p>
          </div>
          {renderContent()}
        </div>
      </div>
    </section>
  );
}
