'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import GradientText from '@/components/ui/gradient-text';

export default function Hero() {
  return (
    <section className="relative py-20 md:py-32 bg-background overflow-hidden min-h-[60vh] md:min-h-screen flex items-center">
      <div className="absolute inset-0 z-0 opacity-5">
        {/* Subtle grid lines */}
        <div
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage:
              'linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)',
            backgroundSize: '2rem 2rem',
          }}
        ></div>
      </div>
      
      <div className="container mx-auto text-center px-4 relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary mb-6 font-headline">
          <GradientText>
            CODEA — Pan-African Architectural Intelligence
          </GradientText>
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-10">
          A unified platform for building codes, design precedents, and cultural
          intelligence across Africa. When you receive a new project, this is
          where you begin.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button size="lg" asChild>
            <Link href="/about">
              <ArrowRight className="mr-2 h-5 w-5 -rotate-45" />
              About CODEA
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/codes">Explore the Codes</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
