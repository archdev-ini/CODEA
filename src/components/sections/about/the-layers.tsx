import { Layers, BookOpen, Globe } from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';

const layers = [
  {
    icon: <Layers className="h-6 w-6 text-primary" />,
    title: 'The Code Layer',
    description:
      'National and regional standards, mapped and simplified for usability. Every code entry connects to its source and contextual reasoning.',
  },
  {
    icon: <BookOpen className="h-6 w-6 text-primary" />,
    title: 'The Precedent Layer',
    description:
      'Built projects, design systems, and verified models of local adaptation. Each project links to its typology, climate zone, and material intelligence.',
  },
  {
    icon: <Globe className="h-6 w-6 text-primary" />,
    title: 'The Cultural Layer',
    description:
      'Architecture as identity. A growing record of vernacular forms, indigenous materials, and evolving traditions across Africa.',
  },
];

export default function TheLayers() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-headline">
            The three layers of architectural intelligence.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {layers.map((layer, index) => (
            <SpotlightCard
              key={index}
              className="bg-card text-center"
            >
              <div className="flex justify-center items-center gap-4 mb-4">
                {layer.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {layer.title}
              </h3>
              <p className="text-muted-foreground">{layer.description}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
