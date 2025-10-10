import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Paintbrush } from 'lucide-react';

export default function VisualSummaries() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-headline">
            Visual Summaries
          </h2>
          <p className="text-lg text-muted-foreground">
            Interactive, graphical breakdowns of complex regulations. See codes
            in action with diagrams, flowcharts, and annotated illustrations.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="flex flex-col">
            <CardHeader>
                <div className='flex items-center gap-2 text-muted-foreground'>
                    <Paintbrush className="h-4 w-4" />
                    <span className='text-sm font-medium'>Visual Guide</span>
                </div>
              <CardTitle>Roof Pitch Guidelines (Tropical Zone)</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>Min slope: 22°</li>
                <li>Material: Corrugated zinc/aluminium</li>
                <li>Note: Use deep overhangs &gt;600mm</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" className="w-full">
                View Diagram
              </Button>
            </CardFooter>
          </Card>
          {/* Add more example cards here */}
        </div>
        <div className="text-center mt-12">
          <Button>Translate to Visual</Button>
        </div>
      </div>
    </section>
  );
}
