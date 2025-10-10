import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

type Article = {
  code_id: string;
  title: string;
  description: string;
  requirements: string[];
  references: string[];
  keywords: string[];
  notes?: string;
  examples?: { context: string; application: string }[];
  related_codes?: string[];
};

type SearchResultsProps = {
  articles: Article[];
};

export default function SearchResults({ articles }: SearchResultsProps) {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-primary mb-8 text-center">
          Search Results ({articles.length})
        </h2>
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Card key={article.code_id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{article.title}</CardTitle>
                  <CardDescription>{article.code_id}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {article.description}
                  </p>

                  {article.requirements?.length > 0 && (
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

                  {article.notes && (
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Note:</h4>
                      <p className="text-sm text-muted-foreground italic">
                        &ldquo;{article.notes}&rdquo;
                      </p>
                    </div>
                  )}

                  {article.examples?.length > 0 && (
                     <div>
                      <h4 className="font-semibold text-sm mb-2">Example:</h4>
                       {article.examples.map((ex, i) => (
                         <div key={i} className="text-sm text-muted-foreground p-3 bg-muted rounded-md">
                           <p className='font-semibold text-foreground'>{ex.context}</p>
                           <p>{ex.application}</p>
                         </div>
                       ))}
                     </div>
                  )}

                  {article.references?.length > 0 && (
                     <div>
                        <h4 className="font-semibold text-sm mb-2">References:</h4>
                        <div className="flex flex-wrap gap-2">
                          {article.references.map((ref) => (
                            <Badge key={ref} variant="outline">{ref}</Badge>
                          ))}
                        </div>
                     </div>
                  )}
                  
                  <Separator/>

                  <div className="flex flex-wrap gap-2">
                    {article.keywords.map((kw) => (
                      <Badge key={kw} variant="secondary">
                        {kw}
                      </Badge>
                    ))}
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            No results found. Try another search term.
          </p>
        )}
      </div>
    </section>
  );
}
