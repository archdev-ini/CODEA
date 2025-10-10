import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Paintbrush, Wind, Droplets } from 'lucide-react';
import Link from 'next/link';

const visualGuides = [
  {
    icon: <Paintbrush className="h-4 w-4" />,
    title: 'Roof Pitch Guidelines (Tropical Zone)',
    content: [
      'Min slope: 22°',
      'Material: Corrugated zinc/aluminium',
      'Note: Use deep overhangs >600mm',
    ],
  },
  {
    icon: <Wind className="h-4 w-4" />,
    title: 'Cross-Ventilation Standards (All Zones)',
    content: [
      'Min opening: 10% of floor area',
      'Placement: Opposite walls for airflow',
      'Note: Consider high and low openings',
    ],
  },
  {
    icon: <Droplets className="h-4 w-4" />,
    title: 'Rainwater Harvesting (Urban Areas)',
    content: [
      'Storage: 50L/sqm of roof area',
      'Filtration: First-flush diverter required',
      'Use: Non-potable (WCs, irrigation)',
    ],
  },
];

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
          {visualGuides.map((guide, index) => (
            <Card className="flex flex-col" key={index}>
              <CardHeader>
                <div className="flex items-center gap-2 text-muted-foreground">
                  {guide.icon}
                  <span className="text-sm font-medium">Visual Guide</span>
                </div>
                <CardTitle>{guide.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 text-muted-foreground text-sm">
                  {guide.content.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="w-full" disabled>
                  View Diagram (Coming Soon)
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button disabled>Translate to Visual (AI Feature)</Button>
        </div>
      </div>
    </section>
  );
}
