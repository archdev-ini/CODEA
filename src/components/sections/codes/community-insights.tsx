import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const insights: { author: string; note: string }[] = [];

export default function CommunityInsights() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-headline">
            Community Insights
          </h2>
          <p className="text-muted-foreground">Architect notes and field observations.</p>
        </div>
        {insights.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insights.map((insight, index) => (
              <Card key={index} className="bg-card">
                <CardContent className="p-6">
                  <blockquote className="text-foreground italic mb-4">
                    {insight.note}
                  </blockquote>
                  <p className="text-sm font-semibold text-primary">
                    — {insight.author}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            <p>No community insights have been added yet.</p>
          </div>
        )}
        <div className="text-center mt-12">
          <Button asChild>
            <Link href="/community">
              <Plus className="mr-2 h-4 w-4" />
              Add Comment or Case Note
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
