
'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import GradientText from '@/components/ui/gradient-text';
import Countdown from '@/components/sections/countdown';
import config from '@/lib/config.json';

export default function Hero() {
  const launchDate = new Date(config.launchDate);

  return (
    <section className="relative py-20 md:py-32 bg-background overflow-hidden min-h-[60vh] md:min-h-[80vh] flex items-center">
      <div className="container mx-auto text-center px-4 relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary mb-6 font-headline">
          <GradientText>
            Architectural Intelligence for a Connected World
          </GradientText>
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-10">
          A unified platform of codes, precedents, and cultural intelligence —
          where every architectural project begins with context.
        </p>
        <div className="flex flex-col items-center gap-8">
          <Countdown date={launchDate} />
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            Launching February 2026
          </p>
          <Button size="lg" variant="outline" asChild>
            <Link href="/atlas">Explore the Platform</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
