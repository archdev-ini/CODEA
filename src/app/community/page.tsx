import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function CommunityPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="py-20 md:py-32 bg-card border-b">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-medium text-primary tracking-tight leading-tight mb-6">
                    Join the Architecture of Knowledge
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    CODEA is built collaboratively. Whether you document codes, analyze climates, or build with local materials — your contribution strengthens the system.
                </p>
                 <div className="mt-8">
                    <Button size="lg" asChild>
                        <Link href="/community">Contribute Knowledge</Link>
                    </Button>
                </div>
            </div>
        </section>

        <section id="tagline" className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <Separator className="w-1/4 mx-auto" />
            <p className="text-xl md:text-2xl font-medium text-muted-foreground mt-8">
              &ldquo;A contribution today is a clearer standard tomorrow.&rdquo;
            </p>
            <Separator className="w-1/4 mx-auto mt-8" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
