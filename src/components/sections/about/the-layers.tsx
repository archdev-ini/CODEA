import { Layers, BookOpen, Globe } from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';

const layers = [
  {
    icon: <Layers className="h-6 w-6 text-primary" />,
    title: 'The Code Layer',
    description:
      'A unified library of building regulations, standards, and technical policies — digitized, structured, and simplified for direct use in design. This layer forms the regulatory foundation of CODEA.',
  },
  {
    icon: <BookOpen className="h-6 w-6 text-primary" />,
    title: 'The Precedent Layer',
    description:
      'A curated network of built projects, typologies, and adaptive systems that demonstrate contextual excellence. This layer serves as the living archive of architectural intelligence.',
  },
  {
    icon: <Globe className="h-6 w-6 text-primary" />,
    title: 'The Cultural Layer',
    description:
      'A repository of architectural memory and evolving identity. From indigenous techniques to contemporary reinterpretations, it documents how tradition informs innovation, turning CODEA into a cultural ecosystem.',
  },
];

export default function TheLayers() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-headline">
            The Three Layers of Architectural Intelligence
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {layers.map((layer, index) => (
            <SpotlightCard key={index} className="bg-card text-left p-8">
              <div className="flex items-center gap-3 mb-4">{layer.icon}</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {layer.title}
              </h3>
              <p className="text-muted-foreground">{layer.description}</p>
            </SpotlightCard>
          ))}
        </div>
        <blockquote className="mt-16 text-center text-xl italic text-foreground max-w-4xl mx-auto">
          “Regulation grounds architecture, precedent guides it, and culture
          gives it meaning.”
        </blockquote>
      </div>
    </section>
  );
}
