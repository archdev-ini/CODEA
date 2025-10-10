import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const countries = [
  {
    flag: '🇳🇬',
    name: 'Nigeria',
    stats: '57 official standards, 18 drafts',
  },
  {
    flag: '🇬🇭',
    name: 'Ghana',
    stats: '39 standards, 6 local studies',
  },
  {
    flag: '🇪🇬',
    name: 'Egypt',
    stats: '72 standards, 12 case notes',
  },
  {
    flag: '🇿🇦',
    name: 'South Africa',
    stats: '84 standards, 22 visual maps',
  },
];

export default function CountryIndex() {
  return (
    <section className="py-20 md:py-28 bg-card border-y">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-headline">
                Country Index
            </h2>
        </div>
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
        <div className="text-center mt-12">
          <Button variant="outline">Add My Country</Button>
        </div>
      </div>
    </section>
  );
}
