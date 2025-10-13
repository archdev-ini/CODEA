import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Layers, BookOpen, Globe } from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';

const items = [
  {
    icon: <Layers className="h-8 w-8 text-primary" />,
    title: 'Building Codes',
    description:
      'Understand national and regional standards through an accessible, visual interface. Interpret the rules, not just read them.',
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: 'Design Precedents',
    description:
      'Explore verified projects, material systems, and spatial strategies across climates and cultures.',
  },
  {
    icon: <Globe className="h-8 w-8 text-primary" />,
    title: 'Cultural + Environmental Contexts',
    description:
      'See how local tradition, ecology, and economy shape good design across Africa.',
  },
];

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-headline">
            Your reference before design begins.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {items.map((item, index) => (
            <SpotlightCard
              key={index}
              className="bg-card border-none shadow-none text-center"
            >
              <CardHeader className="items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  {item.icon}
                </div>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {item.description}
                </CardDescription>
              </CardContent>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
