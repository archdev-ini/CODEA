import { Library } from 'lucide-react';
import Countdown from '@/components/sections/countdown';
import GradientText from '@/components/ui/gradient-text';

export default function Home() {
  const launchDate = new Date('2026-02-01T00:00:00');

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
            Our platform for Pan-African architectural intelligence is under construction.
          </p>
          <Countdown date={launchDate} />
        </div>
      </main>
    </div>
  );
}
