import { Layers, BookOpen, Globe, Bot } from 'lucide-react';

const layers = [
  {
    icon: <Layers className="h-6 w-6 text-primary" />,
    title: 'Codes & Standards',
    description:
      'A structured, queryable database of national and regional building codes, translated into a clear, visual format.',
  },
  {
    icon: <BookOpen className="h-6 w-6 text-primary" />,
    title: 'Precedent Library',
    description:
      'A verified archive of projects and material systems, filterable by climate, typology, and cultural context.',
  },
  {
    icon: <Globe className="h-6 w-6 text-primary" />,
    title: 'Contextual Data',
    description:
      'Geospatial data on climate, materials, and vernacular traditions to inform site-specific design.',
  },
  {
    icon: <Bot className="h-6 w-6 text-primary" />,
    title: 'AI-Powered Synthesis',
    description:
      'A reasoning engine that connects these layers, allowing you to ask complex questions and receive synthesized insights.',
  },
];

export default function TheLayers() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-headline">
            What It Builds: The Layers
          </h2>
          <p className="text-lg text-muted-foreground">
            CODEA is not a single tool, but a stack of interconnected data
            layers, working together to provide clarity.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {layers.map((layer, index) => (
            <div key={index} className="p-6 rounded-lg border bg-card">
              <div className="flex items-center gap-4 mb-4">
                {layer.icon}
                <h3 className="text-lg font-semibold text-foreground">
                  {layer.title}
                </h3>
              </div>
              <p className="text-muted-foreground">{layer.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
