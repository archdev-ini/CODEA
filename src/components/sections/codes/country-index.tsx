import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

const countries: { flag: string; name: string; stats: string }[] = [];

export default function CountryIndex() {
  return (
    <section className="py-20 md:py-28 bg-card border-y">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-headline">
                Country Index
            </h2>
        </div>
        {countries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {countries.map((country) => (
              <Card
                key={country.name}
                className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="text-5xl mb-4">{country.flag}</div>
                <h3 className="font-semibold text-lg text-foreground">
                  {country.name}
                </h3>
                <p className="text-sm text-muted-foreground">{country.stats}</p>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            <p>No countries have been added yet. Contribute to add one!</p>
          </div>
        )}
        <div className="text-center mt-12">
          <Button variant="outline" asChild>
            <Link href="/community">Add My Country</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
