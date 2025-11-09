'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { codeLibraries } from '@/lib/codes';

type CodeArticleListProps = {
  jurisdictionId: string;
};

export default function CodeArticleList({
  jurisdictionId,
}: CodeArticleListProps) {
  const library = codeLibraries[jurisdictionId.toLowerCase()];

  const renderContent = () => {
    if (!library) {
      return (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Could not find code library for: {jurisdictionId}
          </AlertDescription>
        </Alert>
      );
    }

    if (library.sections.length === 0) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          <p>No code articles have been indexed for this jurisdiction yet.</p>
        </div>
      );
    }

    return (
      <Accordion type="single" collapsible className="w-full">
        {library.sections.flatMap((section) =>
          section.articles.map((article) => (
            <AccordionItem key={article.code_id} value={article.code_id}>
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
                  <p>Source: {article.references.join(', ')}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))
        )}
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
