import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
          Search Results
        </h2>
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Card key={article.code_id}>
                <CardHeader>
                  <CardTitle>{article.title}</CardTitle>
                  <CardDescription>{article.code_id}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {article.description}
                  </p>
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2">Requirements:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {article.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>
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
