import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const hubItems = [
  {
    id: 'design-hub-1',
    title: 'Case Studies',
    description:
      'Explore in-depth analyses of groundbreaking projects from across the African continent.',
  },
  {
    id: 'design-hub-2',
    title: 'Material Archives',
    description:
      'A comprehensive database of traditional and innovative African building materials.',
  },
  {
    id: 'design-hub-3',
    title: 'Urbanism Reports',
    description:
      'Data-driven insights into the evolution of African cities and future growth patterns.',
  },
];

export default function DesignIntelligenceHub() {
  return (
    <section id="hub" className="py-20 md:py-28 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-headline">
            Design Intelligence Hub
          </h2>
          <p className="text-muted-foreground text-lg mb-12">
            Centralized resources to enhance your research and suggest new
            design directions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {hubItems.map(item => {
            const image = PlaceHolderImages.find(img => img.id === item.id);
            return (
              <Card
                key={item.id}
                className="flex flex-col overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                {image && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={image.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                      data-ai-hint={image.imageHint}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
