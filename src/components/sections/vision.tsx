'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';

const insights = [
  'Fusing vernacular materials with parametric design to create sustainable, context-aware structures.',
  'Developing new urban models that prioritize community, green space, and walkability in rapidly growing cities.',
  'Revitalizing ancient building techniques for contemporary climate resilience and cultural expression.',
  'Leveraging AI to analyze and adapt historical design patterns for modern housing solutions.',
  'Championing a circular economy in construction through modularity and recycled material innovation.',
];

export default function Vision() {
  const [currentInsight, setCurrentInsight] = useState(insights[0]);

  const generateInsight = () => {
    let newInsight;
    do {
      newInsight = insights[Math.floor(Math.random() * insights.length)];
    } while (newInsight === currentInsight);
    setCurrentInsight(newInsight);
  };

  return (
    <section id="vision" className="py-20 md:py-28 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-headline">
              Our Vision for a New African Architecture
            </h2>
            <p className="text-muted-foreground text-lg">
              We envision a future where African architectural identity is not
              just preserved, but is a dynamic, evolving force on the global
              stage. CODEA provides the tools and intelligence to build that
              future.
            </p>
          </div>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Lightbulb className="h-6 w-6 text-accent" />
                <span>Future Insight</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-foreground min-h-[100px] flex items-center">
                {currentInsight}
              </p>
              <Button onClick={generateInsight} className="mt-6 w-full">
                Generate New Insight
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
