import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { AnswerCodeQuestionOutput } from '@/ai/flows/answer-code-question';
import { Bot } from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';

type SmartSearchResultsProps = {
  question: string;
  results: AnswerCodeQuestionOutput;
};

export default function SmartSearchResults({
  question,
  results,
}: SmartSearchResultsProps) {
  const { answer, relevant_articles } = results;

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 space-y-12">
        {/* AI Answer Section */}
        <SpotlightCard className="bg-card">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-muted-foreground mb-2">
                Question: "{question}"
              </p>
              <p className="text-lg text-foreground">{answer}</p>
            </div>
          </div>
        </SpotlightCard>

        {/* Relevant Articles Section */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-8 text-center">
            Relevant Code Articles ({relevant_articles.length})
          </h2>
          {relevant_articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relevant_articles.map((article) => (
                <SpotlightCard key={article.code_id} className="flex flex-col bg-card">
                  <CardHeader>
                    <CardTitle>{article.title}</CardTitle>
                    <CardDescription>{article.code_id}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {article.description}
                    </p>

                    {article.requirements && article.requirements.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-sm mb-2">
                          Requirements:
                        </h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          {article.requirements.map((req, i) => (
                            <li key={i}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {article.keywords && article.keywords.length > 0 && (
                      <>
                        <Separator />
                        <div className="flex flex-wrap gap-2">
                          {article.keywords.map((kw) => (
                            <Badge key={kw} variant="secondary">
                              {kw}
                            </Badge>
                          ))}
                        </div>
                      </>
                    )}
                  </CardContent>
                </SpotlightCard>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              No specific code articles were found to be highly relevant to your
              question.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
