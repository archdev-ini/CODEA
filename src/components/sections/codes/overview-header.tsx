'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

type OverviewHeaderProps = {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
};

export default function OverviewHeader({ searchTerm, onSearchTermChange }: OverviewHeaderProps) {
  return (
    <section className="py-20 md:py-32 bg-card border-b">
      <div className="container mx-auto px-4 text-center">
        <blockquote className="text-3xl md:text-4xl font-medium text-primary mb-4">
          “Pan-African Code Library”
        </blockquote>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
          A unified repository of building regulations, material standards, and
          environmental guidelines — organized by region, country, and theme.
        </p>
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search codes, materials, or building types…"
              className="w-full pl-12 h-12 text-base"
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
