import { Library, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Countdown from '@/components/sections/countdown';
import GradientText from '@/components/ui/gradient-text';
import { Button } from '@/components/ui/button';
import config from '@/lib/config.json';

export default function Home() {
  const launchDate = new Date(config.launchDate);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Library className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-semibold text-primary tracking-tight">
              CODEA
            </h1>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-4 font-headline">
            <GradientText>Launching Soon</GradientText>
          </h2>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10">
            Our platform for Pan-African architectural intelligence is under
            construction.
          </p>
          <Countdown date={launchDate} />
          <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" asChild>
              <Link href="/about">
                <ArrowRight className="mr-2 h-5 w-5 -rotate-45" />
                About CODEA
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/codes">Explore the Library</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
