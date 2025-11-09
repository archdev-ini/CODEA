
import SpotlightCard from '@/components/ui/SpotlightCard';
import Link from 'next/link';
import { availableCountries } from '@/lib/countries';

export default function CountryIndex() {
  const countries = availableCountries();

  const renderContent = () => {
    if (countries.length === 0) {
      return (
        <div className="text-center text-muted-foreground">
          <p>No countries have been added to the database yet.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {countries.map((country) => (
          <Link href={`/atlas/${country.value}`} key={country.value}>
            <SpotlightCard className="h-full text-center hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-semibold text-lg text-foreground">
                {country.label}
              </h3>
              <p className="text-sm text-muted-foreground">
                {/* Placeholder for article count */}
                View codes
              </p>
            </SpotlightCard>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 md:py-28 bg-card border-y">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-headline">
            Country Index
          </h2>
          <p className="text-lg text-muted-foreground">
            Select a jurisdiction to explore its building codes.
          </p>
        </div>
        {renderContent()}
      </div>
    </section>
  );
}
