
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { getPrecedentById } from '@/lib/precedents';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type PrecedentDetailPageProps = {
  params: {
    id: string;
  };
};

export default async function PrecedentDetailPage({ params }: PrecedentDetailPageProps) {
  const precedent = await getPrecedentById(params.id);

  if (!precedent) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Button variant="ghost" asChild>
              <Link href="/archive">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Archive
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-3">
              <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={precedent.imageUrl}
                  alt={precedent.title}
                  fill
                  className="object-cover"
                  data-ai-hint={precedent.imageHint}
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {precedent.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                {precedent.architect}
              </p>
              <p className="text-sm text-muted-foreground font-semibold">
                {precedent.location} &mdash; {precedent.year}
              </p>
              <div className="my-6 space-y-4">
                <p className="text-base text-foreground leading-relaxed">
                  {precedent.description}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {precedent.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider mb-2">CODEA Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {precedent.codeaCategories.map((category) => (
                      <Badge key={category} variant="outline">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
