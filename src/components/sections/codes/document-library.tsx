'use client';

import { collection, query } from 'firebase/firestore';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
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
import { Badge } from '@/components/ui/badge';
import { BookText, Terminal } from 'lucide-react';

type CodeDocument = {
  id: string;
  title: string;
  summary: string;
  tags?: string[];
  createdAt: string;
};

export default function DocumentLibrary() {
  const firestore = useFirestore();

  const documentsQuery = useMemoFirebase(
    () => query(collection(firestore, 'documents')),
    [firestore]
  );

  const {
    data: documents,
    isLoading,
    error,
  } = useCollection<CodeDocument>(documentsQuery);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load documents. Please check your connection and
            permissions.
          </AlertDescription>
        </Alert>
      );
    }

    if (!documents || documents.length === 0) {
      return (
        <div className="text-center py-12 text-muted-foreground border border-dashed rounded-lg flex flex-col items-center">
          <BookText className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            The Document Library is Empty
          </h3>
          <p>
            Once documents are uploaded and processed, they will appear here.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc) => (
          <Card key={doc.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{doc.title}</CardTitle>
              <CardDescription className="line-clamp-3">
                {doc.summary || 'No summary available.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow" />
            <CardFooter className="flex-wrap gap-2">
              {doc.tags?.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

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
        {renderContent()}
      </div>
    </section>
  );
}
