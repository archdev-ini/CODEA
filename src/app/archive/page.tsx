
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { getArchitecturalPrecedents } from '@/lib/precedents';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';

export default async function ArchivePage() {
  const precedents = await getArchitecturalPrecedents({});

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
              Design Precedent Archive
            </h1>
            <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
              A curated archive of projects demonstrating contextual
              excellence and innovative design across Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {precedents.map((precedent) => (
              <Link href={`/archive/${precedent.id}`} key={precedent.id}>
                <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  <CardHeader>
                    <div className="relative aspect-[3/2] w-full mb-4">
                      <Image
                        src={precedent.imageUrl}
                        alt={precedent.title}
                        fill
                        className="rounded-md object-cover"
                        data-ai-hint={precedent.imageHint}
                      />
                    </div>
                    <CardTitle>{precedent.title}</CardTitle>
                    <CardDescription>
                      {precedent.architect} / {precedent.location} ({precedent.year})
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {precedent.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex-wrap gap-2">
                    {precedent.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
