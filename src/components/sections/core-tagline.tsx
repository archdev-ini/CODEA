import { Separator } from '@/components/ui/separator';

export default function CoreTagline() {
  return (
    <section id="tagline" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        <Separator className="w-1/4 mx-auto mb-8" />
        <p className="text-xl md:text-2xl font-medium text-muted-foreground">
          &ldquo;Architecture, Data, and Culture — finally in one place.&rdquo;
        </p>
        <Separator className="w-1/4 mx-auto mt-8" />
      </div>
    </section>
  );
}