'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative py-20 md:py-32 bg-background overflow-hidden">
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
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="text-foreground/5 animate-spin-slow" style={{fontSize: 'min(80vw, 80vh)'}}>
          <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M493.1,192.5c-3.2-9.7-10.1-17.7-19.1-22.4l-31.4-16.5c-3.1-1.6-6.6-2.6-10.2-2.6h-34.9c-8.8-31-23.3-59.5-42.6-84.3 c-19.4-24.8-43.2-44.8-69.8-58.2l-12.3-6.2c-7.2-3.6-15.3-5.3-23.4-5.3s-16.2,1.7-23.4,5.3l-12.3,6.2 c-26.6,13.4-50.5,33.4-69.8,58.2c-19.3,24.8-33.8,53.3-42.6,84.3H64c-3.6,0-7.1,1-10.2,2.6L22.4,170.1 c-9,4.7-15.9,12.7-19.1,22.4c-3.2,9.7-2.7,20.4,1.4,29.5l14.9,32.8c2.1,4.6,5.3,8.5,9.4,11.3l12.4,8.6 c3,2.1,6.3,3.4,9.8,4.1v38.3c-7.4,3.7-13.6,9.1-18.2,15.7L20.6,346c-6.1,8.6-8.2,19.3-5.6,29.2c2.6,9.9,9.4,18,18.5,22.4l30.8,14.8 c3.1,1.5,6.5,2.3,9.8,2.3h10.4c0.1,0,0.1,0,0.2,0c22.1,34.4,52.2,63,88.2,83.2l20.4,11.4c6.3,3.5,13.4,5.3,20.4,5.3 s14.1-1.8,20.4-5.3l20.4-11.4c36-20.2,66.1-48.8,88.2-83.2c0.1,0,0.1,0,0.2,0h10.4c3.4,0,6.7-0.8,9.8-2.3l30.8-14.8 c9.1-4.4,15.9-12.5,18.5-22.4c2.6-9.9,0.4-20.6-5.6-29.2l-12.4-17.5c-4.5-6.6-10.8-12-18.2-15.7v-38.3 c3.5-0.7,6.8-1.9,9.8-4.1l12.4-8.6c4.1-2.8,7.3-6.7,9.4-11.3l14.9-32.8C495.8,212.9,496.3,202.2,493.1,192.5z M256,448 c-30.8-17.3-57.7-41.2-78.3-69.8h156.5C313.7,406.8,286.8,430.7,256,448z M157,346.5c-27.1-25.1-45.7-56.9-53.7-91.8 c14.2,4.6,29.6,7.4,45.7,7.4c17.7,0,34.6-3.7,49.8-10.2c-5.4,16.5-8.5,34-8.5,52.3c0,16.8,2.7,33.1,7.6,48.2H157z M128.2,181.8 c-1.7-16.5-2.7-33.3-2.7-50.3c0-26.1,5.3-51,14.9-73.4C177,33.5,214,16,256,16s79,17.5,115.6,42.1c9.6,22.4,14.9,47.3,14.9,73.4 c0,17-1,33.8-2.7,50.3H128.2z M316.3,298.3c-5.4-16.5-8.5-34-8.5-52.3c0-18.3,3.1-35.8,8.5-52.3 c15.2,6.5,32.1,10.2,49.8,10.2c16.1,0,31.5-2.8,45.7-7.4C400,289.5,381.4,321.4,354.3,346.5H308.4 C313.3,331.3,316,315.1,316.3,298.3z" />
          </svg>
        </div>
      </div>
      <div className="container mx-auto text-center px-4 relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary mb-6 font-headline">
          CODEA — Pan-African Architectural Intelligence
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-10">
          A unified platform for building codes, design precedents, and cultural
          intelligence across Africa. When you receive a new project, this is
          where you begin.
        </p>
        <div className="flex justify-center items-center gap-4">
          <a href="#library">
            <Button size="lg">
              <ArrowRight className="mr-2 h-5 w-5 -rotate-45" />
              Start with Codea
            </Button>
          </a>
          <Button size="lg" variant="outline">
            Explore the Codes
          </Button>
        </div>
      </div>
    </section>
  );
}